const url = `https://${process.env.LH_USER}:${process.env.LH_PASSWORD}@lighthouse-ci.staging.quinpress.com/`;
const collectUrls = [
  "https://malibu-qa-web.qtstage.io",
  "https://malibu-perf.quintype.io/?uptime",
  "https://malibu-web.qtstage.io",
  "https://malibu-web.quintype.io"
];
const lhciConfig = {
  ci: {
    collect: {
      url: collectUrls,
      settings: {
        emulatedFormFactor: "mobile"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }]
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
