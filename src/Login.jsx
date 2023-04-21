import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { socket } from './utils/socket'
import { useStore } from './contexts/storeContext'

export const Login = () => {
  const { setName, user } = useStore()
  const loginSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    handleClose()
    socket.emit('connec', user.name)
  }

  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Bienvenido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={loginSubmit}>
          <Form.Label>Ingrese su nombre:</Form.Label>

          <Form.Control autoFocus onChange={(e) => setName(e.target.value)} required />
          <hr />
          <div className='d-flex justify-content-center'>
            <Button variant='primary' type='submit'>Entrar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
