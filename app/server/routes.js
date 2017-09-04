const {generateStoryPageRoutes, generateSectionPageRoutes} = require("quintype-toddy-libs/server/generate-routes");

const STATIC_ROUTES = [
  {path: "/", pageType: "home-page", exact: true},
  {path: "/preview/story", pageType: "story-preview-page", exact: true},
  {path: "/topic/:tagSlug", pageType: "tag-page", exact: true, skipPWA: true},
  {path: "/search/:searchQuery", pageType: "search-page", exact: true, skipPWA: true},
];

function generateRoutes(config) {
  return STATIC_ROUTES.concat(generateSectionPageRoutes(config), generateStoryPageRoutes(config));
}

exports.generateRoutes = generateRoutes;
