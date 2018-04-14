const express = require('express');
const app = express();
const router = express.Router();

var morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
var bodyParser = require('body-parser');
const cors = require('cors');
//var appRoutes = require('./app/routes/api')(router);
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router );

//app.use(morgan('dev')); // to log all requests

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/blogApp/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);// frontend file access
//app.use('/api',appRoutes); // has to come after pasrsing the request. So the order matters
// /api - just to differenciate backend and frontend routes
mongoose.Promise = global.Promise; // config issue
mongoose.connect(config.uri, function (err) {
  if (err) {
    console.log('Not connected to the database!' + err);
  }else{
    console.log('Successfully connected to database:' + config.db);
  }
})

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }  Reference to write the below line
//app.use(cors({ origin: 'http://localhost:4200' })); // This is because of cross origin and dev environment is on this domain

app.get('*',function(req, res){
  res.sendFile(path.join(__dirname + '/blogApp/dist/index.html'));
});

//use 8080 or if environment has specific server to point to
app.listen(process.env.PORT || 8080, function() {
  console.log("Running the server on port 8080!");
});
