	
/**
*	Host the weather tab.
*/	
angular.module('weather').directive("nhWeatherTab", function() {
	return {
		restrict: "E",
		templateUrl: "./views/weather-tab.html"      
	};
});

/**
*	Host the weather widget.
*/	  
angular.module('weather').directive("nhWeatherTile", function() {
	return {
		restrict: "E",
		templateUrl: "./views/weather-tile.html"      
	};
});

/**
 * Skycon weather icons wrapper 
 */
angular.module('weather').directive("skyCon", function(){
    return {
        link: function (scope, $el, attrs){
            function render(){
                var icons = new Skycons({"color": scope.$eval(attrs.color)});
                icons.set($el[0], attrs.skyCon);
                icons.play();
            }   

            render(); 
        }
    }
});

/**
*	Host a weather site.
*/	
angular.module('weather').directive("nhWeatherSite", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var templateURL = '';

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                weather: 'weather_site.html'
                      
            };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;
    }

    var linker = function(scope, element, attrs) {    		

            var loader = getTemplate(scope.template);            

            var promise = loader.success(function(html) {
                element.html(html);            

            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });

            //scope.subscribeDevice(attrs.fhemNames, attrs.countState);			
    }

	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : {
        	//general       	
        	'template': '@',
        	'fhemNames' : '@'       	
		
			
			

	    },			
		controller: 'WeatherCtrl',

		link: linker			    	    							
	};
});
	
