const express = require("express");
const app = express();
const http = require("http");
//const { Server } = require("socket.io");
//var cors = require("cors");
//app.use(cors());

var globalObj = {
  r1: [],
  r2: [],
  r3: [],
  r4: [6],
  r5: [7,8],
  r6: [12,13],
  b1: [],
  b2: [],
  b3: [],
  b4: [15],
  b5: [7,8],
  b6: [12,13],
}

const server = http.createServer(app);

//origin denotes frontend - client to the socketserver
// const io = new Server(server, {
//   cors: {
//     origin: "http://192.168.205.165:3000",
//     methods: ["GET", "POST"],
//   },
// });
// const io = require('socket.io')(server, {cors: {origin: "http://192.168.205.165:3000"}});
const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.emit('opening_check','summa vandhu paathutu po')

  socket.on("get_socket_validmove", (data) => {
    //console.log('received res of valid moves',data)
    globalObj = data;
    // io.emit("data1",data)
  });

  socket.on("get_socket_validmove_second",(data)=>{
    io.emit("dataupdate",data)
  })

  socket.on("act2",()=>{
    console.log('client in activity 2')
    console.log(globalObj)
    io.emit('data1',globalObj)
  })

  socket.on("act3",()=>{
    console.log('client in activity 3')
    console.log(globalObj)
    io.emit('data2',globalObj)
  })

  socket.on("send_coin_move",(coin,pos)=>{
    //socket.emit("moving_coin",['b6',14]);
    //devesh sends data here(Json Object)
    console.log('devesh sent',coin,pos)
    io.emit("moving_coin",coin,parseInt(pos));
  }) 

});

//socket server listening on port 3000
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});