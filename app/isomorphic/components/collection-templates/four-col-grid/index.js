// Implement more logic here

import React from "react";
import { array, object } from "prop-types";
// import { StoryGrid } from "../../story-grid";
import { FourColGrid as FourColGridArrow } from "@quintype/arrow/dist/cjs/src/index";

import "./four-col-grid.m.css";

export function FourColGrid({ collection, stories }) {
  const contextConfig = {
    theme: "#ffffff",
    border: "",
    collectionNameTemplate: "default",
    sectionTagTemplate: "default",
    showSection: true,
    showAuthor: true,
    showTime: true,
    slotConfig: [{ type: "story", component: () => null }],
    showRowTitle: true,
    showFooterButton: true,
    buttonText: "Load More",
    footerSlotConfig: { footerSlot: () => null }
  };
  return (
    <div className="story-grid">
      <FourColGridArrow collection={collection} config={contextConfig} />
    </div>
  );
}

FourColGrid.propTypes = {
  collection: object,
  stories: array
};

FourColGrid.storyLimit = 8;
