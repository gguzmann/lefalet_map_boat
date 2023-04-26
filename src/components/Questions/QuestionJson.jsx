import React from 'react'
import { preguntas } from '../../utils/questions'
import { Marker, Popup } from 'react-leaflet'
import { distance } from '@turf/turf'

export const QuestionJson = ({ boat, zoom }) => {
  return (
    <>
      {
        zoom > 6 &&
      preguntas.map((x, i) =>
        <Marker key={x.id} position={x.pos}>
          <Popup>
            {distance([boat.lat, boat.lng], x.pos).toFixed(1) + ' KM'}
          </Popup>
        </Marker>
      )
    }
    </>
  )
}
