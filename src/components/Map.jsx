import React, { useEffect, useState } from 'react'
import { MapContainer, GeoJSON, Polyline } from 'react-leaflet'
import continent from '../geojson/continent.json'
import { BoatPrefab } from './BoatPrefab'
import { ClickMove } from './ClickMove'
import { socket } from '../utils/socket'
import { getDistanceFromLatLonInKm } from '../utils/questions'
import { QuestionJson } from './Questions/QuestionJson'

const Map = () => {
  const [boats, setBoats] = useState([])
  const [move, setMove] = useState(false)
  const [path, setPath] = useState([])
  const [prePath, setPrePath] = useState([])
  const [colorPath, setColorPath] = useState('red')
  const [zoom, setZoom] = useState(7)
  const [positionsQuestion, setPositionsQuestion] = useState([])

  useEffect(() => {
    console.log(getDistanceFromLatLonInKm(13.408904896098697, -70.62011718750001, -77.69531250000001, 15.411319377981005), 'KM')

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

    socket.on('questionsPosition', (positions) => {
      setPositionsQuestion(position => positions)
      console.log('quiestion Position', positions.length)
    })
  }, [])

  const center = [13.408904896098697, -77.69531250000001]
  return (
    <>
      <MapContainer id='map' center={center} zoom={6} scrollWheelZoom={false} zoomControl minZoom={2} zoomAnimation={false}>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
        /> */}
        {
          boats.length > 0 &&
            boats.map(boat => <BoatPrefab key={boat.id} datos={boat} data={boat.position} player={boat.player} move={move} setMove={setMove} setPath={setPath} />)
        }
        {
          boats.length > 0 &&
            <QuestionJson boat={boats.find(x => x.id === socket.id).position} positions={positionsQuestion} zoom={zoom} />
        }

        <Polyline positions={path} dashArray={10} />
        <Polyline positions={prePath} dashArray={10} pathOptions={{ color: colorPath }} />

        {/* <GeoJSON data={oceans} eventHandlers={{ click: (e) => clickMove(e) }} /> */}
        <GeoJSON data={continent} />
        {/* <GeoJSON data={generateSquare([center[1], center[0]], 0.1, 0.1)} /> */}
        {

          // getRandomPosition(300).map((x, i) => <Marker key={i} position={x} />)
          // positionsQuestion.map((x, i) => <Marker key={i} position={x} />)
        }

        <ClickMove
          setPrePath={setPrePath}
          setColorPath={setColorPath}
          boats={boats}
          move={move}
          setZoom={setZoom}
        />
      </MapContainer>
    </>
  )
}

export default Map
