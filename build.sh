#!/bin/bash
set -e

# Clean up existing resources
podman-compose down
podman volume rm next_data node_modules || true

# Build the application
podman-compose build --no-cache