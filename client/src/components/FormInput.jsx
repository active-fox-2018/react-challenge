import React from 'react';

const Form = (props) => {
  return ( 
    <>
      {props.detail.labelText ? (
        <label>{props.detail.labelText}</label>
      ): (<></>)}
      <input value={props.detail.value} onChange={() => props.onTextChange} type={props.detail.type || null} className={props.detail.classes} placeholder={props.detail.placeholder}/>
    </>
  
  );

}

 
export default Form;