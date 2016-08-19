#!/bin/sh

# test using eslint
if [ -f ./node_modules/.bin/eslint ]; then
  if [ -d ./static/js ]; then
    echo "Linting static files using eslint..."
    ./node_modules/.bin/eslint ./static/js
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
  if [ -f ./main.js ]; then
    echo "Linting main.js using eslint..."
    ./node_modules/.bin/eslint main.js
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
fi
