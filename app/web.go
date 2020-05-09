package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/zenazn/goji/web"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
)

type Context web.C

func LogError(c context.Context, err error, message string) {
	log.Warningf(c, "[error] %s (%v)", message, err)
}

func SendError(c context.Context, w http.ResponseWriter, err error, code int, message string) {
	log.Warningf(c, "[error] [%d] %s (%v)", code, message, err)
	http.Error(w, fmt.Sprintf("%s (%v)", message, err), code)
}

func SendJSON(c context.Context, w http.ResponseWriter, response interface{}) {
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	err := encoder.Encode(response)
	if err != nil {
		SendError(c, w, err, 500, "Error encoding JSON response")
	}
}
