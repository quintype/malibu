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
