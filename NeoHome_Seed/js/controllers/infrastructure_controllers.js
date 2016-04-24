/**
*	Controller for a fhem switch.
*/	
angular.module('infrastructure').controller('ServerInfoStateCtrl',['$rootScope','$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhem = undefined;	

		$scope.cpuTempAvg = 0;
		$scope.statCpuUserPercent = 0;
		$scope.ramUsedPercent = 0;
		$scope.diskUsedPercent = 0;

		if (typeof $rootScope.devicelist[$scope.fhemName] != 'undefined'){
			$scope.fhem = $rootScope.devicelist[$scope.fhemName];	
		}
	

		setModelValues();


		$scope.knobstyleCpuTemperature = {
			min: 0,
			max: 100,
		 	size: 150,
		 	unit: "°",
		 	startAngle: 30,
  			endAngle: 330,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
  			trackWidth: 15,
  			barWidth: 15,
  			subText: {
			    enabled: true,
			    text: 'CPU Temperature',
			    color: 'gray',
			    font: 'auto',
			    fontSize: 0.5,
			},
  			readOnly: true,
  			step: 0.01
		};

		$scope.knobstyleCpuUserPercent = {
			min: 0,
			max: 100,
		 	size: 150,
		 	unit: "%",
		 	startAngle: 30,
  			endAngle: 330,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
  			trackWidth: 15,
  			barWidth: 15,
  			subText: {
			    enabled: true,
			    text: 'RAM Usage',
			    color: 'gray',
			    font: 'auto',
			    fontSize: 0.5,
			},
  			readOnly: true,
  			step: 0.01
		};

		$scope.knobstyleRamUsedPercent = {
			min: 0,
			max: 100,
		 	size: 150,
		 	unit: "%",
		 	startAngle: 30,
  			endAngle: 330,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
  			trackWidth: 15,
  			barWidth: 15,
  			subText: {
			    enabled: true,
			    text: 'CPU State',
			    color: 'gray',
			    font: 'auto',
			    fontSize: 0.5,
			},
  			readOnly: true,
  			step: 0.01
		};

		$scope.knobstyleDiskUsedPercent = {
			min: 0,
			max: 100,
		 	size: 150,
		 	unit: "%",
		 	startAngle: 30,
  			endAngle: 330,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
  			trackWidth: 15,
  			barWidth: 15,
  			subText: {
			    enabled: true,
			    text: 'Disk Usage',
			    color: 'gray',
			    font: 'auto',
			    fontSize: 0.5,
			},
  			readOnly: true,
  			step: 0.01
		};
	}



	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function (name,texts) {	
		$scope.fhemName = name;
		if (typeof texts != 'undefined'){
			$scope.textsArray = texts.split(/\,/);
		}

		
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
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

	    	$scope.fhem = newValue;

	    	setModelValues();
	     
	    }
    }

    /**
	* Refresh the model values.
	*/
	function setModelValues() {
		if($scope.fhem.Readings.cpu_temp_avg) {
	    	$scope.cpuTempAvg = $scope.fhem.Readings.cpu_temp_avg.Value
        }

        if($scope.fhem.Readings.stat_cpu_user_percent) {
    		$scope.statCpuUserPercent = $scope.fhem.Readings.stat_cpu_user_percent.Value
        }

        if($scope.fhem.Readings.ram_used_percent) {
			$scope.ramUsedPercent = $scope.fhem.Readings.ram_used_percent.Value
    	}

    	if($scope.fhem.Readings.disk_used_percent) {
			$scope.diskUsedPercent = $scope.fhem.Readings.disk_used_percent.Value
    	}
	}

}]);