#!/usr/bin/env bash
set -e
# install deps if needed
if [ ! -d "node_modules" ]; then
  npm ci
fi
# ensure host/port default values
export PORT=${PORT:-3000}
export HOST=${HOST:-0.0.0.0}
# start in dev mode (change to prod if you like)
npx cross-env PORT=$PORT HOST=$HOST next dev -p $PORT
