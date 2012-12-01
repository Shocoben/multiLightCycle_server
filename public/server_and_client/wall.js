define(function()
{
	var Wall = function( player ) 
	{
			this.initX = player.x;
			this.initY = player.y;
			this.x = player.x;
			this.y = player.y;
			this.minW = player.w;
			this.minH = player.h;
			this.orientation = player.orientation;
			this.color = player.color; 
	};

	Wall.prototype.move = function ( o, coords ) 
	{
		o.x=coords.x;
		o.y=coords.y;
	}

	Wall.prototype.getSurface = function(wall)
	{
		var y = (wall.orientation == "bottom")? wall.initY : wall.y;
		var x = (wall.orientation == "right")? wall.initX  : wall.x;
		var w = (wall.orientation == "right" || wall.orientation == "left")? wall.x - wall.initX : wall.minW;
		w = (w>=0)? w : wall.initX - wall.x;
		var h = (wall.orientation == "top" || wall.orientation == "bottom")? wall.y - wall.initY : wall.minH;
		h = (h>=0)? h : wall.initY - wall.y;

		return ({"x":x, "y" : y, "h": h, "w" : w});  
	}

	return Wall;
});