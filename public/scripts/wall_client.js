define(["Wall"],function(Wall) {
	
	Wall.prototype.draw = function(ctx, o,  params)
	{
		if (!ctx){ console.error("Empty ctx in draw of wall"); return;}
		ctx.strokeStyle = params.color || "#ffffff";
		
		ctx.lineWidth  = params.width|| 1;
		ctx.globalAlpha= params.alpha || 0.5;
		ctx.beginPath();	
			ctx.moveTo(o.x, o.y);
			ctx.lineTo(o.initX, o.initY);
		ctx.stroke();
		ctx.closePath();
	}

	Wall.prototype.drawGlossy = function (ctx, o, width , color)
	{
		var maxWidth = width * (width/1.8);
		for (var i =0; i<maxWidth; i++)
		{
			var alpha = 1;
			var width = (maxWidth * i) / (maxWidth - i/1.8);
			if (i>0)
			{
				var diff = 1 - ((i/maxWidth));
				alpha = (diff>0.00)? diff : 0.00;
				if ((maxWidth/3) % i == 0)
				{
					color="#ffffff";
				}
			}
				
			Wall.prototype.draw(ctx, o, {"width":width, "alpha": alpha, "color":color} );
		}
	}

	return Wall;
	
});