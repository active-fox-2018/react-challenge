import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import Button from './Button'
import { Link } from "react-router-dom";
export default function foodItem(props) {
  const {pokemon} = props
  return (
    <Card.Group>
    <Card>
      <Card.Content>
        <Image size ='small' src = {pokemon.imageUrl} />
        <Card.Header>{pokemon.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/${pokemon.id}`}>
         <Button color='red' action='Read More' icon='angle double right'/>
        </Link>
      </Card.Content>
    </Card>
    </Card.Group>
  )
}
