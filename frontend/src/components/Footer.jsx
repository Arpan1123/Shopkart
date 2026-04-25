import { Link } from 'react-router-dom'
import { useState } from 'react'

const MODALS = {
  about: {
    title: '🛒 About ShopKart',
    content: `ShopKart is your trusted online grocery and premium spirits store based in Kolkata, India. We deliver fresh produce, dairy, meat, seafood, bakery items, and curated drinks right to your doorstep.\n\nFounded with a mission to make quality grocery shopping convenient, we partner with local farmers and premium suppliers to ensure freshness in every order.\n\n📍 Headquarters: Kolkata, West Bengal, India\n📞 +91 8910480474\n✉️ info@shopkart.in`,
  },
  contact: {
    title: '📞 Contact Us',
    content: `We're here to help! Reach us through any of the following:\n\n📞 Phone: +91 8910480474\n✉️ Email: info@shopkart.in\n📍 Address: Kolkata, West Bengal, India\n\n🕐 Support Hours:\nMonday – Saturday: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM\n\nFor urgent queries, please call us directly.`,
  },
  faq: {
    title: '❓ Frequently Asked Questions',
    content: `Q: How fast is delivery?\nA: We deliver within 2–4 hours for orders placed before 6 PM.\n\nQ: What is the minimum order amount?\nA: Minimum order is ₹200.\n\nQ: Do you deliver alcohol?\nA: Yes, only to verified 18+ customers with valid ID proof.\n\nQ: Can I track my order?\nA: Yes, order status is visible in your Account → My Orders section.\n\nQ: Is payment secure?\nA: Absolutely. We use industry-standard encryption for all transactions.`,
  },
  shipping: {
    title: '🚚 Shipping Policy',
    content: `Delivery Charges:\n• Orders above ₹499 — FREE delivery\n• Orders below ₹499 — ₹40 delivery fee\n\nDelivery Times:\n• Standard: 2–4 hours\n• Express: 45–60 minutes (select areas)\n\nCoverage: Currently serving Kolkata and surrounding areas.\n\nNote: Delivery times may vary during peak hours, festivals, or extreme weather conditions. We'll notify you of any delays via SMS/email.`,
  },
  refund: {
    title: '🔄 Return & Refund Policy',
    content: `We want you to be 100% satisfied with your order.\n\nEligible for Return:\n• Damaged or spoiled items on delivery\n• Wrong item delivered\n• Missing items from order\n\nHow to Claim:\n1. Report within 24 hours of delivery\n2. Call +91 8910480474 or email info@shopkart.in\n3. Attach a photo of the issue\n\nRefund Timeline:\n• UPI/Card: 3–5 business days\n• Wallet credit: Instant\n\nNote: Alcohol products are non-returnable once delivered.`,
  },
  privacy: {
    title: '🔒 Privacy Policy',
    content: `ShopKart takes your privacy seriously.\n\nWhat we collect:\n• Name, email, phone number\n• Delivery address\n• Order history\n• Device & usage data\n\nHow we use it:\n• To process and deliver your orders\n• To improve our services\n• To send order updates and offers (opt-out available)\n\nWe NEVER sell your personal data to third parties.\n\nYour data is stored securely and encrypted. You may request deletion of your account data by contacting us at info@shopkart.in.`,
  },
  terms: {
    title: '📄 Terms & Conditions',
    content: `By using ShopKart, you agree to the following:\n\n1. You must be 18+ to purchase alcohol products.\n2. Valid government-issued ID is required for alcohol delivery.\n3. Prices are subject to change without prior notice.\n4. ShopKart reserves the right to cancel orders at its discretion.\n5. Users are responsible for providing accurate delivery information.\n6. Misuse of offers or promo codes may lead to account suspension.\n7. All disputes are subject to Kolkata jurisdiction.\n\nFor the full terms, contact us at info@shopkart.in.`,
  },
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null)
  const modal = activeModal ? MODALS[activeModal] : null

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>ShopKart</h3>
              <p>Your trusted online store for fresh groceries and premium spirits in India. Quality you can trust, delivered to your doorstep.</p>
              <div className="footer-contact">
                <p><i className="fas fa-map-marker-alt"></i> Kolkata, India</p>
                <p><i className="fas fa-phone"></i> +91 8910480474</p>
                <p><i className="fas fa-envelope"></i> info@shopkart.in</p>
                <div className="social-links">
                  <a href="https://www.facebook.com/share/1CXGoD8dDg/?mibextid=wwXIfr" className="social-btn facebook" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
                  </a>
                  <a href="https://www.instagram.com/creepy_sense?igsh=MTFzdnFxeG82eXh6YQ%3D%3D&utm_source=qr" className="social-btn instagram" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><button onClick={() => setActiveModal('about')} style={linkBtnStyle}>About Us</button></li>
                <li><Link to="/fruits">Shop</Link></li>
                <li><Link to="/drinks">🔞 Premium Drinks</Link></li>
                <li><Link to="/offers">Offers</Link></li>
                <li><button onClick={() => setActiveModal('contact')} style={linkBtnStyle}>Contact Us</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul className="footer-links">
                <li><button onClick={() => setActiveModal('faq')} style={linkBtnStyle}>FAQ</button></li>
                <li><button onClick={() => setActiveModal('shipping')} style={linkBtnStyle}>Shipping Policy</button></li>
                <li><button onClick={() => setActiveModal('refund')} style={linkBtnStyle}>Return &amp; Refund</button></li>
                <li><button onClick={() => setActiveModal('privacy')} style={linkBtnStyle}>Privacy Policy</button></li>
                <li><button onClick={() => setActiveModal('terms')} style={linkBtnStyle}>Terms &amp; Conditions</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter to get updates on our latest offers and promotions.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
              <p className="age-disclaimer"><i className="fas fa-exclamation-triangle"></i> Alcohol delivery available only for 18+ customers with valid ID.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 ShopKart. All Rights Reserved. | 🔞 Drink Responsibly. Only for 18+ in India.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modal && (
        <div onClick={() => setActiveModal(null)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'rgba(18,18,26,0.97)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(245,158,11,0.08)',
            maxHeight: '80vh',
            overflowY: 'auto',
            animation: 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f1f1f5', margin: 0 }}>{modal.title}</h2>
              <button onClick={() => setActiveModal(null)} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#9ca3af', width: '36px', height: '36px', borderRadius: '50%',
                cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            </div>
            <div style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-line', fontWeight: 500 }}>
              {modal.content}
            </div>
            <button onClick={() => setActiveModal(null)} style={{
              marginTop: '28px', width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#000', border: 'none', borderRadius: '999px',
              fontWeight: 800, fontSize: '15px', cursor: 'pointer',
              letterSpacing: '0.5px',
            }}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

const linkBtnStyle = {
  background: 'none', border: 'none', padding: 0,
  color: '#94a3b8', fontSize: '15px', fontWeight: 500,
  cursor: 'pointer', textAlign: 'left',
  transition: 'color 0.3s ease',
  fontFamily: 'inherit',
}

