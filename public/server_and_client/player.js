//Wall path need to be configured in require.config in both side (client and server)
define(["Wall"],function(Wall)
{

	var Player = function(params) 
	{
		this.speed = params.speed || 5;
		this.orientation=params.orientation||null;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.w = params.w || 10;
		this.h = params.h || 10;
		this.color = params.color || '#01D6FC';

		this.id = params.id||0;
		this.name = params.name || "Anonyme";
		this.start=params.start||false;
		this.walls = [];
		this.energy= params.energy || 0;
		this.score = params.score || 0;
	};

	Player.prototype.move = function(o)
	{
		switch(o.orientation)
		{
			case "left":
				o.x -= o.speed;
			break;
			case "top" :
				o.y -= o.speed;
			break;
			case "right" :
				o.x +=o.speed;
			break;
			case "bottom":
				o.y+=o.speed;
			break;
		}		
	}

	
	Player.prototype.animateWalls = function( o )
	{
		if( o.walls[0] )
        {
            Wall.prototype.move(o.walls[ o.walls.length-1 ], o);
        }
	}


	return Player;	
});
