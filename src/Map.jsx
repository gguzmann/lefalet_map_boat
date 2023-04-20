import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, Polygon, useMapEvent } from 'react-leaflet'
import oceans from './oceans.json'
import continent from './continent.json'
import { socket } from './socket'
import { BoatPrefab } from './BoatPrefab'
import * as turf from '@turf/turf'
const Map = () => {
  const [boats, setBoats] = useState([])
  const [move, setMove] = useState(false)
  const [path, setPath] = useState([])
  const [prePath, setPrePath] = useState([])
  const [colorPath, setColorPath] = useState('red')

  const ClickMove = () => {
    useMapEvent({
      click: (e) => {
        if (move) return false
        setPrePath([[boats[0].position.lat, boats[0].position.lng], [e.latlng.lat, e.latlng.lng]])
        const arr = []
        const path = turf.lineString([[boats[0].position.lat, boats[0].position.lng], [e.latlng.lat, e.latlng.lng]])
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

  useEffect(() => {
    const showBoats = (data, playerId) => {
      data[playerId].player = true
      setBoats(boats => Object.values(data))
    }

    socket.on('conn', (users) => {
      showBoats(users, socket.id)
    })
    socket.on('positions', (users) => {
      showBoats(users, socket.id)
    })

    socket.on('disconn', users => {
      showBoats(users, socket.id)
    })
  }, [])

  const center = [51.505, -0.09]
  return (
    <>
      <MapContainer id='map' center={center} zoom={3} scrollWheelZoom={false}>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
        /> */}
        {
          boats.length > 0 &&
          boats.map(boat => <BoatPrefab key={boat.id} data={boat.position} player={boat.player} move={move} setMove={setMove} setPath={setPath} />)
        }

        <Marker position={center} draggable />
        <Polyline positions={path} dashArray={10} />
        <Polyline positions={prePath} dashArray={10} pathOptions={{ color: colorPath }} />

        {/* <GeoJSON data={oceans} eventHandlers={{ click: (e) => clickMove(e) }} /> */}
        <GeoJSON data={continent} />
        <ClickMove />
      </MapContainer>
    </>
  )
}

export default Map
