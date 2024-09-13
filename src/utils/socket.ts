import { io } from 'socket.io-client'

const URL = '.'

export const socket = io(URL, {
  autoConnect: false,
  query: { clientId: 'TEST_CLIENT' }, // This gets updated later on with client code.
  transports: ['websocket', 'polling', 'flashsocket'],
})
