var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config/config.json');
var device = require('express-device')
var app = express();
var log = require('./libs/log')(module);


Promise = require('bluebird'),
	request = Promise.promisify(require('request'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(device.capture());
app.set('view options', { layout: true });
device.enableViewRouting(app);
app.use(cookieParser());
app.use(session({ secret: 'glbladmin', resave: false, saveUninitialized: true }));

app.use(express.static(__dirname + '/'));
var server = app.listen(config.port, function () {
	console.log('Listening on port %d', server.address().port);
});
