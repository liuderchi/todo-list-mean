#!/bin/sh

# linting using eslint
if [ -f ./node_modules/.bin/eslint ]; then
  if [ -d ./static/js ]; then
    echo "Linting static files using eslint..."
    ./node_modules/.bin/eslint ./static/js
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
  if [ -d ./spec ]; then
    echo "Linting spec using eslint..."
    ./node_modules/.bin/eslint spec
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
  if [ -f ./main.js ]; then
    echo "Linting main.js using eslint..."
    ./node_modules/.bin/eslint main.js
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
fi

# using jasmine to test
if [ -f ./node_modules/.bin/jasmine ]; then
  if [ -d ./spec ]; then
    echo "Running Jasmine specs..."
    ./node_modules/.bin/jasmine
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
fi
