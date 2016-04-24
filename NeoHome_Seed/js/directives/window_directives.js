/**
*	Host a window/blind element with different templates.
*/	
angular.module('window').directive("nhBlindElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_blind_element.html',
                tile: 'tile_multistate.html'                
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
			'bgColorOff' : '@',
						
			//only for tile template
			'size' : '@',        	        	

			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@'

			
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
                list: 'list_sunblind_element.html',
                tile: 'tile_multistate.html'                
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
			'bgColorOff' : '@',
						
			//only for tile template
			'size' : '@',        	        	

			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@'

			
	    },			
		controller: 'SunblindCtrl',
	    	    
		link: linker						
	};
});

/**
*	Host a tile window blind control.
*/	
// angular.module('window').directive("nhTileBlind", function($interval, FHEM_CONFIG) {

// 	var templateURL = './views/templates/tile_multistate.html';
// 	return {
//         restrict: "E",   
// 		replace: true,
// 		transclude: true,		
//         scope : {
//         	'fhemName' : '@',        	
//         	'size' : '@',        	        	
// 			'bgColor' : '@',
// 			'images'	:	'@',
// 			'states'	:	'@',
// 			'imageClassOn':	'@',
// 			'imageClassOff': '@',
// 			'brandColor' : '@',
// 			'brandColorOn' : '@',
// 			'brandColorOff' : '@',
// 			'brandText' : '@'				
// 	    },	
// 		templateUrl: templateURL,
// 		controller: 'BlindCtrl',
	    	    
// 		link: function(scope, element, attrs, blindCtrl){		
			
			
// 			scope.getImage = function(state){
// 				for (var i = 0; i <= scope.states.length - 2; i++) {
// 					if(scope.states[i]< state && scope.states[i+1] > state)
// 						return scope.images[i];
// 				};

// 			}
			
// 			//$http.get(templateURL, {cache: $templateCache})
// 			//	.then(function(response){
// 				//element.html($compile(response.data)(scope));
// 			//		element.html('').append($compile(response.data)(scope));
// 			//	});
// 			scope.subscribeDevice(attrs.fhemName);	
			
// 			/*scope.getControlData(attrs.fhemNameBlind);*/
// 			/*scope.getControlDataGeneral(attrs.fhemName);*/


			
// 			// element.on('click', function(e){

// 			// 	//set the temp heating parameters					
// 			// 	scope.setTempBlindParameters();

// 	  // 			ngDialog.open({
// 			// 			template: './views/templates/blind_dialog.html',
// 			// 			className: 'ngdialog-theme-default',   
// 			// 			data: {name: attrs.name}, 						
// 			// 			scope: scope    						
// 			// 		});
// 	  // 		});	
	  										
				
// 		}						
// 	};
// });
