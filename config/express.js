/**
 * Created by Sharon.Linn on 7/6/2017.
 */
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    xmlParser = require('express-xml-bodyparser'),
    winston = require('winston');

module.exports = function (app, config) {

    //=======================================Access Log=======================================================
    var logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: path.join(__dirname, '/logs/mainLog.log'),
                handleExceptions: true,
                json: true,
                maxsize: 2000000000, //10GB
                maxFiles: 5,
                colorize: false
            })
        ],
        exitOnError: false
    });

    logger.stream = {
        write: function (message, encoding) {
            logger.info(message);
        }
    };
    var logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url :status :res[content-length] resp.time => :response-time(ms)';
    app.use(morgan(logFormat, {stream: logger.stream}));


    //========================================================================================================

    app.disable('x-powered-by');
    var myRawParser = function (req, res, next) {
        req.rawData = '';
        if (req.header('content-type') == 'text/plain' || req.header('content-type') == undefined) {
            req.on('data', function (chunk) {
                req.rawData += chunk;
            })
            req.on('end', function () {
                next();
            })
        } else {
            next();
        }
    }
    app.use(myRawParser);


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(xmlParser({
        trim: false,
        explicitArray: false
    }));
}

