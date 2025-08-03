#!/usr/bin/env bash

PROJECT=image-fun
SERVER=tilde.team
BUILD_DIR=./dist/tilde.team
BASE_DIR=/~padeso/image-fun
DEPLOY_DIR=/home/padeso/public_html/$PROJECT

# Update dependencies
pnpm install

# Build
pnpm build --base="$BASE_DIR" --outDir="$BUILD_DIR"

# Deploy
# Remove exiting files
ssh $SERVER "bash -c 'if [ -d "$DEPLOY_DIR" ]; then
  rm -r "$DEPLOY_DIR"
fi'"

# Copy new files
rcp -r "$BUILD_DIR" $SERVER:"$DEPLOY_DIR"
