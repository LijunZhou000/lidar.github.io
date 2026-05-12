import { useState, useMemo } from 'react'
import './Carousel.css'

export default function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0)

  const slides = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, bg: undefined } : img)),
    [images]
  )

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  if (!slides.length) return null

  return (
    <div className="carousel" aria-roledescription="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="carousel-slide"
            style={{ background: slide.bg || 'transparent' }}
            aria-hidden={i !== current}
          >
            <img src={slide.src} alt={`Vista ${i + 1}`} className="carousel-img" />
          </div>
        ))}
      </div>

      <button type="button" className="carousel-btn prev" onClick={prev} aria-label="Anterior">
        <span aria-hidden="true">◀</span>
      </button>
      <button type="button" className="carousel-btn next" onClick={next} aria-label="Siguiente">
        <span aria-hidden="true">▶</span>
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
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