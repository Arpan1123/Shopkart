import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMyOrders } from '../utils/api'

export default function Account() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  // Redirect if not logged in (after auth has resolved)
  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  // Fetch orders when tab switches to orders
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      setOrdersLoading(true)
      getMyOrders()
        .then(setOrders)
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false))
    }
  }, [activeTab, user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading || !user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
      </div>
    )
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=2e7d32&color=fff&size=100`

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Manage your profile and orders</p>
      </div>
      <div className="account-wrapper">
        <aside className="account-sidebar">
          <div className="user-profile-summary">
            <img src={avatarUrl} alt={user.name} className="user-avatar" />
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
            <span className="account-type">Member</span>
          </div>
          <nav className="account-menu">
            <button
              className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <i className="fas fa-user"></i> Personal Info
            </button>
            <button
              className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <i className="fas fa-box"></i> My Orders
            </button>
            <button
              className="menu-item"
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#e53935' }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </nav>
        </aside>

        <div className="account-content">
          {activeTab === 'profile' && (
            <>
              <h2 className="section-title">Personal Information</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" defaultValue={user.name} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" defaultValue={user.email} readOnly />
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', marginTop: 8 }}>
                  Profile editing coming soon.
                </p>
              </form>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <h2 className="section-title">My Orders</h2>
              {ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <i className="fas fa-box-open" style={{ fontSize: '3rem', color: '#ccc', marginBottom: 16, display: 'block' }}></i>
                  <h3>No orders yet</h3>
                  <p style={{ color: 'var(--gray)', marginBottom: 20 }}>Start shopping to see your orders here.</p>
                  <Link to="/" className="btn"><i className="fas fa-shopping-bag"></i> Shop Now</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {orders.map(order => (
                    <div key={order._id} className="glass" style={{ padding: '20px', borderRadius: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Order ID</div>
                          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{order._id}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Date</div>
                          <div style={{ fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString('en-IN')}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Total</div>
                          <div style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{order.total?.toFixed(2)}</div>
                        </div>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: 'rgba(46,125,50,0.15)',
                          color: 'var(--primary)',
                        }}>
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {order.items?.map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {item.image && (
                              <img src={item.image} alt={item.title} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8 }} />
                            )}
                            <span style={{ flex: 1, fontSize: '0.9rem' }}>{item.title}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>×{item.quantity}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
