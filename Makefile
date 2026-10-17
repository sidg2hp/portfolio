.PHONY: install dev build test start docker-build docker-run

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

start:
	NODE_ENV=production npm run start

docker-build:
	docker build -t siddhartha-portfolio .

docker-run:
	docker run --rm -p 3000:3000 siddhartha-portfolio
