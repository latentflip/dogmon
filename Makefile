SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

JS_FILES := $(shell glob-cli "client/**/*.js")

build: bundle-server.js bundle-client.js

bundle-server.js: $(JS_FILES)
	browserify client/server.js > bundle-server.js

bundle-client.js: $(JS_FILES)
	browserify client/client.js > bundle-client.js
