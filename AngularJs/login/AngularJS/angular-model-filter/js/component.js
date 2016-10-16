var app=angular.module('MyApp',[]);

app.service('customService',function(){
    
    var service={};
    
    service.isBig=function(length){
	return length>100;
    }
    
    return service;
    
});

app.controller('myControl',['$log','customService',function($logs,customService){
    
    this.unitsList=starShipsList;
    this.searchTxt='Enter your filter option';
    
    this.processLength=function(length){
	    return customService.isBig(length);
    }
    
    this.logUnit=function(currentShip){
	    return customService.$log.info(currentShip);
    }
    
}]);

