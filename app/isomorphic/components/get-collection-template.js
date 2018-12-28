import templates from "./collection-templates";

export function getCollectionTemplate(designTemplate, index) {
  return templates[designTemplate] || templates.defaultTemplate;
}
