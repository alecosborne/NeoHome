/** **Deprecated**
*	Controller for a fhem switch.
*	The new SwitchCtrl can handle multiple devices.
*//*	
angular.module('shared').controller('SwitchCtrlOld',['$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	$scope.fhem = null;	

	//Polling-Mode
	$scope.getControlData = function (name) {								
		FhemFactory.getControlData(name)
			.success(function (data) {				
				//var lowerCaseData = SharedFactory.keysToLowerCase(data);						
				//$scope.fhem = lowerCaseData.results[0];					
				$scope.fhem =data.Results[0];
				$scope.boolValue = null;

				var state = $scope.fhem.Readings.state.Value;
				if (state === 'on') { $scope.boolValue=true;} else {$scope.boolValue=false;}


				
			})
			.error(function (error) {
				$scope.status = 'Unable to load control data: ' + error.message;
			});
	}
	
	$scope.setControlStateNormal = function() {

		var state = $scope.fhem.Readings.state.Value;
		var name = $scope.fhem.Name;
	
		var newState = 'on'		
		if (state === 'on') { newState = "off";} else {newState = "on";}

  	FhemFactory.setControlState(name, newState)
   		.success(function (data) {				
    	})
    	.error(function (error) {
        $scope.status = 'Unable to set control state: ' + error.message;
    	});			
	}

	//WebSocket-Mode
	$scope.subscribeDevice = function (name) {		

		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',

			function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from "+ name +":" + JSON.stringify(data));
				
				$scope.$apply(function () {
					$scope.fhem = data;	

					$scope.boolValue = null;
					var state = $scope.fhem.Readings.state.Value;
					if (state === 'on') { $scope.boolValue=true;} else {$scope.boolValue=false;}
				});				
			});					
	}

	$scope.setControlState = function() {

		var state = $scope.fhem.Readings.state.Value;
		var name = $scope.fhem.Name;
	
		var newState = 'on'		
		if (state === 'on') { newState = "off";} else {newState = "on";}

  		FhemWebSocketFactory.setControlState(name, newState);   					
	}
}]);*/

/**
*	Controller for a fhem switch.
*/	
angular.module('shared').controller('SwitchCtrl',['$rootScope','$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhem = new Array();	
		$scope.boolValue = new Array();	
		$scope.clickClass = "";
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function (names) {	
		$scope.nameArray = names.split(/\,| /);
		
		for (var id = 0; id < $scope.nameArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.nameArray[id]+"']",
				watchListenerCallback,true
            );
		}
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

	    	var index = $scope.nameArray.indexOf(newValue.Name);
	    	$scope.fhem[index] = newValue;
	    	if($scope.fhem[index].Readings.state) {
	    		var state = $scope.fhem[index].Readings.state.Value;
				if (state === 'on') { $scope.boolValue[index]=true;} else if(state === 'off'){$scope.boolValue[index]=false;}
	        }
	    }
    }

	/**
	*	Method to change/switch the state.
	*/
	$scope.setControlState = function(id) {
		
		var state = $scope.fhem[id].Readings.state.Value;
		var name = $scope.fhem[id].Name;
	
		var newState = 'on'		
		if (state === 'on') { newState = "off";} else {newState = "on";}

  		FhemWebSocketFactory.setControlState(name, newState);   					
	}
}]);

/**
*	Controller for a fhem simple state element.
*/	
angular.module('shared').controller('StateCtrl',['$rootScope','$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
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
			
	    	var index = $scope.nameArray.indexOf(newValue.Name);
	    	$scope.fhem = newValue;
	    }
    }

	/* **Deprecated**
	/*WebSocket-Mode*/
	/*
	$scope.subscribeDevice = function (name,state) {		
		$scope.fhem.data = {};
		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',

			
			function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from "+ name +" by "+ data.Name +":" + JSON.stringify(data));
					
                
                $scope.$apply(function () {
					$scope.fhem = data;						
				});								
				
			});					
	}	
	*/
}]);

