import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { allProducts } from '../data/products'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const allProds = Object.values(allProducts).flat()
  const results = query
    ? allProds.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || (p.description && p.description.toLowerCase().includes(query.toLowerCase())))
    : []

  return (
    <div className="container" style={{ padding: '40px 15px' }}>
      <h1 style={{ marginBottom: 10 }}>
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>
      <p style={{ marginBottom: 30, color: 'var(--gray)' }}>{results.length} product(s) found</p>
      {results.length > 0 ? (
        <div className="products-grid">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
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
