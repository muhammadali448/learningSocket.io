var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
  // socket.emit('createMessage', {
  //   from: 'muhammadali',
  //   text: 'hello yasira'
  // })
});
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit("createMessage", {
//   from: "Raja Jee",
//   text: "Hello Frndx Chai peelo"
// }, function(data) {
//   console.log('Got it ', data);
// });

socket.on("disconnect", function() {
  console.log("disconnected from server");
});

jQuery('#message-form').on('submit', function (e) { 
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  })
 })



// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// })
