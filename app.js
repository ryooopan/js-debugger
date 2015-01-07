
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
});

var server = http.createServer(app);
var socketio = require('socket.io');
var io = socketio.listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  var address = socket.handshake.address;
  console.log('connected from ' + address.address + ':' + address.port);

  socket.on('msg', function(data){
    console.log(data);
    var code = data.code,
	date = new Date(),
	Sandbox = require('sandbox'),
	sandbox = new Sandbox();

    sandbox.run(code, function(output) {
      io.sockets.emit('res', output);
      console.log(output);
    });   
  });

  socket.on('disconnect', function () {
    console.log("disconnectted from " + address.address + ":" + address.port)
  });

});
