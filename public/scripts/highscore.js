define(["popup", "jquery", "addKeyListenersCapabilities"],function(Popup, $, addKeyListener)
{
	var highscore = {};
	var score = null;
	var popup = null;
	var socket = null;
	var keyCode = "9" ;

	var active = false;
	highscore.parent = null;
	highscore.centerTo = null;
	highscore.css = null;

	highscore.show = function()
	{	
		console.log(this.centerTo);
		if (!popup)
		{
			popup = new Popup(this.parent, {"width" : 300, "height" : 500, "centerTo" : this.centerTo, "css" : this.css});
		}
		highscore.createTableScore();
		popup.active();
		active=true;
	}

	highscore.hide = function()
	{
		popup.hide();
		active=false;
	}

	highscore.updateScore = function(_scores){
		scores = _scores;
		highscore.createTableScore();
	}

	highscore.createTableScore = function()
	{
		if (!popup){ return;}

		var table = $("<table></table>").width("100%").css({"text-align" : "center"});
		var thead = $("<thead></thead>");
		thead.append($("<tr></tr>").append($("<th>Pseudo</th><th>Score</th>")));
		table.append(thead);
		var tbody = $("<tbody></tbody>");

		for(var i in scores)
		{
			var row = $("<tr></tr>");
			var td = $("<td>"+scores[i].name+"</td><td>"+scores[i].score+"</td>");
			tbody.append(row.append(td));
		}
		table.append(tbody);
		popup.html(table);
	}

	highscore.changeKey = function(newKey)
	{
		keyCode = newKey;
	}

	highscore.onKeyDown=function(e)
	{
		if(e.keyCode==keyCode)
		{
			if(active)
			{
				highscore.hide()
			}
			else{
				highscore.show();
			}
		}
	}

	highscore.active=function(_parent, _params)
	{
		//get all the params
		this.parent = _parent;
		var params = _params || {}; 
		this.centerTo = params.centerTo;
		this.css = params.css || {};
		var key = params.key || 9;

		//add keyboard listener
		highscore.changeKey(key);
		addKeyListener(this);
	}

	highscore.connect=function(socket)
	{
		socket = socket;
		socket.on("updateHighscore", this.updateScore);
	};

	return highscore;
});