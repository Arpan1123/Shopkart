import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="main-navbar">
      <div className="container navbar-container">
        <div className="departments-dropdown">
          <i className="fas fa-bars"></i>
          <span>Shop by Department</span>
        </div>
        
        <ul className="nav-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/offers" className="highlight-link"><i className="fas fa-tag"></i> Today's Deals</NavLink></li>
          <li><NavLink to="/fruits">Fruits & Veg</NavLink></li>
          <li><NavLink to="/meat">Meat</NavLink></li>
          <li><NavLink to="/seafood">Seafood</NavLink></li>
          <li><NavLink to="/dairy">Dairy</NavLink></li>
          <li><NavLink to="/bakery">Bakery</NavLink></li>
        </ul>
        
        <div className="nav-contact">
          <i className="fas fa-phone-alt"></i>
          <span>1-800-SHOP</span>
        </div>
      </div>
    </nav>
  )
}
