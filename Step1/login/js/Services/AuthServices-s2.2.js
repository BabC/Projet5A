angular.module('authService', []).service('auth',authFnc);

authFnc.$inject=['$http','$q','$log','$window'];

	function authFnc($http,$q) {
		 var userMap={};
		 userMap['jdoe']='jdoepwd';
		 userMap['psmith']='psmithpwd';
		 userMap['tp']='tp';

		 var infoTemplate={
		 	'login':'',
		 	'validAuth':false,
		 	'role':'none'};

		 var fncContainer={
		 localAuthAsk:localAuthAsk
	};

	function checkUser(userlogin,userpwd){
		if(userMap[userlogin] == userpwd ){
			$window.location.href="loginSuccess.html";
		}
 	};

	function userList(){
	 	for( var login in userMap){
	 		$log.info(login +" " +userMap[login]);
	 	};
	}; 



	function localAuthAsk(login,pwd){
		var deferred = $q.defer();

		setInterval(function(login,pwd){
			if( userMap[login]==pwd){

				var infoUser = infoTemplate;
				infoUser.login =login;
				infoUser.validAuth=true;
				infoUser.role='Admin';

				deferred.resolve(infoUser);
			}else{

				deferred.reject('le mdp est incorrect');
			}
			clearInterval(this);
		},3000,login,pwd);

 		return deferred.promise;
 	};

 	function authAsk(login,pwd){
 		var deferred = $q.defer();

 		$http.post('/fakeauthwatcher',{'login':login,'pwd':pwd}).
 		success(function(data, status, headers, config) {
 			deferred.resolve(data);
 		}).
 		error(function(data, status, headers, config) {
 			deferred.reject(status);
 		});
 		return deferred.promise;
 	};

 return fncContainer; 
}