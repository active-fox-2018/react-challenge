import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PokemonImage from '../pokemon/PokemonImage'
import { db } from '../../api/firestore'
import alertify from 'alertifyjs'

class PokemonFavorite extends Component {

  deleteCollection(id) {
    db.collection("favorites").doc(id)
      .delete()
      .then(() => {
        alertify.set('notifier','position', 'top-center')
        alertify.error('data has been deleted')
      })
      .catch((error) => {
        console.error("Error removing document: ", error)
    })
  }

  render() {
    return (
      <>
        <Grid.Row>
          <Grid.Column>
            <Card.Group itemsPerRow={1}>
              <Card>
              <h3>Your Collections</h3>
              <Card.Group itemsPerRow={4}>
                {
                  this.props.pokemons.map(pokemon => 
                <div className="CollectionImage" key={pokemon.pokemon[0].id}>
                <PokemonImage imageUrl= {pokemon.pokemon[0].imageUrl} id= {pokemon.id} method={this.deleteCollection}/>
                </div> )
                }
              </Card.Group>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  pokemons: state.loginState.pokemons
})

export default connect(mapStateToProps)(PokemonFavorite)

