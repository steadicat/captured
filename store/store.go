package store

import (
	"config"
	"email"
	"encoding/json"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/customer"
	"github.com/stripe/stripe-go/order"
	"google.golang.org/appengine"
	"google.golang.org/appengine/urlfetch"
	"net/http"
	"web"
)

type SoldResponse struct {
	Sold int `json:"sold"`
}

type PaymentArgs struct {
	BillingName            string `json:"billing_name"`
	ShippingName           string `json:"shipping_name"`
	ShippingAddressLine1   string `json:"shipping_address_line1"`
	ShippingAddressLine2   string `json:"shipping_address_line2"`
	ShippingAddressCity    string `json:"shipping_address_city"`
	ShippingAddressState   string `json:"shipping_address_state"`
	ShippingAddressZIP     string `json:"shipping_address_zip"`
	ShippingAddressCountry string `json:"shipping_address_country"`
}

type PaymentRequestBody struct {
	Token stripe.Token `json:"token"`
	Args  PaymentArgs  `json:"args"`
}

type PaymentResponse struct {
	Ok bool `json:"ok"`
}

func SoldHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	sold := getSoldCounter(c)
	web.SendJSON(c, w, SoldResponse{Sold: sold})
}

func PaymentHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	decoder := json.NewDecoder(r.Body)
	body := new(PaymentRequestBody)
	err := decoder.Decode(&body)
	if err != nil {
		web.SendError(c, w, err, 400, "Could not parse payment information")
		return
	}

	token := body.Token
	args := body.Args

	stripe.Key = config.Get(c, "STRIPE_KEY")
	stripe.SetHTTPClient(urlfetch.Client(c))

	shipping := &stripe.ShippingParams{
		Name: args.ShippingName,
		Address: &stripe.AddressParams{
			Line1:      args.ShippingAddressLine1,
			Line2:      args.ShippingAddressLine2,
			City:       args.ShippingAddressCity,
			State:      args.ShippingAddressState,
			PostalCode: args.ShippingAddressZIP,
			Country:    args.ShippingAddressCountry,
		},
	}

	customer, err := customer.New(&stripe.CustomerParams{
		Email:  token.Email,
		Desc:   args.BillingName,
		Source: &stripe.SourceParams{Token: token.ID},
	})

	if err != nil {
		web.SendError(c, w, err, 500, "Error saving customer to Stripe")
		return
	}

	_, err = order.New(&stripe.OrderParams{
		Currency: "usd",
		Customer: customer.ID,
		Shipping: shipping,
		Items: []*stripe.OrderItemParams{
			&stripe.OrderItemParams{
				Type:   "sku",
				Parent: "book",
			},
		},
	})
	if err != nil {
		web.SendError(c, w, err, 500, "Error saving order to Stripe")
		return
	}

	err = incrementSoldCounter(c)
	if err != nil {
		web.LogError(c, err, "Error incrementing sold counter")
	}

	err = email.SendReceipt(c, args.BillingName, token.Email, shipping)
	if err != nil {
		web.LogError(c, err, "Error sending receipt")
	}

	web.SendJSON(c, w, PaymentResponse{Ok: true})
}

type OrdersResponse struct {
	Orders []*stripe.Order `json:"orders"`
}

func OrdersHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	stripe.Key = config.Get(c, "STRIPE_KEY")
	stripe.SetHTTPClient(urlfetch.Client(c))

	params := &stripe.OrderListParams{}

	r.ParseForm()
	status := r.Form.Get("status")
	if status != "" && status != "all" {
		params = &stripe.OrderListParams{Status: stripe.OrderStatus(status)}
	}

	i := order.List(params)

	var response OrdersResponse
	response.Orders = []*stripe.Order{}

	for i.Next() {
		response.Orders = append(response.Orders, i.Order())
	}

	web.SendJSON(c, w, response)
}

type ChargeResponse struct {
	Success bool `json:"success"`
}

func ChargeHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	stripe.Key = config.Get(c, "STRIPE_KEY")
	stripe.SetHTTPClient(urlfetch.Client(c))

	r.ParseForm()
	orderID := r.Form.Get("orderID")
	customerID := r.Form.Get("customerID")

	_, err := order.Pay(orderID, &stripe.OrderPayParams{
		Customer: customerID,
	})
	if err != nil {
		web.SendError(c, w, err, 500, "Error charging card")
		return
	}

	web.SendJSON(c, w, ChargeResponse{Success: true})
}

func ShipHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	stripe.Key = config.Get(c, "STRIPE_KEY")
	stripe.SetHTTPClient(urlfetch.Client(c))

	r.ParseForm()
	orderID := r.Form.Get("orderID")
	trackingNumber := r.Form.Get("trackingNumber")

	_, err := order.Update(orderID, &stripe.OrderUpdateParams{
		Status: stripe.StatusFulfilled,
		Params: stripe.Params{
			Meta: map[string]string{"tracking_number": trackingNumber},
		},
	})
	if err != nil {
		web.SendError(c, w, err, 500, "Error marking order as fulfilled")
		return
	}

	web.SendJSON(c, w, ChargeResponse{Success: true})
}
