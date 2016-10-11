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

var config = require('./config.js')
app.set('secretKey', config.secret);

app.models = require('./models/index.js');

console.log('listening to port 3000...');
app.listen(3000);

// mongoose.connect('mongodb://localhost/transcoster');
mongoose.connect(config.database);
mongoose.connection.once('open', function() {
  console.log('########### db opened ###########');
  _.each(app.models, function(schema, model) {
    console.log('done mapping  '+ model + ' model.');
    mongoose.model(model, schema);
  });
});

// app.use('/hello', function(req, res, next){
//   res.send('Hello world!!!!');
//   next();
// });

// mongoose.model('User', app.models.user)
// app.set('User', mongoose.model('User'));

var routes = require('./routes.js');
_.each(routes, function(controller, route){
  app.use(route, controller(app, route));
});
