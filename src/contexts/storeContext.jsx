import { createContext, useContext, useState } from 'react'

export const storeContext = createContext()

export const useStore = () => useContext(storeContext)

export function StoreProvider ({ children }) {
  const [user, setUser] = useState({
    id: '',
    name: ''
  })

  const setName = (name) => {
    setUser({ ...user, name })
  }
  return (
    <storeContext.Provider value={{ user, setName }}>
      {children}
    </storeContext.Provider>
  )
}
