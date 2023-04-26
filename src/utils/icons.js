import L, { Icon } from 'leaflet'

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
  iconUrl: './pirate.png',
  iconRetinaUrl: './pirate.png',
  iconSize: [60, 30]
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
// export const VenueLocationIcon = L.icon({
//     iconUrl: require('../assets/venue_location_icon.svg'),
//     iconRetinaUrl: require('../assets/venue_location_icon.svg'),
//     iconAnchor: null,
//     shadowUrl: null,
//     shadowSize: null,
//     shadowAnchor: null,
//     iconSize: [35, 35],
//     className: 'leaflet-venue-icon'
//   });
