package api

import (
	"images"
	"net/http"
	"store"
)

func init() {
	http.HandleFunc("/api/sold", store.SoldHandler)
	http.HandleFunc("/api/pay", store.PaymentHandler)
	http.HandleFunc("/api/images", images.ImageListHandler)
}
