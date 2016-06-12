	
/**
*	Host a state element with different templates. Multiple fhem elements also allowed. 
*/	
angular.module('shared').directive("nhStateElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_state_element.html',
                infrastructure: 'infrastructure_state_element.html',
                list_switch: 'list_switch_element.html',                
                tile: 'tile_state_element.html',
                list_double_switch: 'list_double_switch_element.html'                                              
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
            scope.init();
            scope.registerNames(attrs.fhemNames);	

        
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		  //general       	
        	'template': '@',
        	'fhemNames' : '@',        	

        	'text' : '@',		

        	'onState' : '@',
        	'offState' : '@',

        	'imageOn'	:	'@',
			'imageOff'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@',

			'switchColor' : '@',			

			

			//2nd element
			'onState1' : '@',
        	'offState1' : '@',
			'switchColor1' : '@',

			//only for tile template
			'size' : '@',			        					

			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@'						
	    },			
		controller: 'SwitchCtrl',
	    	    
		link: linker						
	};
});

angular.module('shared').directive("nhDetectorElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list_detector: 'list_detector_element.html'                                             
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
            scope.init();
            scope.registerNames();	
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		  //general       	
        	'template': '@',
        	'fhemNames' : '@',  
        	'detectorType': '@',      	

        	'textAlarmGeneral' : '@',
        	'textsAlarm' : '@',
        	'textNoAlarm' : '@',
        	'text' : '@',			

        	'onState' : '@',
        	'offState' : '@',

        	'imageOn'	:	'@',
			'imageOff'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',		

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@',

			'badgeColor' : '@',
			'badgeColorOn' : '@',
			'badgeColorOff' : '@'	        					

					
	    },			
		controller: 'DetectorCtrl',
	    	    
		link: linker						
	};
});


/**
*	Host a state double element with different templates. **Deprecated**
*   Use the nhStateElement directive with the new attr fhemNames (e.g. fhemNames=device1,device2).
*/	/*
angular.module('shared').directive("nhStateMultiElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {                
                list_simple_double_switch: 'list_simple_double_switch_element.html'                              
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

        //alternative to the ng-click derective in the template
		//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)	
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
  		}

        scope.subscribeDevice(attrs.fhemNames);	
                    

        //alternative to the ng-click derective in the template
		//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)				
		//if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
		//	element.on('click', function () {				
		//		scope.setControlState();
		//	});
		//}	
		
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		 //general       	
        	'template': '@',
        	'fhemNames' : '@',        	

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
		controller: 'SwitchMultiCtrl',
	    	    
		link: linker						
	};
});
*/
/**
*	Host a tile switch control. **Deprecated**
*   Use the nhStateElement directive with the template flag.
*/	/*
angular.module('shared').directive("nhTileSwitch", function($interval, FHEM_CONFIG) {

	var templateURL = './views/templates/tile.html';
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : {
        	'fhemName' : '@',
			'size' : '@',
			'stateOnly' : '@',

        	'onState' : '@',
        	'offState' : '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@',

			'imageOn'	:	'@',
			'imageOff'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@',

			'brandText' : '@'				
	    },	
		templateUrl: templateURL,
		controller: 'SwitchCtrl',
	    	    
		link: function(scope, element, attrs){		
				//$http.get(templateURL, {cache: $templateCache})
				//	.then(function(response){
					//element.html($compile(response.data)(scope));
				//		element.html('').append($compile(response.data)(scope));
				//	});

							
				if(FHEM_CONFIG.FHEM_OVER_WEB_SOCKET)
				{
					scope.subscribeDevice(attrs.fhemName);		

					//alternative to the ng-click derective in the template
					//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)				
					if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
						element.on('click', function () {				
							scope.setControlState();
					});
				}
				} else {
					scope.getControlData(attrs.fhemName);
			
					//refresh interval
					interval = $interval(function() {        
						scope.getControlData(attrs.fhemName);   				
					}, FHEM_CONFIG.FHEM_REFRESH_INTERVAL);	


					//alternative to the ng-click derective in the template
					//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)				
					if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
						element.on('click', function () {				
							scope.setControlStateNormal();
						});
					}			
				}
		}						
	};
});
*/

