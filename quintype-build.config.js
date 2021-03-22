const quintypeBuildConfig = require("@quintype/build/config/quintype-build");

const loadableConfigObj = {
  loadableConfig: {
    entryFiles: {
      topbarCriticalCss: "./app/isomorphic/components/layouts/header",
      navbarCriticalCss: "./app/isomorphic/components/layouts/header/nav-bar",
      footerCriticalCss: "./app/isomorphic/components/layouts/footer"
    }
  }
};
const modifiedBuildConfig = { ...quintypeBuildConfig, ...loadableConfigObj };

module.exports = modifiedBuildConfig;
