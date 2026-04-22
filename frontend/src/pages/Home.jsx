import { useState, useEffect } from 'react'
import HeroSlider from '../components/HeroSlider'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import { categories, featuredProducts } from '../data/products'
import { fetchProducts } from '../utils/api'

export default function Home() {
  const [apiProducts, setApiProducts] = useState(null) // null = not yet fetched
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(data => {
        if (data && data.length > 0) setApiProducts(data.slice(0, 4))
        else setApiProducts(null)
      })
      .catch(() => setApiProducts(null))
      .finally(() => setLoading(false))
  }, [])

  // Use API products if available, fall back to static data
  const displayProducts = apiProducts || featuredProducts
  const mainFeature = displayProducts[0]
  const sideFeatures = displayProducts.slice(1, 4)

  return (
    <>
      <HeroSlider />
      
      <section className="section">
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title">The Masterpiece Collection</h2>
            <p className="section-subtitle">Hand-picked premium selections of the week.</p>
          </div>
          
          {loading ? (
            <div className="featured-showcase">
              <div className="showcase-main skeleton" style={{ borderRadius: 20, background: 'var(--glass)', minHeight: 320 }} />
              <div className="showcase-side">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="product-card skeleton" style={{ height: 280, borderRadius: 16, background: 'var(--glass)' }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="featured-showcase">
              {/* Massive Masterpiece Card */}
              {mainFeature && (
                <div className="showcase-main">
                  <div className="showcase-main-img">
                    <img src={mainFeature.image} alt={mainFeature.name} />
                  </div>
                  <div className="showcase-main-content">
                    <div className="product-badge seasonal">Flagship Choice</div>
                    <h3 className="showcase-title">{mainFeature.title}</h3>
                    <p className="showcase-desc">{mainFeature.description || 'Experience the absolute pinnacle of fresh quality.'}</p>
                    <div className="showcase-price">
                      <span className="current-price">{mainFeature.currentPrice || mainFeature.price}</span>
                      {mainFeature.originalPrice && <span className="original-price">{mainFeature.originalPrice}</span>}
                    </div>
                    <button className="add-to-cart showcase-btn">
                      <i className="fas fa-shopping-bag"></i> Add to Collection
                    </button>
                  </div>
                </div>
              )}
              
              {/* Side Grid */}
              <div className="showcase-side">
                {sideFeatures.map(product => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop By Category</h2>
          <div className="categories">
            {categories.map((cat) => (
              <CategoryCard key={cat.to} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
