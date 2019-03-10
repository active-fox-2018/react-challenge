import React, { Component } from 'react'
import {Grid, Segment} from 'semantic-ui-react';
import PokemonImage from '../pokemon/PokemonImage'

export default class CardDetailPokemon extends Component {
  render() {
    const {pokemon} = this.props
    return (
        <>
          <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                {pokemon.name ? <h2>{pokemon.name}</h2> : <p> No Data</p>}
                  <h4>National Pokedex Number</h4>
                  {pokemon.nationalPokedexNumber ? <p>{pokemon.nationalPokedexNumber}</p>: <p> No Data</p>}
                  <hr/>
                  <h4>Types</h4>
                  {pokemon.types ? <p>{pokemon.types[0]}</p> : <p> No Data</p>}
                  <hr/> 
                </Segment>
              </Grid.Column>
            <Grid.Column>
              <PokemonImage imageUrl={pokemon.imageUrl}/>
            <Segment>Artist:
              {pokemon.artist ? <p>{pokemon.artist}</p> : <p> No Artist</p>}
            </Segment>
            </Grid.Column>
          <Grid.Column>
            <Segment>
              <h4>Attacks</h4>
            {pokemon.attacks ? <p>{(pokemon.attacks[0].name)}</p> : <p> No Artist</p>}
            </Segment>
            
            <Segment>
              <h4>Hp</h4>
              {pokemon.hp ?<h1>{pokemon.hp}</h1> : <h1>0</h1>}
            </Segment>
            <Segment>           
              <h4>Weakness</h4>
              {pokemon.weaknesses ? <p>{pokemon.weaknesses[0].type}</p> : <h1>No Weakness</h1>}
           </Segment>
          </Grid.Column>
        </Grid.Row>
      </>  
    )
  }
}
