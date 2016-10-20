"use strict";

var Fs = require("fs");	
var path = require('path');
var CONFIG =  require("../../config.json");
var jsonfile = require('jsonfile');
var isNull = require('lodash.isnull');

process.env.CONFIG = JSON.stringify(CONFIG);

// Constructeur
function SlidModel(pType, pId, pTitle, pFileName) {
  
  this.type 	= pType;
  this.id 	= pId;
  this.title 	= pTitle;
  this.fileName = pFileName;
  var data 	= '';
  
  //Public methods
  
  this.getData = function(){

    return this.data;
  
  }

  this.setData = function(pData){

    this.data = pData;
    
  }

}

// Static methods
SlidModel.create = function(slid, callback) {
    SlidModel.checkId(slid.id, function(err) {
	  if (err) {
	      var lErr = new Error("Erreur: ID not good");
	      callback(lErr);
	      return;
	  }
	  else{
    SlidModel.checkSlide(slid, function(err) {
	  if (err) {
	      var lErr = new Error("Erreur: certains paramètres sont null");
	      callback(lErr);
	      return;
	  }
	  else{
	
	      var lDossier = path.join(CONFIG.contentDirectory, "/");
	    
	    //Step 1: stock slide.data in slide.file  
	      
	      var lData 	= slid.getData();
	      var lNameData 	= slid.fileName;
	      var lFileData 	= lDossier + lNameData; 
	      
	      Fs.writeFile(lFileData, lData, 'utf8', function(err){
		if(err)
		{
		  var lErr = new Error("Erreur: certains paramètres sont null" + err);
		  callback(lErr);
		  return;
		}
	      });
	      
	    //Step 2:  stock meta data in content_dir
	      
	      var lIdSlid = slid.id;
	      var lFileToSave = lDossier + lIdSlid + ".meta.json";
	      var lSaveSlid = JSON.stringify(slid);
	      
	      Fs.writeFile(lFileToSave, lSaveSlid, 'utf8'); //save json object
	      callback();
	   }
      
    });
    }});
};

SlidModel.read = function(id, callback) {
    
    SlidModel.checkId(id, function(err) {
	if (err) {
	    var lErr = new Error("Erreur: certains paramètres sont null");
	    callback(lErr);
	    return;
	}
      else
      {

	var lDossier = path.join(CONFIG.contentDirectory, "/");
	var lFileToRead = lDossier + id + ".meta.json";
	
	jsonfile.readFile(lFileToRead, callback);
      }
    });
};
  
SlidModel.update = function(slid, callback) {
    SlidModel.checkId(slid.id, function(err) {
	  if (err) {
	      var lErr = new Error("Erreur: ID not good");
	      callback(lErr);
	      return;
	  }
	  else{
  SlidModel.checkSlide(slid, function(err) {
      if (err) {
	 var lErr = new Error("Erreur: certains paramètres sont null");
	 callback(lErr);
	 return;
      }
      else
      {
    
	var lIdString = slid.id;
	var lDossier = path.join(CONFIG.contentDirectory);
	
	var lJsonFileToCheck = lIdString + ".meta.json";
	var lTxtFileToCheck = lIdString + ".txt";
	
	var lFoundTxt = false;
	var lFoundJson = false;
	
	Fs.readdir(lDossier, function(pErr, pList) 
	{
		for (var i=0; i<pList.length; i++) 
		{
			
			var lResultFiles = path.basename(pList[i]);
			
			
			if(lResultFiles == lJsonFileToCheck)
			{ 
			  lFoundJson = true;	    
			}
			
			if(lResultFiles == lTxtFileToCheck)
			{ 
			  lFoundTxt = true;	    
			}
		}	  
		
		if(lFoundJson && lFoundTxt)
		{
		  var lSlidData = slid.data;
		  if(lSlidData.length > 0)
		  {
		    SlidModel.create(slid, function(err) {
				if (err) {
					var lErr = new Error("Erreur: creation erreur pour update" + err);
					callback(lErr);
					return;
				}
			});
		  }
		  else
		  {
		    var lIdSlid = slid.id;
		    var lFileToSave = lDossier + lIdSlid + ".meta.json";
		    var lSaveSlid = JSON.stringify(slid);
		    
		    Fs.writeFile(lFileToSave, lSaveSlid, 'utf8'); //save json object
		    
		  }
		}
		else
		{
		  var lErr = new Error("Erreur: can't find both files... DSO");
		  callback(lErr);
		  return;
		}
	});
	callback();
      }
  });
	    
}});
};
  
SlidModel.delete = function(id, callback) {
   
  SlidModel.checkId(id, function(err) {
    if (err) {
      
      var lErr = new Error("Erreur: certains paramètres sont null");
      callback(lErr);
      return;
    }
    else{
	var lDossier = path.join(CONFIG.contentDirectory);
	
	//Step 1: delete slide.file  

	  var lNameData 	= id + ".txt";
	  var lFileData 	= lDossier + lNameData; 
	
	Fs.unlink(lFileData, callback);
	
	//Step 2:  delete content_dir

	  var lFileJson = lDossier + id + ".meta.json";
	  
	  Fs.unlink(lFileJson, callback); //save json object
	  callback();  
    }
  });
    
};

SlidModel.checkSlide = function(slide, callback) {

  var lSlideOk = false;
  
  if(typeof(slide.type)!= 'undefined' && slide.type)
  {
    lSlideOk = true;
  }
  if(typeof(slide.id)!= 'undefined' && slide.id)
  {
    lSlideOk = true;
  }
  if(typeof(slide.title)!= 'undefined' && slide.title)
  {
    lSlideOk = true;
  }
  if(typeof(slide.fileName)!= 'undefined' && slide.fileName)
  {
    lSlideOk = true;
  }
  if(isNull(slide.type))
  {
    lSlideOk = false;
  }
  if(isNull(slide.id))
  {
    lSlideOk = false;
  }
  if(isNull(slide.title))
  {
    lSlideOk = false;
  }
  if(isNull(slide.fileName))
  {
    lSlideOk = false;
  }
  if(Number.isInteger(slide.id))
  {
    lSlideOk = false;
  }
  
  callback(!lSlideOk);
  
};

SlidModel.checkId = function(id, callback) {

  var lIdOk = false;
  
  if(typeof(id)!= 'undefined' && id)
  {
    lIdOk = true;
  }
  if(isNull(id))
  {
    lIdOk = false;
  }
  if(id === null)
  {
    lIdOk = false;
  }
  if(Number.isInteger(id))
  {
    lIdOk = false;
  }
  
  callback(!lIdOk);
  
};

// export the class
module.exports = SlidModel;