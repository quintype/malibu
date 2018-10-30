/* eslint-disable jsx-a11y/img-redundant-alt, import/extensions */
import React from 'react'
import assetify from '@quintype/framework/assetify'

import { getCollectionTemplate } from '../get-collection-template'
import img from '../../../assets/images/pw_maze_white.png'
import { Collection } from '@quintype/components'

export const HomePage = props => (
  <div>
    <h1>Home</h1>
    <Collection
      collection={props.data.collection}
      collectionTemplates={getCollectionTemplate}
    />
  </div>
)
