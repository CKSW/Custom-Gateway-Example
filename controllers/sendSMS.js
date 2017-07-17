var q = require('q');
var request = require('request');

module.exports = {
    init: function (req, res, next) {
        res.send("ok");
        console.log("sending SMS out to tropo");

        // Enter your tropo outbound messaging token below.
        var token = 'Tropo provider token'; //In case you have other provider, here is the place to configure the credentials
        var msg = encodeURI(req.body.msg);
        if (req.body.customerPhone !== undefined) {
            var phoneString = req.body.customerPhone.toString();
            //removing "+" from phone number
            if (phoneString.indexOf("+") !== -1) {
                phoneString.split(",").join("")
            }
            var number = phoneString;
        }
        else {
            res.send("No phone number supplied");
            next();
        }
        var tropoSessionAPI = 'https://api.tropo.com';
        var path = '/1.0/sessions?action=create&token=' + token + '&msg=' + msg + '&number=' + number;

        var options = {
            method: 'GET',
            url: tropoSessionAPI + path,
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            }

        };
        console.log(options);
        request(options, function (error, response, body) {
            if (error) {
                console.log("error");
                console.log(error);
            }
            else {
                console.log("Tropo answer");
                console.log(body);
            }
        });
    }

};