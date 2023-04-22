import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

export const Test = () => {
  const startPos = [13.408904896098697, -77.69531250000001]

  return (
    <>
      <MapContainer id='map' center={startPos} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MyMarkerList startPos={startPos} />
      </MapContainer>
    </>
  )
}

const MyMarkerList = ({ startPos }) => {
  const [positions, setPositions] = useState(calcPositions(startPos, 4))
  function calcPositions (startPos, numOfPos) {
    return [...Array(numOfPos)].map((v, i) => {
      return [startPos[0], startPos[1] + 0.01 * (i + 1)]
    })
  }
  function handleDrag (e) {
    const latLng = e.target.getLatLng()
    setPositions(calcPositions([latLng.lat, latLng.lng], 4))
  }

  return (
    <>
      <Marker
        position={startPos}
        draggable
        ondrag={(e) => {
          handleDrag(e)
          console.log('a')
        }}
        onclick={() => console.log('asd')}
      />
      {positions.map((pos, i) => (
        <Marker key={i} position={pos} />
      ))}
    </>
  )
}