/**
*	Controller for a fhem simple state element.
*/	
angular.module('shared').controller('DetectorCtrl',['$rootScope','$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhem = new Array();	
		$scope.resultName = '';
		$scope.resultCount = 0;
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function () {	
		$scope.nameArray = $scope.fhemNames.split(/\,| /);
		if (typeof $scope.textsAlarm != 'undefined'){
			$scope.textsAlarmArray = $scope.textsAlarm.split(/\,/);
		}

		for (var id = 0; id < $scope.nameArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.nameArray[id]+"']",
				watchListenerCallback,true
            );
		}
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));
			
	    	var index = $scope.nameArray.indexOf(newValue.Name);
	    	$scope.fhem[index] = newValue;


	    	var count = 0;
	    	var name = '';
	    	if($scope.detectorType == 'smoke') {
		    	angular.forEach($scope.fhem, function (item, index) {
			    	if(typeof item.Readings.smoke_detect != "undefined"){					
						if(item.Readings.smoke_detect.Value == "none") {
							 count = 0;
							 name = $scope.textNoAlarm;
						} else if(item.Readings.smoke_detect.Value == "HMvir_SD") { 
							count = "all"
							name = $scope.textAlarmGeneral;
						} else if(item.Readings.smoke_detect.Value != "none" && item.Readings.smoke_detect.Value != "HMvir_SD") {
							var tmp_sd_list = item.Readings.peerList.Value.split(/\,/)
							name = $scope.textsAlarmArray[tmp_sd_list.indexOf(item.Readings.smoke_detect.Value)];
							count = "all"
						}
					}
		        });	
		    }else if($scope.detectorType == 'water') {
		    	angular.forEach($scope.fhem, function (item, index) {					
					if(typeof item.Readings.state != 'undefined' && item.Readings.state.Value != 'dry') {
						 count++;
					}				                  
		        });	
		    }

		    $scope.resultCount = count;	
		    $scope.resultName = name;
	    }
    }
}]);

/**
*	Controller for a fhem group state element.
*/	
angular.module('shared').controller('GroupCtrl',['$rootScope','$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhem = new Array();		
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function () {	
		$scope.nameArray = $scope.fhemNames.split(/\,| /);
		$scope.state = $scope.countState;
		
		for (var id = 0; id < $scope.nameArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.nameArray[id]+"']",
				watchListenerCallback,true
            );
		}
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

			var index = $scope.nameArray.indexOf(newValue.Name);

			if (newValue.Readings && newValue.Readings.state && newValue.Readings.state.Value){
				$scope.fhem[index] = newValue;
			}
			else{
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
						console.warn("Warning: "+ newValue.Name +" has no property state." + JSON.stringify(newValue));	
			}

			var count = 0;
			angular.forEach($scope.fhem, function (item, index) {					
				if($scope.state === item.Readings.state.Value)	{count++;}				                  
	        });		
	        
	        
			$scope.fhem.count = count;		
		}				
									
    }

	/* **Deprecated**
	/*WebSocket-Mode*/
	/*
	$scope.subscribeDevice = function (name,state) {		
		$scope.fhem.data = {};
		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',

			
			//Callback: Sum all states in the array with the given state in 'state'.			
			
			function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from "+ name +" by "+ data.Name +":" + JSON.stringify(data));

				if (data.Readings && data.Readings.state && data.Readings.state.Value){
					$scope.fhem.data[data.Name] = data;
				}
				else{
					if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
							console.warn("Warning: "+ data.Name +" has no property state." + JSON.stringify(data));	
				}

				var count = 0;
				angular.forEach($scope.fhem.data, function (item, index) {					
					if(state === item.Readings.state.Value)	{count++;}				                  
                });		
                
                $scope.$apply(function () {
					$scope.fhem.count = count;						
				});								
				
			});					
	}	
	*/
}]);


