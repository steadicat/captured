package config

import (
	"encoding/json"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/memcache"
	"io/ioutil"
	"web"
)

func Get(c context.Context, key string) string {
	cachedItem, err := memcache.Get(c, "config")
	var config map[string]string
	var data []byte

	if err == nil {
		log.Infof(c, "[config] Cache hit for %s", key)
		json.Unmarshal(cachedItem.Value, &config)
		return config[key]
	}

	if err != memcache.ErrCacheMiss {
		web.LogError(c, err, "Error accessing config data in memcache")
	} else {
		log.Infof(c, "[config] Cache miss for %s", key)
	}

	data, err = ioutil.ReadFile("config.json")
	if err != nil {
		web.LogError(c, err, "Error reading config data")
		return ""
	}

	err = memcache.Add(c, &memcache.Item{
		Key:   "config",
		Value: data,
	})
	if err != nil {
		web.LogError(c, err, "Error storing config data in memcache")
	}

	json.Unmarshal(data, &config)
	return config[key]
}
