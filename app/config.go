package main

import (
	"encoding/json"
	"io/ioutil"

	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/memcache"
)

func Get(c context.Context, key string) string {
	cachedItem, err := memcache.Get(c, "config-v2")
	var config map[string]string
	var data []byte

	if err == nil {
		log.Infof(c, "[config] Cache hit for %s", key)
		json.Unmarshal(cachedItem.Value, &config)
		return config[key]
	}

	if err != memcache.ErrCacheMiss {
		LogError(c, err, "Error accessing config data in memcache")
	} else {
		log.Infof(c, "[config] Cache miss for %s", key)
	}

	if appengine.IsDevAppServer() {
		data, err = ioutil.ReadFile("config.dev.json")
		if err != nil {
			LogError(c, err, "Error reading config data")
			return ""
		}
	} else {
		data, err = ioutil.ReadFile("config.json")
		if err != nil {
			LogError(c, err, "Error reading config data")
			return ""
		}

	}

	err = memcache.Add(c, &memcache.Item{
		Key:   "config-v2",
		Value: data,
	})
	if err != nil {
		LogError(c, err, "Error storing config data in memcache")
	}

	json.Unmarshal(data, &config)
	return config[key]
}
