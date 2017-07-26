# malibu

This will probably get renamed to toddy when it gets feature parity (soon)

## toddy-libs

IMPORTANT: This app implements very little functionality in the app itself. The majority of functionality is built into the [toddy-libs](https://github.com/quintype/quintype-toddy-libs) repository.

## Running in development mode

```shell
$ brew install yarn       # install yarn, FB's NPM replacement
$ yarn                    # install all libraries
$ npm run asset-server    # start webkit hot loading server on port 8080. Does live push
$ npm start               # start the actual web server. Restart this if server side code changes
```

### Working on the service worker

Unfortunately, the service-worker cannot be run with the asset-server. Instead, run

```shell
$ vi config/publisher.yml      # remove the asset_host from publisher.yml
$ npm run compile && npm start # restart this if you change the service worker
```

## Tasks Pending

- [X] Minify JS
- [X] Add SASS support
- [X] Add Components
- [X] Load Data
- [X] Isomorphic Rendering
- [ ] Get CORS working with ServiceWorker (possibly fix black knight)
- [ ] Get Preview to work
- [X] Get breaking news to work
- [X] Actually build a simple UI
- [ ] Forcibly update the app when updates
- [ ] Actual Benchmarks
- [X] Move all actual code into a library so people can't screw around
- [ ] Not Found Handler
- [ ] Valid Route, but data not found
- [ ] SEO Stuff
- [ ] Analytics stuff
