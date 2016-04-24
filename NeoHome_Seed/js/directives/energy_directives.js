/**
*	Host a energy element.
*/	
angular.module('energy').directive("nhEnergyElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var templateURL = '';

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                energy_big: 'energy_big_element.html'
                      
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

             /***Deprecated**/
            //scope.subscribeDevice(attrs.fhemNames);   
            scope.registerNames(attrs.fhemPowerName,attrs.fhemGasName);
            scope.init();
            		
    }

	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : {
        	//general       	
        	'template': '@',
        	'fhemPowerName' : '@',
            'fhemGasName' : '@',

            'fhemDevicePowerDaySum': '@',
            'fhemDevicePowerDaySumReading': '@',
            'fhemDevicePowerDaySumReadingText': '@',

            'fhemDevicePowerDay': '@',
            'fhemDevicePowerDayReading': '@',
            'fhemDevicePowerDayReadingText': '@',

            'fhemDeviceGasDay': '@',
            'fhemDeviceGasDayReading': '@',
            'fhemDeviceGasDayReadingText': '@',

            'fhemDeviceGasDaySum': '@',
            'fhemDeviceGasDaySumReading': '@',
            'fhemDeviceGasDaySumReadingText': '@',

            'charttextYaxis': '@'	
		
			
			

	    },			
		controller: 'EnergyCtrl',

		link: linker			    	    							
	};
});