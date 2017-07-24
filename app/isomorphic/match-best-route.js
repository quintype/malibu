const {matchPath} = require("react-router");

function matchBestRoute(path, routes) {
  // Sure there is some construct to do these two lines
  const matchedRoute = routes.find(route => matchPath(path, route));
  if(matchedRoute) {
    const actualMatch = matchPath(path, matchedRoute);
    return {
      pageType: matchedRoute.pageType,
      params: Object.assign({}, matchedRoute.params, actualMatch.params),
      match: actualMatch
    };
  }
}

exports.matchBestRoute = matchBestRoute;
