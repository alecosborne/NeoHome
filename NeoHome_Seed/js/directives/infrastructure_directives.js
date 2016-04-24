/**
*	Host a state element with different templates. Multiple fhem elements also allowed. 
*/	
angular.module('infrastructure').directive("nhServerInfoStateElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                serverinfo: 'server_info_state_element_2.html'                                             
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
            
            scope.registerNames(attrs.fhemNames,attrs.texts);	
            scope.init();

            //alternative ng-click/ng-change derective 
			//ng-click="setControlState(id)				
			
			/***Deprecated** With the multiple fhem device we need a onClick array.
			if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
            	scope.onClick = function() {        		        			
        			scope.setControlState();
      			}
      		}*/

      		/***Deprecated** With multiple fhem device this onClick array used.
      		scope.onClick = new Array();				
			if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
				var nameArray = attrs.fhemNames.split(/\,| /);	
				
				for (var id = 0; id < nameArray.length; id++) { 
					scope.onClick[id] = (function(index) {
						return function() {        		        			
	    					scope.setControlState(index);
	    				}
	  				})(id);
				}            
	  		}*/
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		  //general       	
        	'template': '@',
        	'fhemNames' : '@',        	

        	'texts' : '@',
        	'text' : '@',			

        	'onState' : '@',
        	'offState' : '@',

        	'imageOn'	:	'@',
			'imageOff'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'stateOnly' : '@',

			'switchColor' : '@',			

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@',

			//2nd element
			'onState1' : '@',
        	'offState1' : '@',

			'switchColor1' : '@',

			//3rd element


			//only for tile template
			'size' : '@',			        					

			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@'						
	    },			
		controller: 'ServerInfoStateCtrl',
	    	    
		link: linker						
	};
});