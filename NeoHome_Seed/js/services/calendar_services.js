/**
*	Load calendar data from anywere.
*/	
angular.module('calendar').factory('CalendarFactory', ['$http','GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG', function($http,GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG) {
	
	var calendarFactory = {};
	
	// Load garbage calendar data from google.
	calendarFactory.getGarbageCalendar = function () {
		var calendarUrl = GOOGLE_CALENDAR_GARBAGE_CAN_URL+
				  GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_SINGLE_EVENTS+
				  GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_ORDER_BY+
				  GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_MAX_RESULTS+
				  GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_TIME_MIN;				  
		return $http({ method: 'GET', url: calendarUrl});
	};
	
	return calendarFactory;
}]);