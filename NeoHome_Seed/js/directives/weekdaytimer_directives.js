angular.module('weekdaytimer').directive('nhWeekDayTimer', function(){
	return {            
            restrict: 'A',
            scope: {                
                'fhemName': '@',
                'fhemWeekDayTimerDevice': '@',
                'description' : '@',
                'commandos' : '@'
                
                
            },
            controller: 'ModalWeekDayTimerCtrl',
        	link: function (scope, element, attrs){

                scope.init();
                scope.registerName(attrs.fhemName);   

        		element.on('click', function () {	
					scope.openDialog('lg');
				});
        }
    }
});