const url = `https://${process.env.LH_USER}:${process.env.LH_PASSWORD}@lighthouse-ci.staging.quinpress.com/`;
const lhciConfig = {
  ci: {
    collect: {
      url: JSON.parse(process.env.LHCI_SITES),
      settings: {
        emulatedFormFactor: "mobile"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.6 }]
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
