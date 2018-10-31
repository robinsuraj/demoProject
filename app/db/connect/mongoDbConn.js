var mongoose = require('mongoose');

var connection = mongoose.connection;

connection.on('error', function(error){
	console.log(error);
});

connection.once('open',function(){
	console.log('Connected to database');
});

connection.on('disconnected', function(){
	//Reconnect
	mongoose.connect(_config.dbUrl, {
		socketTimeoutMS: 90000,
		keepAlive: true,
		autoReconnect: true,
		reconnectInterval: 500, // in 500ms 
		reconnectTries: 30, // 30 times  
		poolSize: 5, //
		bufferMaxEntries: 0
	})
}, function (err) {
	if(err)
		console.log(err);
	else
		console.log('Database reconnected after disconnection.');

	connection = mongoose.connection;
});

var gracefulExit = function () {
	mongoose.connection.close(function () {
		console.log('MDB conn is disconnected through app termination')
		process.exit(0);
	});
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);

mongoose.connect(_config.dbUrl, {
	socketTimeoutMS: 90000,
		keepAlive: true,
		autoReconnect: true,
		reconnectInterval: 500, // in 500ms 
		reconnectTries: 30, // 30 times  
		poolSize: 5, //
		bufferMaxEntries: 0
}, function (err) {
	if(err)
		console.log('First time connection Error:' + err);
	else
		console.log('First time Database connected');
});
