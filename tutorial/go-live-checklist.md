---
title: Checklist
parent: Go-Live Checklist
grand_parent: Malibu Tutorial
nav_order: 01
---

# {{page.title}}

*This tutorial was contributed by [Deo Kumar](https://www.linkedin.com/in/deo-kumar)*

There are few points that needs to be check before and after Go-Live

## Before Go-live checklist

### BlackKnight config

The first thing publisher needs to check is blacknight config, follow [Black Knight Tutorial]({{"/tutorial/deploying-with-black-knight" | absolute_url}}) to understand and set up your initial config-if your project doesn't have. Once the initial setup is done, you need to add your respective feature configurations in the config file of blackknight.

Example(Malibu): Publisher.yml -> `enableLogin: true`.

![Publisher config]({{"images/publisher-config.png" | absolute_url}})

More about blackknight, refer docs [here]({{"/tutorial/deploying-with-black-knight" | absolute_url}}).

### Production API credentials for third-party applications

Verify all the third-party credentials are whitelisted and added to respective places, like Blackknight config, Bold, Bridgekeeper database, and Accesstype dashboard.

Example:
- GA/GTM ID.
- Metype ID and Whitelist the domain.
- Push notifications keys.
- Social login
  - Google client id and secret id.
  - Facebook app id and secret id.
  - Apple app id's, service id and keys.

Apart from the above points below important points need to be verified.

- Structured data. Verify structured data in homepage(Organisation, Website) stories. (Article, Organisation) (News Article Schema).
- Meta description.
- Amp pages.
- Shrubbery analytics.
- Instant article feed.
- Verify the PWA for the Publisher. Please - Validate: manifest.json should contain the following keys for pop to show up. Example [Here](https://github.com/quintype/malibu/wiki/Manifest-Json-Example).
- Logo Header.
- Footer logo.
- Favicon logo.
- Verify sitemap on sections(check for https://your-website.com/sitemap/sitemap-section.xml, should show section as https://your-website.com/<parent_section>/<child_section>).
- QA Sign Off.
- Account Manager Sign Off.

## After Go-live checklist
- Robots.txt.
- Sitemap regeneration (Check for publisher URL, should not show Madrid or Malibu URL).
- DNS change.
- Structured Data [Article, News Article, Website and Organisation ]Schema.
- Quintype validator.
- Instant article feed (https://your-website.com/api/instant-articles.rss).
- All the features should work. Ex: Login(if implemented), push notification etc.
