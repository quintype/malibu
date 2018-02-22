import { createDfpAdComponent } from '@quintype/components';
import get from 'lodash/get'

export const CONFIG = {
  "homepage-banner": { adUnit: "Rio_Story_LB1", sizes: [[728, 90]] },
}

export const DfpAd = createDfpAdComponent({
  defaultNetworkID: "60988533",
  config: CONFIG,
  targeting: function(state) {
    const params = {};

    if(get(state, ["qt", "pageType"]) == 'story-page' && get(state, ["qt", "data", "story", "metadata", "sponsored-by"]))
      return params['sponsor'] = get(state, ["qt", "data", "story", "metadata", "sponsored-by"]);

    return params;
  }
});
