
/**
*	Host the weather widget.
*/	  
angular.module('calendar').directive("nhGarbageCalendarTile", function() {
	
	var templateURL = './views/templates/garbage-calendar-tile.html';
	return {
		restrict: "E",		
		transclude: true,
		scope : {        	
			'bgColor' : '@',
			
			'image'	:	'@',
			
			'brandText' : '@'			
	    },	
		templateUrl: templateURL      
	};
});
