/* eslint-disable object-shorthand */
import { createDfpAdComponent } from "@quintype/components";
import get from "lodash/get";

export const CONFIG = {
  "homepage-banner": {
    adUnit: "Large_Leaderboard",
    sizes: [[970, 90], [728, 90], [320, 100], [320, 50]],
    viewPortSizeMapping: [
      { viewport: [980, 0], sizes: [[970, 90], [728, 90]] },
      { viewport: [500, 0], sizes: [[320, 100], [320, 50]] },
      { viewport: [0, 0], sizes: [[320, 100], [320, 50]] }
    ]
  }
};

export const DfpAd = createDfpAdComponent({
  defaultNetworkID: "3849069",
  config: CONFIG,
  targeting: function(state) {
    const params = {};

    if (
      get(state, ["qt", "pageType"]) === "story-page" &&
      get(state, ["qt", "data", "story", "metadata", "sponsored-by"])
    ) {
      params.sponsor = get(state, ["qt", "data", "story", "metadata", "sponsored-by"]);
      return params.sponsor;
    }

    return params;
  }
});
