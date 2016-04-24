
/**
*	Forcast (daily) weather controller.
*/		
angular.module('weather').controller('WeatherForecastToggle', function($scope){		
	//$scope.showData = true;			
	$scope.dataTab = 0;			

	$scope.setTab = function(tab) {
         $scope.dataTab = tab;  
    };

    $scope.isTab = function(tab) {
    	if($scope.dataTab == tab)
        	return true;
        else
         	return false;  
    };
});

/**
*	Forcast (daily) weather controller.
*/		
angular.module('weather').controller('WeatherCtrl',['$scope','$interval','WeatherFactory','WEATHER_CONFIG', function($scope, $interval, WeatherFactory, WEATHER_CONFIG){				
	
	/*Return time dependent weather class.
	If date1 is in between date2 and date3 */
	$scope.getWeatherClass = function(date1, date2, date3){
		var time1 = new Date(date1*1000).toLocaleTimeString();
		var time2 = new Date(date2*1000).toLocaleTimeString();
		var time3 = new Date(date3*1000).toLocaleTimeString();

		var t1 = new Date();
  		var parts = time1.split(":");
  		t1.setHours(parts[0],parts[1],parts[2],0);
  		var t2 = new Date();
  		parts = time2.split(":");
  		t2.setHours(parts[0],parts[1],parts[2],0);
  		var t3 = new Date();
  		parts = time3.split(":");
  		t3.setHours(parts[0],parts[1],parts[2],0);


		if(date1 == "" || date2 == "" || date3 == "")
			return "";

		if(t2.getTime() < t1.getTime() && t1.getTime() < t3.getTime())
			return "wi-owm-day-"+$scope.fhem.weather.id;
		else
			return "wi-owm-night-"+$scope.fhem.weather.id;

		
	}
			
	/*Init the x-Axis format.*/
	var formatXAxis = '%H:%M';

	$scope.fhem = {};	
	$scope.fhem.weather = {
	        			date: '', 
	        			location: '',
	        			id: '',
						temperature:  '', 
						temperatur_max:   '', 
						temperatur_min: '', 
						date_temperatur_max:   '', 
						date_temperatur_min: '', 
						temperatur_trend: '',
						description: '', 
						temperature_feelslike: '', 
						uv_index:       '', 
						precipitation:   '', 
						rain: '', 
						rain_1h: '', 
						rain_24h: '', 

						pressure:   '', 
						pressure_trend: '',
						humidity:   '', 
						wind_angle:   '', 
						wind_strength:   '', 
						gust_angle:   '', 
						gust_strength:   '', 
						windchill:  '', 
						dewpoint:   '', 
						clouds:   '', 
						sunrise:  '', 
						sunset:   '',
						forecast: {
								daily: [],
								hourly: []
						} 
					};	

	var weatherForecastDaily = this;
	weatherForecastDaily.result = null;	


    
	/*NETATMO*/
	/*Current*/
	function getWeatherCurrentNetatmo() {
		WeatherFactory.netatmoChainGetStationData().then(function (data) {
			var netatmoResult  = data.data.body.devices[0];
			var netatmoBase = netatmoResult;
			var netatmoOutside = netatmoResult.modules[0];
			var netatmoRain = netatmoResult.modules[1];
			var netatmoWind = netatmoResult.modules[2];

			$scope.fhem.weather.date = data.data.time_server;
			/*Outside*/
			$scope.fhem.weather.temperature =  netatmoOutside.dashboard_data.Temperature;
			$scope.fhem.weather.temperatur_max = netatmoOutside.dashboard_data.max_temp;
			$scope.fhem.weather.temperatur_min = netatmoOutside.dashboard_data.min_temp;
			$scope.fhem.weather.date_temperatur_max = netatmoOutside.dashboard_data.date_max_temp;
			$scope.fhem.weather.date_temperatur_min = netatmoOutside.dashboard_data.date_min_temp;
			$scope.fhem.weather.temperatur_trend = netatmoOutside.dashboard_data.temp_trend;
			$scope.fhem.weather.humidity = netatmoOutside.dashboard_data.Humidity;		
			$scope.fhem.weather.pressure = netatmoBase.dashboard_data.Pressure;		
			$scope.fhem.weather.pressure_trend = netatmoBase.dashboard_data.pressure_trend;		
			/*Rain*/
			$scope.fhem.weather.rain = netatmoRain.dashboard_data.Rain;
			$scope.fhem.weather.rain_1h = netatmoRain.dashboard_data.sum_rain_1;
			$scope.fhem.weather.rain_24h = netatmoRain.dashboard_data.sum_rain_24;
			/*Wind*/    		       		
			$scope.fhem.weather.gust_angle = netatmoWind.dashboard_data.GustAngle;
			$scope.fhem.weather.gust_strength = netatmoWind.dashboard_data.GustStrength;
			$scope.fhem.weather.wind_angle = netatmoWind.dashboard_data.WindAngle;
			$scope.fhem.weather.wind_strength = netatmoWind.dashboard_data.WindStrength;

		});
	}                		
	
	/*OPENWEATHERMAP*/
	/*Current*/
	function getWeatherCurrentOpenweathermap() {
        WeatherFactory.getWeatherCurrent('OPENWEATHERMAP')
            .success(function (data) {
                
/*NETATMO*/        	//$scope.fhem.weather.date = data.dt
                	$scope.fhem.weather.location = data.name
                	$scope.fhem.weather.id =  data.weather[0].id
/*NETATMO*/			//$scope.fhem.weather.temperature =  data.main.temp
/*NETATMO*/			//$scope.fhem.weather.temperatur_max =   data.main.temp_max
/*NETATMO*/			//$scope.fhem.weather.temperatur_min = data.main.temp_min
					$scope.fhem.weather.description =  data.weather[0].description
					//$scope.fhem.weather.temperature_feelslike = ''
					//$scope.fhem.weather.uv_index = ''
					if(data.hasOwnProperty('rain') && data.rain.hasOwnProperty('1h'))
						$scope.fhem.weather.precipitation = data.rain["1h"]
					else
						$scope.fhem.weather.precipitation = 0

/*NETATMO*/			//$scope.fhem.weather.pressure = data.main.pressure
/*NETATMO*/			//$scope.fhem.weather.humidity = data.main.humidity
/*NETATMO*/			//$scope.fhem.weather.wind_strength = data.wind.speed
					//$scope.fhem.weather.windchill = ''
					//$scope.fhem.weather.dewpoint = ''
					$scope.fhem.weather.clouds = data.clouds.all
					$scope.fhem.weather.sunrise = data.sys.sunrise
					$scope.fhem.weather.sunset =  data.sys.sunset
            })
            .error(function (error) {
                $scope.status = 'Unable to load current weather data: ' + error.message;
            });
    }

	/*Forecast Daily*/
    function getWeatherForecastDailyOpenweathermap() {
        WeatherFactory.getWeatherForecastDaily('OPENWEATHERMAP')
            .success(function (data) {
            	$scope.fhem.weather.forecast.daily = [];
                for (var id = 0; id < 7; id++) { 
                	$scope.fhem.weather.forecast.daily.push({
                		date: data.list[id].dt,
	    				id: data.list[id].weather[0].id,
						temperatur_max:data.list[id].temp.max,
						temperatur_min:data.list[id].temp.min,
						description:data.list[id].weather[0].description,
						precipitation:data.list[id].hasOwnProperty('rain') ? data.list[id].rain : '0',
						pressure:data.list[id].pressure,
						humidity:data.list[id].humidity,
						wind_strength:data.list[id].speed,
						clouds:data.list[id].clouds,
						sunrise:'',
						sunset:''

                	});                	
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (daily) weather data: ' + error.message;
            });
    }

    /*Forecast Hourly*/
    function getWeatherForecastHourlyOpenweathermap() {
        WeatherFactory.getWeatherForecastHourly('OPENWEATHERMAP')
            .success(function (data) {
            	$scope.fhem.weather.forecast.hourly = [];
                for (var id = 0; id < 31; id++) {  
                	$scope.fhem.weather.forecast.hourly.push({
                		date: data.list[id].dt,
	    				id: data.list[id].weather[0].id,
						temperatur_max:data.list[id].main.temp_max,
						temperatur_min:data.list[id].main.temp_min,
						description:data.list[id].weather[0].description,
						precipitation:((data.list[id].hasOwnProperty('rain') && data.list[id].rain.hasOwnProperty('3h')) ? data.list[id].rain["3h"] : 0.0),
						pressure:data.list[id].main.pressure,
						humidity:data.list[id].main.humidity,
						wind_strength:data.list[id].wind.speed,
						clouds:data.list[id].clouds.all,
						sunrise:'',
						sunset:''

                	});                               						
                }              
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (hourly) weather data: ' + error.message;
            });
    }

    /*WUNDERGROUND*/
    /*Current*/
	function getWeatherCurrentWunderground() {
        WeatherFactory.getWeatherCurrent('WUNDERGROUND')
            .success(function (data) {
                
                $scope.fhem.weather.date = data.current_observation.local_epoch
                $scope.fhem.weather.location = data.current_observation.display_location.city
                //$scope.fhem.weather.id =  data.weather[0].id
				$scope.fhem.weather.temperature =  data.current_observation.temp_c
				$scope.fhem.weather.temperatur_max =   data.current_observation.temp_c
				$scope.fhem.weather.temperatur_min = data.current_observation.temp_c
				$scope.fhem.weather.description =  data.current_observation.weather
				$scope.fhem.weather.temperature_feelslike = data.current_observation.feelslike_c
				$scope.fhem.weather.uv_index = data.current_observation.UV
				$scope.fhem.weather.precipitation = data.current_observation.precip_today_metric
				$scope.fhem.weather.pressure = data.current_observation.pressure_mb
				$scope.fhem.weather.humidity = data.current_observation.relative_humidity
				$scope.fhem.weather.wind_strength = data.current_observation.wind_gust_kph
				$scope.fhem.weather.windchill = data.current_observation.windchill_c
				$scope.fhem.weather.dewpoint = data.current_observation.dewpoint_c
				$scope.fhem.weather.clouds = data.clouds.all
				$scope.fhem.weather.sunrise = ''
				$scope.fhem.weather.sunset =  ''
            })
            .error(function (error) {
                $scope.status = 'Unable to load current weather data: ' + error.message;
            });
    }

    /*Forecast Daily*/
    function getWeatherForecastDailyWunderground() {
        WeatherFactory.getWeatherForecastDaily('WUNDERGROUND')
            .success(function (data) {
                //weatherForecastDaily.result = data;
                $scope.fhem.weather.forecast.daily = [];
                for (var id = 0; id < 4; id++) { 
                	$scope.fhem.weather.forecast.daily.push({
                		date: data.forecast.simpleforecast.forecastday[id].date.epoch,
	    				//id: data.list[id].weather[0].id,
						temperatur_max:data.forecast.simpleforecast.forecastday[id].high.celsius,
						temperatur_min:data.forecast.simpleforecast.forecastday[id].low.celsius,
						description:data.forecast.simpleforecast.forecastday[id].conditions,
						precipitation:data.forecast.simpleforecast.forecastday[id].qpf_allday.mm,
						pressure:'',
						humidity:data.forecast.simpleforecast.forecastday[id].avehumidity,
						wind_strength:data.forecast.simpleforecast.forecastday[id].avewind.kph,
						clouds:'',
						sunrise:'',
						sunset:''

                	});                	
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (daily) weather data: ' + error.message;
            });
    }

    /*Forecast Hourly*/
    function getWeatherForecastHourlyWunderground() {
        WeatherFactory.getWeatherForecastHourly('WUNDERGROUND')
            .success(function (data) {
                $scope.fhem.weather.forecast.hourly = [];
                for (var id = 0; id < 36; id++) { 
                	$scope.fhem.weather.forecast.hourly.push({
                		date: data.hourly_forecast[id].FCTTIME.epoch,
	    				//id: data.list[id].weather[0].id,
						temperatur_max:data.hourly_forecast[id].temp.metric,
						temperatur_min:data.hourly_forecast[id].temp.metric,
						description:data.hourly_forecast[id].wx,
						precipitation:data.hourly_forecast[id].qpf.metric,
						pressure:'',
						humidity:data.hourly_forecast[id].humidity,
						wind_strength:data.hourly_forecast[id].wspd.metric,
						clouds:data.hourly_forecast[id].sky,
						sunrise:'',
						sunset:''

                	});                	
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (hourly) weather data: ' + error.message;
            });
    }
			
    getWeatherData();

    $scope.getWeatherData = function(){
    	getWeatherData();
    }

	function getWeatherData() {
		getWeatherCurrentNetatmo

		//init and run NETATMO
		if(WEATHER_CONFIG.NETATMO_ACTIVE){
			getWeatherCurrentNetatmo();	
				
			//refresh interval
			interval_netatmo = $interval(function() {        
				getWeatherCurrentNetatmo();	
			}, WEATHER_CONFIG.NETATMO_REFRESH_INTERVAL);
		}

		//init and run OPENWEATHERMAP
		if(WEATHER_CONFIG.OPENWEATHERMAP_ACTIVE){
			getWeatherCurrentOpenweathermap();	
			getWeatherForecastDailyOpenweathermap();
			getWeatherForecastHourlyOpenweathermap();
		
			//refresh interval
			interval_openweathermap = $interval(function() {        
				getWeatherCurrentOpenweathermap();	
				getWeatherForecastDailyOpenweathermap();
				getWeatherForecastHourlyOpenweathermap();
			}, WEATHER_CONFIG.OPENWEATHERMAP_REFRESH_INTERVAL);
		}

		//init and run WUNDERGROUND
		if(WEATHER_CONFIG.WUNDERGROUND_ACTIVE){
			getWeatherCurrentWunderground();	
			getWeatherForecastDailyWunderground();
			getWeatherForecastHourlyWunderground();
		
			//refresh interval
			interval_wunderground = $interval(function() {    			    
				getWeatherCurrentWunderground();	
				getWeatherForecastDailyWunderground();
				getWeatherForecastHourlyWunderground();       
			}, WEATHER_CONFIG.WUDNERGROUND_REFRESH_INTERVAL);
		}
	}
	
	


	/*NVD3*/
	//Copy data to statisticdata array.
	$scope.loadChartDataForecastHourly = function(){
		var data = new Array();

		/*Hourly Max-temperature*/
		var temperatureMaxHourly = new Object();
		var temperatureMinHourly = new Object();
		var precipitationHourly = new Object();
		var tmp_temperatureMaxHourlyValues = new Array();
		var tmp_temperatureMinHourlyValues = new Array();
		var tmp_precipitationHourlyValues = new Array();

		for (var i = 0; i < $scope.fhem.weather.forecast.hourly.length; i++) {
			tmp_temperatureMaxHourlyValues.push({"x": $scope.fhem.weather.forecast.hourly[i].date, "y": $scope.fhem.weather.forecast.hourly[i].temperatur_max});  
			tmp_temperatureMinHourlyValues.push({"x": $scope.fhem.weather.forecast.hourly[i].date, "y": $scope.fhem.weather.forecast.hourly[i].temperatur_min});  
			tmp_precipitationHourlyValues.push({"x": $scope.fhem.weather.forecast.hourly[i].date, "y": $scope.fhem.weather.forecast.hourly[i].precipitation});  
		};
		
		temperatureMaxHourly.key = "Max Temperature"
		temperatureMaxHourly.type = "line"
        temperatureMaxHourly.yAxis = 1
        temperatureMaxHourly.values = tmp_temperatureMaxHourlyValues;

        temperatureMinHourly.key = "Min Temperature"
        temperatureMinHourly.type = "line"
        temperatureMinHourly.yAxis = 1
        temperatureMinHourly.values = tmp_temperatureMinHourlyValues;
        
        precipitationHourly.key = "Precipitation"
        precipitationHourly.type = "bar"
        precipitationHourly.yAxis = 2
        precipitationHourly.values = tmp_precipitationHourlyValues;

        data[0]=temperatureMaxHourly;
        data[1]=temperatureMinHourly;
        data[2]=precipitationHourly;

    
        $scope.statisticsDataForecastHourly = data;
		loadStatisticsOptionsForecastHourly();
	

        return data;
	}
	//Copy data to statisticdata array. 
	$scope.loadChartDataForecastDaily = function(){
		var data = new Array();

		/*Hourly Max-temperature*/
		var temperatureMaxDaily = new Object();
		var temperatureMinDaily = new Object();
		var precipitationDaily = new Object();
		var tmp_temperatureMaxDailyValues = new Array();
		var tmp_temperatureMinDailyValues = new Array();
		var tmp_precipitationDailyValues = new Array();

		for (var i = 0; i < $scope.fhem.weather.forecast.daily.length; i++) {
			tmp_temperatureMaxDailyValues.push({"x": $scope.fhem.weather.forecast.daily[i].date, "y": $scope.fhem.weather.forecast.daily[i].temperatur_max});  
			tmp_temperatureMinDailyValues.push({"x": $scope.fhem.weather.forecast.daily[i].date, "y": $scope.fhem.weather.forecast.daily[i].temperatur_min});  
			tmp_precipitationDailyValues.push({"x": $scope.fhem.weather.forecast.daily[i].date, "y": $scope.fhem.weather.forecast.daily[i].precipitation});  
		};
		
		temperatureMaxDaily.key = "Max Temperature"
		temperatureMaxDaily.type = "line"
        temperatureMaxDaily.yAxis = 1
        temperatureMaxDaily.values = tmp_temperatureMaxDailyValues;

        temperatureMinDaily.key = "Min Temperature"
        temperatureMinDaily.type = "line"
        temperatureMinDaily.yAxis = 1
        temperatureMinDaily.values = tmp_temperatureMinDailyValues;
        
        precipitationDaily.key = "Precipitation"
        precipitationDaily.type = "bar"
        precipitationDaily.yAxis = 2
        precipitationDaily.values = tmp_precipitationDailyValues;

        data[0]=temperatureMaxDaily;
        data[1]=temperatureMinDaily;
        data[2]=precipitationDaily;

    
        $scope.statisticsDataForecastDaily = data;
		loadStatisticsOptionsForecastDaily();
	

        return data;
	}
	
	/*Load the statistics options.*/
	function setXAxisFormat() {
		
	}

	var colorArray2 = ['#82DFD6', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
	var colorArray = ['#ff7f0e', '#d62728', '#2ca02c', '#1f77b4', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
	
	$scope.colorFunction = function() {
		return function(d, i) {
	    	return colorArray[i];
	    };
	}	

	function loadStatisticsOptionsForecastDaily(){
		setXAxisFormat();
		
		$scope.statisticsOptionsForecastDaily = {
		  "chart": {	

		    "type": "multiChart",
		    "height": 450,
		    //"width" : 440,
		    "margin": {
		      	"top": 20,
	 	      	"right": 80,
	    	  	"bottom": 60,
	      		"left": 80
			},	           	      		    
		    "color": $scope.colorFunction(),
		    "yAxis1": {
		    		"axisLabel": "Temperatur in Grad Celsius",
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }                    
            },
            "yAxis2": {
            		"axisLabel": "Precipitation in l/m²",
                    tickFormat: function(d){
                        return d3.format(',.4f')(d);
                    }                    
            },		 
			/*"interpolate": "monotone",*/
		    "useVoronoi": false,
		    "clipEdge": true,
		    "transitionDuration": 500,
		    "useInteractiveGuideline": true,
		    "reduceXTicks": true,		    		    
		    "xAxis": {	
		      //"ticks": 15,
		      "tickValues": $scope.statisticsDataForecastDaily[0].values.map( function(d){return d.x;} ),		      
		      "showMaxMin": false,
		      "rotateLabels": 50,
		      	tickFormat: function(d) {
		                	    /*return d3.time.format(formatXAxis)(new Date(d))*/
		                	    return d3.time.format('%A')(new Date(d*1000))
		        		    }
		    }		       
		  }
		};	
	};

	function loadStatisticsOptionsForecastHourly(){
		setXAxisFormat();
		
		$scope.statisticsOptionsForecastHourly = {
		  "chart": {	

		    "type": "multiChart",
		    "height": 450,
		    //"width" : 440,
		    "margin": {
		      	"top": 20,
	 	      	"right": 80,
	    	  	"bottom": 60,
	      		"left": 80
			},	           	      		    
		    "color": $scope.colorFunction(),
		    "yAxis1": {
		    		"axisLabel": "Temperatur in Grad Celsius",
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }                    
            },
            "yAxis2": {
            		"axisLabel": "Precipitation in l/m²",
                    tickFormat: function(d){
                        return d3.format(',.4f')(d);
                    }                    
            },		 
			/*"interpolate": "monotone",*/
		    "useVoronoi": false,
		    "clipEdge": true,
		    "transitionDuration": 500,
		    "useInteractiveGuideline": true,
		    "reduceXTicks": true,		    		    
		    "xAxis": {	
		      "ticks": 15,
		      //"tickValues": $scope.statisticsData[0].values.map( function(d){return d.x;} ),		      
		      "showMaxMin": false,
		      "rotateLabels": 50,
		      	tickFormat: function(d) {
		                	    /*return d3.time.format(formatXAxis)(new Date(d))*/
		                	    return d3.time.format('%a %H:%M')(new Date(d*1000))
		        		    }
		    }		       
		  }
		};	
	};
 	
	//$scope.statisticsData = generateData();
	//loadStatisticsOptions();

    $scope.$on('$viewContentLoaded', function(){
      $timeout(function(){
        $scope.lineChart.api.refresh();
      },100);
    });
	
}]);

/**
*	Controller for a fhem simple state element.
*/	
angular.module('weather').controller('WeatherCtrl2',['$scope','FhemFactory','FhemWebSocketFactory','GENERAL_CONFIG', function($scope, FhemFactory, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	$scope.fhem = {};	
	$scope.fhem.weather = {
	        			date: '', 
						temperature:  '', 
						temperatur_max:   '', 
						temperatur_min: '', 
						temperature_feelslike: '', 
						uv_index:       '', 
						precipitation:   '', 

						pressure:   '', 
						humidity:   '', 
						wind:   '', 
						windchill:  '', 
						dewpoint:   '', 
						clouds:   '', 
						sunrise:  '', 
						sunset:   '',
						forecast: {
								daily: {},
								hourly: {}
						} 
					};
	
	/*WebSocket-Mode*/
	$scope.subscribeDevice = function (name,state) {		
		$scope.fhem.data = {};
		FhemWebSocketFactory.subscribeEvent('.*',name,'.*',

			
			function(data) {
				if(GENERAL_CONFIG.APP_CONTROLLER_DEBUG)
					console.log("Fire from "+ name +" by "+ data.Name +":" + JSON.stringify(data));
					
                
                $scope.$apply(function () {

                	//$scope.fhem = data;						                	


                	if(data.Name == 'pp_forecast'){
                		//$scope.fhem.weather.date = ''
						$scope.fhem.weather.temperature =  data.Readings.temperature
						$scope.fhem.weather.temperatur_max =   data.Readings.fc0_tempMax
						$scope.fhem.weather.temperatur_min = data.Readings.fc0_tempMin
						$scope.fhem.weather.temperature_feelslike = ''
						$scope.fhem.weather.uv_index = data.Readings.fc0_uv
						$scope.fhem.weather.precipitation = data.Readings.fc0_rain

						$scope.fhem.weather.pressure = data.Readings.pressure
						$scope.fhem.weather.humidity = data.Readings.humidity
						$scope.fhem.weather.wind = data.Readings.wind
						//$scope.fhem.weather.windchill = ''
						$scope.fhem.weather.dewpoint = data.Readings.dewPoint
						//$scope.fhem.weather.clouds = ''
						//$scope.fhem.weather.sunrise = ''
						//$scope.fhem.weather.sunset =  ''
                	}

                	if(data.Name == 'ow_conditions'){
                		$scope.fhem.weather.date = data.Readings.dt
						$scope.fhem.weather.temperature =  data.Readings.main_temp
						$scope.fhem.weather.temperatur_max =   data.Readings.main_temp_max
						$scope.fhem.weather.temperatur_min = data.Readings.main_temp_min
						//$scope.fhem.weather.temperature_feelslike = ''
						//$scope.fhem.weather.uv_index = ''
						$scope.fhem.weather.precipitation = data.Readings.rain_3h

						$scope.fhem.weather.pressure = data.Readings.main_pressure
						$scope.fhem.weather.humidity = data.Readings.main_humidity
						$scope.fhem.weather.wind = data.Readings.wind_speed
						//$scope.fhem.weather.windchill = ''v
						//$scope.fhem.weather.dewpoint = ''
						$scope.fhem.weather.clouds = data.Readings.clouds_all
						$scope.fhem.weather.sunrise = data.Readings.sys_sunrise
						$scope.fhem.weather.sunset =  data.Readings.sys_sunset
                	}

                	if(data.Name == 'wu_conditions'){
                		$scope.fhem.weather.date = data.Readings.current_observation_observation_epoch
						$scope.fhem.weather.temperature =  data.Readings.current_observation_temp_c
						//$scope.fhem.weather.temperatur_max =   ''
						//$scope.fhem.weather.temperatur_min = ''
						$scope.fhem.weather.temperature_feelslike = data.Readings.current_observation_feelslike_c
						//$scope.fhem.weather.uv_index = ''
						$scope.fhem.weather.precipitation = data.Readings.current_observation_precip_today_metric

						$scope.fhem.weather.pressure = data.Readings.current_observation_pressure_mb
						$scope.fhem.weather.humidity = data.Readings.current_observation_relative_humidity
						$scope.fhem.weather.wind = data.Readings.current_observation_wind_kph
						$scope.fhem.weather.windchill = data.Readings.current_observation_windchill_c
						$scope.fhem.weather.dewpoint = data.Readings.current_observation_dewpoint_c
						//$scope.fhem.weather.clouds = ''
						//$scope.fhem.weather.sunrise = ''
						//$scope.fhem.weather.sunset =  ''
                	}

                	if(data.Name == 'ow_forecast'){
                		var daily = {
                			date: '',
							temperatur_max: '',
							temperatur_min: '',
							precipitation: '',
							pressure: '',
							humidity: '',
							wind: '',
							clouds: '',
							sunrise: '',
							sunset: ''
                		}
                	}


					
				});								
				
			});					
	}	

	


}]);


/**
*	Current weather controller.
*/	
angular.module('weather').controller('WeatherCurrentCtrl',['$interval','WeatherFactory','WEATHER_CONFIG', function($interval, WeatherFactory, WEATHER_CONFIG){				
	
	var weatherCurrent = this;		
	weatherCurrent.result = null;		
	
	function getWeatherCurrent() {
        WeatherFactory.getWeatherCurrent('OPENWEATHERMAP')
            .success(function (data) {
                weatherCurrent.result = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load current weather data: ' + error.message;
            });
    }
	
	//init
	getWeatherCurrent();
	
	//refresh interval
	interval = $interval(function() {        
		getWeatherCurrent();        
	}, WEATHER_CONFIG.OPENWEATHERMAP_REFRESH_INTERVAL);
	
}]);

/**
*	Forcast (daily) weather controller.
*/		
angular.module('weather').controller('WeatherForecastDailyCtrl',['$interval','WeatherFactory','WEATHER_CONFIG', function($interval, WeatherFactory, WEATHER_CONFIG){				
	
	var weatherForecastDaily = this;
	weatherForecastDaily.result = null;	
	
	function getWeatherForecastDaily() {
        WeatherFactory.getWeatherForecastDaily('OPENWEATHERMAP')
            .success(function (data) {
                weatherForecastDaily.result = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (daily) weather data: ' + error.message;
            });
    }
			
	//init
	getWeatherForecastDaily();
	
	//refresh interval
	interval = $interval(function() {        
		getWeatherForecastDaily();        
	}, WEATHER_CONFIG.OPENWEATHERMAP_REFRESH_INTERVAL);
	
}]);
	
/**
*	Forcast (hourly) weather controller.
*/	
angular.module('weather').controller('WeatherForecastHourlyCtrl',['$interval','WeatherFactory','WEATHER_CONFIG', function($interval, WeatherFactory, WEATHER_CONFIG){				
	
	var weatherForecastHourly = this;
	weatherForecastHourly.result = null;	
	
	function getWeatherForecastHourly() {
        WeatherFactory.getWeatherForecastHourly('OPENWEATHERMAP')
            .success(function (data) {
                weatherForecastHourly.result = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load forecast (hourly) weather data: ' + error.message;
            });
    }		
	
	//init
	getWeatherForecastHourly();
	
	//refresh interval
	interval = $interval(function() {        
		getWeatherForecastHourly();        
	}, WEATHER_CONFIG.OPENWEATHERMAP_REFRESH_INTERVAL);
	
}]);
	
	
	
	
