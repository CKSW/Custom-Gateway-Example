var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var app = express();
var xmlParser = require('express-xml-bodyparser');


console.log("Starting Customizable Gateways POC server");
require('./config/express')(app);
require('./config/routes')(app);

var server = require('https').createServer(config.dns, app).listen(config.port);