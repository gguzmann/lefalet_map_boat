import React from 'react'
import Map from './components/Map'
import { Login } from './Login'
import { Panel } from './components/Panels/Panel'
import { Test } from './Test'
import { ConnectionManager } from './components/ConnectionManager'
// import { socket } from './socket'

const App = () => {
  return (
    <>
      {/* <Test /> */}
      <Login />
      <Map />
      {/* <Panel /> */}
    </>
  )
}

export default App
