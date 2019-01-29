const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require('./utils/validation');
const { User } = require('./utils/users');
const port = process.env.PORT || 3000;
const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);
var users = new User();

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
  // socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"));
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"));
    socket.broadcast.to(params.room).emit(
      "newMessage",
      generateMessage("admin", `${params.name} has joined.`)
    );
    socket.on("createMessage", ( messageData, callback ) => {
      console.log("Message Data: ", messageData);
      io.to(params.room).emit("newMessage", generateMessage(params.name, messageData.text));
      callback();
      // socket.broadcast.emit("newMessage", {
      //   from: messageData.from,
      //   text: messageData.text,
      //   createAt: new Date().getTime()
      // });
    });
    callback();
  })
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
    
  })
  // socket.broadcast.emit(
  //   "newMessage",
  //   generateMessage("admin", "new user joined")
  // );
  // socket.on("createMessage", ( messageData, callback ) => {
  //   console.log("Message Data: ", messageData);
  //   io.emit("newMessage", generateMessage(messageData.from, messageData.text));
  //   callback();
  //   // socket.broadcast.emit("newMessage", {
  //   //   from: messageData.from,
  //   //   text: messageData.text,
  //   //   createAt: new Date().getTime()
  //   // });
  // });
  socket.on("disconnect", () => {
    console.log("user was disconnected");
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  });
});

server.listen(port, () => {
  console.log("Server is starting...");
});
