---
title: Loading Fonts
parent: Malibu Tutorial
nav_order: 06
---

# {{page.title}}

*This tutorial was contributed by [Sai Charan](https://twitter.com/saiicharan) and [Tejas Dinkar](https://twitter.com/tdinkar)*

Fonts are a very important part of a site's branding. Loading fonts in the correct way is an important part of ensuring your site renders quickly.

Malibu comes pre-loaded with two fonts, primarily as an integration example. In this tutorial, we will remove these two fonts and replace them with a custom font, or a google font.

## Font Architecture

The method we use to load fonts follows two important characteristics
* Text is still visible, even if the font is loading. The fonts follow a *"Flash of Unstyled Text"* rather than a *"Flash of Invisible Text"*.
* The page should rerender exactly once after all fonts are loaded. This is as opposed to multiple rerenders as each font loads, which is slow.

In order to achieve the above goals, we use [FontFaceObserver](https://github.com/bramstein/fontfaceobserver) to load fonts in Malibu. This works as follows.
* We define all fonts as CSS variables. By default, they are set to the fallback font, and the variables change to the loaded fonts when the *"fonts-loaded"* class is set on the body.
* *FontFaceObserver* waits for all the fonts to be loaded, and then sets the *"fonts-loaded"* class on the body, causing the page to rerender.
* Font families are defined by google fonts or other font hosting, in the usual way.

Your CSS might look something like this
```css
:root {
  --title-font: sans-serif;
}

body.fonts-loaded {
  --title-font: Lato, sans-serif;
}

h1, h2, h3, h4, h5 {
  font-family: var(--title-font);
}
```

Don't worry about writing the above CSS by hand. We'll auto generate that for you.


## Listing the fonts used

The list of fonts used by the application can be found in *app/server/font.js*.

In the below snippet, we can see that two fonts are loaded, *Lato* and *Roboto*, with two weights each.

```javascript
const FONTS = Object.freeze({
  "title-font": { value: "Lato, sans-serif", fallback: "sans-serif" },
  "content-font": { value: "Roboto, sans-serif", fallback: "sans-serif" }
});

export default {
  preloadFonts: [
    { fontName: "Lato", data: { weight: 400 } },
    { fontName: "Lato", data: { weight: 700 } },
    { fontName: "Roboto", data: { weight: 400 } },
    { fontName: "Roboto", data: { weight: 700 } }
  ],
  fontSettings: FONTS
};
```

These four font-weight combinations (the *preloadFonts* key) will be preloaded by *FontFaceObserver* in the next section.

We will also be using the fonts defined in the *fontSettings* to define two font variables: *--title-font* and *--content-font*.

## Ensuring the layout loads the fonts

Please ensure that *layout.ejs* contains the following snippets. Though these are present in the default malibu template, they tend to get erased when building the layout.

The first snippet defines all the font related CSS variables. Do note this snippet was updated in Oct 2019.

```html
<style>
  :root { <%_ Object.entries(fontFace.fontSettings).map(([cssVar, {fallback}]) => { _%> --<%= cssVar %>: <%- fallback _%>;<%_ }) _%> }
  body.fonts-loaded { <%_ Object.entries(fontFace.fontSettings).map(([cssVar, {value}]) => { _%> --<%= cssVar %>: <%- value _%>;<%_ }) _%> }
</style>
```

The next snippet embeds *FontFaceObserver* in the page, and loads all the fonts (and finally adds the *"fonts-loaded"* class to body).

```html
<script type="text/javascript">
  <%- fontJsContent %>
  window.loadFonts(<%- JSON.stringify(fontFace.preloadFonts) %>, 'fonts-loaded');
</script>
```

## Adding the font-family CSS

The final step required is to ensure that all CSS for the fonts we want to load are present in the CSS. By default, you should see something that looks like this in your *layout.ejs*. In the below snippet, we see CSS required for loading Lato and Roboto.

```html
<style>
  @font-face{font-display:swap;font-family:Lato;font-style:normal;font-weight:400;src:local('Lato Regular'),local('Lato-Regular'),url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wWA.woff) format('woff')}@font-face{font-display:swap;font-family:Lato;font-style:normal;font-weight:700;src:local('Lato Bold'),local('Lato-Bold'),url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPHw.woff) format('woff')}@font-face{font-display:swap;font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff) format('woff')}@font-face{font-display:swap;font-family:Roboto;font-style:normal;font-weight:700;src:local('Roboto Bold'),local('Roboto-Bold'),url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc-.woff) format('woff')}
</style>
```

How this CSS is generated depends on where this font is hosted.

### Self Hosted Font

For most self hosted fonts, you will just need to replace the CSS for the *@font-face* with hand written CSS. This might look like the below snippet.

```html
<style>
  @font-face {
    font-family: "Foo";
    font-display: swap;
    font-weight: 400;
    src: url("/path/to/foo.woff") format('woff');
  }
</style>
```

Remember to add the new font *Foo* to *app/server/font.js*. Both to the *preloadFonts* list, as well as to the *fontSettings* list as a new variable.

### Using Google Fonts

Google Fonts is a repository of popular fonts. While google fonts recommends that you link to their styesheet, it is possible to obtain the CSS to their font files to be embedded in the CSS.

Let's pull the css for the 'Montserrat' font using curl. We choose a user agent that supports *woff* in order to get a font that the majority of browsers support. We can use a different user agent to get *woff2* or *ttf*.

```shell
curl -vH "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0" 'https://fonts.googleapis.com/css?family=Montserrat:400,700' | curl -X POST -s --data-urlencode 'input@-' https://cssminifier.com/raw
```

The above command should output the following

```css
@font-face{font-family:Montserrat;font-style:normal;font-weight:400;src:local('Montserrat Regular'),local('Montserrat-Regular'),url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WlhzQ.woff) format('woff')}@font-face{font-family:Montserrat;font-style:normal;font-weight:700;src:local('Montserrat Bold'),local('Montserrat-Bold'),url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD-A.woff) format('woff')}
```

We can now put this into our *layout.ejs*.

Remember to add the new font *Montserrat* to *app/server/font.js*. Both to the *preloadFonts* list, as well as to the *fontSettings* list as a new variable.

The google fonts API supports ways to add multiple fonts into a single curl command, such as the following: `https://fonts.googleapis.com/css?family=Lato:400,700|Roboto:400,700|Montserrat:400,700`

## Wrapping Up

Now that you have an understanding of how font loading works, it should be possible to add as many fonts as is needed. Keep in mind that limiting to as few fonts as possible will help reduce the weight of your page.

You may now jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
