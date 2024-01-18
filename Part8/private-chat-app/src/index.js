const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { default : mongoose } = require('mongoose');
const crypto = require('crypto');
const { saveMessages, fetchMessages } = require('./utils/messages');

require('dotenv').config({ path: './src/.env'});

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 4000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.post('/session', (req, res) => {
    const data = {
        username: req.body.username,
        userID: randomId()
    }
    res.send(data);
})

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    if (!username) {
        return next(new Error('Invalid username'));
    }
    // create new session
    socket.username = username;
    socket.id = userID;
    next();
})

let users = [];
io.on('connection', async socket => {
    // get all users
    let userData = {
        username: socket.username,
        userID: socket.id
    };
    users.push(userData);
    io.emit('users-data', { users })

    // 클라이언트에서 보내온 메시지  A ==> Server ==> B
    socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload);
        saveMessages(payload);
    })

    // 데이터베이스에서 메시지 가져오기
    socket.on('fetch-messages', ({ receiver }) => {
        fetchMessages(io, socket.id, receiver);
    });

    // 유저가 방에서 나갔을 때
    socket.on('disconnect', () => {
        users = users.filter(user => user.userID !== socket.id);
        // 사이드바 리스트에서 없애기
        io.emit('users-data', { users });
        // 대화 중이라면 대화창 없애기
        io.emit('user-away', socket.id);
    })
})

mongoose.set('strictQuery', false);

dbConnect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err))

async function dbConnect() {
    await mongoose.connect(process.env.MONGO_URI);
}

const randomId = () => crypto.randomBytes(8).toString('hex');


server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})