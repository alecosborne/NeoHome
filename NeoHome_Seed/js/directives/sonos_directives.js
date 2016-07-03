/**
*	Host a Sonos element with different templates.
*/	
angular.module('sonos').directive("nhSonosElement", function($compile, $http, $templateCache, FHEM_CONFIG) {

	var getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = './views/templates/',
            templateMap = {
                list: 'list_sonos_element.html'             
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
		controller: 'SonosCtrl',
	    	    
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
angular.module('sonos').directive('nhSonosDetails', function(){
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
            controller: 'SonosModalCtrl',
        	link: function (scope, element, attrs){
        		element.on('click', function () {				
					scope.openStatisticDialog('lg');
				});
        }
    }
});