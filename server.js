let path = require('path');

let http = require('http');
let server = http.createServer();

//socket
let socketio = require('socket.io');

let express = require('express');
let app = express();

server.on('request', app);

//creating new connection for web sockets and integrating with HTTP server. variable that has access to server. manage relationship between client and server.
let io = socketio(server); //this has to be below the server.on line

let nsp = io.of('/myroom');
nsp.on('connection', (socket) => {
    console.log('someone to our room')
})

let draws = [];
//when connection gets made to server
/* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
io.on('connection', (socket) => {
    socket.emit('initialDrawing', draws);
    console.log('new client has connected');
    console.log(socket.id)
    socket.on('disconnect', () => {
        console.log('someone disconnected!')
    })
    socket.on('draw', (personDrawData) => {
        draws.push(personDrawData)
        socket.broadcast.emit('draw', personDrawData)
    })
})

//server
server.listen(1337, () => {
    console.log('The server is listening on port 1337!');
});


app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/myroom', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
