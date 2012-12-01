var requirejs = require('requirejs');
var serverClientPath = "./Public/server_and_client/";
requirejs.config({
    paths: {
        "collisionAABB" : serverClientPath+"collisionAABB",
        "Wall" : serverClientPath+"wall",
        "Player" : serverClientPath+"player",
        "spawnZone" : serverClientPath + "spawnZone",
        "canvasParams" : serverClientPath + "canvasParams",
        "player_server" : "./player_server"

    },
    nodeRequire: require
});

requirejs(["app","player_server","Wall","spawnZone", "canvasParams", "socket"],function(app, Player, Wall, spawnZone , canvas, io) 
{
    app.listen(8000);
    var players = {};
    var nbrPlayers = 0;

    var updateHighScore = function()
    {
        io.sockets.emit("updateHighscore", players);
    }

    io.sockets.on('connection', function (socket) 
    {
        var params = {
            "id":socket.id,
            "speed" : 3,
            "w" : 3,
            "h" : 3,
            "color" : "#01FC4E"
        };

        var player = null;

        Player.prototype.reset(params, spawnZone); //
        socket.on("ready",function() //when the game_client is ready
        {    
            socket.emit("startGame",params);
        });
        
        socket.on("playerCreated",function(name, color)
        {
            nbrPlayers++;
            params.name = name || "Anonyme" + nbrPlayers ;
            params.color = color;
            player = players[socket.id] = new Player(params);

            socket.on('disconnect', function () 
            {
                delete players[socket.id];
                nbrPlayers--;
            });

            socket.on("newOrientation" , function(newOrientation)
            {
                player.orientation = newOrientation;
                if(!Player.prototype.isInSpawnZone(player, spawnZone))
                {
                    Player.prototype.newWall(player);    
                }
            });

            socket.on("chatSendMessage",function(newMessage)
            {
                io.sockets.emit("chatNewMessage", player.name, player.color, newMessage);    
            });

            updateHighScore();
        });
        
        
    });
    


    var playerLose = function(player)
    {
        Player.prototype.newScore(player, player.score-1);
        Player.prototype.reset(player);
        updateHighScore();
    }

    var playerWin = function(player)
    {   
        Player.prototype.newScore(player, player.score + 1);
        updateHighScore();
    }

 

    var move = function()
    {
        for ( var i in players )
        {
            var player = players[i];
            var winner;
            Player.prototype.move ( player );
            Player.prototype.animateWalls( player );
            if ( winner = Player.prototype.tryCollision( player, players ) )
            {
                playerLose( player);
                playerWin( players[winner.id]);
            }       
        }
        io.sockets.emit("move", players);    
    }
    
    var checkZone = function()
    {
        for (var i in players)
        {
            var player = players[i];

            if (Player.prototype.isOutOfCanvas(player))
            {
                playerLose(player);
                continue;
            }

            if (Player.prototype.isInSpawnZone(player,spawnZone))
            {
                if (players[i].start==true)
                {
                    playerLose(player);
                    continue;
                }
            }
            else 
            {
                if (players[i].start==false)
                {
                    Player.prototype.newWall(player);
                    players[i].start=true;
                }
            }

        }
    }

    setInterval(move, 1000/30);
    setInterval(checkZone, 1000/10);
});