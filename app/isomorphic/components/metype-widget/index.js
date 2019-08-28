import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { object } from "prop-types";

import { MetypeCommentingWidget } from "@metype/components";

import { generateHostStoryUrl } from "../utils/generate-story-link";

const MetypeCommentWrapperBase = ({ publisherAttributes = {}, story, metypeConfig }) => {
  return (
    <div className="metype-comments-container">
      <MetypeCommentingWidget
        host={metypeConfig["metypeHost"]}
        accountId={metypeConfig["metypeAccountId"]}
        pageURL={generateHostStoryUrl(story)}
        primaryColor={metypeConfig["primaryColor"]}
        className={metypeConfig["className"]}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    publisherAttributes: get(state, ["qt", "config", "publisher-attributes"], {})
  };
};

const MetypeCommentWrapper = connect(mapStateToProps)(MetypeCommentWrapperBase);

MetypeCommentWrapperBase.propTypes = {
  publisherAttributes: object,
  metypeConfig: object,
  story: object
};

export default MetypeCommentWrapper;
