
/**
*	Garbage calendar controller.
*/	
angular.module('calendar').controller('GarbageCalendarCtrl',['$scope','$interval','CalendarFactory','GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG', function($scope, $interval, CalendarFactory, GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG){				
	
	var garbageCalendar = this;		
	garbageCalendar.result = null;		
	
	function getGarbageCalendar() {
        CalendarFactory.getGarbageCalendar()
            .success(function (data) {            	
                garbageCalendar.result = data;

                var today = new Date().toDateString();
                var tomorow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString();

                var resultIsTodayOrTomorow = false;
                
                angular.forEach(data.items, function (item, index) {
                	var checkDate = new Date(item.start.date).toDateString();
					if(today == checkDate || tomorow == checkDate)	{resultIsTodayOrTomorow=true;}
				})
                garbageCalendar.result.isTodayOrTomorow = resultIsTodayOrTomorow;                
            })
            .error(function (error) {
                $scope.status = 'Unable to load garbage calendar data: ' + error.message;
            });
    }
	
	//init
	getGarbageCalendar();
	
	//refresh interval
	interval = $interval(function() {        
		getGarbageCalendar();        
	}, GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG.GOOGLE_CALENDAR_GARBAGE_CAN_REFRESH_INTERVAL);
	
}]);

	
	
	
	
