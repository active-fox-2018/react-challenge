import React from 'react'
import SearchInput from './SearchInput'
import logo from '../logo.svg';
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return ( 
    <>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          {/* <SearchInput></SearchInput> */}
          <Dropdown></Dropdown>
      </nav>
    </>
    );
}
 
export default Navbar;