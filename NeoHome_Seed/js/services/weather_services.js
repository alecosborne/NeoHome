
/**
*	Load weather data from openweathermap.
*/	
angular.module('weather').factory('WeatherFactory', ['$http','WEATHER_CONFIG', function($http,WEATHER_CONFIG) {
	
	var weatherFactory = {};
	
	// Load current weather data from openweathermap.
	weatherFactory.getWeatherCurrent = function (servicename) {
		if(servicename == 'OPENWEATHERMAP')
			return $http({ method: 'GET', url: WEATHER_CONFIG.OPENWEATHERMAP_API_URL + WEATHER_CONFIG.OPENWEATHERMAP_WEATHER_URL + WEATHER_CONFIG.OPENWEATHERMAP_APPID});
		else
			return $http({ method: 'GET', url: WEATHER_CONFIG.WUNDERGROUND_API_URL + WEATHER_CONFIG.WUNDERGROUND_WEATHER_URL});
	};
	
	// Load forcast (daily) weather data from openweathermap.
	weatherFactory.getWeatherForecastDaily = function (servicename) {
		if(servicename == 'OPENWEATHERMAP')
        	return $http({ method: 'GET', url: WEATHER_CONFIG.OPENWEATHERMAP_API_URL + WEATHER_CONFIG.OPENWEATHERMAP_FORECAST_DAILY_URL + WEATHER_CONFIG.OPENWEATHERMAP_APPID});				
        else
        	return $http({ method: 'GET', url: WEATHER_CONFIG.WUNDERGROUND_API_URL + WEATHER_CONFIG.WUNDERGROUND_FORECAST_DAILY_URL});				
    };	
	
	// Load forcast (hourly) weather data from openweathermap.
	weatherFactory.getWeatherForecastHourly = function (servicename) {
		if(servicename == 'OPENWEATHERMAP')
        	return $http({ method: 'GET', url: WEATHER_CONFIG.OPENWEATHERMAP_API_URL + WEATHER_CONFIG.OPENWEATHERMAP_FORECAST_HOURLY_URL + WEATHER_CONFIG.OPENWEATHERMAP_APPID});
        else
        	return $http({ method: 'GET', url: WEATHER_CONFIG.WUNDERGROUND_API_URL + WEATHER_CONFIG.WUNDERGROUND_FORECAST_HOURLY_URL});
    };	


    // Do the Netatmo authentication.
	weatherFactory.netatmoAuthenticate = function () {	
		// format the parameters
        var params = "grant_type=password";
        params += "&client_id=" + WEATHER_CONFIG.NETATMO_CLIENT_ID;
        params += "&client_secret=" + WEATHER_CONFIG.NETATMO_CLIENT_SECRET;
        params += "&username=" + WEATHER_CONFIG.NETATMO_USERNAME;
        params += "&password=" + WEATHER_CONFIG.NETATMO_PASSWORD;

       	return $http({ 
       		method: 'POST', 
       		url: "https://api.netatmo.net/oauth2/token",
            headers: { "Content-type": "application/x-www-form-urlencoded;charset=UTF-8" },
            data: params
       	});        
    };	

    // Load Netatmo station data.
    weatherFactory.netatmoGetStationData = function (token) {	
    	var url = "https://api.netatmo.com/api/getstationsdata?access_token=" + token;

		return $http({ 
			url: url, 
			responseType: "json" 
		});   
    }

    // Netatmo Authenticate Service
	weatherFactory.netatmoChainGetStationData= function () {	
			   
			   var netatmoAuthenticate = function( )
                {
                    return weatherFactory.netatmoAuthenticate()                   // Request #1
                            .then( function( login_result )
                            {
                                //$scope.login_result = login_result;               // Response Handler #1
                                return login_result.data.access_token;
                            });
                },
                getNetatmoStationData = function( token )
                {
                    return weatherFactory.netatmoGetStationData( token )                          // Request #2
                            .then( function( device_result )
                            {
                                //$scope.device_result = device_result;                     // Response Handler #2
                                return device_result;
                            });
                };

                return netatmoAuthenticate().then( getNetatmoStationData );
               
       
    };		
	return weatherFactory;
}]);