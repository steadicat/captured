package main

import (
	"net/http"

	"google.golang.org/appengine"
)

func main() {
	http.HandleFunc("/api/sold", SoldHandler)
	http.HandleFunc("/api/pay", PaymentHandler)
	http.HandleFunc("/api/orders", OrdersHandler)
	http.HandleFunc("/api/charge", ChargeHandler)
	http.HandleFunc("/api/ship", ShipHandler)
	http.HandleFunc("/api/images", ImageListHandler)

	appengine.Main()
}
