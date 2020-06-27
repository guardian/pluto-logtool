# Vidispine Job Tool

# Requirements

- Docker
- A World Wide Web browser

# Functions

1. View pages of Vidispine jobs.
2. View information on an individual Vidispine job.

# Running from built image

This project builds in Gitlab CI and publishes fully built Docker images to guardianmultimedia/pluto-logtool.
Find the latest build of guardianmultimedia/pluto-logtool via Docker Hub, or head to the CI / CD page in Gitlab
to identify the build number that you want to test.

Once you have this, you can fire it up with:
```bash
docker run --rm -p 8000:80 guardianmultimedia/pluto-logtool:{build-number}
```

Then you will be able to access it in your web browser at `http://localhost:8000`.

# Vidispine

The app expects to be able to connect out to a running Vidispine Server instance. In the current initial, scratch-pad
version this address is hard-coded to http://localhost:8080 but it will be replaced by a publically-available json
config file in the future.  Default admin credentials are currently used, again these will be replaced with bearer-token
auth during development.

You can set up a running Vidispine Server stack with evaluation licensing by going to https://github.com/fredex42/vs-containers
and downloading the repo there.

Fire it up by running `docker-compose up` in the root of the checkout.  This will start up a basic VS stack including
database, index, message queue and the application server.

More information on the Vidispine API can be found at https://apidoc.vidispine.com.

The app is frontend-only, so the container it's running in does not need access. The localhost:8080 address is resolved
relative to the browser _on the host machine_ you are running the app in.

# Building and editing the source

To build the source, you'll need node.js installed, at least version 12.  You can get this by heading to https://nodejs.org/en/download/,
but we usually find it easier to use NVM the Node Version Manager which can be found at https://github.com/nvm-sh/nvm.
We use the yarn package manager rather than npm, more information can be found at https://yarnpkg.com/lang/en/docs/install/.
However, the instructions below should work with npm instead of yarn (though the run-script syntax 
is `yarn {scriptname}` vs `npm run {scriptname}`)

You will also need Docker installed, Docker CE is fine, you can find that at https://docs.docker.com/get-docker/.
If you're on Windows, you'll need the ability to build Linux Docker containers; if you are on Mac or Linux this is not a worry.
```bash
yarn install
yarn test #run the automated tests to ensure you have everything set up and that the code _should_ work
yarn dev
```

The `yarn dev` command does not exit, it sits watching the files and rebuilds build/bundle.js.

Once that is running:
```bash
cd build/
docker build . -t local/pluto-logtool:DEV
docker run --rm -p 8000:80 -v $PWD/bundle.js:/usr/share/nginx/html/bundle.js local/pluto-logtool:DEV
```

You will then be able to access your built app in your browser at `http://localhost:8000`.  Make sure you turn the
cache off so that changes in bundle.js caused by your source edits are loaded in every time you reload the page.

# Installation and Set Up

1. Find the Docker image name in the CI section of GitLab, for example 'guardianmultimedia/pluto-logtool:23'.
2. Run it like this: docker run --rm -p 8000:80 guardianmultimedia/pluto-logtool:23
3. At the moment the Vidispine host, username, and password are hardcoded into VidispineJobTool.jsx and JobPage.jsx. If the defaults are not suitable you will need to change these with an editor and save them.
4. Access your Web server with your Web browser at http://localhost:8000. If everything is working you should see the job list page.

# Notes

Please note this software is early in development and may not work as expected.