/**
*	Host a simple state control.
*/	
angular.module('shared').directive("nhSimpleStateElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

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

            /***Deprecated**/
            //scope.subscribeDevice(attrs.fhemNames); //scope.subscribeDevice(attrs.fhemNames, attrs.countState);		
            scope.init();
            scope.registerNames(attrs.fhemNames);
            	
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
		controller: 'StateCtrl',

		link: linker			    	    							
	};
});


/**
*	Host a counter control.
*/	
angular.module('shared').directive("nhCounterElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var templateURL = './views/templates/tile_counter.html';

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_counter_element.html',                
                tile: 'tile_counter.html'                
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
            //scope.subscribeDevice(attrs.fhemNames, attrs.countState);
            scope.init();
            scope.registerNames();
            	

            //alternative to the ng-click derective in the template
			//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)				
			/*if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
            	scope.onClick = function() {        		        			
        			scope.setControlState();
      			}
      		}*/

            //alternative to the ng-click derective in the template
			//ng-click="setControlState($event,fhem.Name,fhem.Readings.state.Value)				
			/*if (attrs.stateOnly == null || attrs.stateOnly == 'false') {
				element.on('click', function () {				
					scope.setControlState();
				});
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
			
			'stateOnly' : '@',

        	'onState' : '@',
        	'offState' : '@',

			'bgColor' : '@',
			'bgColorOn' : '@',
			'bgColorOff' : '@',

			'imageOn'	:	'@',
			'imageOff'	:	'@',
			'imageClassOn':	'@',
			'imageClassOff': '@',

			'text' : '@',			
			
			'countState' : '@',

			'clickEvent' : '@',

			'badgeColor' : '@',
			'badgeColorOn' : '@',
			'badgeColorOff' : '@',
			//only for tile template
			'brandColor' : '@',
			'brandColorOn' : '@',
			'brandColorOff' : '@',
			'brandText' : '@',

			'size' : '@'
			

	    },			
		controller: 'GroupCtrl',

		link: linker			    	    							
	};
});


/**
*	Host and open a statistic element.
*	fhemDevices: List of fhem devices separated by ','. 
*	fhemDeviceReadings: List of the readings separated by ','. 
*	fhemDeviceReadingsTexts: List of the display textes of the readings separated by ','. 
*	text: Display text (title) of the chart(s).
*	description: Display text (description) of the chart(s).
*	chartType: discreteBarChart, lineChart, cumulativeLineChart, stackedAreaChart, multiBarChart, multiBarHorizontalChart, pieChart
*              default: stackedAreaChart 
*	chartInterpolateType: linear – Normal line (jagged).
*						  step-before – a stepping graph alternating between vertical and horizontal segments.
*						  step-after - a stepping graph alternating between horizontal and vertical segments.
*						  basis - a B-spline, with control point duplication on the ends (that's the one above).
*						  basis-open - an open B-spline; may not intersect the start or end.
*						  basis-closed - a closed B-spline, with the start and the end closed in a loop.
*						  bundle - equivalent to basis, except a separate tension parameter is used to straighten the spline. This could be really cool with varying tension.
*						  cardinal - a Cardinal spline, with control point duplication on the ends. It looks slightly more 'jagged' than basis.
*						  cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points. So kind of shorter than 'cardinal'.
*						  cardinal-closed - a closed Cardinal spline, looped back on itself.
*						  monotone - cubic interpolation that makes the graph only slightly smoother. (default)
*	chartIgnoreZeroValues: filter the db data array and skip zero values. default: false
*   chartShowValues: display the values. default: false
*	chartShowYaxis: display the y-axis. default: true
*	chartYAxisIsDatetime: the format of the y-axis is datetime. default: false
*	chartAsArea: display the lines in a line chart as areas. default: true
*	chartHeight: The height of the chart in px. default: 450
*/
angular.module('shared').directive('nhStatistic', function(){
	return {            
            restrict: 'A',
            scope: {                
                'fhemDevices': '@',
                'fhemDeviceReadings': '@',
                'fhemDeviceReadingsTexts': '@',
                'text' : '@',
                'description' : '@',
                'chartType' : '@',
                'chartInterpolateType' : '@',
                'chartIgnoreZeroValues' : '@',
                'chartShowValues': '@',
                'chartShowYaxis': '@',                
                'chartYAxisIsDatetime': '@',
                'chartAsArea': '@',
                'chartHeight' : '@'
                
            },
            controller: 'ModalCtrl',
        	link: function (scope, element, attrs){
        		element.on('click', function () {				
					scope.openStatisticDialog('lg');
				});
        }
    }
});

/**
*	Host and open a schedule element.
*
*	fhemDevicesTexts: List of the texts separated by ','. 
*/
angular.module('shared').directive('nhSchedule', function(){
	return {            
            restrict: 'A',
            scope: {                
                'fhemDevices': '@',
                'fhemDevicesTexts': '@',
                'fhemDeviceReadingsTexts': '@',
                'text' : '@',
                'chartType' : '@',
                'chartInterpolateType' : '@',
                'chartAsArea': '@',
                'chartHeight' : '@'
                
            },
            controller: 'ScheduleCtrl',
        	link: function (scope, element, attrs){
        		scope.subscribeDevice(attrs.fhemDevices);	
        		element.on('click', function () {				
					scope.openScheduleDialog('GA.RasenmaeherState');
				});
        }
    }
});

/**
*	Host a scene element with different templates.
*/	
angular.module('shared').directive("nhSceneElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list_scene: 'list_scene_element.html'      
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
      
            //scope.registerNames(attrs.fhemSceneNames);  
            scope.registerNames();  
            scope.init();      
		
    }
	
	return {
        restrict: "E",   
		replace: true,
		transclude: true,		
        scope : { 
      		//general       	
        	'template': '@',   	
        	'fhemSceneNames' : '@',
        	'fhemModeNames' : '@', 
        	'fhemSceneIcons' : '@',         	
        	'fhemModeIcons' : '@',       	


			'bgColor' : '@'
			

			
	    },			
		controller:'@', //specify the controller is an attribute
        name:'ctrlName', //name of the attribute.

	    	    
		link: linker						
	};
});

