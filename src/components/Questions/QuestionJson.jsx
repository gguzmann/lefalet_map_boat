import React, { useState } from 'react'
import { preguntas } from '../../utils/questions'
import { Marker, Popup } from 'react-leaflet'
import { distance } from '@turf/turf'
import { customMarker } from '../../utils/icons'
import { Button } from 'react-bootstrap'
import { ModalQuestion } from './ModalQuestion'

export const QuestionJson = ({ boat, zoom, positions }) => {
  return (
    <>
      {
        zoom >= 6 &&
        positions.map((x, i) => <Cofre key={i} boat={boat} position={x} index={i} />)
      // preguntas.map((x, i) => <Cofre key={i} boat={boat} position={x} index={i} />)
    }
    </>
  )
}

const Cofre = ({ boat, position, index }) => {
  const [msg, setMsg] = useState(0)
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const setDistanceMsg = () => {
    setMsg(distance([boat.lat, boat.lng], position, { units: 'kilometers' }).toFixed(1))
  }
  return (
    <>
      <Marker eventHandlers={{ click: () => setDistanceMsg() }} position={position} icon={customMarker}>
        {
          active &&
            <Popup>
              <h5>Pregunta N°{index}</h5>
              <p className='text-center'>{msg}</p>
              {msg < 100 && <Button variant='primary' className='w-100' onClick={handleShow}>Start</Button>}
            </Popup>
        }
      </Marker>
      <ModalQuestion id={1} show={show} handleClose={handleClose} handleShow={handleShow} setActive={setActive} position={position} />
    </>
  )
}
