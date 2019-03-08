import React, { Component } from 'react';
import Button from './Button'

class Jumbotron extends Component {
  render() { 
    return ( 
      <div class="jumbotron">
        <h4 class="display-5">{this.props.details.original_title}</h4>
        <hr class="my-4"/>
        <div class="row">
        <div class="col-6">
            <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Release Date
                <span>{this.props.details.release_date}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Runtime
                <span>{this.props.details.runtime} Minutes</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Tagline
                <span>{this.props.details.tagline}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Rating
                <span>{this.props.details.vote_average} / 10</span>
            </li>
            <br></br>
            <li onClick={this.props.addToFavorite}>
              <Button text="Add to Favorites" classes="btn btn-outline-light" ></Button>
            </li>
            </ul>
            
        </div>
        <div class="col-6">
            <p><strong>Overview</strong></p>
            <p class="overview">{this.props.details.overview}</p>
            <div class="d-flex justify-content-between align-items-center">
            {this.props.details.genres ? (
                this.props.details.genres.map(genre => 
                <span class="badge badge-secondary">{genre.name}</span>
                )
                ): (
                <p></p>
            )}
            </div>
        </div>
        </div>
      </div>
    );
  }
}
 
export default Jumbotron;