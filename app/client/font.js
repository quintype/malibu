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
