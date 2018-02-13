var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev')); // to log all requests
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // frontend file access
app.use('/api',appRoutes); // has to come after pasrsing the request. So the order matters
// /api - just to differenciate backend and frontend routes

mongoose.connect('mongodb://localhost:27017/blogData', function (err) {
  if (err) {
    console.log('Not connected to the database!' + err);
  }else{
    console.log('Successfully connected to mongodb');
  }
})

// Just to check
// app.get('/home', function (req, res) {
//   res.send('from home -- just to check route');
//
// });
//
// app.get('/', function (req, res) {
//   res.send("hey!");
//
// })

// * -  no matter what user types, feed them index page
app.get('*',function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//use 8080 or if environment has specific server to point to
app.listen(process.env.PORT || 8080, function() {
  console.log("Running the server on port 8080");
});
