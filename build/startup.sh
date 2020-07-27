#!/bin/sh -e

HTMLROOT=/usr/share/nginx/html
cd ${HTMLROOT}

if [ "${DEPLOYMENTPATH}" == "" ]; then
  echo WARNING: You should set the DEPLOYMENTPATH environment variable to the vhost subdirectory that the server is deployed at.
  echo Continuing with a root DEPLOYMENTPATH which may not be what you want.
fi

if [ "${VIDISPINEHOST}" == "" ]; then
  echo WARNING: You should set the VIDISPINEHOST environment variable to the URL of the server that Vidispine is deployed at.
fi

cat index.template.html | sed "s/__DEPLOYMENTPATH__/${DEPLOYMENTPATH}/g; s/__VIDISPINEHOST__/${VIDISPINEHOST}/g" > index.html

nginx -g "daemon off;"
