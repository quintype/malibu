import { loadCommonCollectionData } from "./load-common-collection-data";

export async function loadCollectionPageData(client, collectionSlug, config) {
  const params = {
    client,
    config,
    slug: collectionSlug,
    collectionParams: { limit: 20 },
    depthParams: { depth: 2 }
  };
  return await loadCommonCollectionData(params);
}