/**
*	Statistic Controller 
*/	
angular.module('shared').controller('StatisticCtrl',['$scope','FhemWebSocketFactory','SharedFactory','ngDialog','GENERAL_CONFIG', function($scope, FhemWebSocketFactory, SharedFactory, ngDialog, GENERAL_CONFIG){	
	
	/*Init the x-Axis format.*/
	var formatXAxis = '%H:%M';

	/*Init the devices and readings for the query.*/
	var fhemDeviceArray = $scope.fhemDevices.split(/\,| /);			
	var fhemDeviceReadingsArray = $scope.fhemDeviceReadings.split(/\,| /);			
	var fhemDeviceReadingsTextsArray = $scope.fhemDeviceReadingsTexts.split(/\,/);	


	var resultTest = this;		
	resultTest.result = null;	
	var currentDate = new Date();

	/*Init the date time picker model params*/
	$scope.startTime = SharedFactory.formatDate(currentDate)+ " " + "00:00:00";
	$scope.endTime = SharedFactory.formatDate(currentDate)+ " " + "24:00:00";//currentDate.toLocaleTimeString()	


	function setXAxisFormat() {
		/*Check if the timespan bigger then 1 day*/
		var d_start = new Date($scope.startTime.substring(6, 10),$scope.startTime.substring(3, 5),$scope.startTime.substring(0, 2));
		var d_end= new Date($scope.endTime.substring(6, 10),$scope.endTime.substring(3, 5),$scope.endTime.substring(0, 2));
		
	
		if (d_end-d_start > 0)
			formatXAxis = '%d.%m %H:%M';
			/*formatXAxis = '%d.%m.%y %H:%M';*/
		else
			formatXAxis = '%H:%M';
	}

	/*Map values to other values. :-) */
	function mapper(value){			                		
		var result = undefined;

		result = (!result && (value == 'on' || value == 'set_on')) ? 1 : result;

		result = (!result && (value == 'off' || value == 'set_off')) ? 0 : result;

		if (result === undefined)
			result = parseFloat(value);


		return 	result;	
	}

	/*Map the recived data to a new json object.*/
	function statisticMapFunction(d, i){
		return {x: new Date(d.TIMESTAMP).getTime(), y: mapper(d.VALUE)};
	}

	/*Filter the recived data.*/
	function statisticFilterFunction(d, i){
		/*$scope.chartIgnoreZeroValues =  $scope.chartIgnoreZeroValues ? $scope.chartIgnoreZeroValues : false*/
		if($scope.chartIgnoreZeroValues==="true"){
			 if (typeof(parseFloat(d.VALUE)) === 'number' && parseFloat(d.VALUE) > 0) {
	    		return true;
	  		} else {		
		    	return false;
	  		}
  		}
  		return true;
	}


	/*Callback of the logdb call (fhem command)*/
	function callback(id, data) {
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
		//var demoData1 = [{"key":"Search","values":[{"x":1425583989471,"y":12},{"x":1425687669471,"y":11},{"x":1425791349471,"y":17},{"x":1425895029471,"y":18},{"x":1425998709471,"y":11},{"x":1426102389471,"y":16},{"x":1426206069471,"y":12},{"x":1426309749471,"y":13},{"x":1426413429471,"y":10},{"x":1426517109471,"y":11}],"area":true}];
		//var demoData2 = [{"key":"Search","values":[{"x":1425583989471,"y":1},{"x":1425687669471,"y":2},{"x":1425791349471,"y":7},{"x":1425895029471,"y":8},{"x":1425998709471,"y":1},{"x":1426102389471,"y":16},{"x":1426206069471,"y":2},{"x":1426309749471,"y":3},{"x":1426413429471,"y":10},{"x":1426517109471,"y":1}],"area":true}];		
		$scope.$apply(function () {
			$scope.fhem = [{				
				key: fhemDeviceReadingsTextsArray[id],						
				values: JSON.parse(data.reply).data.filter(statisticFilterFunction).map(statisticMapFunction),		
				area: $scope.chartAsArea === "false" ? false : true

			}];
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("FHEM :"+ JSON.stringify($scope.fhem));
			if($scope.statisticsData)
				$scope.statisticsData = $scope.statisticsData.concat($scope.fhem);
			else
				$scope.statisticsData =$scope.fhem;
			
			//$scope.statisticsData = sss.concat(ppp);
			loadStatisticsOptions();
		});				
	}

	$scope.getControlData = function () {	

		var startDateString = $scope.startTime.split(/\.| |\:/);	
		var endDateString = $scope.endTime.split(/\.| |\:/);				

		$scope.statisticsData = undefined;

		for (i = 0; i < fhemDeviceArray.length; i++) { 
			//'get logdb - webchart 2015-05-08_00:00:00 2015-05-08_22:00:00 GA.Rasenmaeher_Pwr timerange TIMESTAMP power'
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ $scope.fhemDevices +' timerange TIMESTAMP ' + $scope.fhemDeviceReadings;		
			var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ fhemDeviceArray[i] +' timerange TIMESTAMP ' + fhemDeviceReadingsArray[i];		
		
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + command);
		
			FhemWebSocketFactory.sendFhemCommand(command, i, callback);							    			
		}		
	}	

	/*Don't call this at creation state.*/
	//$scope.getControlData();       

	var colorArray = ['#82DFD6', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
	
	$scope.colorFunction = function() {
		return function(d, i) {
	    	return colorArray[i];
	    };
	}	

	/*Load the statistics options.*/
	function loadStatisticsOptions(){
		setXAxisFormat();

		$scope.statisticsOptions = {
		  "chart": {
		    "type": $scope.chartType ? $scope.chartType : "stackedAreaChart",
		    "height": $scope.chartHeight ? $scope.chartHeight : 450,
		    "margin": {
		      "top": 20,
		      "right": 20,
		      "bottom": 60,
		      "left": 40
		    },	           	      
		    "color": $scope.colorFunction(),
			"interpolate": $scope.chartInterpolateType ? $scope.chartInterpolateType : "monotone",
		    "useVoronoi": false,
		    "clipEdge": true,
		    "transitionDuration": 500,
		    "useInteractiveGuideline": true,
		    "showValues": $scope.chartShowValues === 'true' ? true : false,
		    valueFormat: function (d){
	                    if($scope.chartYAxisIsDatetime === 'true'){
		                	    	return d3.time.format('%H:%M')(new Date(d*1000))	              
		                		}else{
		                			return d;
		                		}
	                },
		    "xAxis": {
		      "ticks": 24,
		      "showMaxMin": false,
		      "rotateLabels": 50,
		      	tickFormat: function(d) {
		                	    return d3.time.format(formatXAxis)(new Date(d))
		                	    /*return d3.time.format('%b %d - %H:%M')(new Date(d))*/
		        		    }
		    },
		    "showYAxis": $scope.chartShowYaxis === 'false' ? false : true,	    	
		    "yAxis": {	    		    	
		    	tickFormat: function(d) {
		    					if($scope.chartYAxisIsDatetime === "true"){
		                	    	return d3.time.format('%H:%M')(new Date(d*1000))	              
		                		}else{
		                			return d;
		                		}
		       				}	    	
		       
		    }
		  }
		};	
	};
       
	$scope.openStatisticDialog = function () {
		$scope.getControlData();
		var new_dialog = ngDialog.open({
						template: './views/templates/statistic_dialog.html',
						className: 'ngdialog-theme-default',   						
						scope: $scope    						
			});                                                               
		};
	
}]);

