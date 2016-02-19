package store

import (
	"config"
	"email"
	"encoding/json"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/client"
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

	sc := client.New(config.Get(c, "STRIPE_KEY"), stripe.NewBackends(urlfetch.Client(c)))

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

	customer, err := sc.Customers.New(&stripe.CustomerParams{
		Email:  token.Email,
		Desc:   args.BillingName,
		Source: &stripe.SourceParams{Token: token.ID},
	})

	if err != nil {
		web.SendError(c, w, err, 500, "Error saving customer to Stripe")
		return
	}

	order, err := sc.Orders.New(&stripe.OrderParams{
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

	err = email.SendReceipt(c, args.BillingName, token.Email, order.Shipping)
	if err != nil {
		web.LogError(c, err, "Error sending receipt")
	}

	web.SendJSON(c, w, PaymentResponse{Ok: true})
}

type OrdersResponse struct {
	Orders []*ShortOrder `json:"orders"`
}

type ShortOrder struct {
	ID       string             `json:"id"`
	Created  int64              `json:"created"`
	Status   stripe.OrderStatus `json:"status"`
	Shipping stripe.Shipping    `json:"shipping"`
	Customer stripe.Customer    `json:"customer"`
	Meta     map[string]string  `json:"metadata"`
}

func OrdersHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	sc := client.New(config.Get(c, "STRIPE_KEY"), stripe.NewBackends(urlfetch.Client(c)))

	lastKey := "or_17fQDrKpn8lOrcLslDTTOnWv"

	r.ParseForm()

	before := r.Form.Get("before")
	if before != "" {
		lastKey = before
	}

	params := &stripe.OrderListParams{
		ListParams: stripe.ListParams{
			Single: true,
			End:    lastKey,
		},
	}

	status := r.Form.Get("status")
	if status != "" && status != "all" {
		params = &stripe.OrderListParams{
			Status: stripe.OrderStatus(status),
			ListParams: stripe.ListParams{
				Single: true,
				End:    lastKey,
			},
		}
	}

	iter := sc.Orders.List(params)

	var response OrdersResponse
	response.Orders = []*ShortOrder{}

	for iter.Next() {
		if iter.Order().Status != stripe.StatusCanceled {
			o := iter.Order()
			response.Orders = append(response.Orders, &ShortOrder{
				ID:       o.ID,
				Created:  o.Created,
				Status:   o.Status,
				Shipping: o.Shipping,
				Customer: o.Customer,
				Meta:     o.Meta,
			})
		}
	}

	web.SendJSON(c, w, response)
}

type ChargeResponse struct {
	Success bool `json:"success"`
}

func ChargeHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	sc := client.New(config.Get(c, "STRIPE_KEY"), stripe.NewBackends(urlfetch.Client(c)))

	r.ParseForm()
	orderID := r.Form.Get("orderID")
	customerID := r.Form.Get("customerID")

	_, err := sc.Orders.Pay(orderID, &stripe.OrderPayParams{
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
	sc := client.New(config.Get(c, "STRIPE_KEY"), stripe.NewBackends(urlfetch.Client(c)))

	r.ParseForm()
	orderID := r.Form.Get("orderID")
	trackingNumber := r.Form.Get("trackingNumber")

	order, err := sc.Orders.Update(orderID, &stripe.OrderUpdateParams{
		Status: stripe.StatusFulfilled,
		Params: stripe.Params{
			Meta: map[string]string{"tracking_number": trackingNumber},
		},
	})
	if err != nil {
		web.SendError(c, w, err, 500, "Error marking order as fulfilled")
		return
	}

	customer, err := sc.Customers.Get(order.Customer.ID, nil)
	if err != nil {
		web.LogError(c, err, "Error fetching customer info for email")
	} else {
		err = email.SendShippingNotification(c, customer.Desc, customer.Email, order.Shipping, trackingNumber)
		if err != nil {
			web.LogError(c, err, "Error sending shipping notification")
		}
	}

	web.SendJSON(c, w, ChargeResponse{Success: true})
}
