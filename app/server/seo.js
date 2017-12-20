import {SEO} from "@quintype/seo";

const STATIC_TAGS = {
  "twitter:site": "Quintype",
  "twitter:domain": "quintype.com",
  "twitter:app:name:ipad": undefined,
  "twitter:app:name:googleplay": undefined,
  "twitter:app:id:googleplay": undefined,
  "twitter:app:name:iphone": undefined,
  "twitter:app:id:iphone": undefined,
  "apple-itunes-app": undefined,
  "google-play-app": undefined,
  "fb:app_id": undefined,
  "fb:pages": undefined,
  "og:site_name": "Quintype"
};

const STRUCTURED_DATA = {
  organization: {
    name: "Quintype",
    url: "http://www.quintype.com/",
    logo: "https://quintype.com/logo.png",
    sameAs: ["https://www.facebook.com/quintype","https://twitter.com/quintype_in","https://plus.google.com/+quintype","https://www.youtube.com/user/Quintype"],
  }
}

export default new SEO({
  staticTags: STATIC_TAGS,
  enableTwitterCards: true,
  enableOgTags: true,
  enableNews: true,
  structuredData: STRUCTURED_DATA,
  ampStoryPages: true
});
