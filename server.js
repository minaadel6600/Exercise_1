var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');


// create express app
var app = express();

// parse application/json
app.use(bodyParser.json())

//connect to the database 
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})


// routing module 
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(8080, function(){
    console.log("Server is listening on port 8080");
});
