import { createContext, useContext, useState } from 'react'

export const storeContext = createContext()

export const useStore = () => useContext(storeContext)

export function StoreProvider ({ children }) {
  const [user, setUser] = useState({
    id: '',
    name: ''
  })
  const [energy, setEnergy] = useState(100)
  const setName = (name) => {
    setUser({ ...user, name })
  }

  const changeEnergy = (count) => {
    setEnergy(energy => energy + count)
  }
  return (
    <storeContext.Provider value={{ user, setName, changeEnergy, energy, setEnergy }}>
      {children}
    </storeContext.Provider>
  )
}
