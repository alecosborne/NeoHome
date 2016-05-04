/**
*	The nh-neoHome config file.
*
* console.log()
* console.debug()
* console.info()
* console.warn()
* console.error()
*
*
*/
/**
 *	Application constants
 */
var APP_NAME = "NeoHome";
var APP_VERSION = "Alpha 0.5";
var APP_ROOTPATH = "NeoHome_Seed";
var APP_DEBUG = false;
var APP_CONTROLLER_DEBUG = false;
var APP_DIRECTIVE_DEBUG = false;
var APP_SERVICE_DEBUG = false;

/**
 *	Fhem constants
 */
var FHEM_URL = "http://192.168.1.24:8083/fhem";
var FHEM_OVER_WEB_SOCKET = true;
var FHEM_WEB_SOCKET_URL = "ws://192.168.1.24:8080";
var FHEM_WEB_SOCKET_SECURE_URL = "wss://192.168.1.24:8080";
var FHEM_WEB_SOCKET_SECURE = false;

/**
*	Weather constants
*   	OpenWeatherMap API (http://openweathermap.org/)
*		Calls per day (no more then): 4,000,000
*		Weather data update: From 10 min to 2 hours
*/
var OPENWEATHERMAP_ACTIVE = true;
var OPENWEATHERMAP_APPID = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var OPENWEATHERMAP_API_URL = "http://api.openweathermap.org/data/2.5/";
var OPENWEATHERMAP_WEATHER_URL = "weather?lat=49.30&lon=8.60&units=metric&lang=en&APPID="; 
var OPENWEATHERMAP_FORECAST_HOURLY_URL = "forecast?lat=49.30&lon=8.60&units=metric&lang=en&APPID="; 
var OPENWEATHERMAP_FORECAST_DAILY_URL = "forecast/daily?lat=49.30&lon=8.60&units=metric&lang=en&cnt=7&APPID="; 
var OPENWEATHERMAP_REFRESH_INTERVAL = 600000;

/**
* Weather constants
*     Wunderground API (http://wunderground.com/)
*   Calls per day (no more then): ?
*   Weather data update: ?
*/
var WUNDERGROUND_ACTIVE = false;
var WUNDERGROUND_API_URL = "http://api.wunderground.com/api/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/";
var WUNDERGROUND_WEATHER_URL ="conditions/lang:DL/q/pws:IHEIDELB27.json"; 
var WUNDERGROUND_FORECAST_HOURLY_URL = "hourly/lang:DL/q/pws:IHEIDELB27.json";
var WUNDERGROUND_FORECAST_DAILY_URL = "forecast/lang:DL/q/pws:IHEIDELB27.json";
var WUNDERGROUND_REFRESH_INTERVAL = 600000;

/**
* NETATMO constants
*     
*   
*   
*/
var NETATMO_ACTIVE = false;
var NETATMO_CLIENT_ID = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var NETATMO_CLIENT_SECRET = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var NETATMO_USERNAME = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var NETATMO_PASSWORD = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var NETATMO_REFRESH_INTERVAL = 600000;

/**
* Google calendar constants
*/
var GOOGLE_CALENDAR_GARBAGE_CAN_URL = "https://www.googleapis.com/calendar/v3/calendars/XXXXXXXXXXXXXXX@group.calendar.google.com/events?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX&"
var GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_SINGLE_EVENTS = "singleEvents=true&";
var GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_ORDER_BY = "orderBy=startTime&";
var GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_MAX_RESULTS = "maxResults=3&";
var GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_TIME_MIN = "timeMin=" +  new Date().toISOString() +"&";
var GOOGLE_CALENDAR_GARBAGE_CAN_REFRESH_INTERVAL = 600000;

/**
* Devicelist
*/
var DEVICES = [
    { id: '0', name: 'FHEM_DEMO_SWITCH_1'},
    { id: '1', name: 'FHEM_DEMO_STATE'},
    { id: '2', name: 'FF_che_TH_heater'},
    { id: '3', name: 'FF_che_TH_heater_Clima'}
];

