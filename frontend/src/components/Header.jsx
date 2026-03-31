import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="floating-header-wrapper">
      <header className="glass-pill-header">
        <Link to="/" className="glass-logo">
          <div className="logo-orb"></div>
          <span>ShopKart</span>
        </Link>
        
        <nav className="glass-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/offers">Deals</NavLink>
          <div className="glass-dropdown-wrapper">
            <span className="cursor-pointer">Categories <i className="fas fa-chevron-down text-xs ml-1"></i></span>
            <div className="glass-dropdown">
              <Link to="/fruits">Fruits & Veg</Link>
              <Link to="/meat">Meat</Link>
              <Link to="/seafood">Seafood</Link>
              <Link to="/dairy">Dairy</Link>
              <Link to="/bakery">Bakery</Link>
              <Link to="/drinks">🔞 Premium Drinks</Link>
            </div>
          </div>
        </nav>

        <form className="glass-search" onSubmit={handleSearch}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="glass-actions">
          <Link to="/account" className="glass-btn icon-btn">
            <i className="far fa-user"></i>
          </Link>
          <Link to="/cart" className="glass-btn cart-btn">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </header>
    </div>
  )
}
