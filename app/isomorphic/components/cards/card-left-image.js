import React from "react";
import "./card-left-image.m.css";

function CardLeftImage({story}) {
  return(
    <React.Fragment>
      <div styleName="CardLeftImageContent">
      <picture>
        <source media="(max-width: 799px)" srcset="https://images.assettype.com/sakshipost%2F2018-09%2F9bc7ec4f-aff0-4ccb-a19b-682264a9a67a%2FYS_jagan_mohan_reddy_1.jpg?auto=format&rect=0,0,650,366&q=35&w=600&fm=pjpeg" />
        <source media="(min-width: 800px)" srcset="https://images.assettype.com/sakshipost%2F2018-09%2F9bc7ec4f-aff0-4ccb-a19b-682264a9a67a%2FYS_jagan_mohan_reddy_1.jpg?auto=format&rect=0,0,650,366&q=35&w=600&fm=pjpeg" />
        <img styleName="CardLeftImg" src="https://images.assettype.com/sakshipost%2F2018-09%2F9bc7ec4f-aff0-4ccb-a19b-682264a9a67a%2FYS_jagan_mohan_reddy_1.jpg?auto=format&rect=0,0,650,366&q=35&w=600&fm=pjpeg" alt=""/>
      </picture>
      <h2 styleName="CardLeftImageHeading">{story.headline}</h2>
      </div>
    </React.Fragment>

  );
}
export {CardLeftImage}
