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
    "title-font": { value: "Lato, sans-serif", fallback: "sans-serif" },
    "content-font": { value: "Roboto, sans-serif", fallback: "sans-serif" }
  })
};
