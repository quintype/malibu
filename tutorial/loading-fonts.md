---
title: Loading a Custom font
parent: Malibu Tutorial
nav_order: 07
---

Each publisher will have their own set of fonts, since Malibu is a common framework for building apps, we might have to add custom fonts based on the publisher's requirement.

This tutorial, will teach you how to load a custom font of your own choice.
Before we load a custom font, lets see how fonts are being added currently in malibu.

In Malibu, we do this in two places, in the `Server` and in the `Client`.

### The Server

The specific fonts that are to be loaded are seen in `app/server/font.js`.

```javascript
const DEFAULT_FONT_CONFIG = Object.freeze({
  "title-font": "Lato, sans-serif",
  "content-font": "Roboto, sans-serif"
});

export default {
  preloadFonts: [
    { fontName: "Lato", data: { weight: 400 } },
    { fontName: "Lato", data: { weight: 700 } },
    { fontName: "Roboto", data: { weight: 400 } },
    { fontName: "Roboto", data: { weight: 700 } }
  ],
  fontSettings: Object.assign({}, DEFAULT_FONT_CONFIG, {
    "title-font": "Lato, sans-serif",
    "content-font": "Roboto, sans-serif"
  })
};
```

In the above case, we are preloading a set of fonts along with their respective weights in the server. These are the fonts that we use throughout the app and assign it to variables that can be assigned across CSS `font-family`s. The above preloadedFonts are then fed to the `loadFonts` in `app/client/font.js` for further loading.

### The Client

 In the client side, we load fonts using [FontFaceObserver](https://github.com/bramstein/fontfaceobserver). Basically, `FontFaceObserver` takes in a `font-family` and returns a new Promise that resolves when the font is loaded and rejected when the font fails to load.

In malibu, we do this in the `app/client/font.js`.

```javascript
import FontFaceObserver from "fontfaceobserver";

function loadFonts(fontFamilies, classToAddToBody) {
  const loadFontFamilies = fontFamilies.map(({ fontName, data }) => new FontFaceObserver(fontName, data).load());

  Promise.all(loadFontFamilies)
    .then(() => {
      console.log(`font's loaded`);
      document.body.classList.add(classToAddToBody);
    })
    .catch(err => {
      console.warn(`Some critical font are not available: ${err} `);
    });
}

global.loadFonts = loadFonts;
```

The above `loadFonts` function takes `fontFamilies` argument, runs it through `FontFaceObserver` and adds a class(.fonts-loaded) to the `<body>` when the fonts are loaded successfully. This function is called in `views/pages/layout.ejs` which we will see in a bit. Once the class is added, it acts as an indication that the font has been successfully loaded and the rendering of the font happens in the webpage. This way the fonts are loaded in a more performant way.

### Layout.ejs

The main loading of fonts happen in the template `views/pages/layout.ejs`.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    ...
    ...
    <style>
      @font-face{font-display:swap;font-family:Lato;font-style:normal;font-weight:400;src:local('Lato Regular'),local('Lato-Regular'),url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wWA.woff) format('woff')}
      ....
      ....
    </style>
    <style>
      body.fonts-loaded { <%_ Object.entries(fontFace.fontSettings).map(([cssVar, value]) => { _%> --<%= cssVar %>: <%- value _%>;<%_ }) _%> }
    </style>
  </head>
  <body>
    <div class="container">
      ...
      ...
    <script type="text/javascript">
      <%- fontJsContent %>
      window.loadFonts(<%- JSON.stringify(fontFace.preloadFonts) %>, 'fonts-loaded');
    </script>
    ...
    ...
    ...
   </body>
</html>
```

From the above code snippet, First we load the `fontJsContent`  and call the `window.loadFonts` with the data present `app/server/font.js`. In our case, it will be a font with different weights. 

```html
    <script type="text/javascript">
      <%- fontJsContent %>
      window.loadFonts(<%- JSON.stringify(fontFace.preloadFonts) %>, 'fonts-loaded');
    </script>
```

The respective fonts are loaded by `@font-face`, where we mention the source of the font to load.

```html
    <style>
      @font-face{font-display:swap;font-family:Lato;font-style:normal;font-weight:400;src:local('Lato Regular'),local('Lato-Regular'),url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wWA.woff) format('woff')}
      ....
      ....
    </style>
```

The `window.loadFonts` on successful loading of the font, adds a class `fonts-loaded` to the `body` tag. Once, the class it added the respective fonts mentioned in the `body.fonts-loaded` will get added and hence the respective font gets loaded for the web page.

```html
    <style>
      body.fonts-loaded { <%_ Object.entries(fontFace.fontSettings).map(([cssVar, value]) => { _%> --<%= cssVar %>: <%- value _%>;<%_ }) _%> }
    </style>
```

Phew! That was too much of theory. Let's try adding a custom font with an example.

## Example

Let's add a custom font called 'foo.ttf'. Below are the steps to follow to load a custom font `foo.ttf` to malibu app.

* We need to add the font file `foo.ttf`, in `public` folder.

* In the existing `app/server.font.js` file, we add the `Foo` font and make it as the `title-font`. This can be done as follows.

```javascript
const DEFAULT_FONT_CONFIG = Object.freeze({
  "title-font": "Foo, sans-serif",
  "content-font": "Roboto, sans-serif"
});

export default {
  preloadFonts: [
    { fontName: "Foo", data: { weight: 400 } },
    { fontName: "Foo", data: { weight: 700 } },
    { fontName: "Roboto", data: { weight: 400 } },
    { fontName: "Roboto", data: { weight: 700 } }
  ],
  fontSettings: Object.assign({}, DEFAULT_FONT_CONFIG, {
    "title-font": "Foo, sans-serif",
    "content-font": "Roboto, sans-serif"
  })
};
```

* Since, `app/client/font.js` has a generic `loadFonts` method, which takes in a font family and adds a class to the body on successfull loading of the font, we need not make any changes to this file.

* In the main template `views/pages/layout.ejs`, all we need to do is to load our font to the app using `@font-face`.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    ...
    ...
    <style>
      @font-face {
        font-family: "Foo";
        font-display: swap;
        font-weight: 400;
        src: url("/foo.ttf") format('truetype');
      }
      ....
      ....
    </style>
  </head>
</html>
```

Hooray, now we loaded a custom font into the malibu app.

