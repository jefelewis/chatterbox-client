// YOUR CODE HERE:

var app = {};

// METHODS
app.init = function() {
  


};


app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    // Message
    // Why do we not use JSON stringify?
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};


app.fetch = function(url) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: url,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  // Empty content from Chats
  $('#chats').empty();
};

app.renderMessage = function(message) {
  // Adds Message to Chats
  $('#chats').append('<p>message</p>');
};

app.renderRoom = function(room) {
  //
  $('#roomSelect').append('<p>room</p>');
};

// URL: http://parse.la.hackreactor.com/chatterbox/classes/messages


// Setup a way to refresh the displayed messages (either automatically or with a button)
// Allow users to select a user name for themself and to be able to send messages





