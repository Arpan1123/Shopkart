import { Link } from 'react-router-dom'

export default function Footer() {
  return (
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
              <li><a href="#">About Us</a></li>
              <li><Link to="/fruits">Shop</Link></li>
              <li><Link to="/drinks">🔞 Premium Drinks</Link></li>
              <li><Link to="/offers">Offers</Link></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return &amp; Refund</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
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
  )
}
