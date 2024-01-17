const http = require('http').createServer();
const io = require('socket.io')(http, { cors: {origin: "*"} });

const PORT = 8080;

// A emit => server on  emit => A, B
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });
});

http.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})