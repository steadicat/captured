package api

import (
	"github.com/zenazn/goji"
)

func init() {
	goji.Get("/api/sold", SoldHandler)
	goji.Post("/api/pay", PaymentHandler)
	goji.Get("/api/orders", OrdersHandler)
	goji.Post("/api/charge", ChargeHandler)
	goji.Post("/api/ship", ShipHandler)
	goji.Get("/api/images", ImageListHandler)
	goji.Serve()
}
