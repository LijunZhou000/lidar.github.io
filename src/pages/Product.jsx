import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import Carousel from '../components/Carousel'
import './Product.css'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Producto no encontrado.</p>
        <Link to="/">← Volver</Link>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <main className="product-page">
      <Link to="/" className="back-link">← Volver</Link>

      <div className="product-layout">
        <div className="product-carousel-col">
          <Carousel images={product.images} />
        </div>

        <div className="product-info-col">
          <p className="product-tag">LiDAR Sensor</p>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-price">
            {product.price.toLocaleString()}€
          </div>
          <button className="add-to-cart-btn" onClick={handleAdd}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </main>
  )
}