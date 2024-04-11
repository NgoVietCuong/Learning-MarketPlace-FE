# List running containers
ps:
	docker compose ps
# Build image and start containers
build:
	docker compose up -d --build
# Start containers
up:
	docker compose up -d
# Stop and remove containers
down:
	docker compose down -v
# Stop running containers without removing them
stop:
	docker compose stop
# Go to node container terminal
node:
	docker compose exec node sh
# Install all dependencies in node container
install:
	docker compose exec node yarn install
# Start program in node container
dev:
	docker compose exec node yarn dev
# Setup project with docker container
setup:
	make build
	make install
# Add package
yarnAdd:
	docker compose exec node yarn add $(package)
# Remove package
yarnRemove:
	docker compose exec node yarn remove $(package)