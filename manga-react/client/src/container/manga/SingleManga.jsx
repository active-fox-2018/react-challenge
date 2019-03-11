import React from 'react'
import {Link} from 'react-router-dom'

export default function SingleManga(props) {
    const { manga, del, bookmark } = props
    return (
      <div className="col-4">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={manga.image} className="card-img" alt=""/>
            </div>
            <div className="col-md-8">
              <div className="card-body ml-2">
                <div className="row">
                  <Link to={`/details/${manga.id}`}>
                    <p className="card-title" style={{fontSize: "12px", textAlign: "left"}}><strong>{manga.canonicalTitle}</strong></p>
                  </Link>
                </div>
                <div className="row mb-2">
                  <div style={{lineHeight: "5px"}}>
                    <p className="card-text" style={{fontSize: "12px", textAlign: "left"}}>Rating: {manga.rating}</p>
                    <p className="card-text" style={{fontSize: "12px", textAlign: "left"}}>Start: {manga.start}</p>
                  </div>
                </div>
                <div className="row">
                {
                  window.location.pathname === '/' &&
                  <div className="col">
                    <button onClick={bookmark} className="button">Bookmark</button>
                  </div>    
                }

                {
                  window.location.pathname === '/manga-collection' &&
                  <div className="col-3 mr-2">
                    <button onClick={del} className="button">Delete</button>
                  </div>             
                }
            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
