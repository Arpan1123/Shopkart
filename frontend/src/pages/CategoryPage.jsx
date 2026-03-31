import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { allProducts, categoryMeta } from '../data/products'

export default function CategoryPage({ category }) {
  const meta = categoryMeta[category] || { name: category, pageTitle: category, pageDescription: '' }
  const products = allProducts[category] || []
  const [filter, setFilter] = useState('all')

  const filters = ['all', ...new Set(products.map(p => p.badge?.toLowerCase()).filter(Boolean))]
  const filtered = filter === 'all' ? products : products.filter(p => p.badge?.toLowerCase() === filter)

  return (
    <>
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>Categories</span>
          <span>&gt;</span>
          <span className="current">{meta.name}</span>
        </div>
      </div>
      <div className="container">
        <div className="page-header">
          <h1>{meta.pageTitle}</h1>
          <p>{meta.pageDescription}</p>
        </div>
        {filters.length > 1 && (
          <div className="category-filter">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All Products' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        )}
        <h2 className="section-title">{meta.name}</h2>
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
