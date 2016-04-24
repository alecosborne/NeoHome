(function (angular) {
	
	// service
	var CounterService = (function () {
		
		function CounterService() {
		};
		CounterService.prototype.count = function (object, property, from, to, duration, effect, step, finish) {
			var target = {};
			
			// stop previous animation
			$(object).stop(true, true);
			object[property] = parseFloat(from || 0);
			target[property] = parseFloat(to || 0);
			
			if (object[property] == target[property]) return;
			
			$(object).animate(target, {
				duration: duration,
				easing: effect,
				step: step
			}).promise().done(function () {
				if (angular.isFunction(finish)) finish();
			});
		};
		
		return CounterService;
	})();
	
	// directive
	var CounterDirective = (function () {
		
		function CounterDirective(counter, timeout) {
			this.restrict = 'EAC';
			this.scope = {
				to:       '=',
				value:    '=',
				effect:   '=?',
				duration: '=?',
				finish:   '&?'
			};
			$counter = counter;
			$timeout = timeout;
		};
		CounterDirective.prototype.$inject = ['$counter', '$timeout'];
		CounterDirective.prototype.link = function ($scope, $element, $attrs, $controller) {
			var defaults = {
					effect:   'linear',
					duration: 1000
				};
			
			if (!angular.isDefined($scope.to))
				throw new 'Angular Counter: attribute `to` is undefined';
			
			angular.forEach(defaults, function (value, key) {
				if (!angular.isDefined($scope[key])) $scope[key] = defaults[key];
			});
			
			$scope.step = function (value) {
				$timeout(function () {
					$scope.$apply(function () {
						$scope.value = value;
					});
				});
			};
			
			$scope.$watch('to', function () {
				$counter.count($scope, 'value', $scope.value, $scope.to, $scope.duration, $scope.effect, $scope.step, $scope.finish);
			});
		};
		
		return CounterDirective;
	})();
	
	angular
		.module('counter', [])
		.service('$counter', function () {
			return new CounterService();
		})
		.directive('counter', ['$counter', '$timeout', function ($counter, $timeout) {
			return new CounterDirective($counter, $timeout);
		}]);
	
})(window.angular);