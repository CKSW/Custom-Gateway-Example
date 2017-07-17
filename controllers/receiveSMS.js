/**
 * Created by Sharon.Linn on 7/7/2017.
 */
var q = require('q');
var request = require('request');
var tropo_webapi = require('tropo-webapi');

module.exports = {
    init: function (req, res, next) {
        var session = req.body.session;
        console.log(req.body);
        if (session.initialText !== undefined && session.initialText !== null) {
            console.log("incoming message from tropo - sending to CEM");

            res.send({answer: "ok"});
            //
            // Enter your tropo outbound messaging token below.

            var CEMURL = "https://CEMserverURL/api/custom/sms/incoming";


            var options = {
                method: 'POST',
                url: CEMURL,
                headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "Body": session.initialText,
                        "customProvider": true,
                        "To": "+" + session.to.id.toString(),
                        "From": "+" + session.from.id.toString(),
                        "Called": true
                    })
            };
            console.log(options.url);
            request(options, function (error, response, body) {
                if (error) {
                    console.log("error");
                    console.log(error);
                    res.send(error);
                }
                else {
                    console.log("CEM answer");
                    console.log(body);
                    res.send(body);
                }
            });
        }
        else {
            console.log("Sending message");
            console.log("sending SMS out to tropo");
            console.log(req.body);
            var tropo = new tropo_webapi.TropoWebAPI();

            var token = 'Tropo provider token'; //In case you have other provider, here is the place to configure the credentials
            var msg = session.parameters.msg;
            var number = session.parameters.number;


            // //to, answerOnMedia, channel, from, headers, name, network, recording, required, timeout
            tropo.call(number, null, null, null, null, null, "SMS", null, null, null);
            tropo.say(msg);

            console.log(tropo_webapi.TropoJSON(tropo));
            res.send(tropo_webapi.TropoJSON(tropo));
        }

    }

};