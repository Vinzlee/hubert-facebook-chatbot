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

//Chatbot root
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

//Start the server
app.listen(process.env.PORT || 3000);

