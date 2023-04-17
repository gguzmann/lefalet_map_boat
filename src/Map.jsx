import React, { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Polyline, Marker, Popup, useMapEvent } from 'react-leaflet'
import oceans from './oceans.json'
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker'
import { customMarker } from './icons'
import { Avion } from './Avion'
import { Barco } from './Barco'

const Map = () => {
  const [position, setPosition] = useState([13.408904896098697, -77.69531250000001])
  const [move, setMove] = useState(false)
  const [camino, setCamino] = useState([])
  const [currentTrack, setCurrentTrack] = useState({
    lat: position[0],
    lng: position[1]
  })

  const clickMove = (e) => {
    if (move) return false
    setMove(true)
    setPosition(e.latlng)
    setCurrentTrack(e.latlng)
    setCamino([position, [e.latlng.lat, e.latlng.lng]])
    console.log('move', e.latlng)
    // console.log(move)
  }

  return (
    <>
      <MapContainer id='map' center={position} zoom={7} scrollWheelZoom={false}>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
        /> */}
        {/* <Barco position={position} /> */}
        <Avion data={currentTrack} setCamino={setCamino} camino={camino} position={position} move={move} setMove={setMove} />
        <Polyline positions={camino} dashArray={10} />
        {/* <ReactLeafletDriftMarker position={position} duration={1000} keepAtCenter icon={customMarker} /> */}
        <GeoJSON data={oceans} eventHandlers={{ click: (e) => clickMove(e) }} />
      </MapContainer>
    </>
  )
}

export default Map
