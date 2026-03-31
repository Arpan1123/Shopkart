import { Link } from 'react-router-dom'

export default function CategoryCard({ icon, title, description, to }) {
  return (
    <Link to={to} className="category-btn">
      <div className="category-card">
        <div className="category-icon">
          <i className={icon}></i>
        </div>
        <h3 style={{ color: 'black' }}>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  )
}
