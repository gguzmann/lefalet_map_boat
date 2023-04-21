import { useMapEvent } from 'react-leaflet'
import * as turf from '@turf/turf'
import continent from '../geojson/continent.json'
import { socket } from '../utils/socket'

export const ClickMove = ({ setColorPath, setPrePath, boats, move }) => {
  useMapEvent({
    click: (e) => {
    //   console.log([e.latlng.lat, e.latlng.lng])
      if (move) return false
      const boat = boats.find(x => x.id === socket.id)
      setPrePath([[boat.position.lat, boat.position.lng], [e.latlng.lat, e.latlng.lng]])
      const arr = []
      const path = turf.lineString([[boat.position.lat, boat.position.lng], [e.latlng.lat, e.latlng.lng]])
      continent.features.forEach(feature => {
        const cantMove = feature.geometry.coordinates.map(x => {
          const data = x[0].map(y => [y[1], y[0]])
          const poly = turf.polygon([data])
          const test = turf.lineIntersect(path, poly)
          const intersArray = test.features.map(d => d.geometry.coordinates)
          // console.log('test', intersArray)
          if (intersArray.length === 0) return 1
          return 0
        })
        arr.push(cantMove.some(x => x === 0))
      })

      if (!arr.includes(true)) {
        socket.emit('newPosition', { coords: e.latlng })
        setColorPath('lime')
      } else {
        setColorPath('red')
      }
    }
  })
}
