const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const { addUser, getUsersInRoom, getUser, removeUser } = require('./utils/users');
const { generateMessage } = require('./utils/messages');

const app = express();
const PORT = 4000;

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, '../public')

// io가 클라이언트와 연결됐을 때 아래 함수 호출
io.on('connection', (socket) => {
    console.log('socket', socket.id);

    // join 됐을 때 호출
    socket.on('join', (options, callback) => {
        const {error, user} = addUser({ id: socket.id, ...options})

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', `${user.room} 방에 오신 걸 환영합니다.`));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방에 참여했습니다.`));

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(user.username, message));
        
        callback();
    })

    socket.on('disconnect', () => {
        console.log('socket disconnect', socket.id);

        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username}가 방을 나갔습니다.`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
     })
})

app.use(express.static(publicDirectoryPath));

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})