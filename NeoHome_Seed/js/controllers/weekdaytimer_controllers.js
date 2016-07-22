/**
*	WeekDayTimer Controller
*/	
angular.module('weekdaytimer').controller('WeekDayTimerCtrl',['$scope','$uibModalInstance','FhemWebSocketFactory','items','GENERAL_CONFIG', function($scope,$uibModalInstance,FhemWebSocketFactory,items,GENERAL_CONFIG){
	
	$scope.weekDayTimerProfile = null;
	$scope.weekDayTimerState = null;

	$scope.items = items;

	$scope.weekDayTimerArray = [];


	/*Activate/deactivate the weekday.*/
	$scope.setMode = function (itemIndex,dayIndex) {
   		$scope.weekDayTimerArray[itemIndex].days[dayIndex]=!$scope.weekDayTimerArray[itemIndex].days[dayIndex];
  	};	

  	/*swap element in the array*/
  	/**
	*	Swap items (commandline) in the array.
	*	indexA: Index of the first item in array.
	*	indexB: Index of second the item in array.
	*/
  	$scope.swapArrayItems = function(indexA, indexB) {
  		var temp = $scope.weekDayTimerArray[indexA];
  		$scope.weekDayTimerArray[indexA] = $scope.weekDayTimerArray[indexB];
  		$scope.weekDayTimerArray[indexB] = temp;
	};

	/**
	*	Delete a item (commandline).
	*	index: Index of the item in array.
	*/
	$scope.deleteItem = function (index) {
		$scope.weekDayTimerArray.splice(index, 1);;
	}

	/**
	*	Add a item (commandline).
	*/
  	$scope.addItem = function () {
  		var newItem = {
			state: 'on',
			days:{"Mo": false, "Di":false, "Mi":false, "Do":false, "Fr":false, "Sa":false, "So":false},

			time: moment().format('HH:mm')
		};
   		$scope.weekDayTimerArray.push(newItem);
  	};

  	/*Convert fhem weekdaytimer profile to array.*/
  	function convertProfileToArray(profile){

  		var tmp = profile.substring($scope.items.fhemName.length+1).split(' ');
  		var data = new Array(tmp.length);
  		
  		/*format every command to a array in the data array*/
  		for (i = 0; i < tmp.length; i++) { 
    		data[i]=tmp[i].split('|');
		}

		for (i = 0; i < data.length; i++) { 

			/*create a new base element with the state command and the time.*/
			var newItem = {
				state: data[i][2],
				days:{"Mo": false, "Di":false, "Mi":false, "Do":false, "Fr":false, "Sa":false, "So":false},
				time: data[i][1]
			};

			/*refresh the created item with the right weekday states (active). */
			var days = data[i][0].split(',');
			var daysResult = new Array();
			for (j = 0; j < days.length; j++) { 
				if(data[i][0].indexOf('-') !== -1){
					/*here follow the shit for command structure like Mo-Do*/
				}
				else{
					newItem.days[days[j]]=true;
				} 
			}

			
			/*push the new item to the array.*/
			$scope.weekDayTimerArray.push(newItem);
		}		
  	}	

  	function convertArrayToProfile(){
  		var profile = '';
  		for (i = 0; i < $scope.weekDayTimerArray.length; i++) { 
  			var tmpProfile = '';
  			for (var key in $scope.weekDayTimerArray[i].days) {
  				if($scope.weekDayTimerArray[i].days[key])
  					tmpProfile+=key+',';
  			}
  			if(tmpProfile.length > 1)
  				tmpProfile = tmpProfile.substring(0, tmpProfile.length-1);

  			tmpProfile += '|' +$scope.weekDayTimerArray[i].time + '|'+$scope.weekDayTimerArray[i].state; 
  			profile += tmpProfile + ' '; 
  		}
  		return profile;
  	}

  	/*getData callback*/
  	function callback(id, data) {
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));

		$scope.$apply(function () {
			var result = JSON.parse(data.reply);
			if(result.ResultSet && result.ResultSet.Results){
				$scope.weekDayTimerProfile = {							
					result: result.ResultSet.Results.DEF
				};
				$scope.weekDayTimerState = result.ResultSet.Results.READINGS.disabled.VAL == 1 ? false : true;
			}

			if($scope.weekDayTimerProfile.result)
				convertProfileToArray($scope.weekDayTimerProfile.result);

		
		})
	}

	/*Load the weekdaytimer profile*/
  	$scope.getData = function() {
  		$scope.weekDayTimerArray = [];
		var name = $scope.items.fhemWeekDayTimerDevice;
		var cmd = "jsonlist " + name;
		FhemWebSocketFactory.sendFhemCommand(cmd, 1, callback);
	}

	$scope.save = function() {
		var name = $scope.items.fhemWeekDayTimerDevice;
		var deviceName = $scope.items.fhemName;
		var tmpDisabled = null;
		if($scope.weekDayTimerState)
			tmpState = 'enable';
		else
			tmpState = 'disable';

		var cmd = "set " + name + " " + tmpState;
		FhemWebSocketFactory.sendFhemCommand(cmd, 1);
		
		var profile = convertArrayToProfile();
		var cmd2 = "defmod "+name+" WeekdayTimer "+ deviceName + " " + profile;
		FhemWebSocketFactory.sendFhemCommand(cmd2, 1);

		$uibModalInstance.close();
	}

	/*Close the modal dialog*/
	$scope.closeDialog = function () {
   		$uibModalInstance.close();
  	};



  	$scope.getData();

}]);

/**
*	Modal WeekDayTimer Controller - used to run modal view
*/	
angular.module('weekdaytimer').controller('ModalWeekDayTimerCtrl',['$scope','$uibModal','GENERAL_CONFIG', function($scope, $uibModal, GENERAL_CONFIG){	

	$scope.items  =  {
		fhemName: $scope.fhemName,
		fhemWeekDayTimerDevice: $scope.fhemWeekDayTimerDevice,
		description: $scope.description, 
		commandos: $scope.commandos ? $scope.commandos.split(/\,| /) : new Array()
	}; 

	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhem = {};
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerName = function (name) {	
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
	    }
    }

	$scope.openDialog = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/templates/weekdaytimer_dialog.html',
            controller: 'WeekDayTimerCtrl',
            windowClass: "animated flipInY",
            resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
        });
    };

}]);