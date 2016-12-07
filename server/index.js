var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

var config = require('./config.js')
app.set('secretKey', config.secret);

app.models = require('./models/index.js');

console.log('listening to port 3000...');
app.listen(3000);

// mongoose.connect('mongodb://localhost/transcoster');
if (config.nodeEnv == 'production') {
  var connectionString = config.database;
} else {
  var connectionString = 'mongodb://localhost/tem';
}
mongoose.connect(connectionString);
mongoose.connection.once('open', function() {
  console.log('########### db opened ###########');
  _.each(app.models, function(schema, model) {
    console.log('done mapping  '+ model + ' model.');
    mongoose.model(model, schema);
  });

  var routes = require('./routes.js');
  _.each(routes, function(controller, route){
    app.use(route, controller(app, route));
  });
});

// app.use('/hello', function(req, res, next){
//   res.send('Hello world!!!!');
//   next();
// });

// mongoose.model('User', app.models.user)
// app.set('User', mongoose.model('User'));
