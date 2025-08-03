#!/usr/bin/env bash

PROJECT=image-fun
BUILD_DIR=./dist/pop-os
BASE_DIR=/image-fun
DEPLOY_DIR=/var/www/html/$PROJECT

# Update dependencies
pnpm install

# Build
pnpm build --base="$BASE_DIR" --outDir="$BUILD_DIR"

# Deploy
# Remove exiting files
if [ -d "$DEPLOY_DIR" ]; then
  sudo rm -r "$DEPLOY_DIR"
fi

# Copy new files
sudo rcp -r "$BUILD_DIR" "$DEPLOY_DIR"
