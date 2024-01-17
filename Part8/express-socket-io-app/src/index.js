const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const PORT = 4000;

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, '../public')

// io가 클라이언트와 연결됐을 때 아래 함수 호출
io.on('connection', (socket) => {
    console.log('socket', socket.id);

    // join 됐을 때 호출
    socket.on('join', () => { })

    socket.on('sendMessage', () => { })

    socket.on('disconnect', () => {
        console.log('socket disconnect', socket.id);
     })
})

app.use(express.static(publicDirectoryPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})