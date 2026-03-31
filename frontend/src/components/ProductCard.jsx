import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.currentPrice,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card" data-category={product.category}>
      {product.badge && (
        <div className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</div>
      )}
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.description && <p className="product-description">{product.description}</p>}
        <div className="product-price">
          <span className="current-price">{product.currentPrice}</span>
          {product.originalPrice && <span className="original-price">{product.originalPrice}</span>}
          {product.discount && <span className="discount">{product.discount}</span>}
        </div>
        <div className="product-actions">
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            style={added ? { backgroundColor: 'var(--success)' } : {}}
          >
            <i className={added ? 'fas fa-check' : 'fas fa-cart-plus'}></i>
            {added ? ' Added' : ' Add to Cart'}
          </button>
          <div
            className={`wishlist ${wishlisted ? 'active' : ''}`}
            onClick={() => setWishlisted(!wishlisted)}
          >
            <i className={wishlisted ? 'fas fa-heart' : 'far fa-heart'}></i>
          </div>
        </div>
      </div>
    </div>
  )
}
