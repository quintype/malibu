const quintypeBuildConfig = require("@quintype/build/config/quintype-build");

const loadableConfigObj = {
  loadableConfig: {
    entryFiles: {
      topbar: "./app/isomorphic/components/layouts/header",
      navbar: "./app/isomorphic/components/layouts/header/nav-bar",
      footer: "./app/isomorphic/components/layouts/footer"
    }
  }
};
const modifiedBuildConfig = { ...quintypeBuildConfig, ...loadableConfigObj };

module.exports = modifiedBuildConfig;
