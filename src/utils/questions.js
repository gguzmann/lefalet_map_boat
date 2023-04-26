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
    question: '¿Qué ciudad es la capital de Australia?',
    answer: 'Canberra',
    incorrect: ['Melbourne', 'Sydney', 'Brisbane']
  },
  {
    question: '¿En qué país se encuentra la Torre Eiffel?',
    answer: 'Francia',
    incorrect: ['Italia', 'Alemania', 'España']
  },
  {
    question: '¿Qué instrumento se utiliza para medir la presión arterial?',
    answer: 'Esfigmomanómetro',
    incorrect: ['Termómetro', 'Estetoscopio', 'Oxímetro']
  },
  {
    question: '¿Cuál es el río más largo del mundo?',
    answer: 'El Nilo',
    incorrect: ['El Amazonas', 'El Yangtze', 'El Misisipi']
  },
  {
    question: '¿Quién escribió la novela "Cien años de soledad"?',
    answer: 'Gabriel García Márquez',
    incorrect: ['Mario Vargas Llosa', 'Julio Cortázar', 'Pablo Neruda']
  },
  {
    question: '¿Cuál es el metal más caro del mundo?',
    answer: 'Rodio',
    incorrect: ['Oro', 'Platino', 'Paladio']
  },
  {
    question: '¿Cuál es el único mamífero capaz de volar?',
    answer: 'Murciélago',
    incorrect: ['Pájaro carpintero', 'Mariposa', 'Abeja']
  },
  {
    question: '¿En qué país se encuentra la ciudad de Marrakech?',
    answer: 'Marruecos',
    incorrect: ['Egipto', 'Arabia Saudita', 'Túnez']
  },
  {
    question: '¿Quién pintó el famoso cuadro "La noche estrellada"?',
    answer: 'Vincent van Gogh',
    incorrect: ['Pablo Picasso', 'Leonardo da Vinci', 'Salvador Dalí']
  },
  {
    question: '¿En qué año llegó el hombre a la Luna?',
    answer: '1969',
    incorrect: ['1971', '1967', '1973']
  },
  {
    question: '¿Cuál es el océano más grande del mundo?',
    answer: 'Océano Pacífico',
    incorrect: ['Océano Atlántico', 'Océano Índico', 'Océano Ártico']
  },
  {
    question: '¿Quién fue el primer presidente de los Estados Unidos?',
    answer: 'George Washington',
    incorrect: ['Abraham Lincoln', 'Thomas Jefferson', 'John F. Kennedy']
  },
  {
    question: '¿Qué gas es necesario para la combustión?',
    answer: 'Oxígeno',
    incorrect: ['Dióxido de carbono', 'Nitrógeno', 'Helio']
  },
  {
    question: '¿En qué país se encuentra la ciudad de Petra?',
    answer: 'Jordania',
    incorrect: ['Israel', 'Líbano', 'Siria']
  }
]
