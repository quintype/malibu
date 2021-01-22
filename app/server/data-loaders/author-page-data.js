import { Author } from "@quintype/framework/server/api-client";
import get from "lodash/get";

import { storyFields } from "../../isomorphic/constants";

export function loadAuthorPageData(client, authorSlug, config) {
  let authorDetails = {};
  const params = { author: authorSlug, sort: "published-at", fields: storyFields, limit: 20 };

  return Author.getAuthor(client, authorSlug)
    .then(authorData => {
      authorDetails = authorData || {
        cacheKeys: () => {}
      };
      const authorId = get(authorDetails, ["author", "id"]);
      return Author.getAuthorCollection(client, authorId, params);
    })
    .then(storiesData => ({
      author: authorDetails.author,
      stories: storiesData.items,
      cacheKeys: authorDetails.cacheKeys(config["publisher-id"])
    }));
}
