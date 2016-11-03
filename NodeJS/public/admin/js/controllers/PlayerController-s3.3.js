angular.module('adminApp').controller('playerCtrl',playerCrtFnt);

playerCrtFnt.$inject=['$scope','$log','$window','$interval','factory','comm'];

function playerCrtFnt($scope, $log, $window,$interval, factory, comm){

    
    $scope.Timer = null;
    //$scope.currentPresenation=factory;


    $scope.getCurrentKeyinSlidArray=function() {
      var currentKeyInSlidArray = 0;
      var currentId= $scope.currentSlide.id;
      var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        for (var i =0 ; i< slidArrayLenght ; i++) {
          if ($scope.currentPresenation.slidArray[i].id == currentId) {
              currentKeyInSlidArray = i ;
          }
        }
        return currentKeyInSlidArray;
    };

	$scope.begin=function(){
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();

        if(currentSlidPosition != 0) {
          $scope.currentSlide = $scope.currentPresenation.slidArray[0];
        }
	
		comm.io.emitBegin();

	};

	$scope.pause=function(){

        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
        console.log(" on stop le player" );         
        
        //comm.io.emitPause();
        
    };

    $scope.end=function(){
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
        if(currentSlidPosition != slidArrayLenght -1) {
          $scope.currentSlide = $scope.currentPresenation.slidArray[slidArrayLenght -1];
        }
        comm.io.emitEnd();
    };

    $scope.backward=function(){

        
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;

        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
        
        if(currentSlidPosition != 0){
          var previousKey = currentSlidPosition - 1;
          $scope.currentSlide = $scope.currentPresenation.slidArray[previousKey];
        }        
        
        console.log(" on a changé de slide" );
        comm.io.emitPrev();
        
    };

    $scope.forward=function(){
        
        
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
        
        if(currentSlidPosition != (slidArrayLenght - 1)) {
          var nextSlidKey = (currentSlidPosition + 1);
          $scope.currentSlide = $scope.currentPresenation.slidArray[nextSlidKey];
          
        }
        
        
        console.log("tentative de connexion" );

        var uuid=$scope.currentPresenation.id;
      var socket = comm.io.socketConnection($scope, 12);
      comm.io.emitNext(socket);
      console.log("commande envoyee via socket");
        
    };

    $scope.play = function() {
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
      
      if($scope.getCurrentKeyinSlidArray() < slidArrayLenght -1) {
        $scope.Timer = $interval(function () {
        $scope.forward();
        if ($scope.getCurrentKeyinSlidArray() == slidArrayLenght -1){
          $scope.pause();
        }
      }, 3000);
      }
      else {
        $scope.pause();
      }
      comm.io.emitStart();
    };

    

}