import React, { useEffect, useRef, useState } from 'react'
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'
import { Popup } from 'react-leaflet'
import { enemyIcon, playerIcon } from './icons'

export const BoatPrefab = ({ data, player, move, setMove, setPath }) => {
  const { lat, lng } = data
  const [prevPos, setPrevPos] = useState([lat, lng])
  const marker = useRef()

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) {
      setPrevPos([lat, lng])

      if (player) {
        setMove(true)
        setPath([prevPos, [lat, lng]])
      }
    }
  }, [lat, lng, prevPos])

  useEffect(() => {
    const time = setInterval(() => {
      const markerPosition = [marker.current._latlng.lat, marker.current._latlng.lng]
      const clickPosition = [data.lat, data.lng]
      // console.log('movement', markerPosition)

      if (markerPosition[0] === clickPosition[0] && markerPosition[1] === clickPosition[1]) {
        setMove(false)
        setPath([])
      }
    }, 300)

    if (!move) clearInterval(time)
    return () => clearInterval(time)
  }, [move])

  return (
    <LeafletTrackingMarker
      icon={player ? playerIcon : enemyIcon}
      position={[lat, lng]}
      previousPosition={prevPos}
      keepAtCenter={player}
      duration={2000}
      ref={marker}
    >
      <Popup>{'Hello, there! 🐱‍🏍 '}</Popup>
    </LeafletTrackingMarker>
  )
}
