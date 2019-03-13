# malibu

This is a node sample application, build with the quintype node framework.

## toddy-libs

IMPORTANT: This app implements very little functionality in the app itself. The majority of functionality is built into the [toddy-libs](https://github.com/quintype/quintype-node-framework) repository.

#### Running with supervisord (local)

```shell
$ brew install supervisord
$ ./run
```

### Working on the service worker

Unfortunately, the service-worker cannot be run with the asset-server. Thus, the service worker is disabled in development mode. To work on the service worker, run

```shell
$ vi app/client/app.js         # remove the check for process.env.NODE_ENV == 'production'
$ vi config/publisher.yml      # remove the asset_host from publisher.yml
$ npm run compile && npm start # restart this if you change the service worker
```

### Merging malibu back to your app

```shell
$ git pull git@github.com:quintype/malibu.git master
# Ignore Changes to (say) app/isomorphic/components
$ git checkout --ours app/isomorphic/components
$ git add app/isomorphic/components
```

## Running on Windows

Here are some considerations while running on windows
* Please install docker (Docker for Desktop on Windows Enterprise / Professional, and Docker Toolbox on Windows Home)
* The app is to be run as follows: `./dev-docker/start`
* In case localhost:3000 shows a connection refused, you can forward ports to the `docker-machine` as follows `./dev-docker/port-forward`. This should only be needed on Windows home
* Windows uses nodemon and webpack polling to detect updates. This eats CPU
* You can use `./dev-docker/force-reload` to force the web server and webpack to reload
