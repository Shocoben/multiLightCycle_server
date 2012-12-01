define(["Player","addKeyListenersCapabilities","wall_client"],function(Player, addKeyListeners, Wall) {
	
	var socket =null;

	Player.prototype.drawWalls = function(ctx, color, o)
	{
		for(var i = 0; i < o.walls.length; i++ )
		{ 
			o.walls[i].drawGlossy(ctx, o.w, color); 
		}
	}

	Player.prototype.draw = function(ctx, o)
	{
		var color = o.color;
		ctx.fillStyle = color;
		ctx.fillRect(o.x, o.y, o.w, o.h);
	}

	Player.prototype.drawWalls=function(ctx, color, o)
	{
		for (var i=0; i<o.walls.length; i++)
		{
			Wall.prototype.drawGlossy(ctx, o.walls[i], o.w, color);
		}
	}

	//Le joueur ne pourra controler son joueur que d'une seule touche, pas d'horizontale comme dans le vrai Tron.	
	Player.prototype.addControls=function(o, _socket)
	{
		socket = _socket || null;
		
		o.onKeyDown = function(e) 
		{
			if ( o.lastKey && keyCode == o.lastKey ) //on vérifie que la touche n'est pas la même que la dernière fois.
			{
				return false;
			}
			var keyCode = e.keyCode;
			
			//on récupère les noms d'orientation
			for( var orientation in o.keyCodes )
			{
				if(keyCode == o.keyCodes[orientation]) //on récupere la bonne oritation
				{
					o.orientation=orientation; //on actualise l'oriention
					if(socket)
					{
						socket.emit("newOrientation", orientation);
					}
					break;
				}
			}
			o.lastKey = keyCode;
		}
		addKeyListeners(o);
	}

	Player.prototype.changeControlsKeys = function(o, params)
	{	
		if (!params){
			console.log("paramètres vides");
			return ;
		}

		o.keyCodes = {
			"left" : params.left || 37,
			"right" : params.right || 39,
			"top" : params.top || 38,
			"bottom" : params.bottom || 40
		}
	}

	return Player;
	
	
});

