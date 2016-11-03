"use strict";

var SlidModel 	= require("./../models/slid.model.js");
var path 	= require('path');
var Fs 		= require("fs");
var CONFIG 	= require("./../../config.json");

var SlidController = function() {}

SlidController.list = function(data, callback) {
  
    var lDossier = path.join(CONFIG.contentDirectory);
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
		    var lExtWanted 	= '.' + lExtension;
		    var lResultFiles	= path.extname(pList[i]);
		    
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
	      for(var j=0; j<lArrayID.length; j++)
	      {
		lObj[lArrayID[j]] = lArrayContent[j];
	      }     
	      callback(lObj);      
      });
    
};
     
SlidController.create = function(pId, pType, pTitle, pFileName, pData, callback) {
  
  var lSlid 		= new SlidModel();
  
  lSlid.id 		= pId;
  lSlid.type 		= pType;
  lSlid.title 		= pTitle;
  lSlid.fileName 	= pFileName;
  lSlid.setData(pData);
  
  SlidModel.create(lSlid, function(err) {
		if (err) {
			callback(err);
			return;
		} else {
			callback();
			return;
		}
	});
};



SlidController.read = function(pId, pIsJson, callback) {
  
  SlidModel.read(pId,function(err,data){
    if(err)
    {
      callback(err);
      return;
    }
    else
    {
      if(pIsJson)
      {
	callback(data);
	return;
      }
      else
      {
	var lSlid = new SlidModel();

	lSlid.id 	= data["id"];
	lSlid.type 	= data["type"];
	lSlid.title 	= data["title"];
	lSlid.fileName 	= data["fileName"];
	lSlid.setData(data["data"]);
	console.info("type" + data["type"]);
	
	callback(lSlid);
	return;
      }
    }
  });
};




module.exports = SlidController;