import React, { Component } from "react";
import axios from 'axios'
import PokemonItem from './pokemon/PokemonItem'
import { Grid } from "semantic-ui-react";
import Search from './pokemon/Search'
export default class Pokemon extends Component {

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.pokemontcg.io/v1/cards?page=1'
    })
    .then(({data}) => {
      console.log(data)
      this.setState({
        pokemons: data.cards
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  searchBy = (search) => {
    axios({
      method: 'get',
      url: 'https://api.pokemontcg.io/v1/cards?name='+search
    })
    .then(({data}) => {
      this.setState({
        pokemons: data.cards
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  state = {
    pokemons: []
  }

  render() {
    const {pokemons} = this.state
    return (
      <div>
      <Search searchBy={this.searchBy}/>
      <Grid columns='equal' className="flex-grid">
      <Grid.Row>
      {pokemons.map((pokemon, index) => <PokemonItem key={index} pokemon={pokemon} searchBy={this.searchBy} />)}
      </Grid.Row>
      </Grid>
      </div>
   )
  }
}
