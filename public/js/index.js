var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
  // socket.emit('createMessage', {
  //   from: 'muhammadali',
  //   text: 'hello yasira'
  // })
});
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
})
socket.on("disconnect", function() {
  console.log("disconnected from server");
});

// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// })