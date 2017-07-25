const {generateStoryPageRoutes, generateSectionPageRoutes} = require("quintype-toddy-libs/server/generate-routes");

const STATIC_ROUTES = [
  {path: "/", pageType: "home-page", exact: true},
  {path: "/topic/:topicSlug", pageType: "tag-page", exact: true}
];

function generateRoutes(config) {
  return STATIC_ROUTES.concat(generateSectionPageRoutes(config), generateStoryPageRoutes(config));
}

exports.generateRoutes = generateRoutes;
