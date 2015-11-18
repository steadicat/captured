package images

import (
	"config"
	"fmt"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/jwt"
	"google.golang.org/appengine"
	"google.golang.org/appengine/blobstore"
	"google.golang.org/appengine/image"
	"google.golang.org/cloud"
	"google.golang.org/cloud/storage"
	"net/http"
	"web"
)

type ImageListResponse struct {
	Images map[string]string `json:"images"`
}

func ImageListHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	if r.Method != "GET" {
		web.SendError(c, w, nil, 405, "Method not supported")
		return
	}

	conf := &jwt.Config{
		Email:      config.Get(c, "CLOUD_STORAGE_EMAIL"),
		PrivateKey: []byte(config.Get(c, "CLOUD_STORAGE_PRIVATE_KEY")),
		Scopes: []string{
			"https://www.googleapis.com/auth/devstorage.full_control",
		},
		TokenURL: google.JWTTokenURL,
	}
	var query *storage.Query
	hc := conf.Client(c)
	cc := cloud.NewContext(appengine.AppID(c), hc)
	objects, err := storage.ListObjects(cc, "thecapturedproject", query)
	if err != nil {
		web.SendError(c, w, err, 500, "Could not list images")
		return
	}

	response := ImageListResponse{
		Images: map[string]string{},
	}

	for _, object := range objects.Results {
		blobKey, err := blobstore.BlobKeyForFile(c, fmt.Sprintf("/gs/thecapturedproject/%s", object.Name))
		if err != nil {
			web.LogError(c, err, "Image not found in blobstore")
		}

		url, err := image.ServingURL(c, blobKey, &image.ServingURLOptions{
			Secure: true,
		})
		if err != nil {
			web.LogError(c, err, "Could not serve image")
		}
		response.Images[object.Name] = url.String()
	}

	web.SendJSON(c, w, response)
}
