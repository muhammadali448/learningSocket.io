

var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
  // socket.emit('createMessage', {
  //   from: 'muhammadali',
  //   text: 'hello yasira'
  // })
});
socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm:a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // var formattedTime = moment(message.createdAt).format('h:mm:a');
  // console.log("newMessage", message);
  // var li = jQuery("<li></li>");
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery("#messages").append(li);

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

var messageTextBox = jQuery("[name=message]");

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextBox.val()
    },
    function() {
      messageTextBox.val("");
    }
  );
});

socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm:a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // var formattedTime = moment(message.createdAt).format('h:mm:a');
  // var li = jQuery("<li></li>");
  // var a = jQuery(`<a target="_blank">My current location</a>`);
  // li.text(`${message.from}: ${formattedTime}`);
  // a.attr("href", message.url);
  // li.append(a);
  // jQuery("#messages").append(li);
});

// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// })

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported in your browser!!!");
  }
  locationButton.attr("disabled", "disabled").text('Sending location...');
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // console.log('Position:' , position);
      locationButton.removeAttr("disabled").text('Send Location');
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      console.log("Unable to fetch location...");
      locationButton.removeAttr("disabled").text('Send Location');
    }
  );
});