var config_data = {
  'GENERAL_CONFIG': {
    'APP_NAME': APP_NAME,
    'APP_VERSION': APP_VERSION,
    'APP_ROOTPATH': APP_ROOTPATH,    
    'APP_DEBUG': APP_DEBUG,
    'APP_CONTROLLER_DEBUG': APP_CONTROLLER_DEBUG,
    'APP_DIRECTIVE_DEBUG': APP_DIRECTIVE_DEBUG,
    'APP_SERVICE_DEBUG': APP_SERVICE_DEBUG
  },
  'FHEM_CONFIG': {
    'DEVICES': DEVICES, 
    'FHEM_URL': FHEM_URL,
    'FHEM_OVER_WEB_SOCKET': FHEM_OVER_WEB_SOCKET,
    'FHEM_WEB_SOCKET_URL': FHEM_WEB_SOCKET_URL,
    'FHEM_WEB_SOCKET_SECURE_URL': FHEM_WEB_SOCKET_SECURE_URL,
    'FHEM_WEB_SOCKET_SECURE' : FHEM_WEB_SOCKET_SECURE
  },
  'WEATHER_CONFIG': {
    'OPENWEATHERMAP_ACTIVE': OPENWEATHERMAP_ACTIVE,
    'OPENWEATHERMAP_APPID': OPENWEATHERMAP_APPID,
    'OPENWEATHERMAP_API_URL': OPENWEATHERMAP_API_URL,
    'OPENWEATHERMAP_WEATHER_URL': OPENWEATHERMAP_WEATHER_URL,
    'OPENWEATHERMAP_FORECAST_HOURLY_URL': OPENWEATHERMAP_FORECAST_HOURLY_URL,
    'OPENWEATHERMAP_FORECAST_DAILY_URL': OPENWEATHERMAP_FORECAST_DAILY_URL,
    'OPENWEATHERMAP_REFRESH_INTERVAL': OPENWEATHERMAP_REFRESH_INTERVAL,
    'WUNDERGROUND_ACTIVE': WUNDERGROUND_ACTIVE,
    'WUNDERGROUND_API_URL': WUNDERGROUND_API_URL,
    'WUNDERGROUND_WEATHER_URL': WUNDERGROUND_WEATHER_URL,
    'WUNDERGROUND_FORECAST_HOURLY_URL': WUNDERGROUND_FORECAST_HOURLY_URL,
    'WUNDERGROUND_FORECAST_DAILY_URL': WUNDERGROUND_FORECAST_DAILY_URL,
    'WUNDERGROUND_REFRESH_INTERVAL': WUNDERGROUND_REFRESH_INTERVAL,
    'NETATMO_ACTIVE': NETATMO_ACTIVE,
    'NETATMO_CLIENT_ID':NETATMO_CLIENT_ID,
    'NETATMO_CLIENT_SECRET':NETATMO_CLIENT_SECRET,
    'NETATMO_USERNAME':NETATMO_USERNAME,
    'NETATMO_PASSWORD':NETATMO_PASSWORD,
    'NETATMO_REFRESH_INTERVAL': NETATMO_REFRESH_INTERVAL
  },
  'GOOGLE_CALENDAR_GARBAGE_CAN_CONFIG': {
    'GOOGLE_CALENDAR_GARBAGE_CAN_URL': GOOGLE_CALENDAR_GARBAGE_CAN_URL,
    'GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_SINGLE_EVENTS': GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_SINGLE_EVENTS,
    'GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_ORDER_BY': GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_ORDER_BY,
    'GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_MAX_RESULTS': GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_MAX_RESULTS,
    'GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_TIME_MIN': GOOGLE_CALENDAR_GARBAGE_CAN_URL_ATTR_TIME_MIN,
    'GOOGLE_CALENDAR_GARBAGE_CAN_REFRESH_INTERVAL': GOOGLE_CALENDAR_GARBAGE_CAN_REFRESH_INTERVAL    
  }
}


/**
 * NeoHome - Viewrouting
 *
 * NeoHome use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/dashboard");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html"
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                           files: ['js/plugins/MetroJS/release/MetroJs.Full/MetroJs.js','js/plugins/MetroJS/release/MetroJs.Full/MetroJs.min.css']
                        }
                    ]);
                }
            }
        })
        .state('rooms', {
            abstract: true,
            url: "/rooms",
            templateUrl: "views/common/content.html",
        })
        .state('rooms.demo_room1', {
            url: "/demo_room1",
            templateUrl: "views/demo_room1.html",
            data: { pageTitle: 'Demo room 1' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                           name: 'uiSwitch',
                           files: ['css/plugins/angular-ui-switch/angular-ui-switch.min.css','js/plugins/angular-ui-switch/angular-ui-switch.min.js']
                        }
                    ]);
                }
            }
        })   
        .state('index.demo_thema1', {
            url: "/demo_thema1",
            templateUrl: "views/demo_thema1.html",
            data: { pageTitle: 'Demo thema 1' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.knob',
                            files: ['js/plugins/RadMie-ng-knob/dist/ng-knob.min.js']
                        }
                    ]);
                }
            }
        })
}


/**
* Translate configuration
*/
function translate($translateProvider) {

    var simpleJavaPropertiesReader = function (lines) {
        var result = {};
        var patterns = [
          /^\s*([^=:]+)\s*[:|=]\s*(.*)$/ // anything before = or : (the key), then everything unitl the end
        ];
        var quotePattern = /^"(.*)"$/;
        for (var i = 0; i < lines.length; i++) {
          for (var j = 0; j < patterns.length; j++) {
            var match = lines[i].match(patterns[j]);
            if (match && match[0] && match[0].length > 0) {
              var key = match[1], value = match[2];
              if (value && value.length > 0) {
                var quoteMatch = value.match(quotePattern);
                if (quoteMatch && quoteMatch[0] && quoteMatch[0].length) {
                  value = quoteMatch[1];
                }
              }
              result[key] = value;
              break;
            }
          }
        }
        return result;
    };


   // Register a loader for the static files
   // So, the module will search missing translation tables under the specified urls.
   // Those urls are [prefix][langKey][suffix].
   $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.properties',
    $http: {
      transformResponse: function (data, headersGetter, status) {
        return simpleJavaPropertiesReader(data.split('\n'));
      }
    }
   });
   // Tell the module what language to use by default
   $translateProvider.preferredLanguage('en_US');
   // Enable escaping of HTML
   $translateProvider.useSanitizeValueStrategy('escapeParameters');
   //$translateProvider.useSanitizeValueStrategy('escape');
   //$translateProvider.useSanitizeValueStrategy('sanitize');
}


/*
* Add the routingview, the translate  and the config to the smarthome module.
*/
angular
    .module('smarthome')
    .config(config)
    .config(translate)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

/*
* Add the constans to the base nh.config module.
*/
angular.forEach(config_data,function(key,value) {
  angular.module('nh.config').constant(value,key);
});