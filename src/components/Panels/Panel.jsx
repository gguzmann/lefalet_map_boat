import React, { useEffect, useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { useStore } from '../../contexts/storeContext'

export const Panel = ({ move, setMove }) => {
// export const Panel = () => {
  const { changeEnergy, energy } = useStore()

  useEffect(() => {
    if (!move) return
    const time = setInterval(() => {
      changeEnergy(-1)
    }, 300)
    return () => clearInterval(time)
  }, [move])

  const handleEnergy = () => changeEnergy(10)
  return (
    <div className='panel'>
      <ProgressBar now={energy} label={energy} />
      <div className='d-flex justify-content-center'>
        {/* <Button onClick={handleEnergy}>+</Button> */}
      </div>
    </div>
  )
}
