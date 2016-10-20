var http = require('http');
var fs = require('fs');

var map = new Map();
var id_pres;

//How to initialise server ??

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) 
{
  fs.readFile('./index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});



// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) 
{
  socket.emit('connection', 'Vous êtes bien connecté !');
  
  socket.on('data_comm', function (message) {
    console.log('Un client me parle ! Il me dit : ' + message);
    
    var userId;
    
    for ( lKey in message) {   //get value of the key 'id'
	if(lKey == "id")
	{
	  userId = message[lKey]; 
	  break;
	}
    }
    
    map.set(userId, socket);
  });
  
  socket.on('slidEvent', function (jsonObject) {
    
    var cmdSent;
    
     for ( lKey in jsonObject) {   //get value of the key 'id'
	if(lKey == "CMD")
	{
	  cmdSent = message[lKey]; 
	  break;
	}
    }
    
    if(cmdSent == "START")
    {
      for (lKey in jsonObject) {   //get value of the key 'id'
	if(lKey == "PRES_ID")
	{
	  id_pres = message[lKey]; 
	  break;
	}
      } 
    }
    
    if(!isNull(id_pres))
    {
      SlidModel.read(id_pres, function(err, slid){
	
      slid.src = "/slid" + slid.id;
    
      })
    }
  }); 
  
}); 

server.listen(1337); 