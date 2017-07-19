# malibu

This will probably get renamed to toddy when it gets feature parity (soon)

## Architecture

### Routing

This app aims to be a Progressive Web App. Instead of guessing routes, it looks at the config to dynamically generate the required routes. For example, with sections /politics and /politics/karnataka, it will generate the following routes: [/politics, /politics/karnataka, /politics/:storySlug, /politics/*/:storySlug].

These routes are exposed via the `generateRoutes` function, and matched using the `matchBestRoute` function. This is embedded in three places:

* Server, for server side rendering
* The Service Worker, for deciding which pages are part of the PWA
* The Client js,

### References

* This architecture is heavily influenced by the method described in this [video](https://www.youtube.com/watch?v=atUdVSuNRjA)
* Code for the available video is available [here](https://github.com/gja/pwa-clojure)
* I know there is a good tutorial video I've seen. But I can't remember where.

## Running in development mode

```shell
$ brew install yarn       # install yarn, FB's NPM replacement
$ yarn                    # install all libraries
$ npm run asset-server    # start webkit hot loading server on port 8080
$ npm start               # start the actual web server
```

## Tasks Pending

- [ ] Minify JS
- [ ] Add SASS support
- [ ] Add Components
- [ ] Load Data
- [X] Isomorphic Rendering

