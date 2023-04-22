import React, { useEffect, useRef, useState } from 'react'
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'
import { Popup, Tooltip } from 'react-leaflet'
import { enemyIcon, playerIcon } from '../utils/icons'
import { Panel } from './Panels/Panel'

export const BoatPrefab = ({ datos, player, move, setMove, setPath }) => {
  const { lat, lng } = datos.position
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
      const clickPosition = [datos.position.lat, datos.position.lng]
      // console.log('movement', markerPosition)
      if (markerPosition[0] === clickPosition[0] && markerPosition[1] === clickPosition[1]) {
        if (player) {
          setMove(false)
          setPath([])
        }
      }
    }, 300)

    if (!move) clearInterval(time)
    return () => clearInterval(time)
  }, [move])

  return (
    <>
      {player && <Panel move={move} setMove={setMove} />}
      <LeafletTrackingMarker
        icon={player ? playerIcon : enemyIcon}
        position={[lat, lng]}
        previousPosition={prevPos}
        keepAtCenter={player}
        duration={2000}
        ref={marker}
      >
        <Popup>{'Hello, there! ⛵ '}</Popup>
        <Tooltip permanent direction='top' offset={[20, -20]} opacity={0.5}>{datos.name}</Tooltip>
      </LeafletTrackingMarker>
    </>
  )
}
