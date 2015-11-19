package store

import (
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/memcache"
	"web"
)

type Counter struct {
	Value int
}

func getSoldCounter(c context.Context) int {
	var cachedCounter int
	_, err := memcache.JSON.Get(c, "sold", &cachedCounter)
	if err == nil {
		log.Infof(c, "[counter] Cache hit")
		return cachedCounter
	}

	if err != memcache.ErrCacheMiss {
		web.LogError(c, err, "Error accessing counter in memcache")
	} else {
		log.Infof(c, "[counter] Cache miss")
	}

	sold := new(Counter)
	key := datastore.NewKey(c, "Counter", "sold", 0, nil)
	err = datastore.Get(c, key, sold)
	if err != nil && err != datastore.ErrNoSuchEntity {
		web.LogError(c, err, "Error reading counter from datastore")
		return 0
	}

	err = memcache.JSON.Set(c, &memcache.Item{
		Key:    "sold",
		Object: &sold.Value,
	})
	if err != nil {
		web.LogError(c, err, "Error storing counter in memcache")
	}
	return sold.Value
}

func incrementSoldCounter(c context.Context) error {
	_, err := memcache.IncrementExisting(c, "sold", 1)
	if err != nil {
		if err == datastore.ErrNoSuchEntity {
			log.Infof(c, "[counter] Cache miss when incrementing")
		} else {
			return err
		}
	}

	sold := new(Counter)
	err = datastore.RunInTransaction(c, func(c context.Context) error {
		key := datastore.NewKey(c, "Counter", "sold", 0, nil)
		err := datastore.Get(c, key, sold)
		if err != nil && err != datastore.ErrNoSuchEntity {
			return err
		}
		sold.Value++
		_, err = datastore.Put(c, key, sold)
		if err != nil {
			sold.Value--
			return err
		}
		return nil
	}, nil)

	return err
}
