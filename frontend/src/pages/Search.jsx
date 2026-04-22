import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'
import { searchProducts } from '../utils/api'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) { setResults([]); return }

    setLoading(true)
    searchProducts(query)
      .then(data => {
        if (data && data.length > 0) {
          setResults(data)
        } else {
          // Fallback: search static data
          const allProds = Object.values(allProducts).flat()
          const local = allProds.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
          )
          setResults(local)
        }
      })
      .catch(() => {
        const allProds = Object.values(allProducts).flat()
        const local = allProds.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
        )
        setResults(local)
      })
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div className="container" style={{ padding: '40px 15px' }}>
      <h1 style={{ marginBottom: 10 }}>
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>
      <p style={{ marginBottom: 30, color: 'var(--gray)' }}>
        {loading ? 'Searching...' : `${results.length} product(s) found`}
      </p>

      {loading ? (
        <div className="products-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="product-card skeleton" style={{ height: 300, borderRadius: 16, background: 'var(--glass)' }} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="products-grid">
          {results.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        query && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <i className="fas fa-search" style={{ fontSize: '4rem', color: '#e0e0e0', marginBottom: 20, display: 'block' }}></i>
            <h2>No products found</h2>
            <p>Try searching with different keywords</p>
          </div>
        )
      )}
    </div>
  )
}
