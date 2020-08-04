import http from 'http'
import socketIO from 'socket.io'

import getColor from '../lib/getColor'

export default function () {
  this.nuxt.hook('render:before', ({ nuxt }) => {
    const server = http.createServer(nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || '0.0.0.0', resolve))
    // close this server on 'close' event
    nuxt.hook('close', () => new Promise(server.close))

    io.on('connection', (socket) => {
      const events = handleEvents(socket)
      for (const event in events) {
        socket.on(event, events[event])
      }
    })
  })
}

const users = {}
const messages = []
let messageId = 0

const handleEvents = socket => ({
  createUser (name, cb) {
    const id = socket.id + Date.now()
    const user = { name, id, color: getColor(id) }
    users[id] = user
    socket.join('active')
    socket.emit('loginUser', user)
    cb()
  },
  loginUser (user, cb) {
    user.color = getColor(user.id)
    users[user.id] = user
    socket.join('active')
    socket.emit('loginUser', user)
    cb()
  },
  logoutUser () {
    socket.leave('active')
  },
  sendMessage ({ text, authorId }) {
    const message = {
      id: messageId++,
      text,
      date: new Date(),
      author: users[authorId]
    }
    messages.push(message)
    socket.to('active').broadcast.emit('onMessage', message)
  },
  getMessages (maxCount = 50) {
    socket.emit('getMessages', messages.slice(-maxCount))
  },
  clearHistory () {
    messages.length = 0
    socket.emit('clearLogins')
    socket.emit('clearHistory')
    socket.broadcast.emit('clearHistory')

    const sockets = socket.server.sockets.sockets
    Object.keys(sockets).forEach((id) => {
      sockets[id].leave('active')
    })
  }
})
