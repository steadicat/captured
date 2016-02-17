NODE_BIN=./node_modules/.bin
NODE=node --harmony
JS_DIR=src

node_modules: package.json
	npm install

deps: node_modules
	mkdir -p assets

clean:
	rm -rf assets/*.js assets/**/*.html

devhtml:
	NODE_ENV=build $(NODE_BIN)/supervisor --harmony -n exit -w build.js -w $(JS_DIR) -- build.js

devassets:
	node assetserver.js

devapi:
	goapp serve --host=0.0.0.0

dev:
	make devassets & make devhtml & make devapi

lint:
	$(NODE_BIN)/eslint $(JS_DIR)

profileassets:
	NODE_ENV=production $(NODE_BIN)/webpack --config etc/webpack.config.js --profile --json > stats.json

images:
	curl https://thecapturedproject.com/api/images -o assets/images.json

buildassets:
	NODE_ENV=production $(NODE_BIN)/webpack --config etc/webpack.config.js

buildhtml:
	NODE_ENV=production $(NODE) build.js

deploy: buildassets buildhtml
	goapp deploy

.PHONY: deps clean devhtml devassets devapi dev lint images buildassets buildhtml deploy
