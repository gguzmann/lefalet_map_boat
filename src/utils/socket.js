import { io } from 'socket.io-client'

export const socket = io('https://leaflet-server-map.onrender.com/')
// export const socket = io('http://localhost:3131/')
// export const socket = io('http://192.168.100.5:3131/')
