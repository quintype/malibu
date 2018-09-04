import React from "react";
import './social-icon.m.css';

function SocialIcons ({icons}) {
  return (
      <ul styleName="SocialMediaIcons">
        { icons.socialLinks.map(item =>
          <li key={item.heading}> <a  href={item.url} styleName={item.heading} className={ "fa fa-" + item.type }></a></li>
        )}
      </ul>
    );

}
export {SocialIcons}
