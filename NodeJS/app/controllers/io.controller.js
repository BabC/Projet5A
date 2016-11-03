var fs 		= require('fs');
var http 	= require('http');
var isNull 	= require('lodash.isnull');
var SlidModel 	= require("./../models/slid.model.js");

var id_pres;


var map = new Map();

var IOController = function() {}

IOController.listen = function(httpServer) {

  var io = require('socket.io').listen(httpServer);
  
  // Quand un client se connecte, on le note dans la console
  io.sockets.on('connection', function (socket) 
  {
    socket.emit('connection', 'Vous êtes bien connecté !');
    
    socket.on('data_comm', function (socketID) {
      map.set(socketID, socket);
    });
    
    socket.on('slidEvent', function (jsonObject) {
      
      var cmdSent;
      
      for ( lKey in jsonObject) {   //get value of the key 'id'
	  if(lKey == "CMD")
	  {
	    cmdSent = jsonObject[lKey]; 
	   	console.log("COMMANDE" + cmdSent);

	    break;
	  }
      }
      
      if(cmdSent == "START")
      {
	for (lKey in jsonObject) {   //get value of the key 'id'
	  if(lKey == "PRES_ID")
	  {
	    id_pres = jsonObject[lKey];
	    id_pres = String(id_pres);
	    break;
	  }
	} 
      }
      
      if((!isNull(id_pres) || id_pres != "undifined") && cmdSent != "PAUSE")
      {
	SlidModel.read(id_pres, function(err,slid){

		/*
	  slid.src = "/slid/:" + slid.id;
  
	  for(var lKey in map)
	  {
	    map[lKey].emit('slidEvent', sendBack);
	  }
	  */
	})
      }
    }); 
    
  });
  
  httpServer.listen(1337);
};

module.exports = IOController;


/*  for (var lKey in message) {   //get value of the key 'id'
	  if(lKey == "id")
	  {
	    userId = message[lKey]; 
	    break;
	  }
      }
      
      map.set(userId, socket);
      console.log('Data_com : ' + userId + ": " + map[userId]);*/

