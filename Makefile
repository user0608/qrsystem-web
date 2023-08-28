VERSION:=$(shell cat version)
image:
	docker build --no-cache -t ksaucedo/qrsystem:$(VERSION) .
push:
	docker push ksaucedo/qrsystem:$(VERSION)