/**
 * Neohome - 
 *
 */
(function () {
    var app = angular.module('smarthome', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
		'ngAnimate', 
		
        'pascalprecht.translate',         
        'ngCookies',
        'ngSanitize',

        // application libs
		'shared',
        'heating',
		'sonos',
		'window',
        'weather',
        'energy',
		'calendar',  
        'infrastructure',      
		'fhem_filters'
    ]);

    var app = angular.module('calendar',['nh.config']);
	//var app = angular.module('shared',['ngDialog','nh.config','uiSwitch']);
    var app = angular.module('shared',['ngDialog','nh.config']);   

    //var app = angular.module('shared',['nh.config']); 
	var app = angular.module('window',[]);
	var app = angular.module('heating',[]);
	var app = angular.module('sonos',[]);
    var app = angular.module('infrastructure',[]);
    var app = angular.module('weather',['nh.config']);
    var app = angular.module('energy',['nh.config']);
    var app = angular.module('nh.config', []);    
    var app = angular.module('fhem_filters',[]);
})();






