define(['socket_io'], function (io) 
{

	var eventBus = null;
    
    function connectSocket() 
    {
        var socket = io.connect('http://127.0.0.1:8000');

        socket.associateWithEventBus=function(_eventBus)
        {
            eventBus=_eventBus;
        }

        socket.onEmitEventBus=function(socketOn, eventEmit)
        {
            if (!eventBus){console.error("Pas de eventBus associé au socket"); return;}
            this.on(socketOn, function()
            {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(eventEmit);
                eventBus.emit.apply(eventBus, args);
            });
        }
        return socket;
    }
    
    return connectSocket;
    
});
