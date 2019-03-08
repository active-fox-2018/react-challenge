import React from 'react'

const Icon = (props) => {
  return (
    <>
      <i className={props.classes} {...props.attr || null}></i>
    </>
  );
}
 
export default Icon;