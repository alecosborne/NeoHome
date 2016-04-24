/**
*	Host the main container. The main container host the tabs.
*/	
angular.module('layout').directive("nhContainer", function() {
	return {
        restrict: "E",
        templateUrl: "views/container.html",
        controller: function() {
          this.tab = 1;

          this.isSet = function(checkTab) {
            return this.tab === checkTab;
          };
		  
		      this.isNotSet = function(checkNotTab) {
            return this.tab != checkNotTab;
          };

          this.setTab = function(activeTab) {
            this.tab = activeTab;
          };
        },
        controllerAs: "tab"
    };
});

/**
*	Host a tab.
*/	
angular.module('layout').directive("nhTab", function() {
	return {
		restrict: "E",		
        templateUrl: function(elem,attrs) {
           return attrs.templateUrl || './views/home-tab.html'
       }		
	};
});