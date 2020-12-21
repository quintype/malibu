const url = `https://${process.env.LH_USER}:${process.env.LH_PASSWORD}@lighthouse-ci.staging.quinpress.com/`;
const lhciConfig = {
  ci: {
    collect: {
      url: JSON.parse(process.env.LHCI_SITES)
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 1}],
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
