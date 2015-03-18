// YOUR CODE HERE:
var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	init: function(){
		this.fetch();
		this.populateRoomSelection();
	},
	send: function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: this.server,
		  type: 'POST',
		  data: JSON.stringify(message),
		  contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message sent');
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to send message');
		  }
		});
	},
	fetch: function(){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: this.server,
		  type: 'GET',
		  //data: JSON.parse(message),
		  contentType: 'application/json',
		  success: function (data) {
		    console.log('chatterbox: Message fetched');
		    console.log(data);
		    var rooms = {};
		    for (var i = 0; i < data.results.length; i++){
		    	console.log(data);
		    	if (!rooms.hasOwnProperty(data.results[i].roomname)){
		    		rooms[data.results[i].roomname] = data.results[i].roomname;
			    	var optionString = "<option value='"+ data.results[i].roomname +"'>"+ data.results[i].roomname +"</option>";
		    		$('#roomSelection').append(optionString);
		    	}
		    	var messageString = "<div class='message'>Name: "+ data.results[i].username + " : " + data.results[i].text + "</div>"
		    	$("#messages").append(messageString);
		    };
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to fetch message');
		  }
		});
	},

	clearMessages: function(){},

	addMessage: function(){},

	addRoom: function(){},

	addFriend: function(){},

	handleSubmit: function(){}
};
