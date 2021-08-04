export const PAGE_TYPE = Object.freeze({
  HOME_PAGE: "home-page",
  SECTION_PAGE: "section-page",
  COLLECTION_PAGE: "collection-page",
  TAG_PAGE: "tag-page",
  SEARCH_PAGE: "search-page",
  STORY_PAGE: "story-page",
  CATALOG_PAGE: "catalog-page",
  STORY_PUBLIC_PREVIEW_PAGE: "story-public-preview-page",
  STORY_PREVIEW: "story-preview",
  HOME_PREVIEW: "home-preview",
  STATIC_PAGE: "static-page",
  FORM_PAGE: "form-page",
  AUTHOR_PAGE: "author-page"
});
export const TAG_PAGE_URL_PREFIX = "/topic/";
export const storyFields =
  "headline,subheadline,sections,author-name,authors,hero-image-metadata,hero-image-s3-key,slug,id";
export const WHITELIST_DATA_CONFIG = pageType => {
  switch (pageType) {
    case "config":
      return ["cdn-image"];

    case PAGE_TYPE.HOME_PAGE:
    case PAGE_TYPE.SECTION_PAGE:
    case PAGE_TYPE.COLLECTION_PAGE:
      return {
        collection: ["slug", "name", "summary", "total-count", "items", "metadata"],
        navigationMenu: [
          "menu-group-slug",
          "title",
          "item-type",
          "section-slug",
          "tag-slug",
          "url",
          "children",
          "completeUrl",
          "isExternalLink",
          "section-name"
        ],
        section: "all"
      };

    case PAGE_TYPE.STORY_PAGE:
      return {
        relatedStories: "all",
        story: [
          "updated-at",
          "seo",
          "author-name",
          "tags",
          "headline",
          "storyline-id",
          "story-content-id",
          "slug",
          "last-published-at",
          "subheadline",
          "alternative",
          "sections",
          "story-audio",
          "read-time",
          "access-level-value",
          "content-created-at",
          "custom-slug",
          "publisher-id",
          "hero-image-metadata",
          "comments",
          "entities",
          "published-at",
          "is-live-blog",
          "storyline-title",
          "summary",
          "external-id",
          "canonical-url",
          "is-amp-supported",
          "autotags",
          "linked-entities",
          "status",
          "hero-image-attribution",
          "bullet-type",
          "id",
          "hero-image-s3-key",
          "cards",
          "url",
          "story-version-id",
          "content-type",
          "content-updated-at",
          "author-id",
          "owner-id",
          "linked-stories",
          "linked-story-ids",
          "access",
          "first-published-at",
          "hero-image-caption",
          "story-template",
          "created-at",
          "authors",
          "metadata",
          "publish-at"
        ]
      };

    case PAGE_TYPE.AUTHOR_PAGE:
      return {
        author: ["slug", "name", "avatar-url", "bio", "id", "avatar-s3-key", "twitter-handle", "stats", "metadata"],
        stories: "all"
      };

    case PAGE_TYPE.TAG_PAGE:
      return {
        tag: "all",
        tagName: "all",
        tagDescription: "all",
        tagSlug: "all",
        stories: "all"
      };
  }
};
