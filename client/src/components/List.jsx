import React from 'react'

const List = (props) => {
  return ( 
    <>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {props.text}
        {JSON.stringify(props)}
        <span>{props.value}</span>
      </li>
    </>
  );
}
 
export default List;