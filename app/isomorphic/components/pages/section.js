import React from "react";
import { string, shape, object } from "prop-types";
import get from "lodash/get";
import { collectionToStories, LazyCollection } from "@quintype/components";

import { StoryGrid } from "../story-grid";
import { getCollectionTemplate } from "../get-collection-template";

const SectionPage = props => {
  const stories = (props.data.collection.items && collectionToStories(props.data.collection)) || [];
  const childCollections = (get(props, ["data", "collection", "items"]) || []).filter(
    item => item.type === "collection" && item.items.length > 0
  );
  const pageTitle =
    props.pageType === "collection-page"
      ? props.data.collection.name
      : `Section - ${props.data.section["display-name"] || props.data.section.name}`;
  const noStoriesFound =
    props.pageType === "collection-page" ? "No Collection Stories Found" : "No Section Stories Found";
  if (stories.length === 0) {
    return <h1>{noStoriesFound}</h1>;
  }
  return (
    <div className="container">
      <h1>{pageTitle}</h1>
      <StoryGrid stories={stories} />
      <LazyCollection collection={{ items: childCollections }} collectionTemplates={getCollectionTemplate} />
    </div>
  );
};

SectionPage.propTypes = {
  pageType: string,
  data: shape({
    collection: object,
    section: string
  })
};

export { SectionPage };
