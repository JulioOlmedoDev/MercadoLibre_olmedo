

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import OfferSection from './components/OfferSection'; 
import './styles.css';
import logo from './img/O.png';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItemsCount={cartItems.length} />
        <div className="content">
          <div className="search">
            <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Buscar productos..." />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          <Routes>
            <Route path="/" element={<>
              {!searchTerm && <OfferSection addToCart={addToCart} />} {/* Mostrar OfferSection solo si no hay búsqueda */}
              <Home searchResults={searchResults} addToCart={addToCart} /> {/* Envía los resultados de búsqueda a Home */}
            </>} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={<Cart items={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

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

export default App;
