const {matchPath} = require("react-router");

function matchBestRoute(path, routes) {
  // Sure there is some construct to do these two lines
  const match = routes.find(route => matchPath(path, route));
  if(match) {
    return {
      pageType: match.pageType,
      routeParams: match.params,
      match: matchPath(path, match)
    };
  }
}

exports.matchBestRoute = matchBestRoute;
