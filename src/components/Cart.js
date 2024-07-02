// Cart.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Cart = ({ items, removeFromCart, updateQuantity, clearCart }) => {
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleFinishPurchase = () => {

    setPurchaseCompleted(true);
    clearCart(); 
  };

  const handleContinueShopping = () => {
    setPurchaseCompleted(false);
  };

  return (
    <div className="cart">
      {!purchaseCompleted ? (
        <>
          <h2>Carrito de Compras</h2>
          {items.length === 0 ? (
            <p>No hay elementos en el carrito</p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <p>{item.name}</p>
                    <p>Precio: ${item.price}</p>
                    <div>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Total: ${calculateTotal()}</p>
              <button onClick={clearCart}>Vaciar Carrito</button>
              <Link to="/">Seguir Comprando</Link>
              <button onClick={handleFinishPurchase}>Finalizar Compra</button>
            </>
          )}
        </>
      ) : (
        <div className="purchase-confirmation">
          <h2>¡Muchas gracias por su compra!</h2>
          <p>Su pedido será enviado pronto.</p>
          <button onClick={handleContinueShopping}>Salir</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