/**
*	Schedule Controller 
*/	
angular.module('shared').controller('ScheduleCtrl',['$scope','FhemWebSocketFactory','SharedFactory','ngDialog','GENERAL_CONFIG', function($scope, FhemWebSocketFactory, SharedFactory, ngDialog, GENERAL_CONFIG){	
	
	var currentDate = new Date();
	$scope.fhem = new Array();	
	$scope.times = new Array();

	/*Init the devices and readings for the query.*/
	var fhemDeviceArray = $scope.fhemDevices.split(/\,| /);			
	$scope.fhemDevicesTextsArray = $scope.fhemDevicesTexts.split(/\,/);			
	/*var fhemDeviceReadingsTextsArray = $scope.fhemDeviceReadingsTexts.split(/\,/);*/


		
	/*WebSocket-Mode*/
	$scope.subscribeDevice = function (names) {	
		var nameArray = names.split(/\,| /);	
		
		/*For all devices do.*/	
		for (var id = 0; id < nameArray.length; id++) { 
			FhemWebSocketFactory.subscribeEvent('.*', nameArray[id], '.*', (function(index) {				
				return function(data) {
					if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
						console.log("Fire from "+ data.Name +":" + JSON.stringify(data));
					
					$scope.$apply(function () {
						$scope.fhem[index] = data;	
						$scope.times[index] = SharedFactory.formatDate(currentDate)+ " " + data.Readings.state.Value +":00";
						var state = $scope.fhem[index].Readings.state.Value;
						if (state === 'on') { $scope.boolValue[index]=true;} else if(state === 'off'){$scope.boolValue[index]=false;}
					});		
				}											
			})(id));
		}				
	}	

	$scope.getControlData = function () {	

		var startDateString = $scope.startTime.split(/\.| |\:/);	
		var endDateString = $scope.endTime.split(/\.| |\:/);				

		$scope.statisticsData = undefined;

		for (i = 0; i < fhemDeviceArray.length; i++) { 
			//'get logdb - webchart 2015-05-08_00:00:00 2015-05-08_22:00:00 GA.Rasenmaeher_Pwr timerange TIMESTAMP power'
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ $scope.fhemDevices +' timerange TIMESTAMP ' + $scope.fhemDeviceReadings;		
			var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ fhemDeviceArray[i] +' timerange TIMESTAMP ' + fhemDeviceReadingsArray[i];		
		
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + command);
		
			FhemWebSocketFactory.sendFhemCommand(command, i, callback);							    			
		}		
	}	
	       
	$scope.openScheduleDialog = function () {
		/*scope.getControlData();*/
		var new_dialog = ngDialog.open({
						template: './views/templates/schedule_dialog.html',
						className: 'ngdialog-theme-default',   						
						scope: $scope    						
			});                                                               
		};
	
}]);

