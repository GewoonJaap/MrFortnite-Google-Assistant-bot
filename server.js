// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
    console.log(req.body);
    console.log(req.body.queryResult.parameters["device"]);
    console.log(req.body.queryResult.parameters.any);
  
  let name = req.body.queryResult.parameters.any
  let device = req.body.queryResult.parameters["device"]
  let country = req.body.queryResult.languageCode
  
  console.log(name)
  console.log(req.body.queryResult.languageCode)
  console.log(device)
  
  
  if (country == 'en-gb' || country == 'en-us' || country == 'en-au' || country == 'en-ca' || country == 'en-in'){
    console.log('Country English detected')
  if (device == "PC"){  
    console.log('English PC detected')
   
    //EN PC stats
    
    var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fortnite.y3n.co/v2/player/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'X-Key': "RkwDRSKWwv3fWXp7Sfwk"
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var stats = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, This user isn't known yet😞",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var stats = JSON.parse(body);
              
              
          res.status(200).json({
          fulfillmentText: " Here are the stats for: " + name +"\n Kills: " + stats.br.stats.pc.all.kills + "\n K/D: " + stats.br.stats.pc.all.kpd + "\n Wins: " + stats.br.stats.pc.all.wins + "\n Matchesplayed: " + stats.br.stats.pc.all.matchesPlayed,
          source: "Mr. Fortnite backend"
          });
              }
       
      })}
    else if (device == "PS4"|| device == "Playstation"){
      
      console.log('English ps4 detected')
     
      //EN playstation stats
      
      var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fortnite.y3n.co/v2/player/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'X-Key': "RkwDRSKWwv3fWXp7Sfwk"
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, This user isn't known yet😞",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              
              
          res.status(200).json({
         fulfillmentText: " Here are the stats for: " + name +"\n Kills: " + statz.br.stats.ps4.all.kills + "\n K/D: " + statz.br.stats.ps4.all.kpd + "\n Wins: " + statz.br.stats.ps4.all.wins + "\n Matchesplayed: " + statz.br.stats.ps4.all.matchesPlayed,
          source: "Mr. Fortnite backend"
          });
              }
       
      })
    }
  }
  
  if (country == 'nl'){
      console.log('Country NL detected')
  if (device == "PC"){  
    console.log('NL PC detected')
   
    //NL PC stats
    
    var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fortnite.y3n.co/v2/player/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'X-Key': "RkwDRSKWwv3fWXp7Sfwk"
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var stats = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, Deze speler is nog niet bekend😞",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var stats = JSON.parse(body);
              
              
          res.status(200).json({
          fulfillmentText: " Hier zijn de stats voor: " + name +"\n Kills: " + stats.br.stats.pc.all.kills + "\n K/D: " + stats.br.stats.pc.all.kpd + "\n Wins: " + stats.br.stats.pc.all.wins + "\n Matchesplayed: " + stats.br.stats.pc.all.matchesPlayed,
          source: "Mr. Fortnite backend"
          });
              }
       
      })}
    else if (device == "PS4"|| device == "Playstation"){
      
      console.log('NL ps4 detected')
     
      //EN playstation stats
      
      var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fortnite.y3n.co/v2/player/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'X-Key': "RkwDRSKWwv3fWXp7Sfwk"
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, Deze speler is nog niet bekend😞",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              
              
          res.status(200).json({
         fulfillmentText: " Hier zijn de stats voor: " + name +"\n Kills: " + statz.br.stats.ps4.all.kills + "\n K/D: " + statz.br.stats.ps4.all.kpd + "\n Wins: " + statz.br.stats.ps4.all.wins + "\n Matchesplayed: " + statz.br.stats.ps4.all.matchesPlayed,
          source: "Mr. Fortnite backend"
          });
              }
       
      })
    }
  
  }
  


    //Persist this in some database
    //Send out an email that new feedback has come in
         /*   res.status(200).json({
      
         // fulfillmentText: "Here are the fortnite stats for:" + req.body.queryResult.parameters.any +'\nKills:'+ stats.br.stats.pc.all.kills +'\nK/D' + stats.br.stats.pc.all.kpd + '\nMatches played:' + stats.br.stats.pc.all.matchesPlayed + '\nWins:' + stats.br.stats.pc.all.wins,
       fulfillmentText: "Woops, stats not found😞",
         source: "Mr. Fortnite backend"}); */
});


const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.h

// listen for requests :)
