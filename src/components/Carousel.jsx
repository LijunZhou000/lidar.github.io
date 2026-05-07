import { useState } from 'react'
import './Carousel.css'

export default function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  if (!images.length) return null

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Vista ${i + 1}`} className="carousel-img" />
        ))}
      </div>

      <button type="button" className="carousel-btn prev" onClick={prev} aria-label="Anterior">
        <span aria-hidden="true">◀</span>
      </button>
      <button type="button" className="carousel-btn next" onClick={next} aria-label="Siguiente">
        <span aria-hidden="true">▶</span>
      </button>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}