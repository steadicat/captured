package web

import (
  "google.golang.org/appengine/log"
  "golang.org/x/net/context"
  "net/http"
  "fmt"
)

func LogError(c context.Context, err error, message string) {
  log.Warningf(c, "Error: %s (%v)", message, err)
}

func SendError(c context.Context, w http.ResponseWriter, err error, code int, message string) {
  log.Warningf(c, "Error [%d]: %s (%v)", code, message, err)
  http.Error(w, fmt.Sprintf("%s (%v)", message, err), code)
}
