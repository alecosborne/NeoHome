/**
*	Energy Controller 
*/	
angular.module('energy').controller('EnergyCtrl',['$rootScope','$scope','FhemWebSocketFactory','SharedFactory','GENERAL_CONFIG', function($rootScope, $scope, FhemWebSocketFactory, SharedFactory, GENERAL_CONFIG){	

	var devicePower = undefined;
	var deviceGas = undefined;
	var chartTypeID = undefined;

	/**
	*	Init the controler variables.
	*/
	$scope.init = function() {
		$scope.fhemPower = undefined;
		$scope.fhemGas = undefined;
		chartTypeID = 'day';
		
		if (typeof devicePower != 'undefined') {
			if (typeof $rootScope.devicelist[devicePower] != 'undefined'){
				$scope.fhemPower = $rootScope.devicelist[devicePower];
			}
		}

		if (typeof deviceGas != 'undefined') {
			if (typeof $rootScope.devicelist[deviceGas] != 'undefined'){
				$scope.fhemGas = $rootScope.devicelist[deviceGas];
			}
		}	
	}	

	$scope.dataChart = 0;
    

    $scope.statisticsData = [{
                    			values: [],
                    			key: '',
                			},
                			{
                    			values: [],
                    			key: '',
                			}
            ];

    //Power
	$scope.statisticsDataCurrentWeek_sum = 0;
	$scope.statisticsDataCurrentWeek = undefined;
	//$scope.statisticsDataLastWeek_sum = 0;
	//$scope.statisticsDataLastWeek = undefined;
	$scope.statisticsDataCurrentMonth_sum = 0;
	$scope.statisticsDataCurrentMonth = undefined;
	//$scope.statisticsDataLastMonth_sum = 0;
	//$scope.statisticsDataLastMonth = undefined;	
	$scope.statisticsDataCurrentYear_sum = 0;	
	$scope.statisticsDataCurrentYear = undefined;
	//$scope.statisticsDataLastYear_sum = 0;
	//$scope.statisticsDataLastYear = undefined;
	
	$scope.statisticsPowerDataDay = undefined;
	$scope.statisticsDataCurrentDay_sum = 0;

	//Gas
    $scope.statisticsDataGasCurrentWeek_sum = 0;
	$scope.statisticsDataGasCurrentWeek = undefined;
	//$scope.statisticsDataGasLastWeek_sum = 0;
	//$scope.statisticsDataGasLastWeek = undefined;
	$scope.statisticsDataGasCurrentMonth_sum = 0;
	$scope.statisticsDataGasCurrentMonth = undefined;
	//$scope.statisticsDataGasLastMonth_sum = 0;
	//$scope.statisticsDataGasLastMonth = undefined;	
	$scope.statisticsDataGasCurrentYear_sum = 0;	
	$scope.statisticsDataGasCurrentYear = undefined;
	//$scope.statisticsDataGasLastYear_sum = 0;
	//$scope.statisticsDataGasLastYear = undefined;

	$scope.statisticsGasDataDay = undefined;
	$scope.statisticsDataGasCurrentDay_sum = 0;
	
	

	//Contracts typs
	$scope.energyContractKWH_Year = 0.00;
	$scope.energyContractKWH_Month = 0.00;
	$scope.energyContractKWH_Week = 0.00;
	$scope.energyContractKWH_Day = 0.00;

	$scope.energyPercentToYear_Year = 0.00;
	$scope.energyPercentToYear_Month = 0.00;
	$scope.energyPercentToYear_Week = 0.00;
	$scope.energyPercentToYear_Day = 0.00;

	$scope.gasContractKWH_Year = 0.00;
	$scope.gasContractKWH_Month = 0.00;
	$scope.gasContractKWH_Week = 0.00;
	$scope.gasContractKWH_Day = 0.00;

	$scope.gasPercentToYear_Year = 0.00;
	$scope.gasPercentToYear_Month = 0.00;
	$scope.gasPercentToYear_Week = 0.00;
	$scope.gasPercentToYear_Day = 0.00;

	$scope.zero1 = 0.00;
	$scope.zero2 = 0.00;
	$scope.zero3 = 0.00;
	$scope.zero4 = 0.00;
	$scope.zero5 = 0.00;
	$scope.zero6 = 0.00;
	$scope.zero7 = 0.00;
	$scope.zero8 = 0.00;
	$scope.zero9 = 0.00;
	$scope.zero10 = 0.00;
	$scope.zero11 = 0.00;
	$scope.zero12 = 0.00;
	$scope.zero13 = 0.00;
	$scope.zero14 = 0.00;
	$scope.zero15 = 0.00;
	$scope.zero16 = 0.00;

	$scope.test1 = 48.00;
	/*
	* Private Chart Builder Helper Functions
	*/	

	function calcPowerContractValues(){
		$scope.energyContractKWH_Year = $scope.fhemPower.Readings.energy_contract_kWh_Year.Value;
		$scope.energyContractKWH_Month = $scope.energyContractKWH_Year / 12;
		$scope.energyContractKWH_Day = $scope.energyContractKWH_Month / moment().daysInMonth();
		$scope.energyContractKWH_Week = $scope.energyContractKWH_Day * 7;

		calcPowerPercentToYearValues();
	}

	function calcGasContractValues(){
		$scope.gasContractKWH_Year = $scope.fhemGas.Readings.gas_contract_kWh_Year.Value;
		$scope.gasContractKWH_Month = $scope.gasContractKWH_Year / 12;
		$scope.gasContractKWH_Day = $scope.gasContractKWH_Month / moment().daysInMonth();
		$scope.gasContractKWH_Week = $scope.gasContractKWH_Day * 7;

		calcGasPercentToYearValues();
	}

	function calcPowerPercentToYearValues(){
		$scope.energyPercentToYear_Year = ($scope.statisticsDataCurrentYear_sum * 100) / $scope.energyContractKWH_Year
		$scope.energyPercentToYear_Month = ($scope.statisticsDataCurrentMonth_sum * 100) / $scope.energyContractKWH_Month;
		$scope.energyPercentToYear_Week = ($scope.statisticsDataCurrentWeek_sum * 100) / $scope.energyContractKWH_Week;
		$scope.energyPercentToYear_Day = ($scope.statisticsDataCurrentDay_sum * 100) / $scope.energyContractKWH_Day;
	}

	function calcGasPercentToYearValues(){
		$scope.gasPercentToYear_Year = ($scope.statisticsDataGasCurrentYear_sum * 100) / $scope.gasContractKWH_Year
		$scope.gasPercentToYear_Month = ($scope.statisticsDataGasCurrentMonth_sum * 100) / $scope.gasContractKWH_Month;
		$scope.gasPercentToYear_Week = ($scope.statisticsDataGasCurrentWeek_sum * 100) / $scope.gasContractKWH_Week;
		$scope.gasPercentToYear_Day = ($scope.statisticsDataGasCurrentDay_sum * 100) / $scope.gasContractKWH_Day;
	}

	/*Map the recived data to a new json object.*/
	function statisticMapFunction(d, i){
		/*Convert timeformat from  yyyy-mm-dd hh:mm:ss to yyyy/mm/dd hh:mm:ss*/
		return {x: new Date(d.TIMESTAMP.replace(new RegExp("-","g"), "/")).getTime(), y: mapper(d.VALUE)};
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

	function statisticSortFunction(field, reverse, primer){

	   var key = primer ? 
	       function(x) {return primer(x[field])} : 
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     } 
	}

	/*Set the XAxis Format for the current type*/
	function getXAxisFormat() {
		/*Check if the timespan bigger then 1 day*/
		//var d_start = new Date($scope.startTime.substring(6, 10),$scope.startTime.substring(3, 5),$scope.startTime.substring(0, 2));
		//var d_end= new Date($scope.endTime.substring(6, 10),$scope.endTime.substring(3, 5),$scope.endTime.substring(0, 2));
		
		/*
		if (d_end-d_start > 0)
			formatXAxis = '%d.%m %H:%M';
		else
			formatXAxis = '%H:%M';
		*/
		if(chartTypeID == 'week')
			return formatXAxis = '%A';
		if(chartTypeID == 'month')
			return formatXAxis = '%d %b';
		else if(chartTypeID == 'year')
			return formatXAxis = '%B';

		return formatXAxis = '%d %b';
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

	/*Return possible colors for the chart*/
	function colorFunction() {
		var colorArray = ['#1ab394', '#f8ac59'];

		return function(d, i) {
	    	return colorArray[i];
	    };
	}	

	/*Load the statistics options.*/
	function loadStatisticsOptions(){
		
		$scope.statisticsOptionsDaySum = {
			"chart": {
		    	"type": $scope.chartType ? $scope.chartType : "multiBarChart",
			    "height": $scope.chartHeight ? $scope.chartHeight : 450,
			    "margin": {
			      	"top": 20,
			      	"right": 20,
			      	"bottom": 60,
			      	"left": 40
			    },	           	      
			    "color": colorFunction(),
				"interpolate": $scope.chartInterpolateType ? $scope.chartInterpolateType : "monotone",
			    "useVoronoi": false,
			    "clipEdge": true,
			    "transitionDuration": 500,
			    "useInteractiveGuideline": true,
				"showLegend": true,
		    	"showValues": $scope.chartShowValues === 'true' ? true : false,
			    valueFormat: function (d){
					            if($scope.chartYAxisIsDatetime === 'true'){
						           	return d3.time.format('%H:%M')(new Date(d*1000))	              
						        }else{
						        	return d;
						        }
	            },
	            "tooltip": {
		    		valueFormatter: function(d){
                        return d3.format(',.2f')(d) + ' kWh';
                    }
  					//contentGenerator: function(d) { return JSON.stringify(d); }
				},	

		    	"xAxis": {
		        "showMaxMin": false,
		    	"rotateLabels": 0,

		    	tickFormat: function(d) {
					        	return d3.time.format(getXAxisFormat())(new Date(d))
					            /*return d3.time.format('%b %d - %H:%M')(new Date(d))*/
					        }
		    	},
			    "showYAxis": $scope.chartShowYaxis === 'false' ? false : true,	    	
			    "yAxis": {	 
			    	"axisLabelDistance": -20,
			    	"axisLabel": $scope.charttextYaxis + ' kWh', 		    	
			    	tickFormat: function(d) {
						        	return d;
						       	}	    	
			    }
			}
		};	

		$scope.statisticsOptionsDay = {
			"chart": {
				"type": "lineChart",
			    "height": $scope.chartHeight ? $scope.chartHeight : 450,
			    "margin": {
			    	"top": 20,
			      	"right": 20,
			      	"bottom": 60,
			      	"left": 40
			    },	           	      
		    	"color": colorFunction(),
				"interpolate": $scope.chartInterpolateType ? $scope.chartInterpolateType : "monotone",
			    "useVoronoi": false,
			    "clipEdge": true,
			    "transitionDuration": 500,
			    "useInteractiveGuideline": true,
			    "xDomain": [moment().startOf('day').valueOf(), moment().endOf('day').valueOf()],
			    "xScale": d3.time.scale(),
			    "xAxis": {
		       		"showMaxMin": false,
		      		"rotateLabels": 0,
		      		tickFormat: function(d) {
			      					//return d3.time.format('%H:%M')(new Date(d*1000));
			      					return d ? d3.time.format('%H:%M')(new Date(d)) : '';
			                	    //return d3.time.format('%H:%M')(new Date(d));
			                	    /*return d3.time.format('%b %d - %H:%M')(new Date(d))*/
		        				}
		    	},
		    	"showYAxis": $scope.chartShowYaxis === 'false' ? false : true,	    	
		    	"yAxis": {	 
		    		"axisLabelDistance": -20,
		    		"axisLabel": $scope.charttextYaxis + ' Watt', 		    	
		    		tickFormat: function(d) {
		                			return d;
		       					}	    	
		    	}
		  	}
		};	
	}

	/* Build and set result list for the day sum values.
	*  One list for: lastYear, currentYear, 
	*				 lastMonth, currentMonth,
	*				 lastWeek, currentWeek
	*/
	function buildAndSetResultListsPower(value){	
		var currentYear = moment().year();
		//var lastYear = moment().subtract(1, 'years').year();	

		var currentMonth = moment().month();
		var currentMonthYear = moment().year();
		var currentMonthDays = moment().daysInMonth();
		//var lastMonth = moment().subtract(1, 'month').month();
		//var lastMonthYear = moment().subtract(1, 'month').year();	

		var currentWeek = moment().isoWeek();
		var currentWeekYear = moment().isoWeekYear();
		//var lastWeek = moment().subtract(1, 'week').isoWeek();
		//var lastWeekYear = moment().subtract(1, 'week').isoWeekYear(); 

		var statisticsDataCurrentYear_sum = 0;
		var statisticsDataCurrentYear_values = new Array();
		var statisticsDataCurrentYearPerMonth_rawValues = new Array(12).fill(0);
		var statisticsDataCurrentYearPerMonth_values = new Array();
		//var statisticsDataLastYear_sum = 0;
		//var statisticsDataLastYear_values = new Array();
		//var statisticsDataLastYearPerMonth_rawValues = new Array(12).fill(0);
		//var statisticsDataLastYearPerMonth_values = new Array();

		var statisticsDataCurrentMonth_sum = 0;
		var statisticsDataCurrentMonth_values = new Array();
		var statisticsDataCurrentMonthPerDay_rawValues = new Array(currentMonthDays).fill(0);
		var statisticsDataCurrentMonthPerDay_values = new Array();
		//var statisticsDataCurrentMonthPerWeek_rawValues = new Array(53).fill(0);
		//var statisticsDataCurrentMonthPerWeek_values = new Array();
		//var statisticsDataLastMonth_sum = 0;
		//var statisticsDataLastMonth_values = new Array();
		//var statisticsDataLastMonthPerWeek_rawValues = new Array(53).fill(0);
		//var statisticsDataLastMonthPerWeek_values = new Array();

		var statisticsDataCurrentWeek_sum = 0;
		var statisticsDataCurrentWeek_values = new Array();
		var statisticsDataCurrentWeekPerDay_rawValues = new Array(7).fill(0);
		var statisticsDataCurrentweekPerDay_values = new Array();
		//var statisticsDataLastWeek_sum = 0;
		//var statisticsDataLastWeek_values = new Array();

		for(var item in value) {
			var year = moment(value[item].x).year();
			var month = moment(value[item].x).month();

			var week = moment(value[item].x).isoWeek();
			var weekYear = moment(value[item].x).isoWeekYear();

			var dayOnWeek =  moment(value[item].x).isoWeekday();
			var dayOnMonth = moment(value[item].x).date();

			//year
			if(year == currentYear) {
				statisticsDataCurrentYear_sum += value[item].y;
				statisticsDataCurrentYear_values.push(value[item]);
				statisticsDataCurrentYearPerMonth_rawValues[month]+=value[item].y;
			} 
			/*else if(year == lastYear) {
				statisticsDataLastYear_sum += value[item].y;
				statisticsDataLastYear_values.push(value[item]);
				statisticsDataLastYearPerMonth_rawValues[month]+=value[item].y;
			}*/

			//month
			if(year == currentMonthYear && month == currentMonth) {
				statisticsDataCurrentMonth_sum += value[item].y;
				statisticsDataCurrentMonth_values.push(value[item]);
				statisticsDataCurrentMonthPerDay_rawValues[dayOnMonth-1]+=value[item].y;

				//statisticsDataCurrentMonthPerWeek_rawValues[week]+=value[item].y;
			}
			/*else if(year == lastMonthYear && month == lastMonth) {
				statisticsDataLastMonth_sum += value[item].y;
				statisticsDataLastMonth_values.push(value[item]);
				//statisticsDataLastMonthPerWeek_rawValues[week]+=value[item].y;
			}*/

			//week
			if(weekYear == currentWeekYear && week == currentWeek) {
				statisticsDataCurrentWeek_sum += value[item].y;
				statisticsDataCurrentWeek_values.push(value[item]);
				statisticsDataCurrentWeekPerDay_rawValues[dayOnWeek-1]+=value[item].y;
			}
			/*else if(weekYear == lastWeekYear && week == lastWeek) {
				statisticsDataLastWeek_sum += value[item].y;
				statisticsDataLastWeek_values.push(value[item]);
			}*/
			
		}

		/*
		Build year per month array (current/last) 
		*/
		for (var i in statisticsDataCurrentYearPerMonth_rawValues) {
			statisticsDataCurrentYearPerMonth_values.push({
        		x: moment().months(parseInt(i)).startOf('month').valueOf(),
        		y: statisticsDataCurrentYearPerMonth_rawValues[i]
    		});
		};

		for (var i in statisticsDataCurrentMonthPerDay_rawValues) {
			statisticsDataCurrentMonthPerDay_values.push({
        		x: moment().date(parseInt(i)+1).startOf('day').valueOf(),
        		y: statisticsDataCurrentMonthPerDay_rawValues[i]
    		});
		};

		for (var i in statisticsDataCurrentWeekPerDay_rawValues) {
			statisticsDataCurrentweekPerDay_values.push({
        		x: moment().isoWeekday(parseInt(i)+1).startOf('day').valueOf(),
        		y: statisticsDataCurrentWeekPerDay_rawValues[i]
    		});
		};

		/*for (var i in statisticsDataLastYearPerMonth_rawValues) {
			statisticsDataLastYearPerMonth_values.push({
        		x: moment().months(parseInt(i)).startOf('month').valueOf(),
        		y: statisticsDataLastYearPerMonth_rawValues[i]
    		});

		};*/

		/*
		Build month per week array (current/last) 
		*/
		/*for (var i in statisticsDataCurrentMonthPerWeek_rawValues) {
			statisticsDataCurrentMonthPerWeek_values.push({
        		x: i,
        		y: statisticsDataCurrentMonthPerWeek_rawValues[i]
    		});
		};

		for (var i in statisticsDataLastMonthPerWeek_rawValues) {
			statisticsDataLastMonthPerWeek_values.push({
        		x: i,
        		y: statisticsDataLastMonthPerWeek_rawValues[i]
    		});
		};*/

		$scope.statisticsDataCurrentYear = {				
			key: $scope.fhemDevicePowerDaySumReadingText,						
			values: statisticsDataCurrentYearPerMonth_values//statisticsDataCurrentYear_values
		};

		/*$scope.statisticsDataLastYear = {				
			key: $scope.fhemDevicePowerDaySumReadingText,						
			values: statisticsDataLastYearPerMonth_values
		};*/

		$scope.statisticsDataCurrentMonth = {				
			key: $scope.fhemDevicePowerDaySumReadingText,						
			values: statisticsDataCurrentMonthPerDay_values//statisticsDataCurrentMonth_values
		};

		/*$scope.statisticsDataLastMonth = {				
			key: $scope.fhemDevicePowerDaySumReadingText,						
			values: statisticsDataLastMonth_values
		};*/

		$scope.statisticsDataCurrentWeek = {				
			key: $scope.fhemDevicePowerDaySumReadingText,						
			values: statisticsDataCurrentweekPerDay_values//statisticsDataCurrentWeek_values
		};

		/*$scope.statisticsDataLastWeek = {				
			key: $scope.fhemDevicePowerDaySumReadingText,					
			values: statisticsDataLastWeek_values
		};*/


		$scope.statisticsDataCurrentYear_sum = statisticsDataCurrentYear_sum;
		//$scope.statisticsDataLastYear_sum = statisticsDataLastYear_sum;

		$scope.statisticsDataCurrentMonth_sum = statisticsDataCurrentMonth_sum;
		//$scope.statisticsDataLastMonth_sum = statisticsDataLastMonth_sum;
		
		$scope.statisticsDataCurrentWeek_sum = statisticsDataCurrentWeek_sum;
		//$scope.statisticsDataLastWeek_sum = statisticsDataLastWeek_sum;
				
	}

	/* Build and set result list for the day sum values.
	*  One list for: lastYear, currentYear, 
	*				 lastMonth, currentMonth,
	*				 lastWeek, currentWeek
	*/
	function buildAndSetResultListsGas(value){	
		var currentYear = moment().year();

		var currentMonth = moment().month();
		var currentMonthYear = moment().year();
		var currentMonthDays = moment().daysInMonth();

		var currentWeek = moment().isoWeek();
		var currentWeekYear = moment().isoWeekYear();

		var statisticsDataGasCurrentYear_sum = 0;
		var statisticsDataGasCurrentYear_values = new Array();
		var statisticsDataGasCurrentYearPerMonth_rawValues = new Array(12).fill(0);
		var statisticsDataGasCurrentYearPerMonth_values = new Array();

		var statisticsDataGasCurrentMonth_sum = 0;
		var statisticsDataGasCurrentMonth_values = new Array();
		var statisticsDataGasCurrentMonthPerDay_rawValues = new Array(currentMonthDays).fill(0);
		var statisticsDataGasCurrentMonthPerDay_values = new Array();

		var statisticsDataGasCurrentWeek_sum = 0;
		var statisticsDataGasCurrentWeek_values = new Array();
		var statisticsDataGasCurrentWeekPerDay_rawValues = new Array(7).fill(0);
		var statisticsDataGasCurrentWeekPerDay_values = new Array();

		for(var item in value) {
			var year = moment(value[item].x).year();
			var month = moment(value[item].x).month();

			var week = moment(value[item].x).isoWeek();
			var weekYear = moment(value[item].x).isoWeekYear();

			var dayOnWeek =  moment(value[item].x).isoWeekday();
			var dayOnMonth = moment(value[item].x).date();

			//year
			if(year == currentYear) {
				statisticsDataGasCurrentYear_sum += value[item].y;
				statisticsDataGasCurrentYear_values.push(value[item]);
				statisticsDataGasCurrentYearPerMonth_rawValues[month]+=value[item].y;
			} 

			//month
			if(year == currentMonthYear && month == currentMonth) {
				statisticsDataGasCurrentMonth_sum += value[item].y;
				statisticsDataGasCurrentMonth_values.push(value[item]);
				statisticsDataGasCurrentMonthPerDay_rawValues[dayOnMonth-1]+=value[item].y;
			}

			//week
			if(weekYear == currentWeekYear && week == currentWeek) {
				statisticsDataGasCurrentWeek_sum += value[item].y;
				statisticsDataGasCurrentWeek_values.push(value[item]);
				statisticsDataGasCurrentWeekPerDay_rawValues[dayOnWeek-1]+=value[item].y;
			}
		}

		/*
		Build year per month array (current/last) 
		*/
		for (var i in statisticsDataGasCurrentYearPerMonth_rawValues) {
			statisticsDataGasCurrentYearPerMonth_values.push({
        		x: moment().months(parseInt(i)).startOf('month').valueOf(),
        		y: statisticsDataGasCurrentYearPerMonth_rawValues[i]
    		});
		};

		for (var i in statisticsDataGasCurrentMonthPerDay_rawValues) {
			statisticsDataGasCurrentMonthPerDay_values.push({
        		x: moment().date(parseInt(i)+1).startOf('day').valueOf(),
        		y: statisticsDataGasCurrentMonthPerDay_rawValues[i]
    		});
		};

		for (var i in statisticsDataGasCurrentWeekPerDay_rawValues) {
			statisticsDataGasCurrentWeekPerDay_values.push({
        		x: moment().isoWeekday(parseInt(i)+1).startOf('day').valueOf(),
        		y: statisticsDataGasCurrentWeekPerDay_rawValues[i]
    		});
		};

		

		$scope.statisticsDataGasCurrentYear = {				
			key: $scope.fhemDeviceGasDaySumReadingText,						
			values: statisticsDataGasCurrentYearPerMonth_values//statisticsDataCurrentYear_values
		};


		$scope.statisticsDataGasCurrentMonth = {				
			key: $scope.fhemDeviceGasDaySumReadingText,						
			values: statisticsDataGasCurrentMonthPerDay_values//statisticsDataGasCurrentMonth_values
		};


		$scope.statisticsDataGasCurrentWeek = {				
			key: $scope.fhemDeviceGasDaySumReadingText,						
			values: statisticsDataGasCurrentWeekPerDay_values//statisticsDataGasCurrentWeek_values
		};


		$scope.statisticsDataGasCurrentYear_sum = statisticsDataGasCurrentYear_sum;

		$scope.statisticsDataGasCurrentMonth_sum = statisticsDataGasCurrentMonth_sum;

		$scope.statisticsDataGasCurrentWeek_sum = statisticsDataGasCurrentWeek_sum;	
	}

	/*Callback of the logdb call (fhem command) power day sum*/
	function callbackPowerDaySum(id, data) {
		var dataResult = null;
		
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
		
		$scope.$apply(function () {
		
			dataResult = JSON.parse(data.reply).data.filter(statisticFilterFunction).map(statisticMapFunction);	

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("FHEM :"+ JSON.stringify(dataResult));
 
 			buildAndSetResultListsPower(dataResult);
 			calcPowerPercentToYearValues();

 			//$scope.statisticsData = $scope.statisticsDataLastYear;

			//loadStatisticsOptions();
		});				
	}

	/*Callback of the logdb call (fhem command) power day*/
	function callbackPowerDay(id, data) {
		var dataResult = null;
		
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
		
		$scope.$apply(function () {
			
			
			dataResult = JSON.parse(data.reply).data.filter(statisticFilterFunction).map(statisticMapFunction);	

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("FHEM :"+ JSON.stringify(dataResult));
 				
			$scope.statisticsPowerDataDay = {	key: $scope.fhemDevicePowerDayReadingText,						
											values: dataResult,
											area: true
										}; 
			//Show the chart as default when loaded.
			loadChartData();
		});				
	}

	/*Callback of the logdb call (fhem command) gas day sum*/
	function callbackGasDaySum(id, data) {
		var dataResult = null;
		
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
		
		$scope.$apply(function () {
		
			dataResult = JSON.parse(data.reply).data.filter(statisticFilterFunction).map(statisticMapFunction);	
			
			// Sort by x low to high
			//dataResult.sort(statisticSortFunction('x', false, parseInt));


			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("FHEM :"+ JSON.stringify(dataResult));
 
 			buildAndSetResultListsGas(dataResult);
 			calcGasPercentToYearValues();

 			//$scope.statisticsData = $scope.statisticsDataLastYear;

			//loadStatisticsOptions();
		});				
	}

	/*Callback of the logdb call (fhem command) gas day*/
	function callbackGasDay(id, data) {
		var dataResult = null;
		
		if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
			console.log("Fire from command: "+ data.command +":" + JSON.stringify(data));
		
		$scope.$apply(function () {
			
			
			dataResult = JSON.parse(data.reply).data.filter(statisticFilterFunction).map(statisticMapFunction);	

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("FHEM :"+ JSON.stringify(dataResult));
 				
			$scope.statisticsGasDataDay = {	key: $scope.fhemDeviceGasDayReadingText,						
											values: dataResult,
											area: true
										}; 
			//Show the chart as default when loaded.
			loadChartData();
		});				
	}

	/*
	* Public Methods
	*/

	$scope.isChart = function(chart) {
    	if($scope.dataChart == chart)
        	return true;
        else
         	return false;  
    };

    $scope.setChart = function(chart) {
    	$scope.dataChart = chart
    };

    function loadChartData(){
    	if(chartTypeID == 'day'){
    		$scope.loadChartDataDay();
    	}else if(chartTypeID == 'week'){
    		$scope.loadChartDataDaySumWeek();
    	}else if(chartTypeID == 'month'){
    		$scope.loadChartDataDaySumMonth();
    	}else if(chartTypeID == 'year'){
    		$scope.loadChartDataDaySumYear();
    	}
    }

	/*Load the power chart - day */
	$scope.loadChartDataDay = function () {
		chartTypeID = 'day';
		//$scope.statisticsData = $scope.statisticsDataDay;
		$scope.statisticsData = [$scope.statisticsPowerDataDay, $scope.statisticsGasDataDay]
		loadStatisticsOptions();
		$scope.statisticsOptions = $scope.statisticsOptionsDay;
		$scope.api.updateWithData($scope.statisticsData);
	};

	/*Load the power chart - week */
	$scope.loadChartDataDaySumWeek = function () {	
		chartTypeID = 'week';
		$scope.statisticsData = [$scope.statisticsDataCurrentWeek,$scope.statisticsDataGasCurrentWeek];
		loadStatisticsOptions();
		$scope.statisticsOptions = $scope.statisticsOptionsDaySum;
		$scope.api.updateWithData($scope.statisticsData);
	};

	/*Load the power chart - month */
	$scope.loadChartDataDaySumMonth = function () {
		chartTypeID = 'month';	
		$scope.statisticsData = [$scope.statisticsDataCurrentMonth,$scope.statisticsDataGasCurrentMonth];
		loadStatisticsOptions();
		$scope.statisticsOptions = $scope.statisticsOptionsDaySum;
 		$scope.api.updateWithData($scope.statisticsData);
	};
	
	/*Load the power chart - year */	
	$scope.loadChartDataDaySumYear = function () {	
		chartTypeID = 'year';
		$scope.statisticsData = [$scope.statisticsDataCurrentYear,$scope.statisticsDataGasCurrentYear];
		loadStatisticsOptions();
		$scope.statisticsOptions = $scope.statisticsOptionsDaySum;
		$scope.api.updateWithData($scope.statisticsData);
	};

	/**/
	$scope.getControlDataPowerDaySum = function () {	
		//set the beginning and end times
		//Load all data from last year to this year (today). 
		//For the power day values only load the current values 
		/*$scope.startTimeDaySum = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD_HH:mm:ss');
		$scope.startTimeDay   = moment().startOf('day').format('YYYY-MM-DD_HH:mm:ss');	
		$scope.endTime   = moment().endOf('day').format('YYYY-MM-DD_HH:mm:ss');			*/

		


		//for (i = 0; i < fhemDeviceArray.length; i++) { 
			//'get logdb - webchart 2015-05-08_00:00:00 2015-05-08_22:00:00 GA.Rasenmaeher_Pwr timerange TIMESTAMP power'
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ $scope.fhemDevices +' timerange TIMESTAMP ' + $scope.fhemDeviceReadings;		
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ fhemDeviceArray[i] +' timerange TIMESTAMP ' + fhemDeviceReadingsArray[i];		
			var commandPowerDaySum = 'webchart '+$scope.startTimeDaySum+' '+$scope.endTime+' '+ $scope.fhemDevicePowerDaySum +' timerange TIMESTAMP ' + $scope.fhemDevicePowerDaySumReading;		
			

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + commandPowerDaySum);
		
			FhemWebSocketFactory.sendFhemDBCommand(commandPowerDaySum, 'sumPowerDay', callbackPowerDaySum);	


			
	}	

	/**/
	$scope.getControlDataPowerDay = function () {	
		//set the beginning and end times
		//Load all data from last year to this year (today). 
		//For the power day values only load the current values 
		/*$scope.startTimeDaySum = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD_HH:mm:ss');
		$scope.startTimeDay   = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD_HH:mm:ss');	
		$scope.endTime   = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD_HH:mm:ss');	*/		

		
			var commandPowerDay = 'webchart '+$scope.startTimeDay+' '+$scope.endTime+' '+ $scope.fhemDevicePowerDay +' timerange TIMESTAMP ' + $scope.fhemDevicePowerDayReading;		
			

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + commandPowerDay);
		
			FhemWebSocketFactory.sendFhemDBCommand(commandPowerDay, 'powerDay' ,callbackPowerDay);						    			
		//}		
	}	

	/**/
	$scope.getControlDataGasDaySum = function () {	
		//set the beginning and end times
		//Load all data from last year to this year (today). 
		//For the power day values only load the current values 
		/*$scope.startTimeDaySum = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD_HH:mm:ss');
		$scope.startTimeDay   = moment().startOf('day').format('YYYY-MM-DD_HH:mm:ss');	
		$scope.endTime   = moment().endOf('day').format('YYYY-MM-DD_HH:mm:ss');			*/

		


		//for (i = 0; i < fhemDeviceArray.length; i++) { 
			//'get logdb - webchart 2015-05-08_00:00:00 2015-05-08_22:00:00 GA.Rasenmaeher_Pwr timerange TIMESTAMP power'
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ $scope.fhemDevices +' timerange TIMESTAMP ' + $scope.fhemDeviceReadings;		
			//var command = 'get logdb - webchart '+startDateString[2]+'-'+startDateString[1]+'-'+startDateString[0]+'_'+startDateString[3]+'-'+startDateString[4]+'-'+'00'+' '+endDateString[2]+'-'+endDateString[1]+'-'+endDateString[0]+'_'+endDateString[3]+'-'+endDateString[4]+'-'+'00'+' '+ fhemDeviceArray[i] +' timerange TIMESTAMP ' + fhemDeviceReadingsArray[i];		
			var commandGasDaySum = 'webchart '+$scope.startTimeDaySum+' '+$scope.endTime+' '+ $scope.fhemDeviceGasDaySum +' timerange TIMESTAMP ' + $scope.fhemDeviceGasDaySumReading;		
			

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + commandGasDaySum);
		
			FhemWebSocketFactory.sendFhemDBCommand(commandGasDaySum, 'sumGasDay', callbackGasDaySum);	


			
	}

	$scope.getControlDataGasDay = function () {	
		//set the beginning and end times
		//Load all data from last year to this year (today). 
		//For the power day values only load the current values 
		/*$scope.startTimeDaySum = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD_HH:mm:ss');
		$scope.startTimeDay   = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD_HH:mm:ss');	
		$scope.endTime   = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD_HH:mm:ss');	*/		

		
			var commandGasDay = 'webchart '+$scope.startTimeDay+' '+$scope.endTime+' '+ $scope.fhemDeviceGasDay +' timerange TIMESTAMP ' + $scope.fhemDeviceGasDayReading;		
			

			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Send Command:" + commandGasDay);
		
			FhemWebSocketFactory.sendFhemDBCommand(commandGasDay, 'gasDay' ,callbackGasDay);						    			
		//}		
	}	


	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerNames = function (powerName, gasName) {	
		devicePower = powerName;
		deviceGas= gasName;

		if(devicePower != undefined){
			$scope.$watch(
                "$root.devicelist['"+devicePower+"']",
				watchListenerPowerCallback,true
            );
        }

        if(deviceGas != undefined){
            $scope.$watch(
                "$root.devicelist['"+deviceGas+"']",
				watchListenerGasCallback,true
            );
		}
	}

	/**
	*	Listener callback for the scope watch.newValue power device
	*/
	var watchListenerPowerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));
					
			$scope.fhemPower = newValue;	
			if (typeof $scope.fhemPower.Readings.energy_kWh_Day != 'undefined'){
				$scope.statisticsDataCurrentDay_sum = $scope.fhemPower.Readings.energy_kWh_Day.Value
				
				if($scope.fhemPower.Readings.energy_contract_kWh_Year.Value != $scope.energyContractKWH_Year){
					calcPowerContractValues();
					
				}
				$scope.getControlDataPowerDay();
			}
		}
	}

	/**
	*	Listener callback for the scope watch.newValue gas device
	*/
	var watchListenerGasCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));
					
			$scope.fhemGas = newValue;	
			if (typeof $scope.fhemGas.Readings.gas_kWh_Day != 'undefined'){
				

					$scope.statisticsDataGasCurrentDay_sum = $scope.fhemGas.Readings.gas_kWh_Day.Value
					
					if($scope.fhemGas.Readings.gas_contract_kWh_Year.Value != $scope.gasContractKWH_Year){
						calcGasContractValues();
						
					}
					
					$scope.getControlDataGasDay();
				
			}
		}
	}


	//$scope.startTimeDaySum = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD_HH:mm:ss');
	$scope.startTimeDaySum = moment().startOf('year').format('YYYY-MM-DD_HH:mm:ss');
	$scope.startTimeDay   = moment().startOf('day').format('YYYY-MM-DD_HH:mm:ss');	
	$scope.endTime   = moment().endOf('day').format('YYYY-MM-DD_HH:mm:ss');	

	$scope.getControlDataPowerDay();
	$scope.getControlDataPowerDaySum();
	$scope.getControlDataGasDay();
	$scope.getControlDataGasDaySum();
	
}]);