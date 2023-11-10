IMAGE = np-0.1
CONTAINER = NotificationProxy-0.1
SERVER_PORT = 9092
PORT = 3009
#DOCKER_HOST = linkvis-ci-01

# Build docker image
image:
	npm install
	docker build -t $(IMAGE) --label com.docker.compose.project="sdn" .

# Stop docker container
stop:
	docker stop $(CONTAINER)

# Remove docker container
rm:
	docker rm -f $(CONTAINER)

# Remove docker container and image
clean: rm
	rm -f package-lock.json
	rm -Rf node_modules
	docker rmi $(IMAGE)

# Run docker container
run: rm
	docker run -d -p $(PORT):$(SERVER_PORT) --restart always --name $(CONTAINER) $(IMAGE)

test: run
	newman run ../testing/NotificationProxy.postman_collection.json --env-var baseUrl=http://$(DOCKER_HOST):$(PORT)

test-local: run
	newman run ../testing/NotificationProxy.postman_collection.json --env-var baseUrl=http://localhost:$(PORT)
