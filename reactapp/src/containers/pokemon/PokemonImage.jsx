import React from 'react'
import { Image, Segment} from 'semantic-ui-react';
import Button from '../pokemon/Button'

export default function PokemonImage(props) {
  const { imageUrl, method, id } = props
  return (
    <Segment>
      {imageUrl ?  <Image src={imageUrl}></Image> : <p> No Image</p>}
      <div className="hoverImage">
        <Button color='red' action='delete' icon='trash alternate outline' id={id}  method={method} />
      </div>
    </Segment>
  )
}
