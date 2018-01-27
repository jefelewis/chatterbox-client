// YOUR CODE HERE:

var app = {};
// Server URL
app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

// Friends List
app.friends = {};

// METHODS
app.init = function() {
  $(document).ready(function() {

    // Submit Button
    $('#submit').on('click', function() {
      app.send({
        username: $('#username').val(),
        text: $('#message').val(),
        roomname: 'lobby'
    
      });
      // Clear existing Messages
      app.clearMessages();
      // Retrieve New Messages
      app.fetch();
      console.log('Submit Button is working');
    });

    // Show/Hide Feed Button
    $('#clear').on('click', function() {
      $('#chats').toggle();
      console.log('Show/Hide Button is working');
    });

    // Refresh Feed Button
    $('#refresh').on('click', function() {
      app.clearMessages();
      app.fetch();
      console.log('Refresh Button is working');
    });

    $('body').on('click', '.friends', function(username) {
      app.friends[username.target.textContent] = true;
    });
  });
};


// Message is a object var message = {username: 'shawndrost', text: 'trololo', roomname: '4chan'};
app.send = function(message) {
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
      app.renderMessage(message);
      
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
      console.log('chatterbox: Messages received');
      // WHY???
      // need to filter out the trolls with something...

      // data.results.forEach(function(element) {
      // console.log(app.validateString(JSON.stringify(element)));
      //   if (app.validateString(JSON.stringify(element))) {
      //     app.renderMessage(element);
      //   }
      // });

      //might filter out < signs
      // data.results = data.results.filter(function(element){
      //   if (!JSON.stringify(element).includes('<')) {
      //     return element;
      //   }
      // });
      data.results.forEach(result => app.renderMessage(result));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retreive messages', data);
    }
  });
};

app.clearMessages = function() {
  // Empty content from Chat Div
  $('#chats').empty();
};

app.renderMessage = function(message) {
  // Adds Message to Chat Div
  //check if in friend list, if yes, bold text
  if (app.friends[message.username]) {
    $('#chats').append('<p class ="friends">' + '<b>' + '<a href="#">' + _.escape(message.username) + '</a>' + ': ' + _.escape(message.text) + '</b>' + '</p>');
  } else {
    $('#chats').append('<p class ="friends">' + '<b>' + '<a href="#">' + _.escape(message.username) + '</a>' + '</b>' + ': ' + _.escape(message.text) + '</p>');
  }
};


app.renderRoom = function(room) {
  //
  $('#roomSelect').append('<p>' + room + '</p>');
};

app.handleUsernameClick = function() {
  // 

  // $('.username').on('click', function() {
  //   app.friends1.push($(this));
  //   console.log(app.friends1);
  // });
  
};



// URL: http://parse.la.hackreeactor.com/chatterbox/classes/messages


// Setup a way to refresh the displayed messages (either automatically or with a button)
// Allow users to select a user name for themself and to be able to send messages


app.init();
app.fetch();

