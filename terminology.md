---
title: Common Terminology
permalink: /terminology
---

In this document, we explain some of the common concepts and terminology that the Quintype CMS uses.

As a convenience, if you enter the domain of your editor here, then we will convert paths into links for your editor.

<b>https://<input onchange="javascript:publisherEntered(this)"/>.quintype.com</b>

## Stories

A story is the fundamental unit of content in Quintype. A new story can be created here: <span data-editor-path="/story/new"></span>.

A story has a lot of metadata associated with it, which will help you render the story correctly
* Stories are based on a [template](#story-templates)
* Stories are associated with one or many [sections](#sections). Of these sections, the first one is considered the primary section for things like the canonical URL.
* Stories are associated with [tags](#tags) and [authors](#authors)
* Stories can have [attributes](#story-attributes) set on them, which helps provide more metadata about the story

The main content of the story comes from the following places
* Fields like `headline` and `hero-image` contain most of the information for the header card
* Each story is divided into multiple [cards](#cards), which is further divided into [story elements](#story-elements). The story elements together form the body of the story.

For the full reference of fields, please see the [API Documentation]() [FIXME: Broken Link]

## Story Templates

All stories are based on a story template, which controls the list of fields which are mandatory for stories. The list of templates are available can be managed here: <span data-editor-path="/settings/configure/story-templates"></span>.

## Sections

## Tags

## Authors

## Story Attributes

## Cards

## Story Elements

## Collections

## Entities
