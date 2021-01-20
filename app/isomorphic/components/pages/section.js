import React from "react";
import PT from "prop-types";
import get from "lodash/get";
import { StoryGrid } from "../story-grid";
import { collectionToStories, LazyCollection } from "@quintype/components";
import { getCollectionTemplate } from "../get-collection-template";
const SectionPage = props => {
  const stories = collectionToStories(props.data.collection) || [];
  const childCollections = get(props, ["data", "collection", "items"], []).filter(
    item => item.type === "collection" && item.items.length > 0
  );
  const headline =
    props.pageType === "collection-page"
      ? props.data.collection.name
      : `Section - ${props.data.section["display-name"] || props.data.section.name}`;
  return (
    <div>
      <h1>{headline}</h1>
      <StoryGrid stories={stories} />
      <LazyCollection collection={{ items: childCollections }} collectionTemplates={getCollectionTemplate} />
    </div>
  );
};

SectionPage.propTypes = {
  pageType: PT.string,
  data: PT.shape({
    collection: PT.object,
    section: PT.string
  })
};

export { SectionPage };
