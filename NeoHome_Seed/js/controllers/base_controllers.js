/**
 * NeoHome - base controllers
 *
 */

/**
*	Main controller.
*/	
angular.module('smarthome').controller('MainCtrl', function($scope,$translate,FhemWebSocketFactory,GENERAL_CONFIG,FHEM_CONFIG){				
	
	var application = this;		
	application.app_name = GENERAL_CONFIG.APP_NAME;
	application.app_version = GENERAL_CONFIG.APP_VERSION;

    $scope.setLang = function(langKey) {
    // You can change the language during runtime
    	$translate.use(langKey);
  	}		

	
    /* Subscribe for the devices events.*/
    for (var device = 0; device < FHEM_CONFIG.DEVICES.length; device++) {
        
        var name = FHEM_CONFIG.DEVICES[device].name;
               
        FhemWebSocketFactory.subscribeEvent('.*',name,'.*'); 
    };
    
});

/**
*	Date/Time controller.
*/	
angular.module('smarthome').controller('CurrentDateTimeCtrl', function($scope, $timeout, GENERAL_CONFIG){				
	
	$scope.currentDateTime = new Date();

    function updateLater() {
        $timeout(function() {
            $scope.currentDateTime = new Date();
            updateLater();
        }, 1000);
    }
    updateLater();	
});




