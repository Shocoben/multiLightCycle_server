define(["jquery"], function($)
{
	var chat = {};
	var jqDiv = null;
	var content = null;
	var button = null;
	var input = null;
	var socket = null;
	var id = null;
	chat.create = function(parent, _params)
	{
			var params = _params || {};
			var w = params.width || "250";
			var h = params.height || "300"; 
			var id= params.id || "chat";
			var title = params.title || "Chat";
			var boxW = params.boxW || "70%";
			var boxH = params.boxH || "20%";
			var chat = document.createElement('div');
			chat.setAttribute("id", id);
			parent.appendChild(chat);

			jqDiv = $("#"+id);
		    jqDiv.width(w);	
		    jqDiv.height(h);	
		    jqDiv.append($("<div class='chat_content'></div>").width("100%").height("74%").css("overflow", "auto"));
		    jqDiv.append($("<input type='text' class='chat_input' />").width(boxW).height(boxH).css({"resize" : "none", "float" : "left"}));
		    jqDiv.append($("<input type='button' class='chat_send' value='Envoyer'></input>").css("float", "right"));
		    jqDiv.append($("<div>").width(0).height(0).css("clear", "both"));
		    content = $("#"+id+" .chat_content");
		    button = $("#"+id+" .chat_send");
		    input = $("#"+id+" .chat_input");
	}

	chat.addMessage = function(pseudo, _color, text)
	{
		console.log(pseudo + " " + text);
		var color = _color || "#fff";
		var style = "style = 'color:" + color + "'";
		if (!content)
		{
			console.error("Aucun chat n'a été créé"); return;
		}
		content.append("<p> <strong "+ style +">"+pseudo+"</strong>: "+ text +"</p>");
	}

	chat.connect=function(socket)
	{
		socket.on("chatNewMessage", this.addMessage);
		button.click(function()
		{
			socket.emit("chatSendMessage", input.val());
			input.val("");
		});
	}
	return chat;
});