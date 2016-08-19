#!/bin/sh
# NOTE test server after deployment

# using jasmine to test
if [ -f ./node_modules/.bin/jasmine ]; then
  if [ -d ./spec ]; then
    echo "Running Jasmine specs testing server..."
    # ./node_modules/.bin/jasmine-node --matchall spec/
    ./node_modules/.bin/jasmine
    rc=$?; if [ $rc -ne 0 ]; then exit $rc; fi
  fi
fi
