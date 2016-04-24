/**
*	Slider directive.
*/	
angular.module('demo').directive('nhSlider1', function($compile,$interval,$timeout) {
	var template = '<div>{{fhem.Readings["measured-temp"].Value}} Hallo <div class="slider horizontal permanent-hint hint-bottom" data-role="slider" data-position="{{fhem.Readings["measured-temp"].Value}}" data-min="5" data-max="30" data-accuracy="1" data-animate data-show-hint="true" data-colors="blue, green, red"></div></div>';
	return {
        restrict: "E",   
        replace: true,
        transclude: true,
        scope : {
        	'dataRole' : '@',
        	'dataPosition' : '@',
			'dataMin' : '@',
			'dataMax'	:	'@',
			'dataAccuracy':	'@',
			'dataShowHint': '@',
			'dataColors' : '@'				
	    },
	    template: template,
	    controller: ['$scope', '$http', 'FhemFactory', function($scope,$http,FhemFactory){
			//alert('controller');
			$scope.fhem = null;	
			$scope.getControlData = function (name) {	

				FhemFactory.getControlData(name)
					.success(function (data) {	
						
						//if(!$scope.fhem || $scope.fhem.Readings.state.Value !== data.Results[0].Readings.state.Value)					
							$scope.fhem = data.Results[0];	
							//alert($scope.fhem.Readings["measured-temp"].Value);

						
					})
					.error(function (error) {
						$scope.status = 'Unable to load control data: ' + error.message;
					});
			};
											
		}],	

	    link: function(scope, element, attrs, ctrl){	
	    	//alert('link');
	    	
	    	scope.getControlData('BZ.Heizung');	
	    	//alert(scope.fhem);
	    	
	    	//if (scope.$last === true) {
                //$timeout execution is deferred until the end of the $watch/rendering lifecycle
                //it's safe(ish) to assume any operations in a $timeout will be performed on the DOM as it will be seen on the webpage
                $timeout(function () {
                	//$(element).find("[data-role=slider]").each(function() {
                    //	$(this).slider("value", 25);                    
                	//});

                	$(element).parent().find("[data-role=slider]").slider("value", 26);
                    //$(element).parent().find('[data-role=slider]').slider('value', 15);
                    //$(element).parent().find('.pull-menu, .menu-pull').each(function () {
                      //  $(this).PullDown();
                    //});
                });
           // }

			//element.html('').append($compile(template)(scope));
			//refresh interval
			//interval = $interval(function() {        
			//	scope.getControlData('BZ.Heizung');   				
			//}, FHEM_REFRESH_INTERVAL);
					
		}	
	};
});
/**
*	Slider directive.
*/
angular.module('demo').directive('nhSlider', function ($parse,$timeout) {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
    var modelAccessor = $parse(attrs.ngModel);

      var updateModel = function (inst) {    
        scope.$apply(function (scope) {
          ngModelCtrl.$setViewValue(inst);          
        });
      };
      var options = {         	            
        change: function (value, slider) {
          updateModel(value);

        },
        changed: function (value, slider) {
        	updateModel(value);
          
        }
      };
      elem.slider(options);    

      $timeout(function () { // You might need this timeout to be sure its run after DOM render.
                //elem.slider(options); 
                $(elem).slider();   
            }, 0, false);
      
      //$timeout(function () { 
      	//$("[data-role=slider]").slider("value", 26);    
      //}); 
    }
  }
});


angular.module('demo').directive('nhDatepicker2', function ($parse) {
 return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
    	
      var updateModel = function (inst) {    
        scope.$apply(function (scope) {
          ngModelCtrl.$setViewValue(inst);
        });
      };
      var options = {
        showOn:"both",
        changeYear:true,
        changeMonth:true,
        dateFormat:'dd-mm-yy',
        maxDate: new Date(),
        yearRange: '2000:2099',
        selected: function (dateText, inst) {
          updateModel(inst);
        }
      };
      elem.datepicker(options);
    }
  }
});

angular.module('demo').directive('nhDatepicker3', function ($parse) {
     return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function(){
            element.datepicker({
                showOn:"both",
                changeYear:true,
                changeMonth:true,
                dateFormat:'dd-mm-yy',
                maxDate: new Date(),
                yearRange: '2000:2099',
                selected:function (dateText, inst) {
          
                    scope.$apply(function(scope){
                        // Change binded variable
                        ngModel.assign(scope, inst);
                    });
                }
            });
        });
    }
});