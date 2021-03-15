const quintypeBuildConfig = require("@quintype/build/config/quintype-build");

const loadableConfigObj = {
  loadableConfig: {
    entryFiles: {
      topbarCriticalCss: "./app/isomorphic/components/header",
      navbarCriticalCss: "./app/isomorphic/components/header/nav-bar"
    }
  }
};
const modifiedBuildConfig = { ...quintypeBuildConfig, ...loadableConfigObj };

module.exports = modifiedBuildConfig;
