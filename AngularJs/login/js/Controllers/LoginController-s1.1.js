angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

 loginCrtFnt.$inject=['$scope','$log','auth','$window'];

function loginCrtFnt($scope, $log,auth,$window){
	$scope.logAuth = function() {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);
 	};
// Step 2
 	$scope.logAuthObject = function(user) {
 		if(user != null){
 			var future_Auth = auth.localAuthAsk(user.login,user.pwd);
 			future_Auth.then(
		 		function(payload){
		 			$log.info(payload.login);
		 			$log.info(payload.validAuth);
		 			$log.info(payload.role);

		 			$window.location.href=payload.role + ".html";
		 		},
		 		function(errorPayload){
		 			$log.info(errorPayload);
		 		});

 			var future_Authask = auth.authAsk(user.login,user.pwd);
 			future_Authask.then(
 				function(payload){

 					$log.info(payload.login);
		 			$log.info(payload.validAuth);
		 			$log.info(payload.role);

		 			if(payload.role.toUpperCase() == "WATCHER"){
		 				$window.location.href="Watcher.html";
		 			}else if (payload.role.toUpperCase() == "ADMIN") {
		 				$window.location.href="/admin/Admin.html";
		 			}
		 			

 				},
 				function(errorPayload) {
 					$log.info(errorPayload);
 				});

 		}


		// $log.info('user login', user.login);
		// $log.info('user pwd', user.pwd);

		
 	};

 	

 	//auth.userList();
 	//auth.checkUser();

 }

