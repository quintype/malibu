import templates from "./collection-templates";

export function getCollectionTemplate(designTemplate) {
  return templates[designTemplate] || templates.defaultTemplate;
}
