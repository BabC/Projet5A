"use strict";

//Modules
var http 	= require("http");
var path 	= require("path");
var express 	= require("express");
var CONFIG 	= require("./config.json"); //accessible pour tout les modules avec: var CONFIG = JSON.parse(process.env.CONFIG);
var Fs 		= require("fs");
var bodyParser 	= require('body-parser');

//Web Socket
//var IOController = require("./app/controllers/io.controller.js");

//Route
//Partie 1
//	var defaultRoute = require("./app/routes/default.route.js");
//Partie 2
	var defaultRoute = require("./app/routes/slid.route.js");
	
	

process.env.CONFIG = JSON.stringify(CONFIG);
var app = express();
var jsonParser = bodyParser.json();

//init server
var server = http.createServer(app);
server.listen(CONFIG.port, function(err) {
  if (err) {
    console.err(err);
    return;
  }
  
  console.log('Server on port ' + CONFIG.port);
});


/*
//console.log("It works !");

app.use(defaultRoute);

//#2

app.get("/", function(request, response){
  response.send("It works !");
});


//#3

app.use(function(request, response, cb){
  response.send("It works !");
  cb();
});
*/

app.use('/', defaultRoute);

app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));


app.use("/loadPres", function(req,res){
  
    var lDossier = path.join(CONFIG.presentationDirectory);
    var lExtension = "json";
  
    var lArrayID = [];
    var lArrayContent = [];
    var lIndex = 0;
    
    var lFileToRead;
    var lJsonResult;
    
    var lContent;
    var lKey;
    
    var lObj = {};

    Fs.readdir(lDossier, function(pErr, pList) //look at files in folder
    {
	    for (var i=0; i<pList.length; i++) 
	    {
		    var lExtWanted = '.' + lExtension;
		    var lResultFiles = path.extname(pList[i]);
		    
		    if(lResultFiles == lExtWanted) //if file is json
		    { 
		      lFileToRead = lDossier + "/" + pList[i].toString();

		      lContent = Fs.readFileSync(lFileToRead, "utf8"); //get content of each json file
		      lContent = JSON.parse(lContent);
		      
		      for ( lKey in lContent) {   //get value of the key 'id'
			if(lKey == "id")
			{
			  lArrayID[lIndex] = lContent[lKey]; //the ids are the key of our JSON result
			  break;
			}
		      }
		      lArrayContent[lIndex] = lContent; //the content are the values of our JSON result
		      lIndex++;
		    }
	      }
    
      for (var j=0; j<lArrayID.length; j++)
      {
	lObj[lArrayID[j]] = lArrayContent[j]; //create array with the appropriate keys and values
      }  

      res.json(lObj); //send JSON object result
      res.end();
    });
    
});


//http://127.0.0.1:1337/savePres
app.post("/savePres", jsonParser,function(req,res){

  var pObj 		= req.body;  //get json sent
  var lKey;
  var lPresIDString;
  
  for ( lKey in pObj) {   //get value of the key 'id'
	if(lKey == "id")
	{
	  lPresIDString = pObj[lKey]; 
	  break;
	}
  }

  var lDossier 		= path.join(CONFIG.presentationDirectory);
  
  var lFileName 	= "/" + lPresIDString + ".pres.json"; 
  
  var lPathFileSave 	= lDossier + lFileName;//path + file to save
      
  var lJsonResult = JSON.stringify(pObj);
  Fs.writeFile(lPathFileSave, lJsonResult, 'utf8'); //save json object
  
  //res.send();
  res.end();
 
});


//Partie WEB SOCKET
//IOController.listen(server);



