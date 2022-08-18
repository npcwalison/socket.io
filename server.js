const express = require('express')
const path = require('path')
const PORT = 8090 || process.env.TOKEN

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res)=>{
  res.render('index.html')
})

let messages = []

io.on('connection', socket => {
  console.log(`socket connected: ${socket.id}`)

  socket.emit('previousMessages', messages)


  socket.on('sendMessage', data => {
    messages.push(data)

    socket.broadcast.emit('receivedMessage', data)
  })
})

server.listen(PORT, ()=>{
  console.log("Server Runing")
})