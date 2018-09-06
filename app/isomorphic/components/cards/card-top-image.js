import React from "react";
import "./card-top-image.m.css";
function CardTopImage({story, modifier}) {
  return (
    <div styleName={`CardTopImage--${modifier}`}>
      <picture styleName="CardTopImageContainer">
        <source media="(max-width: 799px)" srcset="https://images.assettype.com/sakshipost%2F2018-09%2F18a19e2a-8d2c-454d-9693-e2277fb88d2a%2FYs_Jagan_public_meeting_sabbavaram_pendurthi.jpg?auto=format&rect=3,0,747,420&q=35&w=600&fm=pjpeg" />
        <source media="(min-width: 800px)" srcset="https://images.assettype.com/sakshipost%2F2018-09%2F18a19e2a-8d2c-454d-9693-e2277fb88d2a%2FYs_Jagan_public_meeting_sabbavaram_pendurthi.jpg?auto=format&rect=3,0,747,420&q=35&w=600&fm=pjpeg" />
        <img styleName="CardTopImg" src="https://images.assettype.com/sakshipost%2F2018-09%2F9bc7ec4f-aff0-4ccb-a19b-682264a9a67a%2FYS_jagan_mohan_reddy_1.jpg?auto=format&rect=0,0,650,366&q=35&w=600&fm=pjpeg" alt=""/>
      </picture>
      <h2 styleName="Headline">{story.headline}</h2>
    </div>
  );
}
export {CardTopImage}


