package email

import (
	"config"
	"encoding/json"
	"fmt"
	"github.com/stripe/stripe-go"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/urlfetch"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

type PostmarkMessageHeader struct {
	Name  string
	Value string
}

type PostmarkMessage struct {
	TemplateId    int
	TemplateModel map[string]interface{}
	InlineCss     bool
	From          string
	To            string
	Cc            string
	Bcc           string
	Tag           string
	ReplyTo       string
	Headers       []PostmarkMessageHeader
	TrackOpens    bool
}

func SendReceipt(c context.Context, email string, billingName string, shippingName string, address stripe.Address) error {

	message := PostmarkMessage{
		From:       "The Captured Project <info@thecapturedproject.com>",
		To:         fmt.Sprintf("%s <%s>", billingName, email),
		TemplateId: 5705,
		TemplateModel: map[string]interface{}{
			"total":         "$40",
			"billing_name":  billingName,
			"shipping_name": shippingName,
			"date":          time.Now().Format("1/2/2006"),
			"address":       address,
		},
	}

	client := urlfetch.Client(c)
	requestBody, err := json.Marshal(message)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", "https://api.postmarkapp.com/email/withTemplate", strings.NewReader(string(requestBody)))
	if err != nil {
		return err
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("X-Postmark-Server-Token", config.Get(c, "POSTMARK_KEY"))

	res, err := client.Do(req)
	log.Infof(c, "Postmark: %v %v %v", req, res, err)
	if err != nil {
		return err
	}

	defer res.Body.Close()
	resBody, err := ioutil.ReadAll(res.Body)
	log.Infof(c, "Postmark response: %v", resBody)

	return nil
}
