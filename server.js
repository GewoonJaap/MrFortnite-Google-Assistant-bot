// server.js
// where your node app starts

// init project
const express = require('express');
const appd = require('dialogflow')
const bodyParser = require('body-parser');
var request = require('request');
const app = express();
const {BasicCard, Button} = require('actions-on-google');
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const app2 = dialogflow({debug: true});
var admin = require('firebase-admin');
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
        
              console.log("Top 3"  +stats.lifeTimeStats[1].value);
        console.log("Top 6 " +stats.stats.p2.top1.value);
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
                                "url": "https://image.fnbr.co/cube.jpg?" + finalA,
                                "accessibilityText": "Kubus locatie"
                            },
                            "buttons": [
                                {
                                    "title": "Credits naar fnbr.co",
                                    "openUrlAction": {
                                        "url": "https://fnbr.co/cube"
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
               res.status(200).json({
 "fulfillmentText": "Here is the cube location! \nIs there something else I can do for you?",
    "fulfillmentMessages": [],
    "source": "Mr. Fortnite API",
    "payload": {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "textToSpeech": "Here is the cube location! \nIs there something else I can do for you?"
                        }
                    },
                    {
                        "basicCard": {
                            "title": "Current cube location",
                            "image": {
                                "url": "https://image.fnbr.co/cube.jpg?" + finalA,
                                "accessibilityText": "Current cube location"
                            },
                            "buttons": [
                                {
                                    "title": "Credits for fnbr.co",
                                    "openUrlAction": {
                                        "url": "https://fnbr.co/cube"
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
  
  
  if(intent == 'shop'){
              var options = {
      method: "GET",
      url: 'https://api.fortnitetracker.com/v1/store',
      headers: {
        'User-Agent': 'nodejs request',
        'TRN-Api-Key': 'c37bb805-ea82-4455-9a76-a8d210c0f003'
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
              
                    
          var stats = JSON.parse(body);  
              console.log (stats.length);
              var items = stats.length;
              
              if(items == 12 || items == 11 || items == 10){
              
               res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "Here are the first 10 items of the Fortnite shop (10 is the maximum Google supports at the moment ;/ )!"
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
              
              
              else if (items == 9){
                             res.status(200).json({


  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "Here are the first 10 items of the Fortnite shop (10 is the maximum Google supports at the moment ;/ )!"
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
              "textToSpeech": "Here are the first 10 items of the Fortnite shop (10 is the maximum Google supports at the moment ;/ )!"
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
              "textToSpeech": "Here are the first 10 items of the Fortnite shop (10 is the maximum Google supports at the moment ;/ )!"
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
              "textToSpeech": "Here are the first 10 items of the Fortnite shop (10 is the maximum Google supports at the moment ;/ )!"
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
  
               
  
});





const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.h

// listen for requests :)
