---
title: Content Security Policy
parent: Malibu Tutorial
nav_order: 31
nav_exclude: true
---

# {{page.title}}

_This tutorial was contributed by [Shraddha Kesari](https://www.linkedin.com/in/shraddha-k-3a3548161/)_

The Content Security Policy (CSP) header is a vital component in ensuring the security of a website. It is a set of instructions that a website sends to a user's browser, specifying which types of content can be loaded and executed on that site.

Adding a CSP header to a website is crucial because it helps protect against certain types of attacks, such as Cross-Site Scripting (XSS) and data injection attacks. These attacks can be used to steal sensitive information, deface the website, or distribute malware. By defining a CSP, website owners can specify trusted sources for content, effectively preventing malicious scripts or unauthorized code from executing.

For media publishing sites, implementing CSP brings several benefits. Firstly, it helps mitigate the risk of XSS attacks that can target user-generated content, such as comments or uploaded files. Additionally, CSP allows media publishers to control the sources from which images, videos, and other media assets are loaded, reducing the chances of malicious or untrusted content being displayed to users.

## How is it implemented ? 

This is a HTTP response header. It is passed by [Quintype's framework library](https://developers.quintype.com/quintype-node-framework/) to Malibu with default values. 

```js
...
...
res.setHeader(
      "Content-Security-Policy",
      `default-src data: 'unsafe-inline' 'unsafe-eval' https: http:;` +
        `script-src data: 'unsafe-inline' 'unsafe-eval' https: http: blob:;` +
        `style-src data: 'unsafe-inline' https: http: blob:;` +
        `img-src data: https: http: blob:;` +
        `font-src data: https: http:;` +
        `connect-src https: wss: ws: http: blob:;` +
        `media-src https: blob: http:;` +
        `object-src https: http:;` +
        `child-src https: data: blob: http:;` +
        `form-action https: http:;` +
        `block-all-mixed-content;`
    );
...
...

```


## How to override the default HTTP header ?

For overriding the header, We can modify the [render layout function](https://github.com/quintype/malibu/blob/master/app/server/handlers/render-layout.js#L41) inside the `render-layout.js` [file](https://github.com/quintype/malibu/blob/master/app/server/handlers/render-layout.js) from the app level itself. Here is an example of how the code can be added:

```js
...
...
export async function renderLayout(res, params) {
    res.setHeader(
    "Content-Security-Policy",
    `default-src data: 'unsafe-inline' 'unsafe-eval' https: http:;` +
    `script-src data: 'unsafe-inline' 'unsafe-eval' https: http: blob:;` +
    `style-src data: 'unsafe-inline' https: http: blob:;` +
    `img-src data: https: http: blob:;` +
    `font-src data: https: http:;` +
    `connect-src https: wss: ws: http: blob:;` +
    `media-src https: blob: http:;` +
    `object-src https: http:;` +
    `child-src https: data: blob: http:;` +
    `form-action https: http:;` +
    `block-all-mixed-content;` +
    `X-Frame-Options: ALLOW-FROM https://example.com/;`
    );

}
...
...

```

By inserting the above code snippet in the `render-layout.js` [file](https://github.com/quintype/malibu/blob/master/app/server/handlers/render-layout.js), the required headers will be added to the response, ensuring the specified content security policy and X-Frame-Options. You can check out [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) for more information. 