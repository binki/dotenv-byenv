#!/bin/sh

set -e

ORIGINAL_PACKAGE_PATH=${PWD}

# https://unix.stackexchange.com/a/84980
DOTENV_BYENV_TMPDIR=$(mktemp -d 2>/dev/null || mktemp -d -t tmp)

cp -r "${ORIGINAL_PACKAGE_PATH}"/examples/typescript "${DOTENV_BYENV_TMPDIR}"/
cd "${DOTENV_BYENV_TMPDIR}"/typescript
# Install the package being testesd
npm install "${ORIGINAL_PACKAGE_PATH}"
# Install other packages
npm install
NODE_ENV= ts-node index.ts development-.env
NODE_ENV=development ts-node index.ts development-.env
NODE_ENV=production ts-node index.ts production-.env.production

echo X=production-.env.production.local > .env.production.local
NODE_ENV=production ts-node index.ts production-.env.production.local
cd "${ORIGINAL_PACKAGE_PATH}"

rm -rf "${DOTENV_BYENV_TMPDIR}"
