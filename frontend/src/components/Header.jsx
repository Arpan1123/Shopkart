import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
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
              <Link to="/fruits">Fruits &amp; Veg</Link>
              <Link to="/meat">Meat</Link>
              <Link to="/seafood">Seafood</Link>
              <Link to="/dairy">Dairy</Link>
              <Link to="/bakery">Bakery</Link>
              <Link to="/drinks">🔞 Premium Drinks</Link>
            </div>
          </div>
          <NavLink to="/wines" className="drinks-link" style={{ fontSize: 14, fontWeight: 700 }}>🍷 Fine Wines</NavLink>
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
          {user ? (
            <div className="glass-dropdown-wrapper">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '9999px', padding: '8px 16px 8px 12px', cursor: 'pointer',
                color: 'var(--text-dark)', fontWeight: 700, fontSize: '0.88rem',
                transition: 'all 0.3s ease',
              }}>
                <i className="far fa-user" style={{ color: 'var(--brand-primary)', fontSize: 15 }}></i>
                <span style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name?.split(' ')[0] || 'Account'}
                </span>
              </div>
              <div className="glass-dropdown glass-dropdown-right">
                <Link to="/account" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fas fa-user-circle"></i> My Account
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none', border: 'none', width: '100%', textAlign: 'left',
                    cursor: 'pointer', padding: '10px 16px', color: '#ef4444',
                    fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
                    borderRadius: 12,
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="glass-btn icon-btn">
              <i className="far fa-user"></i>
            </Link>
          )}
          <Link to="/cart" className="glass-btn cart-btn">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </header>
    </div>
  )
}
