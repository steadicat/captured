package main

import (
	"fmt"
	"net/http"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
	"google.golang.org/appengine"
	"google.golang.org/appengine/blobstore"
	"google.golang.org/appengine/image"
)

type ImageListResponse struct {
	Images map[string]string `json:"images"`
}

func ImageListHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	if r.Method != "GET" {
		SendError(c, w, nil, 405, "Method not supported")
		return
	}

	client, err := storage.NewClient(c)
	if err != nil {
		SendError(c, w, err, 500, "Could not create client")
		return
	}
	defer client.Close()

	var query *storage.Query
	bucket := client.Bucket("thecapturedproject")
	objects := bucket.Objects(c, query)
	if err != nil {
		SendError(c, w, err, 500, "Could not list images")
		return
	}

	response := ImageListResponse{
		Images: map[string]string{},
	}

	for {
		object, err := objects.Next()
		if err == iterator.Done {
			break
		}
		blobKey, err := blobstore.BlobKeyForFile(c, fmt.Sprintf("/gs/thecapturedproject/%s", object.Name))
		if err != nil {
			LogError(c, err, fmt.Sprintf("Image %s ot found in blobstore", object.Name))
		}

		url, err := image.ServingURL(c, blobKey, &image.ServingURLOptions{
			Secure: true,
		})
		if err != nil {
			LogError(c, err, fmt.Sprintf("Could not serve image %s", object.Name))
		}
		response.Images[object.Name] = url.String()
	}

	SendJSON(c, w, response)
}
