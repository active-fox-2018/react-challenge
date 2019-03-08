import React from 'react';
import { Link } from 'react-router-dom'

const Carousel = (props) => {
  return ( 
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {props.moviesSlide[0] ? (
          props.moviesSlide.map((movie, index) => 
            <div key={movie.id} {...(index === 0 ? {className: "carousel-item active"} : {className: "carousel-item"})}>
              <Link to={`/details/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/original/${movie['backdrop_path']}`} className="d-block w-100 cursor" alt="..."/>
              </Link>
            </div>
          )
        ) : (
          <img src="https://i2.wp.com/media.boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?zoom=1&w=500" alt="Waiting..."/>
        )}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
   );
}
 
export default Carousel;