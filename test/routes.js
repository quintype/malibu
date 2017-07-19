var assert = require('assert');

const {matchBestRoute} = require("../app/isomorphic/routes");

describe('routes', function() {
  describe('matchBestRoute', function() {
    const routes = [
      {path: "/", pageType: "home-page", exact: true},

      {path: "/sect", pageType: "section-page", exact: true},
      {path: "/sect/sub-sect", pageType: "section-page", exact: true},

      {path: "/sect/:storySlug", pageType: "story-page", exact: true},
      {path: "/sect/*/:storySlug", pageType: "story-page", exact: true},
    ];

    it('matches the home page', function() {
      assert.equal("home-page", matchBestRoute("/", routes).pageType);
    });

    it('matches subsection-page', function() {
      assert.equal("section-page", matchBestRoute("/sect/sub-sect", routes).pageType);
    });

    it('matches story page', function() {
      const {pageType, match} = matchBestRoute("/sect/story", routes);
      assert.equal("story-page", pageType);
      assert.equal("story", match.params.storySlug);
    });

    it('matches story page with extra date info', function() {
      const {pageType, match} = matchBestRoute("/sect/2017/01/01/story", routes);
      assert.equal("story-page", pageType);
      assert.equal("story", match.params.storySlug);
    });

    it('returns undefined if there is no match', function() {
      assert(!matchBestRoute("/not-found", routes));
    })
  });
});
