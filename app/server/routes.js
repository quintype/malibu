// All routes defined over here
const STATIC_ROUTES = [
  {path: "/", pageType: "home-page", exact: true},
  {path: "/topic/:topicSlug", pageType: "tag-page", exact: true}
];

function generateRoutes(config) {
  return STATIC_ROUTES.concat(sectionPageRoutes(config), storyPageRoutes(config));
}

exports.generateRoutes = generateRoutes;




// The below code dynamically generates routes based on the config
// A section sect will generate three urls:
// /sect, /sect/:storySlug, /sect/*/:storySlug
const _ = require("lodash");

function sectionPageRoutes(config) {
  const sectionsById = _(config.sections).reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  return _(config.sections)
    .map((section) => sectionPageRoute(section, sectionsById))
    .value();
}

function sectionPageRoute(section, sectionsById) {
  var slug = section.slug;

  var currentSection = section;
  var depth = 0;
  while (currentSection["parent-id"] && depth++ < 5) {
    currentSection = sectionsById[currentSection["parent-id"]] || {slug: 'invalid'};
    slug = `${currentSection.slug}/${slug}`;
  }

  return {
    path: `/${slug}`,
    pageType: "section-page",
    exact: true,
    params: {
      sectionId: section.id
    }
  };
}

function storyPageRoutes(config) {
  return _(config.sections)
    .filter((section) => !section["parent-id"])
    .flatMap((section) => [storyPageRoute(`/${section.slug}/:storySlug`), storyPageRoute(`/${section.slug}/*/:storySlug`)])
    .value();
}

function storyPageRoute(path) {
  return {
    pageType: 'story-page',
    exact: true,
    path: path
  }
}