/**
*	Expereimental Controller 
*/	
angular.module('shared').controller('TestCtrl',['$scope','scriptLoader','FhemWebSocketFactory','ngDialog','GENERAL_CONFIG', function($scope, scriptLoader, FhemWebSocketFactory,ngDialog,GENERAL_CONFIG){	
	
	var resultTest = this;		
	resultTest.result = null;
	$scope.vartest = "Hallo";
	function test() {		

		FhemWebSocketFactory.sendFhemCommand('get logdb - webchart 2015-05-08_00:00:00 2015-05-08_22:00:00 GA.Rasenmaeher_Pwr timerange TIMESTAMP power',
				function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
				//[{"key":"Search","values":[{"x":1425583989471,"y":12},{"x":1425687669471,"y":11},{"x":1425791349471,"y":17},{"x":1425895029471,"y":18},{"x":1425998709471,"y":11},{"x":1426102389471,"y":16},{"x":1426206069471,"y":12},{"x":1426309749471,"y":13},{"x":1426413429471,"y":10},{"x":1426517109471,"y":11}],"area":true}];
				$scope.$apply(function () {
					$scope.fhem = [{
						key: "Rasenmäher",						
						values: JSON.parse(data.reply).data.map(function(d, i) {
                    				return {x: new Date(d.TIMESTAMP).getTime(), y: parseFloat(d.VALUE)};
                			}),		
						area: true

					}];
					console.log("FHEM:"+ JSON.stringify($scope.fhem));					
					$scope.nvd31Data = $scope.fhem;
					$scope.nvd32Data = $scope.fhem;

				});				
			});								
	}
	
	test();

	//--------------------------

	$scope.applyNvd3Data = function(){
        /* Inspired by Lee Byron's test data generator. */
        function _stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(function(d, i) {
                    return {x: i, y: Math.max(0, d)};
                });
            });
        }

        function testData(stream_names, pointsCount) {
            var now = new Date().getTime(),
                day = 1000 * 60 * 60 * 24, //milliseconds
                daysAgoCount = 60,
                daysAgo = daysAgoCount * day,
                daysAgoDate = now - daysAgo,
                pointsCount = pointsCount || 45, //less for better performance
                daysPerPoint = daysAgoCount / pointsCount;
            return _stream_layers(stream_names.length, pointsCount, .1).map(function(data, i) {
                return {
                    key: stream_names[i],
                    values: data.map(function(d,j){
                        return {
                            x: daysAgoDate + d.x * day * daysPerPoint,
                            y: Math.floor(d.y * 100) //just a coefficient,
                        }
                    })
                };
            });
        }

        $scope.nvd31Chart = nv.models.lineChart()
            .useInteractiveGuideline(true)
            .margin({left: 28, bottom: 30, right: 0})
            .color(['#82DFD6', '#ddd']);

        $scope.nvd31Chart.xAxis
            .showMaxMin(false)
            .ticks(10000)
            .tickFormat(function(d) { return d3.time.format('%b %d - %H:%M')(new Date(d)) });

            var yScale = d3.scale.linear()
            			.domain([100,200])            			
            			.range([320, 300]);


        $scope.nvd31Chart.yAxis
            .showMaxMin(false)
            .ticks(10)
            //.scale(yScale).orient("left")
            .tickFormat(d3.format(',g'));

        

        //$scope.nvd31Data = testData(['Search', 'Referral'], 50).map(function(el, i){
        //    el.area = true;
        //   return el;
        //});

        $scope.nvd31Data  = $scope.fhem ;

        console.log(JSON.stringify($scope.nvd31Data));
        console.log(JSON.stringify($scope.fhem));

        $scope.nvd32Chart = nv.models.multiBarChart()
            .margin({left: 28, bottom: 30, right: 0})
            .color(['#F7653F', '#ddd']);

        $scope.nvd32Chart.xAxis
            .showMaxMin(false)
            .ticks(1000)
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)) });


            

        $scope.nvd32Chart.yAxis
            .showMaxMin(false)
            .ticks(0)            
            .tickFormat(d3.format(',f'))



        //$scope.nvd32Data = testData(['Uploads', 'Downloads'], 10).map(function(el, i){
        //    el.area = true;
        //    return el;
        //});

        $scope.nvd32Data = $scope.fhem ;//[{"key":"Search","values":[{"x":1425583989471,"y":12},{"x":1425687669471,"y":11},{"x":1425791349471,"y":17},{"x":1425895029471,"y":18},{"x":1425998709471,"y":11},{"x":1426102389471,"y":16},{"x":1426206069471,"y":12},{"x":1426309749471,"y":13},{"x":1426413429471,"y":10},{"x":1426517109471,"y":11}],"area":true}];
    };

    scriptLoader.loadScripts([
        'vendor/d3/d3.min.js',
        'vendor/nvd3/build/nv.d3.min.js'        
    ])
        .then(function(){
            $scope.applyNvd3Data()
        });

	//--------------------------

	$scope.sparklineCompositeData = [[2,4,6,2,7,5,3,7], [5,3,7,8,3,6,2,4]];
    $scope.sparklineCompositeOptions = [{
        width: '100%',
        fillColor: '#ddd',
        height: '100px',
        lineColor: 'transparent',
        spotColor: '#c0d0f0',
        minSpotColor: null,
        maxSpotColor: null,
        highlightSpotColor: '#ddd',
        highlightLineColor: '#ddd'
    }, {
        lineColor: 'transparent',
        spotColor: '#c0d0f0',
        fillColor: 'rgba(192, 208, 240, 0.76)',
        minSpotColor: null,
        maxSpotColor: null,
        highlightSpotColor: '#ddd',
        highlightLineColor: '#ddd'
    }];

	
	

	$scope.openStatistic = function () {
				var new_dialog = ngDialog.open({
	    						template: './views/templates/statistic_dialog.html',
	    						className: 'ngdialog-theme-default',   
	    						data: {name: 'Test'}, 						
	    						scope: $scope    						
							});                                                               
			};
	/*
	$scope.getData = function (name) {
		
			console.log("read Data from "+ name + ": " + JSON.stringify($rootScope.fhem.devices[name]));			
			$scope.fhem = $rootScope.fhem.devices[name];			
	}*/

	/*
	$scope.fhem = null;	
	$scope.getControlData = function (name) {								
		FhemFactory.getControlData(name)
			.success(function (data) {											
				$scope.fhem = data.Results[0];					
			})
			.error(function (error) {
				$scope.status = 'Unable to load control data: ' + error.message;
			});
	}


	$scope.setControlState = {};
	$scope.setControlState = function() {

		var state = $scope.fhem.Readings.state.Value;
		var name = $scope.fhem.Name;
	
		var newState = 'on'		
		if (state === 'on') { newState = "off";} else {newState = "on";}

  	FhemFactory.setControlState(name, newState)
   		.success(function (data) {				
    	})
    	.error(function (error) {
        $scope.status = 'Unable to set control state: ' + error.message;
    	});			
	}
	*/
}]);

