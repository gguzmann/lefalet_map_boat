import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { customMarker } from './icons'
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'
import { Popup, useMap } from 'react-leaflet'

export const Avion = ({ data, camino, position, setCamino, move, setMove }) => {
  const { lat, lng } = data
  const [prevPos, setPrevPos] = useState([lat, lng])

  const [pos, setPos] = useState({})
  const marker = useRef()
  // const map = useMap()
  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) {
      setPrevPos([lat, lng])
      setCamino([prevPos, [lat, lng]])
    }
    // setMove(true)

    // console.log(marker.current._latlng, position)
    // map.setView([lat, lng], 3, { animate: true, duration: 2.5 })
    // console.log('barco position: ', marker.current._latlng)
  }, [lat, lng, prevPos])

  useEffect(() => {
    const time = setInterval(() => {
      // console.log('barco position: ', marker.current._latlng)
      // console.log(move)

      const markerPosition = [marker.current._latlng.lat, marker.current._latlng.lng]
      const clickPosition = [position.lat, position.lng]
      console.log(markerPosition, clickPosition)

      console.log(markerPosition[0] == clickPosition[0] && markerPosition[1] == clickPosition[1])
      if (markerPosition[0] == clickPosition[0] && markerPosition[1] == clickPosition[1]) {
        console.log('FINAL')
        setMove(false)
        setCamino([])
        setCamino([])
      }
    }, 300)

    if (!move) clearInterval(time)

    return () => clearInterval(time)
  }, [move])

  return <LeafletTrackingMarker icon={customMarker} position={[lat, lng]} previousPosition={prevPos} keepAtCenter duration={1000} ref={marker}><Popup>{'Hello, there! 🐱‍🏍 '}</Popup></LeafletTrackingMarker>
}
