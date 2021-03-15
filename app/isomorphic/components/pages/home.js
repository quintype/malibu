import { LazyCollection, LazyLoadImages, replaceAllStoriesInCollection, WithPreview } from "@quintype/components";
import { object, shape } from "prop-types";
import React from "react";
import { getCollectionTemplate } from "../get-collection-template";

export const HomePage = props => (
  <div className="container">
    <LazyLoadImages>
      <LazyCollection collection={props.data.collection} collectionTemplates={getCollectionTemplate} lazyAfter={2} />
    </LazyLoadImages>
  </div>
);

HomePage.propTypes = {
  data: shape({
    collection: object
  })
};

export const HomePagePreview = WithPreview(HomePage, (data, story) =>
  Object.assign({}, data, {
    collection: replaceAllStoriesInCollection(data.collection, story)
  })
);
