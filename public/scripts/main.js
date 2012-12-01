//pas de variable chemin afin d'avoir zero variable globales.
require.config(
{
    baseUrl: "./scripts/",
    paths: {
        'socket_io'  : '/socket.io/socket.io',
        'jquery'        : 'libs/jquery',
        'Wall' : "../server_and_client/wall",
        'Player' : "../server_and_client/player",
        "collisionAABB" : "../server_and_client/collisionAABB",
        "spawnZone" : "../server_and_client/spawnZone",
        "canvasParams" : "../server_and_client/canvasParams"
    },
    shim: {
        'socket_io': {
            exports: 'io'
        },
        'jquery': {
            exports: '$'
        }
    }
} );


require(["connector","gameLoop","canvas", "eventBus", "game", "chat"], function(connector, gameLoop, canvas, eventBus, game, chat )
{
    //on effectue la connection, qu'on partagera d'objet en objet afin d'en garder une seule.
    var socket = connector();
    //on récupère le gameWrapper
    var game_wrapper = document.getElementById("game_wrapper");

    canvas.create(game_wrapper);
    canvas.associate(game);
    //on crée le canvas et on l'associe à game
    //On setup la gameloop
    gameLoop.addUpdate("game", game);
    gameLoop.associateChangeCtxWithEventBus(eventBus); //fonction permettant de changer le context d'update (game, pause,...)
    gameLoop.init();

    //game
    game.init(eventBus, socket);
    //chat
    chat.create(game_wrapper, {"width":960,"height" : 150, "boxW":"90%"});
    chat.connect(socket);
});