/**
*	Scene Controller
*/	
angular.module('shared').controller('SceneCtrl',['$scope','FhemWebSocketFactory','GENERAL_CONFIG', function($scope,FhemWebSocketFactory,GENERAL_CONFIG){
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {	
		$scope.sceneFhem = new Array();	
		$scope.modeFhem = new Array();	
		$scope.modeNamesboolValue = new Array();	
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function () {	
		$scope.sceneNamesArray = $scope.fhemSceneNames.split(/\,| /);
		$scope.modeNamesArray = $scope.fhemModeNames.split(/\,| /);
		$scope.sceneIconsArray = $scope.fhemSceneIcons.split(/\,| /);
		$scope.modeIconsArray = $scope.fhemModeIcons.split(/\,| /);


		for (var id = 0; id < $scope.modeNamesArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.modeNamesArray[id]+"']",
				watchListenerCallback,true
            );
		}

		/*for (var id = 0; id < $scope.sceneNamesArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.sceneNamesArray[id]+"']",
				watchListenerCallback,true
            );
		}*/
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

	    	var index = $scope.modeNamesArray.indexOf(newValue.Name);
	    	$scope.modeFhem[index] = newValue;
	    	if($scope.modeFhem[index].Readings.state) {
	    		var state = $scope.modeFhem[index].Readings.state.Value;
				if (state === 'on') { $scope.modeNamesboolValue[index]=true;} else if(state === 'off'){$scope.modeNamesboolValue[index]=false;}
	        }
	    }
    }

    /**
	*	Method to change/switch the scene state.
	*/
	$scope.setScene = function (id) {
		
		var name = $scope.sceneNamesArray[id];
		FhemWebSocketFactory.setControlState(name, 'on');
	}

	/**
	*	Method to change/switch the mode state.
	*/
	$scope.setMode = function (id) {
		
		var state = $scope.modeFhem[id].Readings.state.Value;
		var name = $scope.modeFhem[id].Name;
	
		var newState = 'on'		
		if (state === 'on') { newState = "off";} else {newState = "on";}

  		FhemWebSocketFactory.setControlState(name, newState);   	
	}

	
}]);

