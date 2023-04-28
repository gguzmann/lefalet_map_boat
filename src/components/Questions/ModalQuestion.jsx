import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { questions } from '../../utils/questions'
import { socket } from '../../utils/socket'

export const ModalQuestion = ({ id, show, handleClose, setActive, position }) => {
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const quest = questions.find(x => x.id === id)
    setQuestion(quest)
    setAnswers([...quest.incorrect, quest.answer])
    // console.log(quest.answer)
  }, [])

  const selectAnswer = (qid, answer) => {
    // console.log(id, answer)
    if (answer === question.answer) {
      console.log('Answer correct!')
      socket.emit('QuestionResponse', position)
    }
    setActive(false)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{question.question}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          answers.length > 0 &&
          answers.sort(x => Math.random() - 0.5).map((x, i) => <div className='' key={i}><Button className='w-100 m-2' variant='outline-primary' onClick={() => selectAnswer(question.id, x)}> {x} </Button></div>)
        }

      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
