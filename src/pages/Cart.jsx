import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, removeFromCart, updateQty, total, emptyCart } = useCart()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)

  const handleCheckout = () => {
    setShowToast(true)
    setTimeout(() => {
      if (typeof emptyCart === 'function') emptyCart()
      navigate('/')
    }, 1400)
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Tu carrito está vacío.</p>
        <Link to="/">← Ver productos</Link>
      </div>
    )
  }

  return (
    <main className="cart-page">
      <h1 className="cart-title">Carrito</h1>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.heroImage} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-price">
                  {item.price.toLocaleString()}€
                </span>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <span className="cart-item-subtotal">
                {(item.price * item.qty).toLocaleString()}€
              </span>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <h2>Resumen</h2>
          <div className="cart-total-row">
            <span>Total</span>
            <strong>{total.toLocaleString()}€</strong>
          </div>
          <button className="checkout-btn" onClick={handleCheckout} disabled={showToast}>Finalizar compra</button>
          <Link to="/" className="continue-link">← Seguir comprando</Link>
        </div>
      </div>
      {showToast && <div className="checkout-toast">Compra realizada</div>}
    </main>
  )
}