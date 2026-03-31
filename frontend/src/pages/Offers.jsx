import { useState, useEffect } from 'react'
import { offers, weeklyDeals } from '../data/offers'

export default function Offers() {
  const [filter, setFilter] = useState('all')
  const [countdown, setCountdown] = useState('')

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

  const filtered = filter === 'all' ? offers : offers.filter(o => o.category === filter)

  return (
    <>
      <section className="offers-hero">
        <div className="container">
          <h1>Special Offers &amp; Deals</h1>
          <p>Save big on your grocery shopping with our exclusive discounts and limited-time offers. Fresh products at unbeatable prices!</p>
          <div className="offer-countdown">
            <i className="fas fa-clock"></i> FLASH SALE: Ends in <span>{countdown}</span>
          </div>
        </div>
      </section>
      <section className="offers-container">
        <div className="offer-filter">
          {['all', 'discount', 'bundle', 'flash', 'weekend', 'new'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All Offers' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="offers-grid">
          {filtered.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-img"><img src={offer.image} alt={offer.title} /></div>
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-validity"><i className="fas fa-calendar-alt"></i> {offer.validity}</div>
                <div className="offer-details">
                  <div>
                    <span className="offer-price">{offer.price}</span>
                    {offer.originalPrice && <span className="offer-original-price">{offer.originalPrice}</span>}
                    <span className="offer-discount">{offer.discount}</span>
                  </div>
                </div>
                <button className="offer-cta">Grab This Offer</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="weekly-deals">
        <div className="offers-container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>This Week's Exclusive Deals</h2>
          {weeklyDeals.map(deal => (
            <div key={deal.id} className="deal-card">
              <div className="deal-img"><img src={deal.image} alt={deal.title} /></div>
              <div className="deal-content">
                <div className="deal-tag">{deal.tag}</div>
                <h3 className="deal-title">{deal.title}</h3>
                <p className="deal-description">{deal.description}</p>
                <div className="offer-details">
                  <div>
                    <span className="offer-price">{deal.price}</span>
                    <span className="offer-discount">{deal.discount}</span>
                  </div>
                  <button className="offer-cta" style={{ width: 'auto', padding: '8px 20px' }}>Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="coupon-section">
        <div className="offers-container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Exclusive Coupon Codes</h2>
          <div className="coupon-box">
            <h3>Use These Codes at Checkout</h3>
            <div className="coupon-code">CHEERS20</div>
            <p className="coupon-desc">Get 20% off on spirits orders above Rs.2000. Valid once per user.</p>
            <button className="copy-coupon" onClick={() => { navigator.clipboard.writeText('CHEERS20'); alert('Copied!') }}>Copy Code</button>
            <div className="coupon-code" style={{ marginTop: 30 }}>SPIRITS50</div>
            <p className="coupon-desc">Get flat Rs.500 off on premium spirits above Rs.3000. New customers only.</p>
            <button className="copy-coupon" onClick={() => { navigator.clipboard.writeText('SPIRITS50'); alert('Copied!') }}>Copy Code</button>
            <p className="coupon-terms">*Coupon codes can be applied at checkout. Only one coupon per order. Valid till 31st March 2026. 🔞 Must be 18+ to purchase alcohol.</p>
          </div>
        </div>
      </section>
    </>
  )
}
