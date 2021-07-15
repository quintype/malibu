CDN caching

How Quintype handles CDN-caching

- Whenever a collection/story/author is created or updated, the platform does cache/purging through CDN.
- when a collection/story/author is created, the request body tag gets affected, then the frontend gets updated with the latest data with the help of cache-keys.

How cache keys are created

1. In Quintype cache keys are generated in `Quintype-node-framework` (server/caching.js)
2. Format for home-page:

   `{page/${publisherId}/home-page}`.

   We concat the collection cache keys, story cache keys, section collection cache keys to the above-generated key. The front end gets updated after it sees the cache keys from the platform when the home collection gets updated and published.

   Note:

   - When a collection/story is created, the platform creates a set of cache keys.
   - We form the cache keys for nested collection by going from the top-level depth to the initial depth of the collections.
   - The values that we get for all the collections/stories on the respective pages are then comma-separated and passed to the Cache-Tag header.

   Eg:

   ```javascript
   < cache-tag: c/1166/87520, c/1166/96964, s/1166/5b10a46a, s/1166/185a3cb0, page/1166/home-page
   ```

3. Format for collection page:

   `{c/${publisherId}/${collection.id}}`

   Eg:

   ```javascript
   < cache-tag: c/1166/90576, s/1166/5b10a46a, s/1166/185a3cb0
   ```

   The front end gets updated after it sees the cache keys from the platform when the collection gets updated and published.

4. Format for story page:

   `{c/${publisherId}/${story.id.substr(0, 8)}}`

   Eg:

   ```javascript
   < cache-tag: s/1166/01166259, a/1166/930893
   ```

   The story page with the changed content gets updated after the front end sees the cache-keys from the platform after the story gets updated and published.

5. Format for author page:

   `{a/${publisherId}/${author.id}}`

   Eg:

   ```javascript
   < cache-tag: s/1166/5b10a46a, s/1166/185a3cb0
   ```

   The author page with the changed author page content (when the author publishes a new story) gets updated after the front end sees the cache-keys from the platform after the story from the author gets updated and published.

How Quintype set's the cache headers:

- If cache keys are present

  1. If the CDN provider is `Cloudflare` then the headers are set as below:

     ```javascript
     res.setHeader(
       "Cache-Control",
       `public,max-age=15,s-maxage=${sMaxAge},stale-while-revalidate=1000,stale-if-error=14400`
     );
     res.setHeader("Vary", "Accept-Encoding");
     res.setHeader("Cache-Tag", _(cacheKeys).uniq().join(","));
     res.setHeader("Surrogate-Key", _(cacheKeys).uniq().join(" "));
     ```

  2. If the cdn provider is `akamai` then the headers are set as below:

     ```javascript
     res.setHeader(
       "Edge-Control",
       `public,maxage=${sMaxAge},stale-while-revalidate=1000,stale-if-error=14400`
     );
     res.setHeader("Vary", "Accept-Encoding");
     res.setHeader("Edge-Cache-Tag", _(cacheKeys).uniq().join(","));
     res.setHeader("Surrogate-Key", _(cacheKeys).uniq().join(" "));
     ```

- If cache keys are present but is set to `"DO_NOT_CACHE"`

  1. If the cdn provider is `Cloudflare` then the headers are set as below:

     ```javascript
     res.setHeader("Cache-Control", "private,no-cache,no-store,max-age=0");
     res.setHeader("Vary", "Accept-Encoding");
     ```

  2. If the cdn provider is `akamai` then the headers are set as below:

     ```javascript
     res.setHeader("Edge-Control", "private,no-cache,no-store,max-age=0");
     res.setHeader("Vary", "Accept-Encoding");
     ```

- If cache keys are not present

  1. If the CDN provider is `Cloudflare` then the headers are set as below:

     ```javascript
     res.setHeader(
       "Cache-Control",
       "public,max-age=15,s-maxage=60,stale-while-revalidate=150,stale-if-error=3600"
     );
     res.setHeader("Vary", "Accept-Encoding");
     ```

  2. If the cdn provider is `akamai` then the headers are set as below:

     ```javascript
     res.setHeader(
       "Edge-Control",
       "public,maxage=60,stale-while-revalidate=150,stale-if-error=3600"
     );
     res.setHeader("Vary", "Accept-Encoding");
     ```

How Quintype handles toggle between different CDN providers

- For now, we have support for `Cloudflare` and `akamai`.
- The default CDN provider is set as `Cloudflare`.
- If your app is cloned from malibu then, in `malibu/app/server/app.js` pass `cdnProvider` with the required value to `isomorphicRoutes`(No need to pass if `Cloudflare is your CDN provider).

  Eg:

  ```javascript
  import { isomorphicRoutes } from "@quintype/framework/server/routes";

    isomorphicRoutes(app, {
    ...
    ...
    ...
    cdnProvider: "YOUR_CDN_PROVIDER_NAME",
    });
  ```

  Note: Contact Quintype before switching the CDN.
