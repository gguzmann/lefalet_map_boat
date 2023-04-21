import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker } from 'react-leaflet'
import oceans from '../geojson/oceans.json'
import continent from '../geojson/continent.json'
import { BoatPrefab } from './BoatPrefab'
import { ClickMove } from './ClickMove'
import { socket } from '../utils/socket'
import { useStore } from '../contexts/storeContext'

const Map = () => {
  const [boats, setBoats] = useState([])
  const [move, setMove] = useState(false)
  const [path, setPath] = useState([])
  const [prePath, setPrePath] = useState([])
  const [colorPath, setColorPath] = useState('red')

  useEffect(() => {
    const showBoats = (data, playerId) => {
      data[playerId].player = true
      console.log(data)
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

  const center = [13.408904896098697, -77.69531250000001]
  return (
    <>
      <MapContainer id='map' center={center} zoom={7} scrollWheelZoom={false} zoomControl minZoom={5}>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
        /> */}
        {
          boats.length > 0 &&
          boats.map(boat => <BoatPrefab key={boat.id} datos={boat} data={boat.position} player={boat.player} move={move} setMove={setMove} setPath={setPath} />)
        }

        {/* <Marker position={center} draggable /> */}
        <Polyline positions={path} dashArray={10} />
        <Polyline positions={prePath} dashArray={10} pathOptions={{ color: colorPath }} />

        {/* <GeoJSON data={oceans} eventHandlers={{ click: (e) => clickMove(e) }} /> */}
        <GeoJSON data={continent} />
        <ClickMove
          setPrePath={setPrePath}
          setColorPath={setColorPath}
          boats={boats}
          move={move}
        />
      </MapContainer>
    </>
  )
}

export default Map
