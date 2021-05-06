import templates from "./collection-templates";

export function getCollectionTemplate(designTemplate, index) {
  return templates[designTemplate] || templates.defaultTemplate;
}

const storyLimits = Object.entries(templates).reduce(
  (acc, [key, value]) => Object.assign(acc, { [key]: value.storyLimit }),
  {}
);

export function getStoryLimits() {
  return storyLimits;
}

const collectionLimits = Object.entries(templates).reduce(
  (acc, [key, value]) => Object.assign(acc, { [key]: value.nestedCollectionLimit }),
  {}
);

export function getNestedCollectionLimit() {
  return collectionLimits;
}
