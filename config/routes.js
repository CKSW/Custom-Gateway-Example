var config = require("./config");
var send = require('../controllers/sendSMS');
var receive = require('../controllers/receiveSMS');

module.exports = function (app) {
    app.post('/sendSMS', send.init);
    app.post('/incoming', receive.init);
}


/**
 * Created by Sharon.Linn on 7/6/2017.
 */
