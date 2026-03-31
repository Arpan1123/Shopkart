import HeroSlider from '../components/HeroSlider'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import { categories, featuredProducts } from '../data/products'

export default function Home() {
  const mainFeature = featuredProducts[0];
  const sideFeatures = featuredProducts.slice(1, 4); // Take next 3 for the side grid

  return (
    <>
      <HeroSlider />
      
      <section className="section">
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title">The Masterpiece Collection</h2>
            <p className="section-subtitle">Hand-picked premium selections of the week.</p>
          </div>
          
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
                    <span className="current-price">{mainFeature.currentPrice}</span>
                    {mainFeature.originalPrice && <span className="original-price">{mainFeature.originalPrice}</span>}
                  </div>
                  <button className="add-to-cart showcase-btn">
                    <i className="fas fa-shopping-bag"></i> Add to Collection
                  </button>
                </div>
              </div>
            )}
            
            {/* Side Grid for remaining featured items */}
            <div className="showcase-side">
              {sideFeatures.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
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
