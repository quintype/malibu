---
title: Common Terminology
permalink: /terminology
---
# {{page.title}}

In this document, we explain some of the common concepts and terminology that the Quintype CMS uses.

As a convenience, if you enter the domain of your editor here, then we will convert paths into links for your editor.

<b>https://<input id="publisher-name"/>.quintype.com</b>

## Stories

A story is the fundamental unit of content in Quintype. A new story can be created here: <span data-editor-path="/story/new"></span>.

A story has a lot of metadata associated with it, which will help you render the story correctly
* Stories are based on a [template](#story-templates)
* Stories are associated with one or many [sections](#sections). Of these sections, the first one is considered the primary section for things like the canonical URL.
* Stories are associated with [tags](#tags) and [authors](#authors)
* Stories can have [attributes](#attributes) set on them, which helps provide more metadata about the story

The main content of the story comes from the following places
* Fields like `headline` and `hero-image` contain most of the information for the header card
* Each story is divided into multiple [cards](#cards), which is further divided into [story elements](#story-elements). The story elements together form the body of the story.

For the more information on the APIs, please see the [Story API](https://developers.quintype.com/quintype-node-backend/Story.html)

## Story Templates

Story type are predefined templates which can be used to write articles of various domains ranging from photo blogs, listicles, video stories, blogs etc. Story types give a definite structure and a "starting point" to authors when they start writing a story. They also help in predictive analytics. Data can be derived and studied based on audience engagement on various story types for different domains, for example, a photo story on wildlife may get higher engagement than a text story.

A story type may give subtle hints to the behaviour of the story. For example, a *live-blog* may choose to auto update every 30 seconds.

The list of templates are available can be managed here: <span data-editor-path="/settings/configure/story-templates"></span>.

## Sections

Sections are the primary grouping for stories, and very similar to *categories* in other CMSes. Each section will also have it's own page, which is generated from the [collection](#collections) attached to the section. Sections can be nested within other sections, to build a tree like structure of sections.

Sections must be created before stories are created, and can be managed here: <span data-editor-path="/manage/sections"></span>.

The first section of a story is refered to as the primary section, and will be the one that appears in the canonical URL of the story. If multidomain support is enabled for your account, then the story will be a part of the domain the primary section (or it's parent) is linked to.

## Tags / Topics

Tags are a way of grouping stories on a similar topic. Tags typically will have their own page as well, which shows all stories with that given tag.

Tags can be managed from here: <span data-editor-path="/manage/tags"></span>.

## Authors

An author represents a contributor in the Quintype CMS. Most story related APIs will return an array of authors information, primarily containing their name and profile picture. More details can be obtained from the [Authors API](https://developers.quintype.com/quintype-node-backend/Author.html).

## Cards

Cardification is a new paradigm targetted towards mobile-first consumption of news. Short and concise chunked blocks of content tend to have much higher engagement. Quintype stories are split into multiple cards. Frontend applications can choose to represent these cards visually, allowing users to interact with these cards directly.

Any API request for stories contain the cards that comprise the story in the *"cards"* field (as an array). These cards comprise the body of the story.

## Story Elements

Story elements are the smallest logical unit in the Quintype platform. Each story element represents a single paragraph of text, image, video, or other unit of content. Story elements form a card.

The story elements can be found in the *"story-elements"* field of individual cards.

#### Story Element Types

Each story element has a *"type"*, and optionally a *"subtype"*. There are currently five major types of story elements, which all front end applications must support. They are as follows:

* text - a paragraph of text
* image - an image
* youtube-video - a video on youtube
* soundcloud-audio - a piece of audio on soundcloud
* title - a title for a card (listicle)
* jsembed - arbitrary, unsafe HTML
* composite - an element depending on other story elements

#### Story Element Subtypes

Story elements may also have a *"subtype"* field, which gives hints on rendering for clients that know how to render the subtype. For example, a *jsembed* element may have the *twitter* subtype. Looking at the metadata, you will find the *tweet-id* of the particular tweet. Clients may choose to render this element as a *jsembed*, or as a native twitter element (and provide optimizations such as ensuring that the twitter SDK is only loaded once).

The [StoryElement Component](https://developers.quintype.com/quintype-node-components/StoryElement.html) can be used to render an element with malibu.

## Collections

## Attributes

## Entities
