// Cuando tengas las imágenes en src/assets/, importa así:
// import lidar2dHero from '../assets/lidar-2d-hero.png'
// import lidar2d1 from '../assets/lidar-2d-1.png'
// y reemplaza las URLs de placeholder

import lidar2d1 from '../assets/lidar2d_screen.png'
import lidar2d2 from '../assets/lidar2d_esquema.png'
import lidar2d0 from '../assets/lidar2d_comps.png'
import lidar2d3 from '../assets/lidar_2d_demo.gif'

import lidar3d1 from '../assets/lidar3d_esquema.jpeg'
import lidar3d0 from '../assets/lidar3d_comps.jpeg'

const PH = (label) =>
  `https://placehold.co/800x600/1a1a1a/646cff?text=${encodeURIComponent(label)}`

export const PRODUCTS = [
  {
    id: 'lidar-2d',
    name: 'Lidar 2D montado',
    price: 150,
    description:
      'El sistema desarrollado se basa en un Arduino Uno R3 conectado a un sensor LiDAR TF-Luna, configurado como un dispositivo portátil tipo pistola de medición.',
    heroImage: lidar2d0,
    images: [
      { src: lidar2d0, bg: '#f8f8f8' },
      { src: lidar2d1, bg: '#eeeeee' },
      { src: lidar2d2, bg: '#eeeeee' },
      { src: lidar2d3, bg: '#000000' },
    ],
  },
  {
    id: 'lidar-2d-diy',
    name: 'Lidar 2D DIY (piezas)',
    price: 100,
    description:
      'El sistema desarrollado se basa en un Arduino Uno R3 conectado a un sensor LiDAR TF-Luna, configurado como un dispositivo portátil tipo pistola de medición.',
    heroImage: lidar2d0,
    images: [
      { src: lidar2d0, bg: '#f8f8f8' },
      { src: lidar2d1, bg: '#eeeeee' },
      { src: lidar2d2, bg: '#eeeeee' },
      { src: lidar2d3, bg: '#000000' },
    ],
  },
  {
    id: 'lidar-3d',
    name: 'Lidar 3D montado',
    price: 250,
    description:
      'Utilizamos un sistema de "Pan & Tilt" donde dos servos (controlados por los GPIO de la Raspberry Pi 4) mueven un sensor LiDAR 2D en los ejes horizontal y vertical, permitiendo cubrir un volumen esférico completo.',
    heroImage: lidar3d0,
    images: [
      { src: lidar3d0, bg: '#ffffff' },
      { src: lidar3d1, bg: '#ffffff' },
    ],
  },
  {
    id: 'lidar-3d-diy',
    name: 'Lidar 3D DIY (piezas)',
    price: 200,
    description:
      'Utilizamos un sistema de "Pan & Tilt" donde dos servos (controlados por los GPIO de la Raspberry Pi 4) mueven un sensor LiDAR 2D en los ejes horizontal y vertical, permitiendo cubrir un volumen esférico completo.',
    heroImage: lidar3d0,
    images: [
      { src: lidar3d0, bg: '#ffffff' },
      { src: lidar3d1, bg: '#ffffff' },
    ],
  },
]