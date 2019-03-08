import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return ( 
    <>
      <Link to={`/details/${props.movieDetail.id}`}>
        <div className="card raise mb-3 rounded-0 cursor">
          <div className="card-header bg-transparent rounded-0"><strong>{props.movieDetail.original_title}</strong></div>
          <div className="card-body text-success">
            <img className="card-img rounded-0" src={`https://image.tmdb.org/t/p/w500${props.movieDetail.poster_path}`} alt={props.movieDetail.original_title}/>
          </div>
          <div className="card-footer bg-transparent rounded-0">Rating: {props.movieDetail.vote_average}  <i class="fas fa-star fa-md"></i></div>
          
        </div>
      </Link>
    </>
    );
}
 
export default Card;