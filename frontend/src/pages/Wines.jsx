import { useState, useEffect } from 'react'
import AgeGate from '../components/AgeGate'
import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'
import { wineOffers, wineWeeklyDeals } from '../data/offers'

export default function Wines() {
  const [filter, setFilter] = useState('all')
  const [countdown, setCountdown] = useState('')

  // Flash sale countdown
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const end = new Date()
      end.setHours(23, 59, 59, 999)
      const diff = end - now
      if (diff > 0) {
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
        setCountdown(`${h}:${m}:${s}`)
      } else {
        setCountdown('EXPIRED')
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const wines = allProducts.wines || []
  const filtered = filter === 'all'
    ? wines
    : wines.filter(w => {
        if (filter === 'red') return w.title.toLowerCase().includes('red') || w.title.toLowerCase().includes('shiraz') || w.title.toLowerCase().includes('cabernet')
        if (filter === 'white') return w.title.toLowerCase().includes('white') || w.title.toLowerCase().includes('chardonnay') || w.title.toLowerCase().includes('sauvignon')
        if (filter === 'rose') return w.title.toLowerCase().includes('ros')
        if (filter === 'sparkling') return w.title.toLowerCase().includes('sparkling') || w.title.toLowerCase().includes('brut')
        return true
      })

  return (
    <AgeGate>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(139,0,0,0.3) 0%, rgba(10,10,15,0.95) 60%)',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=80')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15, zIndex: 0,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🍷</div>
          <h1 style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-2px', color: '#f1f1f5', marginBottom: 16 }}>
            Fine Wines Collection
          </h1>
          <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 600, margin: '0 auto 32px', fontWeight: 500, lineHeight: 1.6 }}>
            Curated reds, whites, rosés & sparkling wines from India and around the world.
            <br /><span style={{ color: '#ef4444', fontWeight: 700 }}>🔞 18+ only. Drink responsibly.</span>
          </p>

          {/* Flash Sale Banner */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'rgba(139,0,0,0.3)', border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 999, padding: '12px 28px',
          }}>
            <i className="fas fa-clock" style={{ color: '#ef4444' }}></i>
            <span style={{ color: '#f1f1f5', fontWeight: 700, fontSize: 15 }}>WINE FLASH SALE: Ends in</span>
            <span style={{
              background: '#ef4444', color: '#fff', fontWeight: 900,
              padding: '4px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: 18,
            }}>{countdown}</span>
          </div>
        </div>
      </section>

      {/* Wine Offers / Sales Section */}
      <section className="section">
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title">🍷 Wine Deals & Offers</h2>
            <p className="section-subtitle">Exclusive wine sales — not available anywhere else.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28, marginBottom: 60 }}>
            {wineOffers.map(offer => (
              <div key={offer.id} style={{
                background: 'rgba(18,18,26,0.8)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(139,0,0,0.3)', borderRadius: 20,
                overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{
                    display: 'inline-block', background: 'rgba(239,68,68,0.2)',
                    color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)',
                    padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800,
                    marginBottom: 12, letterSpacing: 1,
                  }}>{offer.discount}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f1f1f5', marginBottom: 8 }}>{offer.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{offer.description}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 24, fontWeight: 900, color: '#f59e0b' }}>{offer.price}</span>
                    {offer.originalPrice && <span style={{ fontSize: 14, color: '#6b7280', textDecoration: 'line-through' }}>{offer.originalPrice}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
                    <i className="fas fa-calendar-alt" style={{ marginRight: 6 }}></i>{offer.validity}
                  </div>
                  <button className="btn" style={{ width: '100%' }}>🍷 Grab This Offer</button>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Wine Deal */}
          {wineWeeklyDeals.map(deal => (
            <div key={deal.id} style={{
              display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40,
              background: 'linear-gradient(135deg, rgba(139,0,0,0.15), rgba(18,18,26,0.9))',
              border: '1px solid rgba(139,0,0,0.3)', borderRadius: 24,
              overflow: 'hidden', marginBottom: 24,
            }}>
              <img src={deal.image} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '40px 40px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 16 }}>{deal.tag}</div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#f1f1f5', marginBottom: 12 }}>{deal.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{deal.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b' }}>{deal.price}</span>
                  <span style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{deal.discount}</span>
                </div>
                <button className="btn" style={{ width: 'fit-content', padding: '14px 32px' }}>Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wine Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">All Wines</h2>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {['all', 'red', 'white', 'rose', 'sparkling'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? '🍷 All Wines'
                  : f === 'red' ? '🍷 Red'
                  : f === 'white' ? '🥂 White'
                  : f === 'rose' ? '🌸 Rosé'
                  : '🍾 Sparkling'}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filtered.length > 0
              ? filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              : <p style={{ color: '#9ca3af', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No wines found in this category.</p>
            }
          </div>
        </div>
      </section>

      {/* Wine Coupon */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,0,0,0.2), rgba(18,18,26,0.95))',
            border: '1px solid rgba(139,0,0,0.3)', borderRadius: 24,
            padding: '50px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#f1f1f5', marginBottom: 12 }}>Exclusive Wine Coupon</h2>
            <div style={{
              background: 'rgba(245,158,11,0.15)', border: '2px dashed rgba(245,158,11,0.5)',
              borderRadius: 12, padding: '16px 32px', display: 'inline-block', margin: '20px 0',
              fontSize: 28, fontWeight: 900, color: '#f59e0b', letterSpacing: 4,
            }}>WINE25</div>
            <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 24 }}>Get 25% off on your first wine order above Rs.1000. New customers only.</p>
            <button
              className="btn"
              onClick={() => { navigator.clipboard.writeText('WINE25'); alert('Coupon copied!') }}
            >Copy Code</button>
            <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
              *Valid for 18+ customers only. One use per account.
            </p>
          </div>
        </div>
      </section>
    </AgeGate>
  )
}
