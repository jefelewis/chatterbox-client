// YOUR CODE HERE:

var app = {};
// Server URL
app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

// app.validateString = function(string) {
//   var validity = true;

//   if ( string === '' ) { 
//     validity = false; 
//   }

//   if ( string.match( /[ |<|,|>|\.|\?|\/|:|;|"|'|{|\[|}|\]|\||\\|~|`|!|@|#|\$|%|\^|&|\*|\(|\)|_|\-|\+|=]+/ ) !== null ) {
//     validity = false;
//   }

//   return validity;
// };

// METHODS
app.init = function() {
  $(document).ready(function() {

    // app.fetch();

    var message = {
      username: 'testuser',
      text: $('#message').val(),
      roomname: 'lobby'
    };

    $('#submit').on('click', function() {
      app.send(message);
    });

    $('#clear').on('click', function() {
      app.clearMessages();
    });
  });
};


// Message is a object var message = {username: 'shawndrost', text: 'trololo', roomname: '4chan'};
app.send = function(message) {
  console.log('hi');
  $.ajax({
  // This is the url you should use to communicate with the parse API server. (See Above URL)
    url: app.server,
    type: 'POST',
    // Message
    // Why do we not use JSON stringify?
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


app.fetch = function(message) {

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
      // need to filter out the trolls with something...

      // data.results.forEach(function(element) {
      // console.log(app.validateString(JSON.stringify(element)));
      //   if (app.validateString(JSON.stringify(element))) {
      //     app.renderMessage(element);
      //   }
      // });
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
  $('#chats').append('<p>' + '<b>' + message.username + '</b>' + ': ' + message.text + '</p>');
};


app.renderRoom = function(room) {
  //
  $('#roomSelect').append('<p>' + room + '</p>');
};

app.handleUsernameClick = function() {
  // 
  $('#username').click(function() {
    
  });
  
};



// URL: http://parse.la.hackreactor.com/chatterbox/classes/messages


// Setup a way to refresh the displayed messages (either automatically or with a button)
// Allow users to select a user name for themself and to be able to send messages


app.init();
app.fetch();