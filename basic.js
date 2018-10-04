// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});


app.post('/webhook', (req, res) => {
  console.log(req.body);
  
})



const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.h

// listen for requests :)


