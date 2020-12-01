import { wrapCollectionLayout, EagerLoadImages } from "@quintype/components";
// import { FourColGrid } from "./four-col-grid";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import get from "lodash/get";
import "./arrow.m.css";
import {
  FourColGrid,
  OneColStoryList,
  ThreeColGrid,
  TwoColFourStories,
  TwoColThreeStories,
  ThreeColSixStories,
  ThreeColSevenStory,
  ElevenStories,
  CollectionFilter,
  HalfScreenSlider,
  FourStorySlider,
  FullScreenSlider,
  ThreeColFourteenStories,
  FourColTwelveStories
} from "@quintype/arrow";

const arrowWrapper = Component => ({ collection, metadata = {} }) => {
  const pageType = useSelector(state => get(state, ["qt", "pageType"], ""), shallowEqual);
  const supportedPages = {
    "home-page": "home",
    "section-page": "section",
    "collection-page": "section",
    "tag-page": "tag",
    "author-page": "author",
    "pagebuilder-section-preview-page": "section",
    "pagebuilder-collection-preview-page": "section",
    "pagebuilder-story-preview-page": "story",
    "authors-page": "authors",
    "": ""
  };

  const theme = useSelector(
    state => get(state, ["qt", "config", "pagebuilder-config", supportedPages[pageType], "pageSetting", "bgColor"], ""),
    shallowEqual
  );

  const { "pagebuilder-config": pbconfig, "theme-attributes": themeAttributes } = useSelector(state =>
    get(state, ["qt", "config"])
  );
  const fallbackImageUrl = get(
    pbconfig,
    ["general", "fallbackImage", "url"],
    get(themeAttributes, ["imageFallbackUrl"])
  );

  const config = get(metadata, ["config"], {});

  const updateWithComponent = config => {
    const pbRowsConfig = useSelector(state =>
      get(state, ["qt", "config", "pagebuilder-config", "general", "rows"], {})
    );

    // Arrow needs the config values like sectionTagTemplate directly under config prop.
    // TODO: May need to flatten the rowConfig sometime.
    const sectionTagTemplate = get(
      pbRowsConfig,
      ["sectionTag", "template"],
      get(pbRowsConfig, ["sectionTagTemplate"], "solid")
    );

    const collectionNameTemplate = get(pbRowsConfig, ["collectionNameTemplate"], "");
    const borderColor = get(pbRowsConfig, ["sectionTag", "color"], "");
    const collectionNameBorderColor = get(pbRowsConfig, ["titleStyle", "underLineColor"], "");
    // borderColor to change sectionTag color. TODO: rename to sectionTagColor

    const supportedPagesForTitle = ["author-page", "tag-page"];

    const pages = supportedPagesForTitle.includes(pageType);

    let updatedConfig = {
      theme,
      ...config,
      sectionTagTemplate,
      collectionNameTemplate,
      borderColor,
      collectionNameBorderColor,
      fallbackImageUrl,
      ...(pages && { showRowTitle: false })
    };

    return updatedConfig;
  };

  return (
    <div style={{ maxWidth: "1172px", margin: "auto" }}>
      <Component collection={collection} config={updateWithComponent(config)} />
    </div>
  );
};

export default {
  ArrowFourColGrid: arrowWrapper(FourColGrid),
  ArrowCollectionFilter: arrowWrapper(CollectionFilter),
  ArrowThreeColGrid: arrowWrapper(ThreeColGrid),
  ArrowOneColStoryList: arrowWrapper(OneColStoryList),
  ArrowThreeColSixStories: arrowWrapper(ThreeColSixStories),
  ArrowTwoColThreeStories: arrowWrapper(TwoColThreeStories),
  ArrowElevenStories: arrowWrapper(ElevenStories),
  ArrowTwoColFourStories: arrowWrapper(TwoColFourStories),
  ArrowHalfScreenSlider: arrowWrapper(HalfScreenSlider),
  ArrowFullScreenSlider: arrowWrapper(FullScreenSlider),
  ArrowFourStorySlider: arrowWrapper(FourStorySlider),
  ArrowThreeColSevenStory: arrowWrapper(ThreeColSevenStory),
  ArrowFourColTwelveStories: arrowWrapper(FourColTwelveStories),
  ArrowThreeColFourteenStories: arrowWrapper(ThreeColFourteenStories),
  defaultTemplate: arrowWrapper(FourColGrid)
};
