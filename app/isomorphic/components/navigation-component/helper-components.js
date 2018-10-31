import React from "react";
import { Link } from "@quintype/components";
import get from 'lodash/get';

function SubmenuItem(props) {
  const color = get(props, ['item', 'data', 'color'], '#ed5564');
  const spanStyle = {
    'borderLeft': `3px solid ${color}`,
    'paddingLeft': '8px',
    
  }

  return (
    props.item.isExternalLink
    ? <a href={ props.item.completeUrl } target="_blank">{ props.item.title }</a>
    : <Link href={ props.item.completeUrl }><span style={props.haveColor && spanStyle}>{ props.item.title }</span></Link>
  )  
}

export { SubmenuItem }
