#!/bin/bash
set -e

# Start the application in detached mode
podman-compose up -d

# Follow the logs
podman-compose logs -f
