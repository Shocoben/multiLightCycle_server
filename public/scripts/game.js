define(["player_client","Wall", "spawnZone", "highscore"],function(Player, Wall, spawnZone, highscore)
{
	var game = {}
    var eventBus = {};
    var socket = {};
    var ownPlayer = null;
    var players = {};

    game.update=function()
    {
        game.render();
        if (ownPlayer){
      
        }
    }

    game.render=function()
    {
        this.ctx.globalAlpha=0.8;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if ( spawnZone)
        {
            var color = "#383838";
            this.ctx.lineWidth=2;
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(spawnZone.x,spawnZone.y,spawnZone.w, spawnZone.h);
            this.fillTextOnMiddle(spawnZone, "Spawn", {"font": "12pt Arial","color": color, "yOffset" : spawnZone.h/2})
        }

        for( var i in players )
        {
            Player.prototype.draw( this.ctx, players[i] );
            Player.prototype.drawWalls(this.ctx, players[i].color, players[i]);
            
            this.fillTextOnMiddle(players[i], players[i].name, {"yOffset" : -4});     
        }
    }
	
    game.fillTextOnMiddle=function(o, text, params)
    {
        this.ctx.font = params.font || "10pt Arial" ;
        this.ctx.fillStyle = params.color || "#fff";
        this.ctx.globalAlpha=params.alpha ||1;
        var yOffset = params.yOffset || 0;
        var width= this.ctx.measureText(text).width;
        var x = (o.x + o.w/2) - width/2;
        this.ctx.fillText(text, x, o.y + yOffset);
    }

    game.checkName=function(name)
    {
        for (var i in players)
        {
            if (players[i].name==name)
            {
                return true;
            }
        }
        return false;
    }

    game.createOwnPlayer=function(params)
    {
    	//On crée son propre joueur.
        ownPlayer = new Player(params);
    	players[params.id] = ownPlayer;
        Player.prototype.changeControlsKeys(ownPlayer, { left:37, top:38, right:39, bottom:40});
        
        var pseudo = prompt("Votre pseudonyme :", ""); //On demande le pseudo du joueur
        socket.emit("playerCreated",pseudo); //et on envoit le tout au serveur

        //on lui ajoute les contrôles
        Player.prototype.addControls( ownPlayer,  socket);
        //on s'aboonne à la fonction move du serveur
        socket.on("move", function(_players)
        {
            players=_players;

        });
        
    }

    game.startGame=function( playerParams, otherPlayers)
    {
        highscore.connect(socket);
        game.createOwnPlayer(playerParams);
    }

	game.init = function (_eventBus, _socket) 
    {
        if (_eventBus) 
        {
            eventBus=_eventBus;
            eventBus.emit("changeUpdateCtx","game");    
        }

        if (_socket)
        {
            socket=_socket;
            socket.on("startGame", this.startGame);
            socket.emit("ready");
        }

        highscore.active("#game_wrapper", {"css": {"border" : "2px solid black", "background-color" : "#706F6A"}, "centerTo" : this.canvas});
        
	}

	return game;
});