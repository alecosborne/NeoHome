/**
*	Controller for a fhem blind element.
*/	
angular.module('window').controller('BlindCtrl',['$rootScope', '$scope','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	var deviceName = undefined;

	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		if (typeof deviceName != 'undefined') {
			if (typeof $rootScope.devicelist[deviceName] != 'undefined'){
				$scope.fhem = $rootScope.devicelist[deviceName];
	
			}

			setTempBlindParameters();
		}

		$scope.knobstyle = {
			min: 0,
			max: 100,
		 	size: 150,
		 	unit: "%",
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
		  	step: 1.0
		};
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerName = function (name) {	
		deviceName = name; 

		$scope.$watch(
            "$root.devicelist['"+name+"']",
			watchListenerCallback,true
        );
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

			$scope.fhem = newValue;	

			if (typeof $scope.fhem.Readings.pct != 'undefined'){
				setTempBlindParameters();

				var state = $scope.fhem.Readings.pct.Value;
				var images = $scope.images.split(",");
				var states = $scope.states.split(",");

				for (var i = 1; i <= states.length - 1; i++) {
					if(parseInt(states[i-1])<= parseInt(state) && parseInt(states[i]) >= parseInt(state)){						
						$scope.fhem.Image = images[i];							
					}
				}
			}
		}	
	}

	/* **Deprecated**
	/*WebSocket-Mode*/
	/*
	$scope.subscribeDevice = function (name) {		

		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',
			function(data) {
				if(GENERAL_CONFIG.APP_DEBUG)
					console.log("Fire from "+ name +":" + JSON.stringify(data));

				$scope.$apply(function () {
					$scope.fhem = data;	
					$scope.setTempBlindParameters();
				});			

				var state = $scope.fhem.Readings.pct.Value;
				var images = $scope.images.split(",");
				var states = $scope.states.split(",");

				for (var i = 1; i <= states.length - 1; i++) {
					if(parseInt(states[i-1])<= parseInt(state) && parseInt(states[i]) >= parseInt(state)){						
						$scope.$apply(function () {
							$scope.fhem.Image = images[i];
						});									
					}
				};				
			});					
	}
	*/

	/**
	* Refresh the model parameters.
	*/
	function setTempBlindParameters() {
		if (typeof $scope.fhem.Readings.pct != 'undefined')
			$scope.blindLevel = $scope.fhem.Readings.pct.Value;

		if (typeof $scope.fhem.Readings.state != 'undefined')
			$scope.state = $scope.fhem.Readings.state.Value;	
	}

	/**
	* Set the blind state.
	*/
	$scope.setBlindState = function() {
		var name = $scope.fhem.Name;
		var cmd = "set " + name + " pct " + $scope.blindLevel;		
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}	
}]);

/**
*	Controller for a fhem blind element.
*/	
angular.module('window').controller('SunblindCtrl',['$rootScope','$scope','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	var deviceName = undefined;

	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		if (typeof deviceName != 'undefined') {
			if (typeof $rootScope.devicelist[deviceName] != 'undefined'){
				$scope.fhem = $rootScope.devicelist[deviceName];

				setTempBlindParameters();	
			}
		}
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerName = function (name) {	
		deviceName = name;

		$scope.$watch(
            "$root.devicelist['"+name+"']",
			watchListenerCallback,true
        );
		
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));
			
			$scope.fhem = newValue;	

			if (typeof $scope.fhem.Readings.position != 'undefined'){
				setTempBlindParameters();
						

				var position = $scope.fhem.Readings.position.Value;
				var state = $scope.fhem.Readings.state.Value;
				var images = $scope.images.split(",");
				var states = $scope.states.split(",");

				for (var i = 0; i <= states.length - 1; i++) {
					if(state == states[i]){						
						$scope.fhem.Image = images[i];							
					}
				}
			}
		}
	}
	
	/* **Deprecated**
	/*WebSocket-Mode*/
	/*
	$scope.subscribeDevice = function (name) {		

		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',
			function(data) {
				if(GENERAL_CONFIG.APP_DEBUG)
					console.log("Fire from "+ name +":" + JSON.stringify(data));

				$scope.$apply(function () {
					$scope.fhem = data;	
					$scope.setTempBlindParameters();
				});			

				var position = $scope.fhem.Readings.position.Value;
				var state = $scope.fhem.Readings.state.Value;
				var images = $scope.images.split(",");
				var states = $scope.states.split(",");

				for (var i = 0; i <= states.length - 1; i++) {
					if(state == states[i]){						
						$scope.$apply(function () {
							$scope.fhem.Image = images[i];
						});									
					}
				};				
			});					
	}
	*/

	/**
	* Refresh the model parameters.
	*/
	function setTempBlindParameters() {
		if (typeof $scope.fhem.Readings.position != 'undefined')
			$scope.blindLevel = $scope.fhem.Readings.position.Value;

		if (typeof $scope.fhem.Readings.state != 'undefined')
			$scope.state = $scope.fhem.Readings.state.Value;
	}

	/**
	* Set the blind state.
	*/
	$scope.setBlindState = function() {
		var name = $scope.fhem.Name;
		var cmd = "set " + name + " " + $scope.blindLevel;		
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}	
}]);
