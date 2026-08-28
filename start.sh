#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found on this machine."
  echo "Install it from https://nodejs.org (LTS version), then run this again."
  exit 1
fi

node scripts/launch.mjs
