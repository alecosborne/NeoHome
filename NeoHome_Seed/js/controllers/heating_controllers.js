/**
*	Controller for a fhem clima element.
*/	
angular.module('heating').controller('ClimaCtrl',['$rootScope','$scope','$timeout','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, $timeout, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	var deviceName = undefined;
	var deviceNameClima = undefined;

	// create the timer variable
    var clickTimer;

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function (name, nameClima) {	
		deviceName = name;
		deviceNameClima = nameClima;

		$scope.$watch(
            "$root.devicelist['"+name+"']",
			watchListenerCallback,true
        );

        $scope.$watch(
            "$root.devicelist['"+nameClima+"']",
			watchListenerCallback,true
        );
		
	}

	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {

		if (typeof deviceNameClima != 'undefined' && typeof deviceName != 'undefined') {

			if (typeof $rootScope.devicelist[deviceNameClima] != 'undefined'){
				$scope.fhem = $rootScope.devicelist[deviceNameClima];	
			}

			if (typeof $rootScope.devicelist[deviceName] != 'undefined'){
				$scope.fhemGeneral = $rootScope.devicelist[deviceName];		
			}
		
			setTempHeatingParameters();
		}

		$scope.knobstyle = {
			min: 5,
			max: 30,
		 	size: 150,
		 	unit: "°",
		 	startAngle: 270,
  			endAngle: 90,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
		  	trackWidth: 10,
	  		barWidth: 20,
		 	scale: {
			    enabled: true,
			    type: 'dots',
			    color: 'gray',
			    width: 1,
			    quantity: 20,
			    height: 8
			  },
		  	step: 0.5
		};
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

			if(newValue.Readings.battery === undefined) {
				$scope.fhem = newValue;			
				setTempHeatingParameters();	
			} else {
				$scope.fhemGeneral = newValue;	
			}					
				
		}				
									
    }

    $scope.$watch("desiredTemperature", function(newValue, oldValue) {
		$timeout.cancel(clickTimer);
		if(newValue != oldValue){
			clickTimer = $timeout(function () {
				$scope.setTemperature();
			}, 1000);
		}
	});

	/**
	* Refresh the model values.
	*/
	function setTempHeatingParameters() {
		if (typeof $scope.fhem.Readings["desired-temp"] != 'undefined')
			$scope.desiredTemperature = $scope.fhem.Readings["desired-temp"].Value;
				
		if (typeof $scope.fhem.Readings.controlMode != 'undefined')
			$scope.controlMode = $scope.fhem.Readings.controlMode.Value;
	}


	/**
	* Set the temperatur state.
	*/
	$scope.setTemperature = function() {
		var name = $scope.fhem.Name;
		
		if ( $scope.controlMode != $scope.fhem.Readings.controlMode.Value || 
			 $scope.desiredTemperature != $scope.fhem.Readings["desired-temp"].Value) { 

			if($scope.controlMode === 'manual') {
				FhemWebSocketFactory.setTemperatureManual(name, $scope.desiredTemperature)		   			
		    	FhemWebSocketFactory.setBurstXmit(name)		   			
		    }else if($scope.controlMode === 'auto' || $scope.controlMode === 'boost'){
		    	FhemWebSocketFactory.setTemperature(name, $scope.controlMode)		   			
		    	FhemWebSocketFactory.setBurstXmit(name)		   			
		    }
    	}
	}

	
	/* **Deprecated**
	/*WebSocket-Mode*/
	/*
	$scope.subscribeDevice = function (name) {		

		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',
			function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from "+ name +":" + JSON.stringify(data));

				$scope.$apply(function () {
					if(data.Readings.battery === undefined) {
						$scope.fhem = data;			
						setTempHeatingParameters();	
					} else {
						$scope.fhemGeneral = data;	
					}					
				});													
			});					
	}*/
	
}]);