# malibu

This will probably get renamed to toddy when it gets feature parity (soon)

## Architecture

### Isomorphic flow

#### Server Side Flow

1. If no 'regular' route is caught, it goes to the isomorphic handler
2. The current route is matched via matchBestRoute (see routing)
3. If a route is matched, we load data via the `loadData(pageType)` function.
4. A redux store is created based on the loaded data
5. We render the `IsomorphicComponent`, which determines which page to render based on `pageType`, from the store

#### Client Side Flow

1. The `startApp()` function starts as soon as the JS loads (async)
2. The `startApp()` function calls `/routes.json?route=/current/path`.
3. The server looks at `/current/path`, matching it against its known routes, and sends back the `pageType`, and data from `loadData(pageType)`
4. A redux store is created based on the loaded data
5. We render the `IsomorphicComponent`, which determines which page to render based on `pageType`, from the store

#### Links between pages

1. The client is loaded, and you click on a link, there should be no need to reload the page
2. Instead, the link should make a call to `/routes.json?route=/current/path`, and continue from step 2 of client side app

#### Service Worker

1. To Do

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
* Great [intro to pwa](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)

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
