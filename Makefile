export CLOUDSDK_CORE_PROJECT=thecapturedproject

node_modules: package.json yarn.lock
	yarn install
	touch node_modules

clean:
	rm -rf app/assets/*.js app/assets/**/*.html

devhtml: node_modules
	NODE_ENV=build yarn run ts-node -T build.ts

devassets: node_modules
	yarn run webpack-dev-server --port 3000

devapi: app/app.yaml
	cd app && /usr/local/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/bin/dev_appserver.py .

dev:
	make devassets & make devhtml & make devapi

lint:
	yarn run eslint src

profileassets: node_modules
	NODE_ENV=production yarn run webpack --profile --json > stats.json

images: app/assets
	curl https://thecapturedproject.com/api/images -o app/assets/images.json

app/assets: node_modules $(shell find src -type f)
	mkdir -p app/assets
	NODE_ENV=production yarn run webpack
	touch app/assets

app/app.yaml: node_modules app/assets app/app.template.yaml
	yarn run ts-node buildconfig.ts

buildhtml: node_modules
	NODE_ENV=production yarn run ts-node -T build.ts

deploy: app/assets buildhtml app/app.yaml
	cd app && gcloud app deploy --no-promote

.PHONY: deps clean devhtml devassets devapi dev lint images buildhtml deploy
