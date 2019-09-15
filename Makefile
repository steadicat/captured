NODE_BIN=./node_modules/.bin
NODE=$(NODE_BIN)/ts-node
JS_DIR=src

node_modules: package.json
	npm install

deps: node_modules
	mkdir -p assets

buildconfig:
	$(NODE) buildconfig.ts

clean:
	rm -rf app/assets/*.js app/assets/**/*.html

devhtml:
	NODE_ENV=build $(NODE_BIN)/ts-node-dev --respawn --transpileOnly build.ts

devassets:
	$(NODE_BIN)/webpack-dev-server --port 3000

devapi: buildconfig
	/usr/local/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/bin/dev_appserver.py app

dev:
	make devassets & make devhtml & make devapi

lint:
	$(NODE_BIN)/eslint $(JS_DIR)

profileassets:
	NODE_ENV=production $(NODE_BIN)/webpack --profile --json > stats.json

images:
	curl https://thecapturedproject.com/api/images -o app/assets/images.json

buildassets:
	NODE_ENV=production $(NODE_BIN)/webpack

buildhtml:
	NODE_ENV=production $(NODE) -T build.ts

deploy: buildassets buildhtml buildconfig
	cd app && gcloud app deploy --project thecapturedproject --version 1 --no-promote

.PHONY: deps clean devhtml devassets devapi dev lint images buildassets buildhtml buildconfig deploy
