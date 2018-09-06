import React from "react";
import "./collection-name.m.css";
function CollectionName({collection}) {
  return (
    <div styleName="Collection">
      <h2 styleName="CollectionName">{collection}</h2>
    </div>
  );
}
export{CollectionName}
