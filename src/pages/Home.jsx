import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <section className="hero-section">
        <p className="hero-eyebrow">Precision sensing technology</p>
        <h1 className="hero-title">
          See the world<br />
          <span>in three dimensions</span>
        </h1>
        <p className="hero-sub">
          High-performance LiDAR systems for robotics, mapping and autonomous systems.
        </p>
        {/* <Link to={`/product/${PRODUCTS[0].id}`} className="hero-cta">
          Explore products
        </Link> */}
      </section>

      <div className="ticks" />

      <section className="products-section">
        <h2 className="section-title">Our products</h2>
        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >
              <div className="product-card-img">
                <img src={product.heroImage} alt={product.name} />
              </div>
              <div className="product-card-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="product-card-price">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}