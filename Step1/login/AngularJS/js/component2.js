var app=angular.module("MyApp",[]);
app.controller('myControl',function(){
	
	this.currentMap=usrMap;
	
	this.addView= function(currentUser){
		currentUser.view = currentUser.view+1;
	
	};
	
	this.getSize=function(){
		return Object.keys(this.currentMap).length;
	
	};
	
});