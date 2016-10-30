angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q','factory'];

function commFnc($http,$q,factory){
     var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres,
         //socketConnection: socketConnection
         
     };
   
 function loadImages(presName,presId){
 	var deferred=$q.defer();
  /*$http.get("/resource_list/urlnodejs").
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(status);
      });*/

    setInterval(function(presName,presId) {      
      		var payload = {};
          
          var lContent1 = factory.contentCreation('title',"vid","./img/1.jpg");
          var lContent2 = factory.contentCreation('title',"type","./img/2.jpg");
          var lContent3 = factory.contentCreation('title',"type","./img/3.jpg");
          var lContent4 = factory.contentCreation('title',"type","./img/4.jpg");
          var lContent5 = factory.contentCreation('title',"type","./img/5.jpg");
          var lContent6 = factory.contentCreation('title',"type","./img/6.jpg");


        
            payload[lContent1.id] = lContent1;
            payload[lContent2.id] = lContent2;
            payload[lContent3.id] = lContent3;
            payload[lContent4.id] = lContent4;
            payload[lContent5.id] = lContent5;
            payload[lContent6.id] = lContent6;
         
          
			     deferred.resolve(payload);	
    
      	clearInterval(this);
    },2000,presName,presId); 
  
    return deferred.promise;
  };




 function loadPres(presName,presId) {
 	  var deferred = $q.defer();
    $http.get('/loadPres').
      success(function(data, status, headers, config) {
      deferred.resolve(data);
    }).
      error(function(data, status, headers, config) {
      deferred.reject(status);
    // or server returns response with an error status.
    });
 return deferred.promise;
};



  function savePres(){
    return false;
  };



  comm.io={};

  comm.io.socketConnection=function(scope,uuid){

   var socket = io.connect();
   comm.io.uuid=uuid;
   socket.on('connection', function () {
     socket.emit('data_comm',{'id':comm.io.uuid});
   });
   socket.on('newPres', function (socket) {

   });
   socket.on('slidEvent', function (socket) {

   });
   return socket;
 }

 comm.io.emitPrev=function(socket){
   socket.emit('slidEvent', {'CMD':"PREV"});
 }

 comm.io.emitNext=function(socket){
   socket.emit('slidEvent', {'CMD':"NEXT"});
 }

 comm.io.emitStart=function(socket,presUUID){
   socket.emit('slidEvent', {'CMD':"START",'PRES_ID':presUUID});
 }

 comm.io.emitPause=function(socket){
   socket.emit('slidEvent', {'CMD':"PAUSE"});
 }

 comm.io.emitBegin=function(socket){
   socket.emit('slidEvent', {'CMD':"BEGIN"});
 }

 comm.io.emitEnd=function(socket){
   socket.emit('slidEvent', {'CMD':"END"});
 }

  return comm;

};


 
   

    