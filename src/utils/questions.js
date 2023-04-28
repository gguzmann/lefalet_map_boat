import continent from '../geojson/continent.json'
import * as turf from '@turf/turf'

export function getBoundsFromCoord (coord, width, angle) {
  const lat = coord.lat
  const lng = coord.lng
  const halfWidth = width / 2
  const radians = (angle * Math.PI) / 180
  const latSI = lat + (halfWidth * Math.cos(radians)) / 111111
  const lngSI = lng - (halfWidth * Math.sin(radians)) / (111111 * Math.cos(latSI * (Math.PI / 180)))
  const latID = lat - (halfWidth * Math.cos(radians)) / 111111
  const lngID = lng + (halfWidth * Math.sin(radians)) / (111111 * Math.cos(latID * (Math.PI / 180)))
  console.log([
    [latSI, lngSI],
    [latID, lngID]
  ])
  return [
    [latSI, lngSI],
    [latID, lngID]
  ]
}

export function generateSquare (center, size, boat) {
  const halfSize = size / 2
  const lat = center[0]
  const lng = center[1]
  const coordinates = [
    [
      [lat + halfSize, lng - halfSize],
      [lat - halfSize, lng - halfSize],
      [lat - halfSize, lng + halfSize],
      [lat + halfSize, lng + halfSize],
      [lat + halfSize, lng - halfSize]
    ]
  ]
  const geoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates
        },
        properties: {
          name: 'Portland',
          popupContent: 'asd'
          // popupContent: parseInt(getDistanceFromLatLonInKm(center[0], boat[0], center[1], boat[1])) + ' km'
        }
      }
    ]
  }
  return geoJson
}

export function onEachFeature (feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent)
  }
  layer.on({
    click: () => {
      console.log(feature.properties.popupContent)
    }
  })
}

export function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  const R = 6371 // Radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1) // Conversión de grados a radianes
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distancia en km
  return distance
}

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export const preguntas = [
  { id: 1, pos: [15.178180945596363, -76.51977539062501] }, { id: 2, pos: [15.0827316716058, -79.6728515625] }
]

export const questions = [
  {
    id: 1,
    question: '¿Qué ciudad es la capital de Australia?',
    answer: 'Canberra',
    incorrect: ['Melbourne', 'Sydney', 'Brisbane']
  },
  {
    id: 2,
    question: '¿En qué país se encuentra la Torre Eiffel?',
    answer: 'Francia',
    incorrect: ['Italia', 'Alemania', 'España']
  },
  {
    id: 3,
    question: '¿Qué instrumento se utiliza para medir la presión arterial?',
    answer: 'Esfigmomanómetro',
    incorrect: ['Termómetro', 'Estetoscopio', 'Oxímetro']
  },
  {
    id: 4,
    question: '¿Cuál es el río más largo del mundo?',
    answer: 'El Nilo',
    incorrect: ['El Amazonas', 'El Yangtze', 'El Misisipi']
  },
  {
    id: 5,
    question: '¿Quién escribió la novela "Cien años de soledad"?',
    answer: 'Gabriel García Márquez',
    incorrect: ['Mario Vargas Llosa', 'Julio Cortázar', 'Pablo Neruda']
  },
  {
    id: 6,
    question: '¿Cuál es el metal más caro del mundo?',
    answer: 'Rodio',
    incorrect: ['Oro', 'Platino', 'Paladio']
  },
  {
    id: 7,
    question: '¿Cuál es el único mamífero capaz de volar?',
    answer: 'Murciélago',
    incorrect: ['Pájaro carpintero', 'Mariposa', 'Abeja']
  },
  {
    id: 8,
    question: '¿En qué país se encuentra la ciudad de Marrakech?',
    answer: 'Marruecos',
    incorrect: ['Egipto', 'Arabia Saudita', 'Túnez']
  },
  {
    id: 9,
    question: '¿Quién pintó el famoso cuadro "La noche estrellada"?',
    answer: 'Vincent van Gogh',
    incorrect: ['Pablo Picasso', 'Leonardo da Vinci', 'Salvador Dalí']
  },
  {
    id: 10,
    question: '¿En qué año llegó el hombre a la Luna?',
    answer: '1969',
    incorrect: ['1971', '1967', '1973']
  },
  {
    id: 11,
    question: '¿Cuál es el océano más grande del mundo?',
    answer: 'Océano Pacífico',
    incorrect: ['Océano Atlántico', 'Océano Índico', 'Océano Ártico']
  },
  {
    id: 12,
    question: '¿Quién fue el primer presidente de los Estados Unidos?',
    answer: 'George Washington',
    incorrect: ['Abraham Lincoln', 'Thomas Jefferson', 'John F. Kennedy']
  },
  {
    id: 13,
    question: '¿Qué gas es necesario para la combustión?',
    answer: 'Oxígeno',
    incorrect: ['Dióxido de carbono', 'Nitrógeno', 'Helio']
  },
  {
    id: 14,
    question: '¿En qué país se encuentra la ciudad de Petra?',
    answer: 'Jordania',
    incorrect: ['Israel', 'Líbano', 'Siria']
  }
]

export function getRandomPosition (index) {
  const bounds = [-90, -180, 90, 180] // Coordenadas máximas y mínimas del mapa
  const positions = []
  let i = 0
  while (i < index) {
    // Generamos una posición aleatoria dentro de los límites del mapa
    const lat = Math.random() * (bounds[2] - bounds[0]) + bounds[0]
    const lng = Math.random() * (bounds[3] - bounds[1]) + bounds[1]
    const coords = [lat, lng]
    const point = turf.point(coords)
    const arr = []
    continent.features.forEach(feature => {
      const cantMove = feature.geometry.coordinates.map(x => {
        const data = x[0].map(y => [y[1], y[0]])
        const poly = turf.polygon([data])
        const test = turf.pointsWithinPolygon(point, poly)
        // console.log(test)
        const intersArray = test.features.map(d => d.geometry.coordinates)
        // console.log('test', intersArray)
        if (intersArray.length === 0) return 1
        return 0
      })
      arr.push(cantMove.some(x => x === 0))
    })
    if (!arr.includes(true)) {
      positions.push(coords) // Agregamos la posición al arreglo
      i++
    } else {
      console.log('en continente')
    }
  }
  console.log(positions)

  return positions
}
