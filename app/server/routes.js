const _ = require("lodash");

const STATIC_ROUTES = [
  {path: "/", pageType: "home-page", exact: true},
  {path: "/topic/:topicSlug", pageType: "tag-page", exact: true}
];

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
      section: section
    }
  };
}

function storyPageRoute(path) {
  return {
    pageType: 'story-page',
    exact: true,
    path: path
  }
}

function generateRoutes(config) {
  const sectionsById = _(config.sections).reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  const sectionPageRoutes = _(config.sections)
    .map((section) => sectionPageRoute(section, sectionsById))
    .value()

  const storyPageRoutes = _(config.sections)
    .filter((section) => !section["parent-id"])
    .flatMap((section) => [storyPageRoute(`/${section.slug}/:storySlug`), storyPageRoute(`/${section.slug}/*/:storySlug`)])
    .value();

  return STATIC_ROUTES.concat(sectionPageRoutes, storyPageRoutes);
}

exports.generateRoutes = generateRoutes;
