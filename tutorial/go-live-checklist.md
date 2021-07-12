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

### Black Knight config

The first thing publishers need to check is Black Knight config, if the initial setup is not done, then please register with Black Knight production and send an email to [support@quintype.com](mailto:support@quintype.com). Once the initial setup is done, you need to add your respective feature configurations in the config file of Black Knight.

Example(Malibu): Publisher.yml -> `enableLogin: true`.

![Publisher config]({{"images/publisher-config.png" | absolute_url}})

More about Black Knight, refer docs [here]({{"/tutorial/deploying-with-black-knight" | absolute_url}}).

### Production API credentials for third-party applications

Verify all the third-party credentials are whitelisted and added to respective places, like Black Knight config, Bold, Bridgekeeper database, and Accesstype/Metype dashboard.

Example:
- If your app uses GA or GTM, the staging ID has to be replaced with the production ID.
- The client ID and secret keys for services like push notifications(OneSignal, PushEngage, iZooto, MoEngage), social logins(Google, Facebook, Apple), etc. will have to be updated in the corresponding places like the DB, Black Knight config etc.
- If you are using Metype, the website URL should be whitelisted on Metype settings.
- Also Please verify your DFP Ad config, if you using it. Ex- network-id, slots, etc are well configured in Black Knight.

Also please make sure that you have enabled the production mode from sandbox/dev mode for your third-party apps.

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
