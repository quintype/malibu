// Implement more logic here

import React from 'react'
import { StoryGrid } from '../story-grid'
import './four-col-grid.m.css'

export function FourColGrid ({ collection, stories }) {
  return (
    <div>
      <h3 styleName="heading">{collection.name}</h3>
      <StoryGrid stories={stories} />
    </div>
  )
}
