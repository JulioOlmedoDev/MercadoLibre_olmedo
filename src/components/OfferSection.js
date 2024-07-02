

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OfferSection = ({ addToCart }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=productos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const randomIndexes = getRandomIndexes(data.results.length, 20);
        const randomProductsData = randomIndexes.map(index => data.results[index]);
        setRandomProducts(randomProductsData);
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  const getRandomIndexes = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  return (
    <section className="offer-section">
      <h2>¡Ofertas al Azar!</h2>
      <div className="product-list">
        {randomProducts.map((product) => (
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
    </section>
  );
};

export default OfferSection;
