const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user is conected!!!");
  // socket.emit('newEmail', {
  //     from: 'ma6627863@gmail.com',
  //     text: 'what is going on!!!',
  //     createAt: 123
  // })
  // socket.on('createEmail', (newEmail) => {
  //     console.log('create Email: ', newEmail);
  // })
    socket.emit("newMessage", {
      from: "admin",
      text: "Welcome to chat app"
    });
    socket.broadcast.emit('newMessage', {
        from: "admin",
        text: "new user joined",
        createdAt: new Date().getTime()
      })
  socket.on("createMessage", messageData => {
    console.log("Message Data: ", messageData);
    io.emit("newMessage", {
      from: messageData.from,
      text: messageData.text,
      createAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: messageData.from,
    //   text: messageData.text,
    //   createAt: new Date().getTime()
    // });
  });
  socket.on("disconnect", () => {
    console.log("user was disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is starting...");
});
