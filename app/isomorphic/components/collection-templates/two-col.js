import React from "react";
import "./two-col.m.css";
import {CardTopImage} from "../cards/card-top-image.js";
import {CardLeftImage} from "../cards/card-left-image.js";
import {CollectionName} from "../layouts/collection-name.js";

function TwoCol({collection, getImageUrl}){
  const stories = collection.items;
  const name = collection.name;
  return(
    <div class="container">
      <div styleName="TwoCol">
        <div styleName="TwoColContent">
          <CollectionName collection={name} />
          <div styleName="TwoColStory">
            <div styleName="TwoColMain">
              <CardTopImage modifier="BigHeadline" story={stories[0].story}  getImageUrl={getImageUrl}/>
              <div styleName="TwoCardHorizontal">
                <CardTopImage modifier="SmallHeadline" story={stories[1].story} getImageUrl={getImageUrl}/>
                <CardTopImage modifier="SmallHeadline" story={stories[2].story} getImageUrl={getImageUrl} />
              </div>
            </div>
            <div styleName="TwoColSidebar">
              {stories.slice(3,9).map(({story}) =>
                <CardLeftImage story={story} getImageUrl={getImageUrl} />
              )}
            </div>
          </div>
        </div>
        <div styleName="TwoColAdd"><img src="https://s.adroll.com/a/V7S/QO4/V7SQO4KE2ZEC7EG3I4DLJV.jpg" alt=""/></div>
      </div>
      </div>

  );
}
export {TwoCol}
