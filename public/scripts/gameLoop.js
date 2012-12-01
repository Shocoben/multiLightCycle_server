define(["addUpdateCapabilities"],function(addUpdate)
{
	var gameLoop = {};
	addUpdate(gameLoop);
	var eventBus={};
	gameLoop.contexts={};
	gameLoop.play=true;
	gameLoop.currentCtx = null;

	gameLoop.update = function()
	{
		var currentCtx = gameLoop.contexts[gameLoop.currentCtx]; 
		for( var i in currentCtx)
		{
			if ( currentCtx[i].update)
			{
				currentCtx[i].update();	
			}
		}
	}

	gameLoop.addUpdate = function( ctx, object )
	{
		if (!this.contexts[ctx])
		{
			this.contexts[ctx] = [];
		}
		object.gameLoopId = this.contexts[ctx].length;
		this.contexts[ctx].push( object );
	}

	gameLoop.deleteUpdate = function(ctx, o)
	{
		if (o)
		{
			this.contexts[ctx].splice(o.gameLoopId,1);	
		}
		else {
			delete this.contexts[ctx];
		}
		
	}

	gameLoop.changeCtx = function(ctx)
	{
		gameLoop.currentCtx = ctx || null;
	}

	gameLoop.associateChangeCtxWithEventBus = function(_eventBus) 
	{
		eventBus = _eventBus || null;	
		eventBus.on("changeUpdateCtx", gameLoop.changeCtx);
	}

	gameLoop.init = function()
	{
		this.launchUpdate();
	}

	return gameLoop;
})