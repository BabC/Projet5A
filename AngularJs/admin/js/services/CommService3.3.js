angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q','factory'];

function commFnc($http,$q,factory){
     var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres
         
     };
   
 function loadImages(presName,presId){
 	var deferred=$q.defer();
  $http.get("/resource_list/urlnodejs").
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(status);
      });

    /*setInterval(function(presName,presId) {      
      		var payload = {};
          
          var lContent1 = factory.contentCreation('title',"vid","./img/1.jpg");
          var lContent2 = factory.contentCreation('title',"type","./img/2.jpg");
          var lContent3 = factory.contentCreation('title',"type","./img/3.jpg");
          var lContent4 = factory.contentCreation('title',"type","./img/4.jpg");
          var lContent5 = factory.contentCreation('title',"type","./img/5.jpg");

        
            payload[lContent1.id] = lContent1;
            payload[lContent2.id] = lContent2;
            payload[lContent3.id] = lContent3;
            payload[lContent4.id] = lContent4;
            payload[lContent5.id] = lContent5;
         
          
			     deferred.resolve(payload);	
    
      	clearInterval(this);
    },2000,presName,presId);  */
  
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
  return comm;

};


 
   

    