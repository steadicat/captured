package store

import (
	"config"
	"email"
	"encoding/json"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
	"github.com/stripe/stripe-go/customer"
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
	if r.Method != "GET" {
		web.SendError(c, w, nil, 405, "Method not supported")
		return
	}

	sold := getSoldCounter(c)
	web.SendJSON(c, w, SoldResponse{Sold: sold})
}

func PaymentHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	if r.Method != "POST" {
		web.SendError(c, w, nil, 405, "Method not supported")
		return
	}

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

	address := stripe.Address{
		Line1:   args.ShippingAddressLine1,
		Line2:   args.ShippingAddressLine2,
		City:    args.ShippingAddressCity,
		State:   args.ShippingAddressState,
		Zip:     args.ShippingAddressZIP,
		Country: args.ShippingAddressCountry,
	}

	customerParams := &stripe.CustomerParams{
		Email: token.Email,
		Desc:  args.BillingName,
	}
	customerParams.AddMeta("name", args.ShippingName)
	customerParams.AddMeta("line1", address.Line1)
	customerParams.AddMeta("line2", address.Line2)
	customerParams.AddMeta("city", address.City)
	customerParams.AddMeta("state", address.State)
	customerParams.AddMeta("zip", address.Zip)
	customerParams.AddMeta("country", address.Country)
	customerParams.SetSource(token.ID)

	customer, err := customer.New(customerParams)
	if err != nil {
		web.SendError(c, w, err, 500, "Error saving customer to Stripe")
		return
	}

	_, err = incrementSoldCounter(c)
	if err != nil {
		web.LogError(c, err, "Error incrementing sold counter")
	}

	if immediateCharge {
		chargeParams := stripe.ChargeParams{
			Amount:    4000,
			Currency:  "usd",
			Customer:  customer.ID,
			NoCapture: true,
			Statement: "Captured Project Book",
			Shipping: &stripe.ShippingDetails{
				Name:    args.ShippingName,
				Address: address,
			},
		}
		_, err := charge.New(&chargeParams)
		if err != nil {
			web.SendError(c, w, err, 500, "Error charging card")
			return
		}
	}

	err = email.SendReceipt(c, token.Email, args.BillingName, args.ShippingName, address)
	if err != nil {
		web.LogError(c, err, "Error sending receipt")
	}

	web.SendJSON(c, w, PaymentResponse{Ok: true})
}
