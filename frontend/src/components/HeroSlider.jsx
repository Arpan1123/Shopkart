import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Fresh Groceries, Delivered Fast',
    description: 'From farm-fresh fruits to premium meats — everything you need for daily life. Get 20% off your first order!',
    buttonText: 'Shop Groceries',
    buttonLink: '/fruits',
    buttonClass: 'btn',
  },
  {
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Weekend Party Deals 🎉',
    description: 'Craft beers, cocktail kits, and party combos at unbeatable prices. Make every weekend legendary.',
    buttonText: 'View Deals',
    buttonLink: '/offers',
    buttonClass: 'btn',
  },
  {
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Farm Fresh. Every Day. 🌿',
    description: 'Hand-picked seasonal fruits, crisp vegetables, and organic produce. Delivered straight from the farm to your table.',
    buttonText: 'Explore Produce',
    buttonLink: '/fruits',
    buttonClass: 'btn btn-secondary',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-slider">
      <div className="container">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.image}')`,
              }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <Link to={slide.buttonLink} className={slide.buttonClass}>
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
