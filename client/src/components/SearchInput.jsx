import React from 'react'
import FormInput from './FormInput'
import Icon from './Icon'
const SearchInput = () => {
  return ( 
      <form className="form-inline my-2 my-lg-0">
        <FormInput detail={{type:"search", classes:"form-control mr-sm-2", placeholder:"Search"}}></FormInput>
        <Icon classes="fas fa-search fa-sm cursor"></Icon>
      </form>
  );
}
 
export default SearchInput;