//module
var express = require('express'),
    superagent = require('superagent'),
    consolidate = require('consolidate'),
    engine = require('ejs-locals'),
    fs = require('fs'),
    google = require('google');

//app
var port = 8888;
var app = module.exports = express();
//routes

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'SEKR37'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

require('./routes/routes.js')(app,port,superagent,fs,google);
//post data

app.listen(port);
console.log("access aksaramaya miniserver http://hostname:"+port); 