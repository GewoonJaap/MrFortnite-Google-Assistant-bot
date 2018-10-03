// server.js
// where your node app starts

// init project
const express = require('express');
JSON.serialize = JSON.stringify;
const appd = require('dialogflow')
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const {BasicCard, Button} = require('actions-on-google');
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const app2 = dialogflow({debug: true});
var admin = require('firebase-admin');

// The Fortnite API key is written in a protected file that you can't access, request a key at: https://fortnitetracker.com/site-api
var FortniteAPIKey = process.env.FORTNITEAPI
// Google Drive feedback URL, used to save the feedback into google forms
var GoogleDriveFeedbackURL = process.env.GOOGLEDRIVEURL;
var CommandLoggerURL = process.env.COMMANDLOGGERURL;
var MrFortniteURL = process.env.MRFORTNITESITE;
var FNBRcoAPI = process.env.FNBRCO
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
    let country = req.body.queryResult.languageCode;
  var finalA = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  console.log(req.body.queryResult.intent.displayName);
  let intent = req.body.queryResult.intent.displayName;
  
  
  if(req.body.queryResult.intent.displayName = "stats"){
    commandlogging();
  
  let name = req.body.queryResult.parameters.any
  
  let device = req.body.queryResult.parameters["device"]
  
  

  
  
  console.log(name)
  console.log(req.body.queryResult.languageCode)
  console.log(device)

  
  
  if (country == 'en-gb' || country == 'en-us' || country == 'en-au' || country == 'en-ca' || country == 'en-in'){
    console.log('Country English detected')
  if (device == "PC" || device == "Pc" || device == "pc" || device == "pC"){  
    console.log('English PC detected')
   
    //EN PC stats
    
    var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/pc/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        console.log(JSON.parse(body));
        var stats = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, This user isn't known yet😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'});
        
      }
        
      /*  else { console.log('No 404');
              var stats = JSON.parse(body);
              console.log(JSON.parse(body));
              if(!stats.br.stats.pc) return res.status(200).json({
       fulfillmentText: "Woops, This player doesn't play on this device😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'}); */
              var stats = JSON.parse(body);
        
       /* Lifetime Solo Wins - {{ states.sensor.fortnite_stats.attributes.stats.p2.top1.value }}
              Lifetime Solo Top 3 - {{ states.sensor.fortnite_stats.attributes.stats.p2.top3.value }}
              Lifetime Solo Top 10 - {{ states.sensor.fortnite_stats.attributes.stats.p2.top10.value }}
              Lifetime Solo Total kd - {{ states.sensor.fortnite_stats.attributes.stats.p2.kd.value }}
              Lifetime Solo Kills - {{ states.sensor.fortnite_stats.attributes.stats.p2.kills.value }}
              Lifetime Solo kpg - {{ states.sensor.fortnite_stats.attributes.stats.p2.kpg.value }}
              
              Duo p10
              Squad p9
              */
          res.status(200).json({
          fulfillmentText: " Here are the stats for: " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Something else i can do?",
          source: "Mr. Fortnite backend"
          });
              }
       
      //}
             )}
    else if (device == "PS4" ||device == "PLAYSTATION" ||device == "Playstation" ||device == "playstation" ||device == "Ps4" ||device == "ps4"){
      
      console.log('English ps4 detected')
     
      //EN playstation stats
      
          var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/psn/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, This user isn't known yet😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              
              if(!statz.stats) return res.status(200).json({
       fulfillmentText: "Woops, This player doesn't play on this device😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'});
              
            var stats = JSON.parse(body);  
          res.status(200).json({
          fulfillmentText: " Here are the stats for: " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Something else i can do?",
          source: "Mr. Fortnite backend"
          });
              }
       
      })
    }
    
        else if (device == "Xbox" ||device == "XBOX" ||device == "XB1" ||device == "Xbox 1" ||device == "Xbox one"){
      
      console.log('EN Xbox detected')
     
      //EN playstation stats
      
            var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/xb1/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, This player isn't known yet😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              
              if(!statz.stats) return res.status(200).json({
       fulfillmentText: "Woops, This player doesn't play on this device😞 \n Something else i can do?",
          source: 'Mr. Fortnite backend'});
              
              
          var stats = JSON.parse(body);  
          res.status(200).json({
          fulfillmentText: " Here are the stats for: " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Something else i can do?",
          source: "Mr. Fortnite backend"
          });
              }
       
      })
    }
    
    
  }
  
  if (country == 'nl'){
      console.log('Country NL detected')
  if (device == "PC" || device == "Pc" || device == "pc" || device == "pC"){  
    console.log('NL PC detected')
   
    //NL PC stats
    
            var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/pc/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var stats = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, Deze speler is nog niet bekend😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var stats = JSON.parse(body);
              
              if(!stats.stats) return res.status(200).json({
       fulfillmentText: "Woops, Deze speler speelt niet op dit platform😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'}); 
              
              
          var stats = JSON.parse(body);  
          res.status(200).json({
          fulfillmentText: " Hier zijn de statistieken voor : " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Is er nog iets wat ik kan doen?",
          source: "Mr. Fortnite backend"
          });
              }
       
      })}
    else if (device == "PS4" ||device == "PLAYSTATION" ||device == "Playstation" ||device == "playstation" ||device == "Ps4" ||device == "ps4"){
      
      console.log('NL ps4 detected')
     
      //EN playstation stats
      
            var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/psn/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, Deze speler is nog niet bekend😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              var stats = JSON.parse(body);  
              
                         if(!stats.stats) return res.status(200).json({
       fulfillmentText: "Woops, Deze speler speelt niet op dit platform😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'});
              
              
          
          res.status(200).json({
          fulfillmentText: " Hier zijn de statistieken voor: " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Is er iets anders wat ik nog voor je kan doen?",
          source: "Mr. Fortnite backend"
          });
              }
       
      })
    }
    
    else if (device == "Xbox" ||device == "XBOX" ||device == "XB1" ||device == "Xbox 1" ||device == "Xbox one"){
      
      console.log('NL Xbox detected')
     
      //EN playstation stats
      
            var options = {
      method: "GET",
      // player name is robi62
      url: 'https://api.fortnitetracker.com/v1/profile/xb1/' + name,
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, Deze speler is nog niet bekend😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
              
              
                         if(!statz.stats) return res.status(200).json({
       fulfillmentText: "Woops, Deze speler speelt niet op dit platform😞 \n Is er iets anders wat ik voor je kan doen?",
          source: 'Mr. Fortnite backend'});
              
              
          var stats = JSON.parse(body);  
          res.status(200).json({
          fulfillmentText: " Hier zijn de statistieken voor: " + name +".\n Solo Wins: " + stats.stats.p2.top1.value + ".\n Solo K/D: " + stats.stats.p2.kd.value + ".\n Solo Kills: " + stats.stats.p2.kills.value  +".\n Duo Wins: " + stats.stats.p10.top1.value + ".\n Duo K/D: " + stats.stats.p10.kd.value + ".\n Duo Kills: " + stats.stats.p10.kills.value +".\n Squad Wins: " + stats.stats.p9.top1.value + ".\n Squad K/D: " + stats.stats.p9.kd.value + ".\n Squad Kills: " + stats.stats.p9.kills.value + ".\n Is er nog iets wat ik voor je kan doen?",
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
  }
  
  
  
  if(intent == "Cube"){
    
let CubeResponse = require(`./commands/cube.js`);
    CubeResponse();
    commandlogging();
    
    
    
    var finalA = '1' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    
    if(country == "nl"){
    
  
    console.log("Cube intent")
            res.status(200).json({
 "fulfillmentText": "Hier heb je de locatie van de kubus.\nIs er nog iets wat ik voor je kan doen?",
    "fulfillmentMessages": [],
    "source": "Mr. Fortnite API",
    "payload": {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": "Hier heb je de locatie van de kubus.\nIs er nog iets wat ik voor je kan doen?"
                        }
                    },
                    {
                        "basicCard": {
                            "title": "Kubus locatie",
                            "image": {
                                "url": "https://image.fnbr.co/island.jpg?" + finalA,
                                "accessibilityText": "Kubus locatie"
                            },
                            "buttons": [
                                {
                                    "title": "Credits naar fnbr.co",
                                    "openUrlAction": {
                                        "url": "https://fnbr.co/island"
                                    }
                                }
                            ],
                            "imageDisplayOptions": "WHITE"
                        }
                    }
                ]
            }
        }
    },
    "outputContexts": [],
    "followupEventInput": {}
         //       
          });
  
  } 
    
    else {
    console.log("Cube intent")
            res.status(200).json({
 "fulfillmentText": "Here you have the Cube location.\nIs there something else I can do for you?",
    "fulfillmentMessages": [],
    "source": "Mr. Fortnite API",
    "payload": {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": "Here you have the Cube location.\nIs there something else I can do for you?"
                        }
                    },
                    {
                        "basicCard": {
                            "title": "Cube location",
                            "image": {
                                "url": "https://image.fnbr.co/island.jpg?" + finalA,
                                "accessibilityText": "Cube location"
                            },
                            "buttons": [
                                {
                                    "title": "Credits: fnbr.co",
                                    "openUrlAction": {
                                        "url": "https://fnbr.co/island"
                                    }
                                }
                            ],
                            "imageDisplayOptions": "WHITE"
                        }
                    }
                ]
            }
        }
    },
    "outputContexts": [],
    "followupEventInput": {}
         //       
          });
    
    
    
    }
    
  }
  
  
  function commandlogging() {
       let Text = req.body.queryResult.queryText

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
    var thxtext;
    
request.post(CommandLoggerURL, 
    {form:{ 'entry.1325239568': intent, 'entry.761812201': Text }}, 
    function(error, response, body){
  console.log("-> Command logged!")

  return;
});
}
  
  if(intent == 'Feedback'){
  let error = req.body.queryResult.parameters.error
let intenttext = req.body.queryResult.parameters.intenttext
let whatwould = req.body.queryResult.parameters.whatwould

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
    var thxtext;
    
request.post(GoogleDriveFeedbackURL, 
    {form:{ 'entry.180196638': intenttext, 'entry.1913027449': whatwould, 'entry.2083165757': error }}, 
    function(error, response, body){
  
  if(country == 'nl'){
  thxtext = "Dankjewel voor de feedback! We gaan er mee aan de slag :) \n Is er nog iets anders wat ik voor je kan doen?"
  }
  
  else{
  thxtext = "Thanks for your feedback! We are going to take a look at your submitted data :) \n Is there something else I can do for you?"}
  
      res.status(200).json({
       fulfillmentText: thxtext,
          source: 'Mr. Fortnite backend'});
  return;
});

  
  }
  
  
  
  
  //Shop //
  //
  //
  //
  //
  // Begin Shop//
  
  
  
  if(intent == 'Page 2' || intent == 'Force shop page 2'){
    commandlogging();
                  var options = {
      method: "GET",
      url: 'https://api.fortnitetracker.com/v1/store',
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
                  
                                request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Something went wrong!!😞 \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
        
      }
                                   else { console.log('No 404'); 
                                        
                                                        var TenSkins;
    var Skins;
    
    if (country == 'nl'){ 
      Skins = "Hier zijn de andere items.\n Is er nog iets anders wat ik voor je kan doen?";
    TenSkins = "Hier zijn de andere items.\n Is er nog iets anders wat ik voor je kan doen?"
    }
    
    else {
      Skins = "Here you have the other items of the shop.\n Is there anything else I can do?";
      TenSkins = "Here you have the other items of the shop.\n Is there anything else I can do?"
    }
                                         
                                         
        var stats = JSON.parse(body);  
              console.log (stats.length);
              var items = stats.length;
                                         
                                         if(items => 10 || items == 10){
                                           
                                           if (items == 18){
                
                
              
               res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": TenSkins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
                            {
                "optionInfo": {
                  "key": stats[15].name
                },
                "description": "Vbucks: " + stats[15].vBucks,
                "image": {
                  "url": stats[15].imageUrl,
                  "accessibilityText": stats[15].name
                },
                "title": "6. " + stats[15].name
              },
                            {
                "optionInfo": {
                  "key": stats[16].name
                },
                "description": "Vbucks: " + stats[16].vBucks,
                "image": {
                  "url": stats[16].imageUrl,
                  "accessibilityText": stats[16].name
                },
                "title": "7. " + stats[16].name
              },
                            {
                "optionInfo": {
                  "key": stats[17].name
                },
                "description": "Vbucks: " + stats[17].vBucks,
                "image": {
                  "url": stats[17].imageUrl,
                  "accessibilityText": stats[17].name
                },
                "title": "8. " + stats[17].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
              }
                                           
                                           else if(items == 19){
                                             
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": TenSkins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
                            {
                "optionInfo": {
                  "key": stats[15].name
                },
                "description": "Vbucks: " + stats[15].vBucks,
                "image": {
                  "url": stats[15].imageUrl,
                  "accessibilityText": stats[15].name
                },
                "title": "6. " + stats[15].name
              },
                            {
                "optionInfo": {
                  "key": stats[16].name
                },
                "description": "Vbucks: " + stats[16].vBucks,
                "image": {
                  "url": stats[16].imageUrl,
                  "accessibilityText": stats[16].name
                },
                "title": "7. " + stats[16].name
              },
                            {
                "optionInfo": {
                  "key": stats[17].name
                },
                "description": "Vbucks: " + stats[17].vBucks,
                "image": {
                  "url": stats[17].imageUrl,
                  "accessibilityText": stats[17].name
                },
                "title": "8. " + stats[17].name
              },
                                          {
                "optionInfo": {
                  "key": stats[18].name
                },
                "description": "Vbucks: " + stats[18].vBucks,
                "image": {
                  "url": stats[18].imageUrl,
                  "accessibilityText": stats[18].name
                },
                "title": "9. " + stats[18].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
                                         
                                         
                                         }
                                          else if(items == 20){
                                            
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": TenSkins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
                            {
                "optionInfo": {
                  "key": stats[15].name
                },
                "description": "Vbucks: " + stats[15].vBucks,
                "image": {
                  "url": stats[15].imageUrl,
                  "accessibilityText": stats[15].name
                },
                "title": "6. " + stats[15].name
              },
                            {
                "optionInfo": {
                  "key": stats[16].name
                },
                "description": "Vbucks: " + stats[16].vBucks,
                "image": {
                  "url": stats[16].imageUrl,
                  "accessibilityText": stats[16].name
                },
                "title": "7. " + stats[16].name
              },
                            {
                "optionInfo": {
                  "key": stats[17].name
                },
                "description": "Vbucks: " + stats[17].vBucks,
                "image": {
                  "url": stats[17].imageUrl,
                  "accessibilityText": stats[17].name
                },
                "title": "8. " + stats[17].name
              },
                                          {
                "optionInfo": {
                  "key": stats[18].name
                },
                "description": "Vbucks: " + stats[18].vBucks,
                "image": {
                  "url": stats[18].imageUrl,
                  "accessibilityText": stats[18].name
                },
                "title": "9. " + stats[18].name
              },
                                                        {
                "optionInfo": {
                  "key": stats[18].name
                },
                "description": "Vbucks: " + stats[18].vBucks,
                "image": {
                  "url": stats[19].imageUrl,
                  "accessibilityText": stats[19].name
                },
                "title": "10. " + stats[19].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                            
                                         
                                         
                                         }
                                         
                                         else if(items == 17){
                                                                                     
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
                            {
                "optionInfo": {
                  "key": stats[15].name
                },
                "description": "Vbucks: " + stats[15].vBucks,
                "image": {
                  "url": stats[15].imageUrl,
                  "accessibilityText": stats[15].name
                },
                "title": "6. " + stats[15].name
              },
                            {
                "optionInfo": {
                  "key": stats[16].name
                },
                "description": "Vbucks: " + stats[16].vBucks,
                "image": {
                  "url": stats[16].imageUrl,
                  "accessibilityText": stats[16].name
                },
                "title": "7. " + stats[16].name
              },

              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         }
                                         
                                          else if(items == 16){
                                            
                                                                                        
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
                            {
                "optionInfo": {
                  "key": stats[15].name
                },
                "description": "Vbucks: " + stats[15].vBucks,
                "image": {
                  "url": stats[15].imageUrl,
                  "accessibilityText": stats[15].name
                },
                "title": "6. " + stats[15].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         
                                         }
                                          else if(items == 15){
                                                                                        
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              },
                            {
                "optionInfo": {
                  "key": stats[14].name
                },
                "description": "Vbucks: " + stats[14].vBucks,
                "image": {
                  "url": stats[14].imageUrl,
                  "accessibilityText": stats[14].name
                },
                "title": "5. " + stats[14].name
              },
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         
                                         }
                                          else if(items == 14){
                                                                                        
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              },
                            {
                "optionInfo": {
                  "key": stats[13].name
                },
                "description": "Vbucks: " + stats[13].vBucks,
                "image": {
                  "url": stats[13].imageUrl,
                  "accessibilityText": stats[13].name
                },
                "title": "4. " + stats[13].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         
                                         }
                                          else if(items == 13){
                                                                                        
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              },
              {
                "optionInfo": {
                  "key": stats[12].name
                },
                "description": "Vbucks: " + stats[12].vBucks,
                "image": {
                  "url": stats[12].imageUrl,
                  "accessibilityText": stats[12].name
                },
                "title": "3. " + stats[12].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         
                                         }
                                         
                                          else if(items == 12){
                                                                                        
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "1. " + stats[10].name
              },
              {
                "optionInfo": {
                  "key": stats[11].name
                },
                "description": "Vbucks: " + stats[11].vBucks,
                "image": {
                  "url": stats[11].imageUrl,
                  "accessibilityText": stats[11].name
                },
                "title": "2. " + stats[11].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         
                                         
                                         }
                                          else if(items == 11){
                                         
                                                                                     
                                                                                        
                                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
                            {
                "optionInfo": {
                  "key": stats[9].name
                },
                "description": "Vbucks: " + stats[9].vBucks,
                "image": {
                  "url": stats[9].imageUrl,
                  "accessibilityText": stats[9].name
                },
                "title": "1. " + stats[9].name
              },
              
              {
                "optionInfo": {
                  "key": stats[10].name
                },
                "description": "Vbucks: " + stats[10].vBucks,
                "image": {
                  "url": stats[10].imageUrl,
                  "accessibilityText": stats[10].name
                },
                "title": "2. " + stats[10].name
              }
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
                                         }
                                           
                                           else if(items < 11){
                                            res.status(200).json({
       fulfillmentText: "Sorry, but the store has only 1 page of items😞! \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
                                           }
                                           
                                           
                                         
                                         
                                         }
                                         
                                         
                                         
                                         
                                         else {
                                                 res.status(200).json({
       fulfillmentText: "Something went wrong!!😞 \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
                                         
                                         }
                                          
                                    
                                         
                                         
                                        }
                                  
                                })
                                        
                  
    
  
  
  
  
  }
  
  if(intent == 'shop'){
    commandlogging();

      
              var options = {
      method: "GET",
      url: 'https://api.fortnitetracker.com/v1/store',
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': FortniteAPIKey
      }
    }
              
              request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Something went wrong!!😞 \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              

              
              
                  var TenSkins;
    var Skins;
    
    if (country == 'nl'){ 
      Skins = "Hier heb je de Fortnite shop! \n Is er nog iets anders wat ik voor je kan doen?";
    TenSkins = "Hier zijn de eerste 10 items van de Fortnite shop. (10 Is het maximaal aantal plaatjes wat Google ondersteund. Als je de andere items wilt zien zeg dan: Volgende pagina). \n Is er nog iets anders wat ik voor je kan doen?"
    }
    
    else {
      Skins = "Here you have the Fortnite shop! \n Is there anything else I can do?";
      TenSkins = "Here are the first 10 items of the Fortnite shop. (10 is the maximum Google supports at the moment. If you want to see the other items, say: Next page). \n Is there anything else I can do?"
    }
              
                    
          var stats = JSON.parse(body);  
              console.log (stats.length);
              var items = stats.length;
              
                            var i;
for (i = 0; i < stats.length; i++) { 
    console.log(stats[i]);
};
              
              
              if(items >= 10 || items == 10){
                
                                                             
              res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            
            "simpleResponse": {
              "textToSpeech": TenSkins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              
              {
                "optionInfo": {
                  "key": stats[0].name
                },
                "description": "Vbucks: " + stats[0].vBucks,
                "image": {
                  "url": stats[0].imageUrl,
                  "accessibilityText": stats[0].name
                },
                "title": "1. " + stats[0].name
              },
              {
                "optionInfo": {
                  "key": stats[1].name
                },
                "description": "Vbucks: " + stats[1].vBucks,
                "image": {
                  "url": stats[1].imageUrl,
                  "accessibilityText": stats[1].name
                },
                "title": "2. " + stats[1].name
              },
              {
                "optionInfo": {
                  "key": stats[2].name
                },
                "description": "Vbucks: " + stats[2].vBucks,
                "image": {
                  "url": stats[2].imageUrl,
                  "accessibilityText": stats[2].name
                },
                "title": "3. " + stats[2].name
              },
                            {
                "optionInfo": {
                  "key": stats[3].name
                },
                "description": "Vbucks: " + stats[3].vBucks,
                "image": {
                  "url": stats[3].imageUrl,
                  "accessibilityText": stats[3].name
                },
                "title": "4. " + stats[3].name
              },
                            {
                "optionInfo": {
                  "key": stats[4].name
                },
                "description": "Vbucks: " + stats[4].vBucks,
                "image": {
                  "url": stats[4].imageUrl,
                  "accessibilityText": stats[4].name
                },
                "title": "5. " + stats[4].name
              },
                            {
                "optionInfo": {
                  "key": stats[5].name
                },
                "description": "Vbucks: " + stats[5].vBucks,
                "image": {
                  "url": stats[5].imageUrl,
                  "accessibilityText": stats[5].name
                },
                "title": "6. " + stats[5].name
              },
                            {
                "optionInfo": {
                  "key": stats[6].name
                },
                "description": "Vbucks: " + stats[6].vBucks,
                "image": {
                  "url": stats[6].imageUrl,
                  "accessibilityText": stats[6].name
                },
                "title": "7. " + stats[6].name
              },
                            {
                "optionInfo": {
                  "key": stats[7].name
                },
                "description": "Vbucks: " + stats[7].vBucks,
                "image": {
                  "url": stats[7].imageUrl,
                  "accessibilityText": stats[7].name
                },
                "title": "8. " + stats[7].name
              },
                            {
                "optionInfo": {
                  "key": stats[8].name
                },
                "description": "Vbucks: " + stats[8].vBucks,
                "image": {
                  "url": stats[8].imageUrl,
                  "accessibilityText": stats[8].name
                },
                "title": "9. " + stats[8].name
              },
                            {
                "optionInfo": {
                  "key": stats[9].name
                },
                "description": "Vbucks: " + stats[9].vBucks,
                "image": {
                  "url": stats[9].imageUrl,
                  "accessibilityText": stats[9].name
                },
                "title": "10. " + stats[9].name
              },
              


            ]
          }
        }
      }
    }
  }
                                    

         //       
          }); 
              }
              
              
              else if (items == 9){
                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats[0].name
                },
                "description": "Vbucks: " + stats[0].vBucks,
                "image": {
                  "url": stats[0].imageUrl,
                  "accessibilityText": stats[0].name
                },
                "title": "1. " + stats[0].name
              },
              {
                "optionInfo": {
                  "key": stats[1].name
                },
                "description": "Vbucks: " + stats[1].vBucks,
                "image": {
                  "url": stats[1].imageUrl,
                  "accessibilityText": stats[1].name
                },
                "title": "2. " + stats[1].name
              },
              {
                "optionInfo": {
                  "key": stats[2].name
                },
                "description": "Vbucks: " + stats[2].vBucks,
                "image": {
                  "url": stats[2].imageUrl,
                  "accessibilityText": stats[2].name
                },
                "title": "3. " + stats[2].name
              },
                            {
                "optionInfo": {
                  "key": stats[3].name
                },
                "description": "Vbucks: " + stats[3].vBucks,
                "image": {
                  "url": stats[3].imageUrl,
                  "accessibilityText": stats[3].name
                },
                "title": "4. " + stats[3].name
              },
                            {
                "optionInfo": {
                  "key": stats[4].name
                },
                "description": "Vbucks: " + stats[4].vBucks,
                "image": {
                  "url": stats[4].imageUrl,
                  "accessibilityText": stats[4].name
                },
                "title": "5. " + stats[4].name
              },
                            {
                "optionInfo": {
                  "key": stats[5].name
                },
                "description": "Vbucks: " + stats[5].vBucks,
                "image": {
                  "url": stats[5].imageUrl,
                  "accessibilityText": stats[5].name
                },
                "title": "6. " + stats[5].name
              },
                            {
                "optionInfo": {
                  "key": stats[6].name
                },
                "description": "Vbucks: " + stats[6].vBucks,
                "image": {
                  "url": stats[6].imageUrl,
                  "accessibilityText": stats[6].name
                },
                "title": "7. " + stats[6].name
              },
                            {
                "optionInfo": {
                  "key": stats[7].name
                },
                "description": "Vbucks: " + stats[7].vBucks,
                "image": {
                  "url": stats[7].imageUrl,
                  "accessibilityText": stats[7].name
                },
                "title": "8. " + stats[7].name
              },
                            {
                "optionInfo": {
                  "key": stats[8].name
                },
                "description": "Vbucks: " + stats[8].vBucks,
                "image": {
                  "url": stats[8].imageUrl,
                  "accessibilityText": stats[8].name
                },
                "title": "9. " + stats[8].name
              }



            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
              
              
              
              }
              
              else if(items == 8){
                
                               res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats[0].name
                },
                "description": "Vbucks: " + stats[0].vBucks,
                "image": {
                  "url": stats[0].imageUrl,
                  "accessibilityText": stats[0].name
                },
                "title": "1. " + stats[0].name
              },
              {
                "optionInfo": {
                  "key": stats[1].name
                },
                "description": "Vbucks: " + stats[1].vBucks,
                "image": {
                  "url": stats[1].imageUrl,
                  "accessibilityText": stats[1].name
                },
                "title": "2. " + stats[1].name
              },
              {
                "optionInfo": {
                  "key": stats[2].name
                },
                "description": "Vbucks: " + stats[2].vBucks,
                "image": {
                  "url": stats[2].imageUrl,
                  "accessibilityText": stats[2].name
                },
                "title": "3. " + stats[2].name
              },
                            {
                "optionInfo": {
                  "key": stats[3].name
                },
                "description": "Vbucks: " + stats[3].vBucks,
                "image": {
                  "url": stats[3].imageUrl,
                  "accessibilityText": stats[3].name
                },
                "title": "4. " + stats[3].name
              },
                            {
                "optionInfo": {
                  "key": stats[4].name
                },
                "description": "Vbucks: " + stats[4].vBucks,
                "image": {
                  "url": stats[4].imageUrl,
                  "accessibilityText": stats[4].name
                },
                "title": "5. " + stats[4].name
              },
                            {
                "optionInfo": {
                  "key": stats[5].name
                },
                "description": "Vbucks: " + stats[5].vBucks,
                "image": {
                  "url": stats[5].imageUrl,
                  "accessibilityText": stats[5].name
                },
                "title": "6. " + stats[5].name
              },
                            {
                "optionInfo": {
                  "key": stats[6].name
                },
                "description": "Vbucks: " + stats[6].vBucks,
                "image": {
                  "url": stats[6].imageUrl,
                  "accessibilityText": stats[6].name
                },
                "title": "7. " + stats[6].name
              },
                            {
                "optionInfo": {
                  "key": stats[7].name
                },
                "description": "Vbucks: " + stats[7].vBucks,
                "image": {
                  "url": stats[7].imageUrl,
                  "accessibilityText": stats[7].name
                },
                "title": "8. " + stats[7].name
              }



            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
              
              
              }
              
              else if(items == 7){
                               res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats[0].name
                },
                "description": "Vbucks: " + stats[0].vBucks,
                "image": {
                  "url": stats[0].imageUrl,
                  "accessibilityText": stats[0].name
                },
                "title": "1. " + stats[0].name
              },
              {
                "optionInfo": {
                  "key": stats[1].name
                },
                "description": "Vbucks: " + stats[1].vBucks,
                "image": {
                  "url": stats[1].imageUrl,
                  "accessibilityText": stats[1].name
                },
                "title": "2. " + stats[1].name
              },
              {
                "optionInfo": {
                  "key": stats[2].name
                },
                "description": "Vbucks: " + stats[2].vBucks,
                "image": {
                  "url": stats[2].imageUrl,
                  "accessibilityText": stats[2].name
                },
                "title": "3. " + stats[2].name
              },
                            {
                "optionInfo": {
                  "key": stats[3].name
                },
                "description": "Vbucks: " + stats[3].vBucks,
                "image": {
                  "url": stats[3].imageUrl,
                  "accessibilityText": stats[3].name
                },
                "title": "4. " + stats[3].name
              },
                            {
                "optionInfo": {
                  "key": stats[4].name
                },
                "description": "Vbucks: " + stats[4].vBucks,
                "image": {
                  "url": stats[4].imageUrl,
                  "accessibilityText": stats[4].name
                },
                "title": "5. " + stats[4].name
              },
                            {
                "optionInfo": {
                  "key": stats[5].name
                },
                "description": "Vbucks: " + stats[5].vBucks,
                "image": {
                  "url": stats[5].imageUrl,
                  "accessibilityText": stats[5].name
                },
                "title": "6. " + stats[5].name
              },
                            {
                "optionInfo": {
                  "key": stats[6].name
                },
                "description": "Vbucks: " + stats[6].vBucks,
                "image": {
                  "url": stats[6].imageUrl,
                  "accessibilityText": stats[6].name
                },
                "title": "7. " + stats[6].name
              }


            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
              
              
              }
              
              
              else if(items == 6){
                
                               res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": Skins
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats[0].name
                },
                "description": "Vbucks: " + stats[0].vBucks,
                "image": {
                  "url": stats[0].imageUrl,
                  "accessibilityText": stats[0].name
                },
                "title": "1. " + stats[0].name
              },
              {
                "optionInfo": {
                  "key": stats[1].name
                },
                "description": "Vbucks: " + stats[1].vBucks,
                "image": {
                  "url": stats[1].imageUrl,
                  "accessibilityText": stats[1].name
                },
                "title": "2. " + stats[1].name
              },
              {
                "optionInfo": {
                  "key": stats[2].name
                },
                "description": "Vbucks: " + stats[2].vBucks,
                "image": {
                  "url": stats[2].imageUrl,
                  "accessibilityText": stats[2].name
                },
                "title": "3. " + stats[2].name
              },
                            {
                "optionInfo": {
                  "key": stats[3].name
                },
                "description": "Vbucks: " + stats[3].vBucks,
                "image": {
                  "url": stats[3].imageUrl,
                  "accessibilityText": stats[3].name
                },
                "title": "4. " + stats[3].name
              },
                            {
                "optionInfo": {
                  "key": stats[4].name
                },
                "description": "Vbucks: " + stats[4].vBucks,
                "image": {
                  "url": stats[4].imageUrl,
                  "accessibilityText": stats[4].name
                },
                "title": "5. " + stats[4].name
              },
                            {
                "optionInfo": {
                  "key": stats[5].name
                },
                "description": "Vbucks: " + stats[5].vBucks,
                "image": {
                  "url": stats[5].imageUrl,
                  "accessibilityText": stats[5].name
                },
                "title": "6. " + stats[5].name
              }


            ]
          }
        }
      }
    }
  }
                                    

         //       
          });
                      }
                      
                      
                      else{
                      console.log("Te weinig items: " + items);
                      
                      }
             }
              })
  
  
  

  
  }
  
  
  if(intent == "news"){
    commandlogging();
    
          //EN playstation stats
      
            var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
      headers: {
        'User-Agent': 'nodejs request'
      }
    }
  
      request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        var statz = JSON.parse(body);
        var object = JSON.parse(body);
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, er ging iets fout!",
          source: 'Mr. Fortnite backend'});
        
      }
        
        else { console.log('No 404');
              var statz = JSON.parse(body);
            
              
              
          var stats = JSON.parse(body);  
              var items = stats.battleroyalenews.news.messages.length
              console.log(items)
              var itemtext = "Here is the latest news \n Is there anything else I can help you with?";
              
              if(country == 'nl'){
              itemtext = "Hier is het laatste nieuws \n Is er iets anders waar ik je mee kan helpen?"}
              
              else{
              itemtext = "Here is the latest news \n Is there anything else I can help you with?"}
              
              
              if(items == 4){
          res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": itemtext
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[0].title
                },
                "description": stats.battleroyalenews.news.messages[0].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[0].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[0].body
                },
                "title": "1. " + stats.battleroyalenews.news.messages[0].title
              },
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[1].title
                },
                "description": stats.battleroyalenews.news.messages[1].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[1].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[1].body
                },
                "title": stats.battleroyalenews.news.messages[1].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[2].title
                },
                "description": stats.battleroyalenews.news.messages[2].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[2].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[2].body
                },
                "title": stats.battleroyalenews.news.messages[2].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[3].title
                },
                "description": stats.battleroyalenews.news.messages[3].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[3].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[3].body
                },
                "title": stats.battleroyalenews.news.messages[3].title
              }


            ]
          }
        }
      }
    }
  }
            
          //
          });
                }
              
              else if (items == 3){
                        res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": itemtext
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[0].title
                },
                "description": stats.battleroyalenews.news.messages[0].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[0].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[0].body
                },
                "title": "1. " + stats.battleroyalenews.news.messages[0].title
              },
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[1].title
                },
                "description": stats.battleroyalenews.news.messages[1].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[1].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[1].body
                },
                "title": stats.battleroyalenews.news.messages[1].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[2].title
                },
                "description": stats.battleroyalenews.news.messages[2].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[2].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[2].body
                },
                "title": stats.battleroyalenews.news.messages[2].title
              }


            ]
          }
        }
      }
    }
  }
            
          //
          });
              
              }
              
              else if(items == 2){
                        res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": itemtext
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[0].title
                },
                "description": stats.battleroyalenews.news.messages[0].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[0].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[0].body
                },
                "title": "1. " + stats.battleroyalenews.news.messages[0].title
              },
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[1].title
                },
                "description": stats.battleroyalenews.news.messages[1].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[1].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[1].body
                },
                "title": stats.battleroyalenews.news.messages[1].title
              }


            ]
          }
        }
      }
    }
  }
            
          //
          });
              }
              
              
              else if (items == 5){
                          res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": itemtext
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[0].title
                },
                "description": stats.battleroyalenews.news.messages[0].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[0].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[0].body
                },
                "title": "1. " + stats.battleroyalenews.news.messages[0].title
              },
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[1].title
                },
                "description": stats.battleroyalenews.news.messages[1].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[1].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[1].body
                },
                "title": stats.battleroyalenews.news.messages[1].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[2].title
                },
                "description": stats.battleroyalenews.news.messages[2].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[2].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[2].body
                },
                "title": stats.battleroyalenews.news.messages[2].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[3].title
                },
                "description": stats.battleroyalenews.news.messages[3].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[3].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[3].body
                },
                "title": stats.battleroyalenews.news.messages[3].title
              },
                                          {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[4].title
                },
                "description": stats.battleroyalenews.news.messages[4].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[4].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[4].body
                },
                "title": stats.battleroyalenews.news.messages[4].title
              }


            ]
          }
        }
      }
    }
  }
            
          //
          });
              
              }
              
              
              else if(items == 6){
                
                          res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": itemtext
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[0].title
                },
                "description": stats.battleroyalenews.news.messages[0].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[0].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[0].body
                },
                "title": "1. " + stats.battleroyalenews.news.messages[0].title
              },
              {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[1].title
                },
                "description": stats.battleroyalenews.news.messages[1].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[1].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[1].body
                },
                "title": stats.battleroyalenews.news.messages[1].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[2].title
                },
                "description": stats.battleroyalenews.news.messages[2].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[2].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[2].body
                },
                "title": stats.battleroyalenews.news.messages[2].title
              },
                            {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[3].title
                },
                "description": stats.battleroyalenews.news.messages[3].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[3].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[3].body
                },
                "title": stats.battleroyalenews.news.messages[3].title
              },
                                          {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[4].title
                },
                "description": stats.battleroyalenews.news.messages[4].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[4].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[4].body
                },
                "title": stats.battleroyalenews.news.messages[4].title
              },
                                          {
                "optionInfo": {
                  "key": stats.battleroyalenews.news.messages[5].title
                },
                "description": stats.battleroyalenews.news.messages[5].body,
                "image": {
                  "url": stats.battleroyalenews.news.messages[5].image,
                  "accessibilityText": stats.battleroyalenews.news.messages[5].body
                },
                "title": stats.battleroyalenews.news.messages[5].title
              }


            ]
          }
        }
      }
    }
  }
            
          //
          });
              
              }
              
              }
       
      })
    

                                    }
  
  
  
  
  if(intent == "ItemLeaks"){
  var LeaksResponseShort
  if(country == "nl"){
  LeaksResponseShort = "Hier heb je de laatste leaks! \n Is er nog iets anders wat ik kan doen?"
    
  }
    else{
      LeaksResponseShort = "Here you have the latest leaks! \n Is there something else I can do?"
    }
    
              var options = {
      method: "GET",
      // player name is robi62
      url: 'https://fnbr.co/api/upcoming',
      headers: {
        'User-Agent': 'nodejs request',
        'x-api-key': FNBRcoAPI
      }
    }  
              
                    request(options, (error, response, body) => {
      if (!error && response.statusCode == 404)
      {
        console.log('404')
        res.status(200).json({
       fulfillmentText: "Woops, something went wrong!😞 \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
        
      }
                    
                    
        else {
              var stats = JSON.parse(body);
          var size = stats.data.length
          var statseen = JSON.parse(body);
          console.log(size)
          var i;
        for (i = 0; i < stats.data.length; i++) { 
          var leaksarray =+ '"optionInfo": {"key": ' + stats.data[i].name + ' },' + '"Description:"' + stats.data[i].name + "," + '"image":{ "url": ' + stats.data[i].images.icon + ', "accessibilityText": ' + stats.data[i].type + " " + stats.data[i].rarity + '}, "title": "1. " ' + stats.data[i].name + ' },"';
        console.log(leaksarray)
         stats.data[i] = statseen[i]
          }
          var jsoned = JSON.serialize(statseen)
          console.log(jsoned)
          
          if(size == 7){
                           
                          res.status(200).json({
"payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": LeaksResponseShort
            }
          }
        ]
      },
      "systemIntent": {
        "intent": "actions.intent.OPTION",
        "data": {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          "carouselSelect": {
            "items": [
              {
                "optionInfo": {
                  "key": stats.data[0].name
                },
                "description": stats.data[0].type + " " + stats.data[0].rarity,
                "image": {
                  "url": stats.data[0].images.icon,
                  "accessibilityText": stats.data[0].type + " " + stats.data[0].rarity
                },
                "title": "1. " + stats.data[0].name
              },
              {
                "optionInfo": {
                  "key": stats.data[1].name
                },
                "description": stats.data[1].type + " " + stats.data[1].rarity,
                "image": {
                  "url": stats.data[1].images.icon,
                  "accessibilityText": stats.data[1].type + " " + stats.data[1].rarity
                },
                "title": "2. " + stats.data[1].name
              },
              {
                "optionInfo": {
                  "key": stats.data[2].name
                },
                "description": stats.data[2].type + " " + stats.data[2].rarity,
                "image": {
                  "url": stats.data[2].images.icon,
                  "accessibilityText": stats.data[2].type + " " + stats.data[2].rarity
                },
                "title": "3. " + stats.data[2].name
              },
              {
                "optionInfo": {
                  "key": stats.data[3].name
                },
                "description": stats.data[3].type + " " + stats.data[3].rarity,
                "image": {
                  "url": stats.data[3].images.icon,
                  "accessibilityText": stats.data[0].type + " " + stats.data[3].rarity
                },
                "title": "4. " + stats.data[3].name
              },
              {
                "optionInfo": {
                  "key": stats.data[4].name
                },
                "description": stats.data[4].type + " " + stats.data[4].rarity,
                "image": {
                  "url": stats.data[4].images.icon,
                  "accessibilityText": stats.data[4].type + " " + stats.data[4].rarity
                },
                "title": "5. " + stats.data[4].name
              },
              {
                "optionInfo": {
                  "key": stats.data[5].name
                },
                "description": stats.data[5].type + " " + stats.data[5].rarity,
                "image": {
                  "url": stats.data[5].images.icon,
                  "accessibilityText": stats.data[5].type + " " + stats.data[5].rarity
                },
                "title": "6. " + stats.data[5].name
              },
                            {
                "optionInfo": {
                  "key": stats.data[6].name
                },
                "description": stats.data[6].type + " " + stats.data[6].rarity,
                "image": {
                  "url": stats.data[6].images.icon,
                  "accessibilityText": stats.data[6].type + " " + stats.data[6].rarity
                },
                "title": "7. " + stats.data[6].name
              },


            ]
          }
        }
      }
    }
  }
            
          //
          }); 
            
            
          
          }
          
          else if(size > 6){
          
                  res.status(200).json({
       fulfillmentText: "Woops, we are still optimizing this feature, be prepared! \n Is there something else I can do for you?",
          source: 'Mr. Fortnite backend'});
          
          }
          
              
             
        
        
        }
                      
            
                    })
  
  }
  
  
  
  
  
               
  
});





const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.h

// listen for requests :)
