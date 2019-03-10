import React from 'react'

export default function SingleMessageBox({props}) {
  return (
    <div className="boxMessage">
      <h3>{props.name}</h3>
      <p>{props.message}</p>
      <p>{props.createdAt}</p>
      <hr/>
    </div>
  )
}
