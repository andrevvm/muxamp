var muxamp = require('./lib/server'),
	config = require('./lib/config');

var app = muxamp.getApplication(),
	port = config.get('muxamp:port');
app.listen(port, function() {
	console.log("Server started, port", port);
});