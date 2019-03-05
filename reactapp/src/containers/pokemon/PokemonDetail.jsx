import React, { Component } from 'react'
import axios from 'axios'
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
export default class PokemonDetail extends Component {
  componentDidMount = () => {
    axios({
      method: 'get',
      url: `https://api.pokemontcg.io/v1/cards?id=${this.props.match.params.id}`
    })
    .then(({data}) => {
      console.log(data.cards[0])
      this.setState({
        pokemon: data.cards
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  state = {
    pokemon : []
  }
  render() {
   const { pokemon } = this.state
    return (
      <Container>
      <h1>POKEMON DETAIL</h1>
      <div>
        {
          pokemon[0] && <div>
          <Grid columns='equal'>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <h2>{pokemon[0].name}</h2>
                  <h4>National Pokedex Number</h4>
                  <p>{pokemon[0].nationalPokedexNumber}</p>
                  <hr/>
                  <h4>Types</h4>
                  <p>{pokemon[0].types[0]}</p>
                  <hr/>
                </Segment>
              </Grid.Column>
            <Grid.Column>
            <Segment><Image src={pokemon[0].imageUrl}></Image></Segment>
            <Segment>Artist:
              {pokemon[0].artist ? <p>{pokemon[0].artist}</p> : <p> No Artist</p>}
            </Segment>
            </Grid.Column>
          <Grid.Column>
            <Segment>Attacks</Segment>
            <Segment>
              <h4>Hp</h4>
              <h1>{pokemon[0].hp}</h1>
            </Segment>
            <Segment>Weakness</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
          
          </div>
        }
      </div>

      </Container>
    )
  }
}
