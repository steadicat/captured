package api

import (
	"github.com/zenazn/goji"
	"images"
	"store"
)

func init() {
	goji.Get("/api/sold", store.SoldHandler)
	goji.Post("/api/pay", store.PaymentHandler)
	goji.Get("/api/orders", store.OrdersHandler)
	goji.Post("/api/charge", store.ChargeHandler)
	goji.Post("/api/ship", store.ShipHandler)
	goji.Get("/api/images", images.ImageListHandler)
	goji.Serve()
}
