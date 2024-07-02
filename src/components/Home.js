

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 

const Home = ({ searchResults, addToCart }) => {
  return (
    <div className="home">
      <div className="product-list">
        {searchResults.map((product) => (
          <div key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Precio: ${product.price}</p>
            <Link to={`/product/${product.id}`}>Ver Detalles</Link>
            <button onClick={() => addToCart({ id: product.id, name: product.title, price: product.price })}>
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
