import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/PPC_logo_red.png";

const Navbar = () => {
  return (
    <div className='nav-container'>
            <Link to='/'><img className='Logo' src={logo} alt='PPC Logo'/></Link> 
            <h3 className='heading-3 nav-text'>House Property Auction</h3>
    </div>
  )
}

export default Navbar