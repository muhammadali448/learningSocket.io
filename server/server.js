const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const { generateMessage, generateLocationMessage } = require("./utils/message");
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
  socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"));
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
  })
  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new user joined")
  );
  socket.on("createMessage", ( messageData, callback ) => {
    console.log("Message Data: ", messageData);
    io.emit("newMessage", generateMessage(messageData.from, messageData.text));
    callback('This is from the server');
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
