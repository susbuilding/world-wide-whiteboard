var path = require('path');

var http = require('http');
var server = http.createServer();

//socket
var socketio = require('socket.io');

var express = require('express');
var app = express();

server.on('request', app);



//creating new connection for web sockets and integrating with HTTP server. variable that has access to server. manage relationship between client and server.
var io = socketio(server);

var nsp = io.of('/myroom');
nsp.on('connection', function(socket) {
    console.log('someone to our room')
})

//when connection gets made to server
io.on('connection', function(socket) {


    console.log('new client has connected');
    console.log(socket.id)
    socket.on('disconnect', function(){
        console.log('someone disconnected!')
    })
    socket.on('draw', function(personDrawData){

        socket.broadcast.emit('draw', personDrawData)
    })
})



//server
server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});


app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/myroom', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
