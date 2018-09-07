import React from "react";
import "./three-col.m.css";
import {CollectionName} from "../layouts/collection-name.js";
import {CardTopImage} from "../cards/card-top-image.js";
import {CardStoryHeadline} from "../cards/card-story-headline.js";
import {SideBar} from "../layouts/side-bar.js";
function ThreeCol({collection, getImageUrl}){
  const stories = collection.items[2].items;
  const name = collection.name;
  return (
    <div className="container" styleName="ThreeCol">
      <div styleName="ThreeColMain">
        <div styleName="ThreeColMainContent">
          <div styleName="ThreeColMainContentLeft">
            <CollectionName collection={name} />
            <CardTopImage modifier="BigHeadline" story={stories[0].story} getImageUrl={getImageUrl} />
            {stories.slice(3,6).map(({story}) =>
              <CardStoryHeadline  story={story}/>
            )}
            <div styleName="ThreeColReadMore"><a styleName="ReadMoreLink" href={collection.slug}>More from {name} <i class="fa fa-long-arrow-right"></i></a></div>
          </div>
          <div styleName="ThreeColMainContentRight">
            <CollectionName collection={name} />
            <CardTopImage modifier="BigHeadline" story={stories[2].story} getImageUrl={getImageUrl}/>
            {stories.slice(3,6).map(({story}) =>
              <CardStoryHeadline  story={story}/>
            )}
            <div styleName="ThreeColReadMore"><a styleName="ReadMoreLink" href={collection.slug}>More from {name} <i class="fa fa-long-arrow-right"></i></a></div>
          </div>
        </div>
      </div>
      <div styleName="ThreeColSidebar ">
        <SideBar getImageUrl={getImageUrl} story={collection.items[3].items} collectionName={collection.items[1].name}  />
      </div>
    </div>
  );
}
export {ThreeCol}
