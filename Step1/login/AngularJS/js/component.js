var app=angular.module("MyApp",[]);
app.controller('myControl',function(){
	
	this.myUser=user;
	
	this.addView=function(){
		this.myUser.view = this.myUser.view+1;
	
	};
	
});