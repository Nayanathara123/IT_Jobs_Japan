

// var app = require('express')();
// var http = require('http').createServer(app);

let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use("/js", express.static(__dirname + "/js"));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/whiteBoard.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  //socket.on('chat message', (msg) => {
    //console.log('message: ' + msg);
    //socket.emit('chat message', msg);
    //socket.broadcast.emit('hi');
  //});
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // socket.on('chat message', function(canvasJson) {
  //   if (canvasJson.objects) {
  //     //const newData = (allArtBoards[boardId] = canvasJson);
  //     socket.broadcast.emit('chat message', canvasJson);
  //     //socket.broadcast.emit('hi');
  //   }
  // });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});


// io.on('connection', (socket) => {
//         socket.on('mouse', (data) => {
//             socket.broadcast.emit('painter', data);
//         });
//     })