// Cuando tengas las imágenes en src/assets/, importa así:
// import lidar2dHero from '../assets/lidar-2d-hero.png'
// import lidar2d1 from '../assets/lidar-2d-1.png'
// y reemplaza las URLs de placeholder

import lidar2d1 from '../assets/lidar2d_screen.png'
import lidar2d2 from '../assets/lidar2d_esquema.png'
import lidar2d0 from '../assets/lidar2d_comps.png'

const PH = (label) =>
  `https://placehold.co/800x600/1a1a1a/646cff?text=${encodeURIComponent(label)}`

export const PRODUCTS = [
  {
    id: 'lidar-2d',
    name: 'Lidar 2D',
    price: 999,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    heroImage: lidar2d0,
    images: [
      { src: lidar2d0, bg: '#f8f8f8' },
      { src: lidar2d1, bg: '#eeeeee' },
      { src: lidar2d2, bg: '#eeeeee' },
    ],
  },
  {
    id: 'lidar-3d',
    name: 'Lidar 3D',
    price: 2499,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    heroImage: PH('Lidar 3D'),
    images: [PH('Lidar 3D — Vista 1'), PH('Lidar 3D — Vista 2'), PH('Lidar 3D — Vista 3')],
  },
]