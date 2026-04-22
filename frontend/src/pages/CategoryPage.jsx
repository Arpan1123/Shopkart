import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { allProducts, categoryMeta } from '../data/products'
import AgeGate from '../components/AgeGate'
import { fetchProducts } from '../utils/api'

export default function CategoryPage({ category }) {
  const meta = categoryMeta[category] || { name: category, pageTitle: category, pageDescription: '' }
  const [products, setProducts] = useState(allProducts[category] || [])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    setFilter('all')
    fetchProducts(category)
      .then(data => {
        if (data && data.length > 0) setProducts(data)
        else setProducts(allProducts[category] || [])
      })
      .catch(() => setProducts(allProducts[category] || []))
      .finally(() => setLoading(false))
  }, [category])

  const filters = ['all', ...new Set(products.map(p => p.badge?.toLowerCase()).filter(Boolean))]
  const filtered = filter === 'all' ? products : products.filter(p => p.badge?.toLowerCase() === filter)

  const isAdultContent = category === 'drinks'

  const pageContent = (
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
        {loading ? (
          <div className="products-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="product-card skeleton" style={{ height: 300, borderRadius: 16, background: 'var(--glass)' }} />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (isAdultContent) {
    return <AgeGate>{pageContent}</AgeGate>
  }

  return pageContent
}
