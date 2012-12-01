define(["express", "module", "path", "http"], function (express, module, path, http) 
{
	var app = express();
	var filename = module.uri;

	app.use(express.logger());
	app.use(express.static( path.dirname(filename) + '/public'));
	app.set('views', path.dirname(filename) + '/views');

	app.get('/', function(req, res){
	    res.render('home.jade');
	});

	app.get('/game', function(req, res){
	    res.render('game.jade');
	});
	
	app.get('/technique', function(req, res){
	    res.render('technique.jade');
	});
	var server = http.createServer(app);

	return server;
});