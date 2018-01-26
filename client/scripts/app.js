// YOUR CODE HERE:

var app = {};
// Server URL
app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';


// METHODS
app.init = function() {
};


app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
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


app.fetch = function(url, message) {

  var results = {
    order: '-createdAt'
  };


  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    data: results,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      // WHY???
      data.results.forEach(result => app.renderMessage(result));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  // Empty content from Chat Div
  $('#chats').empty();
};

app.renderMessage = function(message) {
  // Adds Message to Chat Div
  $('#chats').append('<p>' + message + '</p>');
// console.log('hello')
};
//   //
//   $(document).ready(function(message) {
//     $('#submit').on('click', function() {})   
//   }
// }


app.renderRoom = function(room) {
  //
  $('#roomSelect').append('<p>' + room + '</p>');
};

app.handleUsernameClick = function() {
  // 
  $('#username').click(function() {
    
  });
  
};

app.handleSubmit = function() {

  $(document).ready(function() {
    $('#submit').on('click', function() {
      renderMessage();
    });
  });
};

// URL: http://parse.la.hackreactor.com/chatterbox/classes/messages


// Setup a way to refresh the displayed messages (either automatically or with a button)
// Allow users to select a user name for themself and to be able to send messages


app.init();
app.send();
app.fetch();
app.renderMessage('testing');
app.handleSubmit();