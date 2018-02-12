var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var user = require('./app/models/user');


app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/blogData', function (err) {
  if (err) {
    console.log('Not connected to the database!' + err);
  }else{
    console.log('Successfully connected to mongodb');
  }
})


app.get('/home', function (req, res) {
  res.send('from home -- just to check route');

});

app.get('/', function (req, res) {
  res.send("hey!");

})
//use 8080 or if environment has specific server to point to
app.listen(process.env.PORT || 8080, function() {
  console.log("Running the server on port 8080");
});
