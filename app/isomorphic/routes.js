const {matchPath} = require("react-router");

function generateRoutes(config) {
  return [
    {path: "/", pageType: "home-page", exact: true},

    {path: "/sect", pageType: "section-page", exact: true},
    {path: "/sect/sub-sect", pageType: "section-page", exact: true},

    {path: "/sect/:storySlug", pageType: "story-page", exact: true},
    {path: "/sect/*/:storySlug", pageType: "story-page", exact: true},
  ];
}

function matchBestRoute(path, routes) {
  // Sure there is some construct to do these two lines
  const match = routes.find(route => matchPath(path, route));
  if(match) {
    return {
      pageType: match.pageType,
      match: matchPath(path, match)
    };
  }
}

exports.generateRoutes = generateRoutes;
exports.matchBestRoute = matchBestRoute;
