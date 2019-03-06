import React from 'react'

export default function AddManga(props) {
  return (
        <div>
          <div>
            <h1>Add New Manga</h1>
              <input type="text" value={props.title} name="title" onChange={props.handleChange.bind(this)}></input>
              <button onClick={props.addNewManga} className="button"> Add Manga </button>
          </div>
        </div>
  )
}
