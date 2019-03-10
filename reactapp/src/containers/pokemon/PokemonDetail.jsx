import React, { Component } from 'react'
import axios from 'axios'
import { Container, Grid} from 'semantic-ui-react';
import CardDetailPokemon from '../pokemon/CardDetailPokemon'
import { connect } from 'react-redux'
import PokemonFavorite from './PokemonFavorite'
import Button  from './Button'
import {db} from '../../api/firestore'
import alertify from 'alertifyjs'

class PokemonDetail extends Component {
  componentDidMount = () => {
    axios({
      method: 'get',
      url: `https://api.pokemontcg.io/v1/cards?id=${this.props.match.params.id}`
    })
    .then(({data}) => {
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

  addToCollection = () => {
    if(this.props.uid && !this.props.pokemons.filter(({pokemon}) => (pokemon[0].id === this.state.pokemon[0].id)).length) {
      db.collection('favorites')
        .add({
          uid: this.props.uid,
          pokemon: this.state.pokemon
        })
        .then(doc => {
          console.log(doc)
          alertify.set('notifier','position', 'top-center')
          alertify.success('Data has been added')
        })
        .catch(err => {
          console.log(err)
        })

    } else if(this.props.uid) {
      alertify.set('notifier','position', 'top-center')
      alertify.error('Oops, you already have that card!')

   } else {
    alertify.set('notifier','position', 'top-center')
    alertify.error('Please login first.')
   }

  }
  render() {
   const { pokemon } = this.state
    return (
      <Container>
      <h1>POKEMON DETAIL</h1>
      <div>
        {
          pokemon[0] ? <div>
          <Grid columns='equal'>
            <CardDetailPokemon pokemon={pokemon[0]}/>
            <Grid.Row>
            <Grid.Column>
              <Button color='red' action='Add To Collections' icon='add' method={this.addToCollection} />
              </Grid.Column>
            </Grid.Row>
            {this.props.loginState && <PokemonFavorite/>}
        </Grid>
      </div>
        : <img className="waitingGif" src="http://images5.fanpop.com/image/photos/26500000/pokemon-pokemon-26559141-500-376.gif" alt="waiting"/>
        } 
      </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  loginState: state.loginState.isLogin,
  pokemons: state.loginState.pokemons,
  uid: state.loginState.uid
})


export default connect(mapStateToProps)(PokemonDetail)
