import React, { useEffect, useRef, useState } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { customMarker } from './icons'

export const Barco = ({ position }) => {
  const map = useMap()

  const marker1 = L.marker([38.9072, -77.0369]).addTo(map)
  useEffect(() => {
    marker1.setLatLng(position)
  }, [position])

  return null
}
