import L from 'leaflet'

import markerIcon from 'leaflet/dist/images/marker-icon.png'

export const iconLocation = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconAnchor: [12, 45],
  popupAnchor: [10, -44]
})

export const myIcon = L.divIcon({
  className: 'my-icon',
  html: '<div class="my-icon-content"></div>',
  iconSize: [10, 10]
})

export const customMarker = L.icon({
  iconUrl: 'https://img.icons8.com/color/256/treasure-chest.png',
  iconRetinaUrl: 'https://img.icons8.com/color/256/treasure-chest.png',
  iconSize: [30, 30]
})

export const enemyIcon = L.icon({
  iconUrl: './pirate.png',
  iconRetinaUrl: './pirate.png',
  iconSize: [60, 30]
})

export const playerIcon = L.icon({
  iconUrl: './ship.png',
  iconRetinaUrl: './ship.png',
  iconSize: [60, 30]
})
