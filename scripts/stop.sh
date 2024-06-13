#!/usr/bin/env bash

docker-compose -f docker-compose.yml down --volumes
docker volume ls
