/**
*	Host a heating element with different templates.
*/	
angular.module('heating').directive("nhHeatingElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_heating_element.html'         
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
			//scope.subscribeDevice(attrs.fhemNameClima);	
			scope.registerNames(attrs.fhemName, attrs.fhemNameClima);	
			scope.init();	
			//scope.registerNames(attrs.fhemNameClima);	
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		//general       	
        	'template': '@',
        	'fhemName' : '@', 
        	'fhemNameClima' : '@',       	

        	'text' : '@',
        	        	
        	'image'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@'
									
	    },			
		controller: 'ClimaCtrl',
	    	    
		link: linker						
	};
});

/**
*	Host a tile heating control.
*/	
angular.module('heating').directive("nhTileHeating", function($interval, FHEM_CONFIG, ngDialog) {

	var templateURL = './views/templates/tile_heating.html';
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : {
        	'fhemName' : '@',
        	'fhemNameClima' : '@',
        	'name' : '@',
			'bgColor' : '@',
			'image'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',
			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@',
			'brandText' : '@'				
	    },	
		templateUrl: templateURL,
		controller: 'ClimaCtrl',
	    	    
		link: function(scope, element, attrs, climaCtrl){		
				//$http.get(templateURL, {cache: $templateCache})
				//	.then(function(response){
					//element.html($compile(response.data)(scope));
				//		element.html('').append($compile(response.data)(scope));
				//	});
				if(FHEM_CONFIG.FHEM_OVER_WEB_SOCKET) {
					scope.subscribeDevice(attrs.fhemName);		
					scope.subscribeDevice(attrs.fhemNameClima);		

					element.on('click', function(e){

						//set the temp heating parameters					
						scope.setTempHeatingParameters();

	          			ngDialog.open({
	    						template: './views/templates/heating_dialog.html',
	    						className: 'ngdialog-theme-default',   
	    						data: {name: attrs.name}, 						
	    						scope: scope    						
							});
	          		});				

				} else {
					scope.getControlData(attrs.fhemNameClima);
					scope.getControlDataGeneral(attrs.fhemName);

					element.on('click', function(e){

						//set the temp heating parameters					
						scope.setTempHeatingParameters();

	          			ngDialog.open({
	    						template: './views/templates/heating_dialog.html',
	    						className: 'ngdialog-theme-default',   
	    						data: {name: attrs.name}, 						
	    						scope: scope    						
							});
	          		});				
			
					//refresh interval
					interval = $interval(function() {        
						scope.getControlData(attrs.fhemNameClima);   				
					}, FHEM_CONFIG.FHEM_REFRESH_INTERVAL);
				}
		}						
	};
});