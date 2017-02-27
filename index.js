/**
 * This program belongs to Vincent CHOLLET.
 * It is considered a trade secret, and is not to be divulged or used
 * by parties who have not received written authorization from the owner.
 * For more details please contact us on vinz.chollet@gmail.com
 *
 * @author         Vincent CHOLLET
 * @company
 * @version        1.0
 * @date           27/02/2017
 */

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//Test root
app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

//Chatbot token authentication root
app.get("/webhook", (req, res) => {
    if ( req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === "hubert_token" ) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

//Chatbot
app.post('/webhook', (req, res) => {
    let data = req.body;

    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function(entry) {
            let pageID = entry.id;
            let timeOfEvent = entry.time;

            // Iterate over each messaging event
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    receivedMessage(event);
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);
    }
});

function receivedMessage(event) {
    // Putting a stub for now, we'll expand it in the following steps
    console.log("Message data: ", event.message);
}

//Start the server
app.listen(process.env.PORT || 3000);

