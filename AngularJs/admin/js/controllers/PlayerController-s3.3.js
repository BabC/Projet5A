angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log','$window','factory','comm'];

function playerCrtFnt($scope, $log, $window, factory, comm){


	$scope.currentPresenation=factory.presentationCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
   	$scope.contentMap={};
    $scope.contentMap.payload="";
    
    $scope.presentationMap={};
    $scope.presentationMap.payload="";


	$scope.begin=function(){

	
		comm.io.emitBegin();

	};

	 $scope.pause=function(){
        
        comm.io.emitPause();
        
    };

    $scope.end=function(){
        
        comm.io.emitEnd();
    };

    $scope.backward=function(){
        
        comm.io.emitPrev();
        
    };

    $scope.forward=function(){
        
        var currentId= $scope.currentSlide.id;
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        var currentKeyInSlidArray = 0;
        for (var i =0 ; i< slidArrayLenght ; i++) {
          if ($scope.currentPresenation.slidArray[i].id == currentId) {
              currentKeyInSlidArray = i ;
          }
        }
        var nextslidkey = currentKeyInSlidArray + 1;
        $scope.currentSlide = $scope.currentPresenation.slidArray[nextslidkey];
        console.log(" on a changé de slide" );
        
       // emit.io.emitNext();
        
    };

}