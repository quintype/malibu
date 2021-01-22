/* eslint-disable no-unused-vars */
import { getStoryLimits } from "../../isomorphic/components/get-collection-template";
import { loadCommonCollectionData } from "./load-common-collection-data";

export async function loadHomePageData(client, config, slug) {
  const params = {
    client,
    config,
    slug,
    collectionParams: { "item-type": "collection" },
    depthParams: { depth: 1, storyLimits: getStoryLimits() }
  };
  return await loadCommonCollectionData(params);
}
