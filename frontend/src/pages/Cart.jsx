import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg, setPromoMsg] = useState('')

  const delivery = cartTotal >= 499 ? 0 : 50
  const total = cartTotal + delivery

  const applyPromo = () => {
    if (promoCode === 'WELCOME25') setPromoMsg('Promo code applied! 25% discount on your first order.')
    else if (promoCode === 'FRESH10') setPromoMsg('Promo code applied! 10% discount on your order.')
    else if (promoCode) setPromoMsg('Invalid promo code. Try WELCOME25 or FRESH10')
    else setPromoMsg('Please enter a promo code')
  }

  return (
    <>
      <section className="cart-hero">
        <div className="container">
          <h1>Your Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>
      </section>
      <section className="cart-container">
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet. Start shopping to fill it up!</p>
                <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: 20 }}>
                  <i className="fas fa-shopping-bag"></i> Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <h2 className="section-title">Cart Items ({cartItems.length})</h2>
                {cartItems.map((item) => {
                  const price = parseFloat(String(item.price).replace('Rs.', '').trim())
                  const itemTotal = price * item.quantity
                  return (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-item-info">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <div className="cart-item-price">{item.price}</div>
                        <div className="cart-item-controls">
                          <div className="quantity-control">
                            <button className="quantity-btn minus" onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <input type="text" className="quantity-input" value={item.quantity} readOnly />
                            <button className="quantity-btn plus" onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                          <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                            <i className="fas fa-trash"></i> Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-total">Rs.{itemTotal.toFixed(2)}</div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs.{cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'FREE' : `Rs.${delivery.toFixed(2)}`}</span>
            </div>
            {cartTotal > 0 && cartTotal < 499 && (
              <div className="summary-row">
                <small style={{ color: 'var(--success)' }}>Add Rs.{(499 - cartTotal).toFixed(2)} more for free delivery!</small>
              </div>
            )}
            <div className="promo-code">
              <strong>Promo Code</strong>
              <div className="promo-input">
                <input type="text" placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
                <button onClick={applyPromo}>Apply</button>
              </div>
              {promoMsg && <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--primary)' }}>{promoMsg}</p>}
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert(cartItems.length === 0 ? 'Your cart is empty.' : 'Proceeding to checkout!')}>
              Proceed to Checkout
            </button>
            <Link to="/" className="continue-shopping">
              <i className="fas fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
