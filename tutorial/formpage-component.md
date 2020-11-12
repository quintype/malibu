---
title: Form Page
nav_order: 16
parent: Malibu Tutorial
---

# {{page.title}}

*This tutorial was contributed by [Sinu](https://twitter.com/sinu_jhn) and Deo*

Quintype forms are powered by [Formio](https://www.form.io/). To enable it contact support@quintype.com.

Frontend route: `{website-host}/forms/:formSlug`
Sketches route: `{sketches-host}/api/v1/forms/:formSlug`

## SSR
*The form currently doesn't support SSR, so make sure its loaded only in the frontend.*

## Component
We use the [Form react component](https://github.com/formio/react-formio) exposed by formio to render the form in the browser. Please check it our for further documentation.

## Styling
Formio relies on bootstrap for styling. Since it might conflict with the global styleguide of your app, we are using an [isolated version of bootstrap](https://toert.github.io/Isolated-Bootstrap/).

You may now proceed to [Third Party Integrations]({{"/tutorial/third-party-integrations.html" | absolute_url}}) or jump to a recipe from the [Tutorial]({{"/tutorial" | absolute_url}}).