/**
*	Host a presence element with different templates. Multiple fhem presence elements also allowed. 
*/	
angular.module('shared').directive("nhPresenceElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                presence: 'presence_element.html'               
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

            scope.init();
            scope.registerNames(attrs.fhemNames,attrs.texts,attrs.images);	

         
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

        	'onState' : '@',
        	'offState' : '@',

        	'images'	:	'@'					
	    },			
		controller: 'PresenceCtrl',
	    	    
		link: linker						
	};
});

	
/* ========================================================================
 * Live Tile directive
 * ========================================================================
 */
 
 /**
 * Directive to add events to a tile widget.
 */
angular.module('shared').directive('tileWidget', function(){
    return {
        restrict: 'C',
        link: function (scope, $el, attrs){

        	$el.on('mouseup', function(event) {
      			$el.removeClass("tile-widget-click")
		    });
		    $el.on('mousedown', function(event) {
		      	$el.addClass("tile-widget-click")
		    });
            
        }
    }
});

/**
 * Directive to add live ticker to a tileTile eslement in a tile-widget.
 */
angular.module('shared').directive('liveTile', function(){
    return {
        restrict: 'C',
        link: function (scope, $el, attrs){
        	
            function render(){
                $el.css('height', attrs.height).liveTile();

                // remove onResize timeouts if present
                scope.$on('$stateChangeStart', function(){
                    $el.liveTile("destroy", true);
                });
            }

            render();
            
        }
    }
});
/*
angular.module('shared').directive('liveTile', ['scriptLoader', function(scriptLoader){
    return {
        restrict: 'C',
        link: function (scope, $el, attrs){
            function render(){
                $el.css('height', attrs.height).liveTile();

                // remove onResize timeouts if present
                scope.$on('$stateChangeStart', function(){
                    $el.liveTile("destroy", true);
                });
            }

            scriptLoader.loadScripts(['vendor/MetroJS/release/MetroJs.Full/MetroJs.js'])
                .then(render)
        }
    }
}]);*/

