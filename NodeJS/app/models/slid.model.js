"use strict";

var Fs 		= require("fs");	
var path 	= require('path');
var CONFIG 	= require("./../../config.json");
var jsonfile 	= require('jsonfile');
var isNull 	= require('lodash.isnull');
var utils 	= require("./../utils/utils.js");

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

/************************************************************************************************/

// Static methods
SlidModel.create = function(slid, callback) {
  SlidModel.checkId(slid.id, function(err) {
    if (err) {
      var lErr = new Error("Erreur: ID not good");
      callback(lErr);
      return;
    }
    
    SlidModel.checkSlide(slid, function(err) {
      if (err) {
	var lErr = new Error("Erreur: certains paramètres sont null");
	callback(lErr);
	return;
      }
      
      var lFileData = path.join(CONFIG.contentDirectory,slid.fileName);
      var lData = slid.getData();
      
      //Step 1: stock slide.data in slide.file  
      
      Fs.writeFile(lFileData, lData, 'utf8', function(err){
	if(err)
	{
	  var lErr = new Error("Erreur: ecriture fichier fileName" + err);
	  callback(lErr);
	  return;
	}
	
	var lFileName = slid.id + ".meta.json";
	
	//Step 2:  stock meta data in content_dir	
	
	var lFileToSave = path.join(CONFIG.contentDirectory,lFileName);
	var lSaveSlid = JSON.stringify(slid);
	
	Fs.writeFile(lFileToSave, lSaveSlid, 'utf8',function(err) {
	  if (err) {
	    var lErr = new Error("Erreur: ecriture fichier meta");
	    callback(lErr);
	    return;
	  }
	  callback();
	}); //save json object
	
      });
      
    });
  });
};

/************************************************************************************************/

SlidModel.read = function(id, callback) {
  
  SlidModel.checkId(id, function(err) {
    if (err) {
      var lErr = new Error("Erreur: certains paramètres sont null");
      callback(lErr);
      return;
    }
    var lFileToReadName = id + ".meta.json";
    var lFileToRead = path.join(CONFIG.contentDirectory, lFileToReadName );
    
    jsonfile.readFile(lFileToRead, callback);
  });
};
  
/************************************************************************************************/

SlidModel.update = function(slid, callback) {
  SlidModel.checkId(slid.id, function(err) {
    if (err) {
      var lErr = new Error("Erreur: ID not good");
      callback(lErr);
      return;
    }
    SlidModel.checkSlide(slid, function(err) {
      if (err) {
	var lErr = new Error("Erreur: certains paramètres sont null");
	callback(lErr);
	return;
      }
      var lFileNameParam;
      var lFile;
      SlidModel.read(slid.id, function(err, data){
	if(err)
	{
	  var lErr = new Error("Erreur: Cant find meta json file to update");
	  callback(lErr);
	  return;
	}
	
	for (var lKey in data) {   //get value of the key 'fileName'
	  if(lKey == "fileName")
	  {
	    lFileNameParam = data[lKey]; 
	    break;
	  }
	}
	
	lFile = path.join(CONFIG.contentDirectory, lFileNameParam );
	
	utils.readFileIfExists(lFile,function(err){
	  if(err)
	  {
	    var lErr = new Error("Erreur: cant find file in param (fileName) in metaJson");
	    callback(lErr);
	    return;
	  }
	  
	  var lFileMetaName = slid.id + ".meta.json";
	  var lFileMeta 	= path.join(CONFIG.contentDirectory, lFileMetaName );
	  var lSaveSlid 	= JSON.stringify(slid);
	  
	  Fs.writeFile(lFileMeta, lSaveSlid, 'utf8',function(err){
	    if(err)
	    {
	      var lErr = new Error("Erreur: Cant find meta json file to update");
	      callback(lErr);
	      return;
	    }
	    
	    var lSlidData = slid.getData();
	    
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
	    callback();
	  }); 
	});
      });
    });
  });
};  
/************************************************************************************************/

SlidModel.delete = function(id, callback) {
  SlidModel.checkId(id, function(err) {
    if (err) {
      var lErr = new Error("Erreur: certains paramètres sont null");
      callback(lErr);
      return;
    }
    
    SlidModel.read(id, function(err, data){
      if(err)
      {
	var lErr = new Error("Erreur: certains paramètres sont null");
	callback(lErr);
	return;
      }
      var lFileParam
      
      for (var lKey in data) {   //get value of the key 'id'
	if(lKey == "fileName")
	{
	  lFileParam = data[lKey]; 
	  break;
	}
      }

      var lFileData = utils.getDataFilePath(lFileParam);
      var lFileJson = utils.getMetaFilePath(id);
      
      //Step 1: delete slide.file  
      
      Fs.unlink(lFileData, function(err) {
	if (err) {
	  
	  var lErr = new Error("Erreur: certains paramètres sont null");
	  callback(lErr);
	  return;
	  
	}
	
	//Step 2:  delete content_dir
	
	Fs.unlink(lFileJson, function(err) {
	  if (err) { 
	    var lErr = new Error("Erreur: certains paramètres sont null");
	    callback(lErr);
	    return;
	  }
	  callback();
	});
      });
    });
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