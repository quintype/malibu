---
title: Best Practices
nav_order: 29
parent: Malibu Tutorial
---

# {{page.title}}

_This tutorial was contributed by [Andukuri Venkata Phaneendra](https://www.linkedin.com/in/venkata-phaneendra-andukuri/)_

In this tutorial we will discuss some of the best practices which improve the performance

## Accessibility

### Links should have a discernible name

Link text that is discernible, unique, and focusable improves the navigation experience for users of screen readers and other assistive technologies.

Similar to buttons, links primarily get their accessible name from their text content. Avoid filler words like "Here" or "Read more"; instead, put the most meaningful text into the link itself:

aria-label attribute properly describes the purpose of the link element.

```javascript
<a href="…" aria-label="link-to-accessibility-best-practices">
  our guide to creating accessible web pages
</a>
```

Learn more in [https://web.dev/link-name/](https://web.dev/link-name/)

### Tap Targets should be sized properly

Tap targets are the areas of a web page that users on touch devices can interact with. Buttons, links, and form elements all have tap targets.

Many search engines rank pages based on how mobile-friendly they are. Making sure tap targets are big enough and far enough apart from each other makes your page more mobile-friendly and accessible.

Any on-screen element that someone can click, touch, or otherwise interact with should be large enough for reliable interaction. Consider making sure these elements have a width and height of at least 48px

Learn more in [https://web.dev/tap-targets/](https://web.dev/tap-targets/)

### Buttons should have an accessible name

When a button doesn't have an accessible name, screen readers and other assistive technologies announce it as button, which provides no information to users about what the button does.

For buttons with visible labels, add text content to the button element. Make the label a clear call to action. For example:

```javascript
<button>Sign up</button>
```

For buttons without visible labels, like icon buttons, use the `aria-label` attribute to clearly describe the action to anyone using an assistive technology, for example:

```javascript
<button
  aria-label="Hamburger Menu"
  className="hamburger-menu"
  onClick={onMenuToggle}
>
  {new Array(3).fill(<span styleName="line" />)}
</button>
```

Learn more in [https://web.dev/button-name/](https://web.dev/button-name/)

### Document doesn't have a <title> element

Having a <title> element on every page helps all your users:

- Search engine users rely on the title to determine whether a page is relevant to their search.
- The title also gives users of screen readers and other assistive technologies an overview of the page. The title is the first text that an assistive technology announces.

Add a title element to the <head> of your page. Make sure the title clearly states what the page is about. For example:

```javascript
<!doctype html>
  <html lang="en">
    <head>
      …
      <title>Malibu Documentation</title>
      …
    </head>
  <body>
    …
  </body>
</html>
```

Learn more in [https://web.dev/document-title](https://web.dev/document-title)

### <html> element does not have a [lang] attribute

To ensure correct pronunciation, screen readers use a different sound library for each language they support. Screen readers can switch between these language libraries easily, but only if a web page specifies which language to read for a given piece of content.

If a page doesn't specify a language for the <html> element, a screen reader assumes the page is in the default language that the user chose when setting up the screen reader, often making it impossible to understand the content.

```javascript
<html lang="en">...</html>
```

Learn more in [https://web.dev/html-has-lang/](https://web.dev/html-has-lang/)

### <html> element does not have a valid value for its [lang] attribute

To ensure correct pronunciation of the page as a whole, you must specify a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) for the <html> element.

```javascript
<html lang="en">...</html>
```

Learn more in [https://web.dev/html-lang-valid/](https://web.dev/html-lang-valid/)

### Image elements do not have [alt] attributes

Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute.

```javascript
<img
  alt="user"
  src={imageUrl}
  styleName="member-img"
  onClick={userAccountHandler}
/>
```

Learn more in [https://web.dev/image-alt](https://web.dev/image-alt)

### List items (<li>) are contained within <ul> or <ol> parent elements

Screen readers and other assistive technologies require list items (<li>) to be contained within parent <ul> or <ol> to be announced properly.

When assistive technologies come to a list, they notify users how many items are within the list. If you don't wrap list items in a parent list element, assistive technologies can't set user expectations correctly.

```javascript
<ul styleName="dropdown-content user-account">
  ...
  <li styleName="user-account-item" onClick={logoutHandler}>
    Logout
  </li>
</ul>
```

[Click here](https://web.dev/listitem) for the detailed information.

### [aria-*] attributes match their roles

[Click here](https://web.dev/aria-allowed-attr/) for the detailed information.

### [aria-hidden="true"] is not present on the document <body>

[Click Here](https://web.dev/aria-hidden-body/) for the detailed information.

### [aria-role]s have all required [aria-*] attributes

[Click Here](https://web.dev/aria-required-attr) for the detailed information.

### [role] values are valid

[Click Here](https://web.dev/aria-roles) for the detailed information.

### [aria-*] attributes have valid values

[Click Here](https://web.dev/aria-valid-attr-value) for the detailed information.

### [aria-*] attributes are valid and not misspelled

[Click here](https://web.dev/aria-valid-attr) for the detailed information.

### Background and foreground colors have a sufficient contrast ratio

[Click Here](https://web.dev/color-contrast) for the detailed information.

### ARIA IDs are not unique

[Click Here](https://web.dev/duplicate-id-aria) for the detailed information.

### [user-scalable="no"] is used in the <meta name="viewport"> element or the [maximum-scale] attribute is less than 5

[Click Here](https://web.dev/meta-viewport) for the detailed information.

### The page has a logical tab order

[Click here](https://web.dev/logical-tab-order/) for the detailed information.

### Interactive controls are keyboard focusable

[Click here](https://web.dev/focusable-controls/) for the detailed information.

### Interactive elements indicate their purpose and state

[Click here](https://web.dev/interactive-element-affordance/) for the detailed information.

### The user's focus is directed to new content added to the page

[Click here](https://web.dev/managed-focus/) for the detailed information.

### User focus is not accidentally trapped in a region

[Click here](https://web.dev/focus-traps/) for the detailed information.

### Custom controls have associated labels

[Click here](https://web.dev/custom-controls-labels/) for the detailed information.

### Custom controls have ARIA roles

[Click here](https://web.dev/custom-control-roles/) for the detailed information.

### Visual order on the page follows DOM order

[Click here](https://web.dev/visual-order-follows-dom/) for the detailed information.

### Offscreen content is hidden from assistive technology

[Click here](https://web.dev/offscreen-content-hidden/) for the detailed information.

### HTML5 landmark elements are used to improve navigation

[Click here](https://web.dev/use-landmarks/) for the detailed information.

### The page contains a heading, skip link, or landmark region

[Click here](https://web.dev/bypass/) for the detailed information.

### Form elements have associated labels

[Click here](https://web.dev/label) for the detailed information.

### Lists do not contain only <li> elements and script supporting elements (<script> and <template>)

[Click here](https://web.dev/list) for the detailed information.
