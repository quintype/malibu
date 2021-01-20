import { Author } from "@quintype/framework/server/api-client";
import get from "lodash/get";

export function loadAuthorPageData(client, authorSlug, config) {
  let authorDetails = {};
  const storyFields =
    "alternative,slug,metadata,story-template,story-content-id,id,headline,hero-image-s3-key,hero-image-metadata,sections,tags,author-name,author-id,authors,created-at,first-published-at,published-at,last-published-at,url";
  const params = { author: authorSlug, sort: "published-at", fields: storyFields, limit: 100 };

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
