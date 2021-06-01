const url = `https://${process.env.LH_USER}:${process.env.LH_PASSWORD}@lighthouse-ci.staging.quinpress.com/`;
const lhciBenchmark = JSON.parse(process.env.LHCI_SITES)[0].includes("perf") ? 0.9 : 0.95;
const lhciConfig = {
  ci: {
    collect: {
      numberOfRuns: 5,
      additive: false, // Skips clearing of previous collect data
      headful: false, // Run with a headful Chrome
      url: JSON.parse(process.env.LHCI_SITES), // A URL to run Lighthouse on
      settings: {
        emulatedFormFactor: "mobile",
        throttlingMethod: "devtools"
      }
    },
    assert: {
      assertions: {
        "unused-javascript": "warn",
        "heading-order": "off", // Heading elements are not in a sequentially-descending order
        "is-crawlable": "warn",
        "tap-targets": "warn", // Tap targets are the areas of a web page that users on touch devices can interact with. Buttons, links, and form elements all have tap targets.
        "uses-responsive-images": "warn",
        "errors-in-console": "warn", // Browser errors were logged to the console
        "uses-text-compression": "warn",
        "uses-optimized-images": "warn",
        "no-unload-listeners": "off",
        "no-document-write": "warn", // Avoid `document.write()`
        "categories:performance": ["error", { minScore: lhciBenchmark }],
        "image-alt": "warn",
        "link-name": "warn",
        "link-text": "warn"
      }
    },
    upload: {
      target: "lhci",
      serverBaseUrl: url,
      token: `${process.env.LH_BUILD_TOKEN}`
    }
  }
};

module.exports = lhciConfig;
