// YOUR CODE HERE:
var app = {
	server: 'https://api.parse.com/1/classes/chatterbox',
	username: this.username,
	timer: null,

	cleanString: function(string){
		if(typeof string !== "string"){
			return "";
		}
		var re = new RegExp("<|>|addEventListener", "g");
		return string.replace(re,"");
	},
	
	send: function(message){
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: this.server,
		  crossDomain: true,
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
		this.clearMessages();
		var query = 'order=-createdAt';
		if(arguments[0]){
			if(arguments[1]){
			console.log("Arguments[0] = " + arguments[0]);
			query = 'where={"room": "'+arguments[0]+'"}';
			} else {
				query = 'where={"username": "'+arguments[0]+'"}';
			};
			clearInterval(app.timer);
		};
		$.ajax({
		  // This is the url you should use to communicate with the parse API server.
		  url: this.server,
		  crossDomain: true,
		  type: 'GET',
		  data: query,
		  contentType: 'application/json',
		  success: function (data) {
		    //console.log('chatterbox: Message fetched');
		    console.log(data);
		    var rooms = {};
		    for (var i = 0; i < data.results.length; i++){
		    	//console.log(data);
		    	if (!rooms.hasOwnProperty(data.results[i].roomname)){
		    		rooms[data.results[i].roomname] = data.results[i].roomname;
			    	var optionString = "<option value='"+ data.results[i].roomname +"'>"+ data.results[i].roomname +"</option>";
		    		$('#roomSelect').append(optionString);
		    	}
		    	var messageString = "<div class='chat'>Name: "+ data.results[i].username + " : " + app.cleanString(data.results[i].text) + "</div>"
		    	$("#chats").append(messageString);
		    };
		  },
		  error: function (data) {
		    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		    console.error('chatterbox: Failed to fetch message');
		  }
		});
	},

	clearMessages: function(){
		$('#chats').children().remove ();
	},

	addMessage: function(username, text, roomname){
		console.log("Hey, I made it");
		var message = {
			"username" : username,
			"text" : text,
			"roomname" : roomname
		};
		this.send(message);
		$("#chats").prepend("<div class='chat'>Name: "+ username + " : " + text + "</div>")
	},

	addRoom: function(roomname){
		var message = {
			"username" : null,
			"text" : null,
			"roomname" : roomname
		};
		this.send(message);
		$("#roomSelect").append("<option value='"+ roomname +"'>"+ roomname +"</option>");
	},

	addFriend: function(){},

	handleSubmit: function(){
		console.log(this);
		var username = window.prompt("Enter your user name:");
		var text = $("#message").val();
		var roomname = $("#roomSelect option:selected").text();
		var message = {
			"username" : username,
			"text" : text,
			"roomname" : roomname
		};
		this.addMessage(username, text, roomname);
	},
	init: function(){
		this.fetch();
		var that = this;
		app.timer = setInterval(function(){
			return that.fetch();
		}, 10000);
	}

	// addUsername: function(username){
	// 	this.username = username;
	// }
};

