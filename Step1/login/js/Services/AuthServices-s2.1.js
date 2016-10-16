angular.module('authService', []).service('auth',authFnc);

authFnc.$inject=['$log','$window'];
function authFnc($log,$window){
 	var userMap={};
 	userMap['jdoe']='jdoepwd';
 	userMap['psmith']='psmithpwd';
 	userMap['tp']='tp';

	var fncContainer={
	checkUser: checkUser,
	userList: userList
};

function checkUser(userlogin,userpwd){
	if(userMap[userlogin] == userpwd ){
		$window.location.href="loginSuccess.html";
	}
	
		// TODO
 };

function userList(){
	 	for( var login in userMap){
	 		$log.info(login +" " +userMap[login]);
	 	};
}; 

return fncContainer;

}