#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs

git init
git add -A
git commit -m 'Updated documentation'

# push without keeping history
git push -f git@github.com:b4dnewz/node-temp.git master:gh-pages

cd -