/* ========================================================================
 * Datetimepicker
 * ========================================================================
 */
 

angular.module('shared').directive('dateTimePicker', ['scriptLoader', function(scriptLoader){
    return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
        link: function (scope, $el, attrs, ngModelCtrl){
            function render(){
                $el.datetimepicker({
                    pick12HourFormat: scope.pick12HourFormat,
                    language: scope.language,
                    useCurrent: scope.useCurrent                    
                })
 
                //Local event change
                $el.on('blur', function () {
 
                    console.info('this', this);
                    console.info('scope', scope);
                    console.info('attrs', attrs);
                    //var test = new Date($el.data("DateTimePicker").getDate().format());

   					ngModelCtrl.$setViewValue($el.val());
   					
                    /*// returns moments.js format object
                    scope.dateTime = new Date($el.data("DateTimePicker").getDate().format());
                    // Global change propagation

                    $rootScope.$broadcast("emit:dateTimePicker", {
                        location: scope.location,
                        action: 'changed',
                        dateTime: scope.dateTime,
                        example: scope.useCurrent
                    });
                    scope.$apply();*/
                })
            }

            scriptLoader.loadScripts([
            	'vendor/moment/min/moment.min.js',
            	'vendor/moment/locale/de.js',
		        'vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
            ]).then(render)
        }
    }
}]);


/* ========================================================================
 * Nvd3 Chart wrapper.
 * ========================================================================
 * Simple self-written solution that requires controller to initialize chart & data.
 * If you're looking for full scale support of nvd3 options and more angulary way of
 * initializing nvd3 charts please check https://github.com/cmaurer/angularjs-nvd3-directives
 */

angular.module('shared').directive('nvd3Chart', ['scriptLoader', function(scriptLoader){
    return {
        link: function (scope, $el, attrs){
            function render(){
                nv.addGraph(function() {
                    var chart = scope[attrs.chart];
                    d3.select($el.find('svg')[0])
                        .style('height', attrs.height || '300px')
                        .datum(scope[attrs.datum])
                        .transition().duration(500)
                        .call(chart)
                    ;

                    $(window).on('sn:resize', chart.update);

                    return chart;
                });
            }

            scriptLoader.loadScripts([
                'vendor/d3/d3.min.js',
                'vendor/nvd3/build/nv.d3.min.js'
            ])
                .then(function(){
                    scope.$watch(attrs.datum, function(data, oldData){
                        if (!angular.isDefined(data)) return;
                        render();
                    })
                })
        }
    }
}]);

/* ========================================================================
 * Sparkline
 * ========================================================================
 */

angular.module('shared').directive('jqSparkline', ['scriptLoader', function (scriptLoader) {
    return {
        // pass model & options as arrays to enable composite sparklines
        require: 'ngModel',
        link: function (scope, $el, attrs, ngModel) {
            function render(){
                var model = angular.isString(ngModel.$viewValue) ? ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : ngModel.$viewValue,
                    options = scope[attrs.options];

                // enabling composite chart if array passed
                if (angular.isArray(model) && angular.isArray(options)){
                    options.forEach(function(singleOptions, i){
                        if (i == 0){
                            $el.sparkline(model[i], singleOptions);
                        } else { // set composite for next calls
                            $el.sparkline(model[i], $.extend({composite: true}, singleOptions));
                        }
                    });
                } else {
                    var data;
                    // Make sure we have an array of numbers
                    angular.isArray(model) ? data = model : data = model.split(',');
                    $el.sparkline(data, options);
                }
            }

            scriptLoader.loadScripts(['vendor/jquery.sparkline/index.js'])
                .then(function(){
                    scope.$watch(attrs.ngModel, function(){
                        render();
                    });

                    $(window).on('sn:resize', render);
                })
        }
    }
}]);