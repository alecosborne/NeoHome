/**
*	Host a window/blind element with different templates.
*/	
angular.module('window').directive("nhBlindElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_blind_element.html'             
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
            //scope.subscribeDevice(attrs.fhemName);       
            scope.registerName(attrs.fhemName);  
            scope.init();      
		
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		//general       	
        	'template': '@',
        	'fhemName' : '@',        	

        	'text' : '@',
        	
        	'states'	:	'@',
        	'images'	:	'@',			
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@'
			
	    },			
		controller: 'BlindCtrl',
	    	    
		link: linker						
	};
});

/**
*	Host a window/blind element with different templates.
*/	
angular.module('window').directive("nhSunblindElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_sunblind_element.html'         
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
            //scope.subscribeDevice(attrs.fhemName);       
            scope.registerName(attrs.fhemName);  
            scope.init();               
		
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		//general       	
        	'template': '@',
        	'fhemName' : '@',        	

        	'text' : '@',
        	
        	'states'	:	'@',
        	'images'	:	'@',			
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@'		
	    },			
		controller: 'SunblindCtrl',
	    	    
		link: linker						
	};
});
