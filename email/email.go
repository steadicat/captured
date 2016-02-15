package email

import (
	"config"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/stripe/stripe-go"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/urlfetch"
	"io/ioutil"
	"mime"
	"net/http"
	"path/filepath"
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
	Attachments   []PostmarkAttachment
}

type PostmarkAttachment struct {
	Name        string
	Content     string
	ContentType string
	ContentID   string
}

func send(c context.Context, message *PostmarkMessage) error {
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
	log.Infof(c, "Postmark response: %s", string(resBody))

	return nil
}

func getAttachments(c context.Context) []PostmarkAttachment {
	attachments := []PostmarkAttachment{}
	path := "captured.png"

	file, err := ioutil.ReadFile(path)
	if err != nil {
		log.Infof(c, "[error] Reading attachment file %s (%v)", path, err)
		return nil
	}

	attachment := PostmarkAttachment{
		Name:        path,
		Content:     base64.StdEncoding.EncodeToString(file),
		ContentType: mime.TypeByExtension(filepath.Ext(path)),
		ContentID:   "cid:logo@thecapturedproject.com",
	}

	attachments = append(attachments, attachment)
	return attachments
}

func SendReceipt(c context.Context, name string, email string, shipping stripe.Shipping) error {

	message := PostmarkMessage{
		From:       "The Captured Project <info@thecapturedproject.com>",
		To:         fmt.Sprintf("%s <%s>", name, email),
		TemplateId: 5705,
		TemplateModel: map[string]interface{}{
			"date":          time.Now().Format("1/2/2006"),
			"total":         "$40",
			"billing_name":  name,
			"shipping_name": shipping.Name,
			"address":       shipping.Address,
		},
		Attachments: getAttachments(c),
	}
	return send(c, &message)
}

func SendShippingNotification(c context.Context, name string, email string, shipping stripe.Shipping, trackingNumber string) error {
	message := PostmarkMessage{
		From:       "The Captured Project <info@thecapturedproject.com>",
		To:         fmt.Sprintf("%s <%s>", name, email),
		TemplateId: 216881,
		TemplateModel: map[string]interface{}{
			"date":            time.Now().Format("1/2/2006"),
			"total":           "$40",
			"billing_name":    name,
			"shipping_name":   shipping.Name,
			"address":         shipping.Address,
			"tracking_number": trackingNumber,
		},
		Attachments: getAttachments(c),
	}
	return send(c, &message)
}
