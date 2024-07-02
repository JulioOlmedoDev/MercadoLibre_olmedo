

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/O.png'; 

const Navbar = ({ cartItemsCount }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Olmedo's Imports" className="navbar-image" />
        <span className="navbar-text">Olmedo's Imports</span>
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            Cart {cartItemsCount > 0 && <span className="badge">{cartItemsCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
