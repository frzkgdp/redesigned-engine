#!/usr/bin/env bash

set -e

function waitFor() {
  local service="${1}"
  echo "Waiting for ${service} service.."

  while STATUS=$(docker inspect --format "{{.State.Health.Status}}" "${service}"); [[ "${STATUS}" != "healthy" ]]; do
    if [[ "${STATUS}" == "unhealthy" ]]; then
      echo "${service} failed to start."
      exit 1
    fi

    sleep 1
  done

  echo "${service} is ready."
}

docker-compose -f docker-compose.yml up -d rabbitmq

waitFor "rabbitmq"