define(["socket.io",'./app'], function(socketio,app) {

  var io = socketio.listen(app);
  io.set('log level', 1);

  return io;
});