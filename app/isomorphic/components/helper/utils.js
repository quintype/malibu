import { collectionToStories } from "@quintype/components";

export function replaceAllCollectionToStories(collection) {
  const items = (collection.items || []).flatMap(item => {
    if (item.type === "collection") {
      return collectionToStories(item);
    } else if (item.type === "story") {
      return item.story;
    }
    return item;
  });

  return items;
}
