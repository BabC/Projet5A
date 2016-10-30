angular.module('adminApp').controller('eventCtrl',eventCrtFnt);

eventCrtFnt.$inject=['$scope','$log','$window','$interval','factory','comm'];

function eventCrtFnt($scope, $log, $window,$interval, factory, comm){
       
    
    $scope.currentPresenation=factory.presentationCreation("template_pres","description of the template présentation");
    
   //CREATE an object for interactions with ng-include controller
    $scope.contentMap={};
    $scope.contentMap.payload="";
    
    $scope.presentationMap={};
    $scope.presentationMap.payload="";
    $scope.Timer = null;

    
    var available_content=comm.loadImages('test','test');
       available_content.then(
          function(payload) { 
              $scope.contentMap.payload = payload;
              $scope.contentMap.array=factory.mapToArray(payload);
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });
    
    /*var firstPresentation=comm.loadPres('test','test');
       firstPresentation.then(
          function(payload) { 
              $scope.presentationMap.payload= payload;
                            
              for(key in $scope.presentationMap.payload){
                  $scope.currentPresenation =$scope.presentationMap.payload[key];
              }
             
          },
          function(errorPayload) {
              $log.error('failure loading movie', errorPayload);
          });*/
    
    
    $scope.newSlide=function(){
        var slid=factory.slidCreation("slide-Title","slide-text");
        $scope.currentPresenation.slidArray.push(slid);
        
    }
    
    $scope.savePres=function(){
        comm.savePres($scope.currentPresenation);
    }
    
    $scope.selectCurrentSlid=function(slide){
        $scope.currentSlide=slide;
        
    }
    
    
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
    
    
    $scope.onDropComplete=function(data,evt){
        if($scope.currentSlide != undefined){
            $scope.currentSlide.contentMap[1]=data.id;
            //needed to inform angular that a change occurred on the current variable, this fire an event change
             $scope.$apply()
            console.log("drop success, data:", data);
            }
    }
    
    $scope.getCurrentContent=function(){
        if(1  in  $scope.currentSlide.contentMap){
            return $scope.currentSlide.contentMap[1];
        }
    }
    
    $scope.isSlidContentEmpty=function(slid){
      
        if(slid == undefined){
          
            return true;
        }
        if(slid.contentMap[1]== undefined){
          return true;
        }
        
        return false
    }
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
    } 

    $scope.begin = function(){
      var slidArrayLenght = $scope.currentPresenation.slidArray.length;
      var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
       if(currentSlidPosition != 0) {
          $scope.currentSlide = $scope.currentPresenation.slidArray[0];
        }
    }

     $scope.end = function(){
      var slidArrayLenght = $scope.currentPresenation.slidArray.length;
      var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
       if(currentSlidPosition != slidArrayLenght -1) {
          $scope.currentSlide = $scope.currentPresenation.slidArray[slidArrayLenght -1];
        }
    }    

    $scope.forward=function(){
        
        var currentId= $scope.currentSlide.id;
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;
        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
        
        if(currentSlidPosition != (slidArrayLenght - 1)) {
          var nextSlidKey = currentSlidPosition + 1;
          $scope.currentSlide = $scope.currentPresenation.slidArray[nextSlidKey];
        }
        
        
        console.log(" on a changé de slide" );
        
       // emit.io.emitNext();
        
    }; 

    $scope.backward=function(){
        
        var currentId= $scope.currentSlide.id;
        var slidArrayLenght = $scope.currentPresenation.slidArray.length;

        var currentSlidPosition = $scope.getCurrentKeyinSlidArray();
        
        if(currentSlidPosition != 0){
          var previousKey = currentSlidPosition - 1;
          $scope.currentSlide = $scope.currentPresenation.slidArray[previousKey];
        }
        
        
        console.log(" on a changé de slide" );
        //comm.io.emitPrev();
        
    };

    $scope.play=function(){
      //Initialize the Timer to run every 1000 milliseconds i.e. one second.

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

    //comm.io.emitBegin();
  };

  $scope.pause=function(){
    if (angular.isDefined($scope.Timer)) {
        $interval.cancel($scope.Timer);
    }
      console.log(" on stop le player" );         
  };
           
    
}
