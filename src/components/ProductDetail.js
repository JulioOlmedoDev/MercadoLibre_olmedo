import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css'; // Asegúrate de importar los estilos CSS aquí

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.pictures[0].url} alt={product.title} />
          <p>Descripción: {product.description}</p>
          <p>Precio: ${product.price}</p>
          <button onClick={() => addToCart({ id: product.id, name: product.title, price: product.price })}>
            Agregar al Carrito
          </button>
        </>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default ProductDetail;
