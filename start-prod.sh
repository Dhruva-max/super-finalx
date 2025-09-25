#!/usr/bin/env bash
set -e
npm ci
export PORT=${PORT:-3000}
next build
next start -p $PORT
