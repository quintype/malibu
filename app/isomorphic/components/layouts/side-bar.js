import  React from "react";
import "./side-bar.m.css";
import {CardLeftImage} from "../cards/card-left-image.js"
function SideBar({story, collectionName, getImageUrl}) {
  return (
    <React.Fragment>
      <h4 styleName="SideBarHeading">{collectionName}</h4>
      <div styleName="SideBar">
        {story.slice(3,9).map(({story}) =>
          <CardLeftImage modifier="HeadlineNoBorder" story={story} getImageUrl={getImageUrl}/>
        )}
      </div>
    </React.Fragment>
  );
}
export {SideBar}
