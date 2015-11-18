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

	sold := getSoldCounter(c)
	token := body.Token
	args := body.Args
	immediateCharge := sold > 300

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

	ord, err := order.New(&stripe.OrderParams{
		Currency: "usd",
		Customer: customer.ID,
		Shipping: shipping,
		Items: []*stripe.OrderItemParams{
			&stripe.OrderItemParams{
				Type:   "sku",
				Parent: "sku_7NOfzm0jL1hzKa",
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

	if immediateCharge {
		ord, err = order.Pay(ord.ID, &stripe.OrderPayParams{
			Customer: customer.ID,
		})

		if err != nil {
			web.SendError(c, w, err, 500, "Error charging card")
			return
		}
	}

	err = email.SendReceipt(c, args.BillingName, token.Email, shipping)
	if err != nil {
		web.LogError(c, err, "Error sending receipt")
	}

	web.SendJSON(c, w, PaymentResponse{Ok: true})
}

type OrdersResponse struct {
	Orders []*stripe.Order
}

func OrdersHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	stripe.Key = config.Get(c, "STRIPE_KEY")
	stripe.SetHTTPClient(urlfetch.Client(c))

	i := order.List(&stripe.OrderListParams{
		Status: "created",
	})

	var response OrdersResponse

	for i.Next() {
		response.Orders = append(response.Orders, i.Order())
	}

	web.SendJSON(c, w, response)
}
