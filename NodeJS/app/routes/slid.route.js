"use strict";

var express 		= require("express");
var multer 		= require("multer");
var SlidController 	= require("./../controllers/slid.controller.js");
var bodyParser 		= require('body-parser');

var jsonParser 		= bodyParser.json();
var router 		= express.Router();

var multerMiddleware 	= multer({"dest":"/tmp/"});

/****************************************************************/

router.get('/hello', function(req, res){
  res.send('Ceci n est pas un exercice !');
});

/****************************************************************/

router.get('/slids', function(req, res){
  
  SlidController.list(null,function(data){
    var ResultReturn;
    ResultReturn = data;
    res.json(ResultReturn);
    res.end();
  });
});

/****************************************************************/

router.post('/slids', jsonParser, function(req, res){
    
  SlidController.create(req.body.id, req.body.type, req.body.title, req.body.fileName, req.body.data, function(err){
    if(err)
    {
      console.info(err);
    }
    res.end();
  });
});

/****************************************************************/

router.get('/slids/:slidId/:isJson', function(req, res){
    
    var lIsJson = false;
  
 //Parameters take out :  ???						!!!!!!!!!!!!!!!!!!!
    var lParam1 = req.slidId;
    var lParam2 = req.isJson;
    
    lParam1 = lParam1.replace(':','');
    lParam2 = lParam2.replace(':','');
    
    if(lParam2 == "json=true")
    {
      lIsJson = true;
    }
    
  SlidController.read(lParam1, lIsJson, function(data,err){
    if(err)
    {
      console.info(err);
    }
    console.info("out");
     res.send(data);
     res.end();
  });
});

router.get('/slids/:slidId', function(req, res){
    
 //Parameters take out :  ???
    var lParam = req.slidId;
    
    lParam = lParam.replace(':','');
    
  SlidController.read(lParam, false, function(data,err){
    if(err)
    {
      console.info(err);
    }
      res.send(data);
      res.end();
  });
});

router.param('slidId', function(req, res, next, id){
  req.slidId = id;
  next();
});

router.param('isJson', function(req, res, next, isJson){
  req.isJson = isJson;
  next();
});

/****************************************************************/

/*
router.post("/slids", multerMiddleware.single("file"),function(request,response){
  
  console.log(request.file.path);//the full path to the uploaded file

  console.log(request.file.originalname);//Name of the file on the user's computer
  
  console.log(request.file.mimetype);//Mime type of the file
  
});
*/
module.exports = router;