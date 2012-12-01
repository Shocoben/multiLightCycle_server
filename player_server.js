define(["Player", "collisionAABB", "Wall", "spawnZone", "canvasParams"],function (Player, collisionAABB, Wall, spawnZone, canvas) 
{
	Player.prototype.tryCollision=function(player, otherPlayers)
    {
        for ( var j in otherPlayers )
        {
            var oPlayer = otherPlayers[j];
            for (var w in oPlayer.walls)
            {
                if (j == player.id && w >= player.walls.length-1)
                {
                    continue;
                }
                var surface = Wall.prototype.getSurface( oPlayer.walls[w] ); 
                if( collisionAABB( player, surface ))
                {
                    return oPlayer;
                }
                
            }    
        }
        return false;
    }

    Player.prototype.reset=function(player)
    {
        player.walls=[];
        player.start = false;
        player.orientation=null;
        //meme si la zone est carre pour le moment, il faut prevoir que une personne pourrait desirer un rectangle.
        var offsetX = spawnZone.w/5;
        var offsetY = spawnZone.h/5;
        player.x = (spawnZone.x + offsetX) + Math.random()*(spawnZone.w - (offsetX*2)),
        player.y = (spawnZone.y + offsetY) +Math.random()*(spawnZone.h - (offsetY*2));
    }

    Player.prototype.isInSpawnZone=function(player)
    {
        return collisionAABB(player, spawnZone);
    }

    Player.prototype.newWall=function(player)
    {
        player.walls.push(new Wall(player));
    }

    Player.prototype.isOutOfCanvas = function(player)
    {
        if (   player.x <=0
            || player.y<=0
            || player.x>=canvas.width
            || player.y>=canvas.height)
        {
            return true;
        }    
        return false;
    }

    Player.prototype.newScore = function (player, score)
    {
        player.score = score;
    };
    return Player;
})