package store

import (
	"config"
	"email"
	"encoding/json"
	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
	"github.com/stripe/stripe-go/customer"
	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/urlfetch"
	"net/http"
	"web"
)

type Counter struct {
	Value int
}

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

func getSoldCounter(c context.Context) (int, error) {
	sold := new(Counter)
	key := datastore.NewKey(c, "Counter", "sold", 0, nil)
	err := datastore.Get(c, key, sold)
	if err != nil && err != datastore.ErrNoSuchEntity {
		return 0, err
	}
	return sold.Value, nil
}

func incrementSoldCounter(c context.Context) (int, error) {
	sold := new(Counter)
	err := datastore.RunInTransaction(c, func(c context.Context) error {
		key := datastore.NewKey(c, "Counter", "sold", 0, nil)
		err := datastore.Get(c, key, sold)
		if err != nil && err != datastore.ErrNoSuchEntity {
			return err
		}
		sold.Value++
		_, err = datastore.Put(c, key, sold)
		if err != nil {
			sold.Value--
			return err
		}
		return nil
	}, nil)
	return sold.Value, err
}

func SoldHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	if r.Method != "GET" {
		web.SendError(c, w, nil, 405, "Method not supported")
		return
	}

	sold, err := getSoldCounter(c)
	if err != nil {
		web.SendError(c, w, err, 500, "Error counting books sold")
		return
	}
	response := SoldResponse{Sold: sold}

	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.Encode(response)
}

func saveCustomer(c context.Context, token stripe.Token, args PaymentArgs, immediateCharge bool) error {
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
		return err
	}
	err = onSuccessfulPurchase(c, token.Email, args.BillingName, args.ShippingName, address)
	if err != nil {
		return err
	}

	if immediateCharge {
		err := saveCharge(customer, args.ShippingName, address)
		if err != nil {
			return err
		}
	}

	return nil
}

func onSuccessfulPurchase(c context.Context, emailAddress string, billingName string, shippingName string, address stripe.Address) error {
	_, err := incrementSoldCounter(c)
	if err != nil {
		return err
	}

	return email.SendReceipt(c, emailAddress, billingName, shippingName, address)
}

func saveCharge(customer *stripe.Customer, name string, address stripe.Address) error {
	chargeParams := stripe.ChargeParams{
		Amount:    4000,
		Currency:  "usd",
		Customer:  customer.ID,
		NoCapture: true,
		Statement: "Captured Project Book",
		Shipping: &stripe.ShippingDetails{
			Name:    name,
			Address: address,
		},
	}
	_, err := charge.New(&chargeParams)
	return err
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
		web.SendError(c, w, nil, 400, "Could not parse payment information")
		return
	}

	sold, err := getSoldCounter(c)
	if err != nil {
		web.SendError(c, w, nil, 500, "Could not count books sold")
		return
	}

	err = saveCustomer(c, body.Token, body.Args, sold > 300)
	if err != nil {
		web.SendError(c, w, nil, 500, "Error saving purchase")
		return
	}

	response := PaymentResponse{Ok: true}
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	encoder.Encode(response)
}