/**
*	Presence Controller
*/	
angular.module('shared').controller('PresenceCtrl',['$scope','FhemWebSocketFactory','GENERAL_CONFIG', function($scope,FhemWebSocketFactory,GENERAL_CONFIG){
	
	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {	
		$scope.fhem = new Array();	
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function (fhemNames,texts,images) {	
		$scope.fhemNamesArray = fhemNames.split(/\,| /);
		$scope.textsArray = texts.split(/\,| /);
		$scope.imagesArray = images.split(/\,| /);

		for (var id = 0; id < $scope.fhemNamesArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.fhemNamesArray[id]+"']",
				watchListenerCallback,true
            );
		}

		/*for (var id = 0; id < $scope.sceneNamesArray.length; id++) { 
			$scope.$watch(
                "$root.devicelist['"+$scope.sceneNamesArray[id]+"']",
				watchListenerCallback,true
            );
		}*/
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

	    	var index = $scope.fhemNamesArray.indexOf(newValue.Name);
	    	$scope.fhem[index] = newValue;
	    }
    }

	
}]);

/**
*	Modal Controller - used to run modal view
*/	
angular.module('shared').controller('ModalCtrl',['$scope','$uibModal', function($scope, $uibModal){	
	$scope.open = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/templates/statistic_dialog.html',
            //controller: ModalInstanceCtrl,
            windowClass: "animated flipInY"
        });
    };
}]);

