/* eslint-disable no-case-declarations */
import React from "react";
import PT from "prop-types";
import get from "lodash/get";
import { ResponsiveImage } from "@quintype/components";
import {
  AlsoRead,
  BigFact,
  BlockQuote,
  Blurb,
  ImageGallery,
  QuestionAnswer,
  Quote,
  Summary,
  Image,
  Text,
  Video,
  Attachment,
  Reference,
  StoryElement
} from "@quintype/arrow";

function StoryElements(props) {
  const story = get(props, ["story"], {});
  function getElement(element, index, card) {
    const subType = element.subtype || element.type;
    switch (subType) {
      case "text":
        const { css: { textColor: textElementColor = "#000", hyperlinkColor = "#2f81cd" } = {} } = {};
        return <Text element={element} css={{ textColor: textElementColor, hyperlinkColor: hyperlinkColor }} />;

      case "summary":
        const {
          template: summaryTemplate = "",
          css: { headerBgColor = "" } = {},
          opts: { headline = "", hideHeadline = false } = {}
        } = {};
        return (
          <Summary
            element={element}
            template={summaryTemplate}
            opts={{
              headline: headline || "Summary",
              hideHeadline: hideHeadline
            }}
            css={{ headerBgColor: headerBgColor || "" }}
          />
        );

      case "blurb":
        const { template: blurbTemplate = "default", css: { borderColor = "#2f81cd" } = {} } = {};
        return <Blurb element={element} template={blurbTemplate} css={{ borderColor: borderColor }} />;

      case "blockquote":
        const {
          template: blockQuoteTemplate = "default",
          css: { iconType = "edgeIcon", blockQuoteColor = "#2f81cd", backgroundShade = "" } = {}
        } = {};
        return (
          <BlockQuote
            element={element}
            template={blockQuoteTemplate}
            css={{
              iconType: iconType,
              blockQuoteColor: blockQuoteColor,
              backgroundShade: backgroundShade
            }}
          />
        );

      case "quote":
        return <Quote element={element} template="borderNone" />;

      case "bigfact":
        return <BigFact element={element} />;

      case "also-read":
        const {
          template: alsoReadTemplate = "default",
          css: { textColor = "#000" } = {},
          opts: { title = "" } = {}
        } = {};
        return (
          <AlsoRead
            story={story}
            element={element}
            template={alsoReadTemplate}
            css={{ textColor: textColor }}
            opts={{ title }}
          />
        );

      case "image":
        return <Image element={element} />;

      case "q-and-a":
        const {
          template: qaTemplate = "default",
          css: { iconColor = "" } = {},
          opts: { defaultIconType = "edge" } = {}
        } = {};
        return (
          <QuestionAnswer
            element={element}
            opts={{
              type: "q-and-a",
              defaultIconType: defaultIconType
            }}
            template={qaTemplate}
            css={{
              iconColor: iconColor
            }}
          />
        );

      case "question":
        const {
          template: questionTemplate = "default",
          css: { questionIconColor = "" } = {},
          opts: { defaultQuestionIconType = "edge" } = {}
        } = {};
        return (
          <QuestionAnswer
            element={element}
            opts={{
              type: "question",
              defaultIconType: defaultQuestionIconType
            }}
            template={questionTemplate}
            css={{
              iconColor: questionIconColor
            }}
          />
        );

      case "answer":
        const {
          template: answerTemplate = "default",
          css: { answerIconColor = "" } = {},
          opts: { defaultAnswerIconType = "edge" } = {}
        } = {};
        return (
          <QuestionAnswer
            element={element}
            opts={{
              type: "answer",
              defaultIconType: defaultAnswerIconType
            }}
            template={answerTemplate}
            css={{
              iconColor: answerIconColor
            }}
          />
        );

      case "image-gallery":
        return <ImageGallery element={element} />;

      case "youtube-video":
      case "dailymotion-video":
      case "tweet":
        return <Video element={element} />;
      case "attachment":
        return <Attachment element={element} />;
      case "jsembed":
        return <StoryElement element={element} />;
      case "references":
        const { opts: { showHeadline = true, headlineText = "" } = {} } = {};
        return (
          <Reference
            element={element}
            opts={{
              showHeadline: showHeadline,
              headlineText: headlineText
            }}
          />
        );
      default:
        return <StoryElement element={element} story={story} />;
    }
  }
  const elements =
    props.card && props.card["story-elements"].filter(element => element.id !== props.firstVideoElementID);
  return (
    <div className="story-card">
      {elements.map((element, index) => {
        return getElement(element, index, props.card);
      })}
    </div>
  );
}
StoryElements.propTypes = {
  card: PT.shape({
    "story-elements": PT.array
  }),
  firstVideoElementID: PT.string
};

function StoryCard(props) {
  return <StoryElements {...props} />;
}

StoryCard.propTypes = {
  card: PT.object,
  story: PT.object
};

function BlankStoryTemplate(props) {
  return (
    <div className="blank-story">
      <figure className="blank-story-image qt-image-16x9">
        <ResponsiveImage
          slug={props.story["hero-image-s3-key"]}
          metadata={props.story["hero-image-metadata"]}
          aspectRatio={[16, 9]}
          defaultWidth={480}
          widths={[250, 480, 640]}
          imgParams={{ auto: ["format", "compress"] }}
        />
      </figure>
      <h1>{props.story.headline}</h1>
      <span className="blank-story-author">{props.story["author-name"]}</span>
      {props.story.cards.map(card => (
        <StoryCard key={card.id} card={card} story={props.story} />
      ))}
      <div className="space-before-next-story" style={{ minHeight: 100 }} />
    </div>
  );
}

BlankStoryTemplate.propTypes = {
  card: PT.object,
  story: PT.object
};

function BlankStory(props) {
  return (
    <div className="story-grid">
      <BlankStoryTemplate story={props.story} />
    </div>
  );
}

BlankStory.propTypes = {
  story: PT.object
};

export { BlankStory };
