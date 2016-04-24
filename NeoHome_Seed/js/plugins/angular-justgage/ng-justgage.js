angular.module("charts.ng.justgage", [])
    .directive('justGage', ['$timeout', function ($timeout) {
      return {
        restrict: 'EA',
        scope: {
          id: '@',
          min: '=',
          max: '=',
          title: '@',
          width: '=?',
          height: '=?',
          value: '=?',
          donut: '=?',
          titleFontColor: '@',
          valueFontColor: '@',
          labelFontColor: '@',
          decimals: '=?',
          gaugeWidthScale: '=?',
          gaugeColor: '@?',
          label: '=?',
          symbol: '@',
          customSectors: '@',
          donutStartAngle: '@',
          relativeGaugeSize: '=?',
          valueMinFontSize: '=?',
          titleMinFontSize: '=?',
          labelMinFontSize: '=?',
          labelMinFontSize: '=?',
          hideValue: '=?',
          hideMinMax: '=?'
        },
        template: '<div id={{id}}-justgage></div>',
        link: function ($scope, $element, $attrs) {
          $timeout(function () {
            var customSectors = [];
            if (typeof $scope.customSectors !== 'undefined') {
              var csParse = $scope.customSectors.split(' ')
              csParse.forEach(function(element){
                element = element.split('-');
                customSectors.push({color: element[2], lo: element[0], hi: element[1]})
              });
            }

            // Backwards compatibility for gauge-color="'#ff0000'" syntax
            if ($scope.gaugeColor) {
              $scope.gaugeColor = $scope.gaugeColor.replace(/^'|'$/g, "");
            }

            var g = new JustGage({
              id: $scope.id + '-justgage',
              min: $scope.min,
              max: $scope.max,
              title: $scope.title,
              width: $scope.width || null,
              height: $scope.height || null,
              value: $scope.value || 0,
              donut: angular.isDefined($scope.donut) ? $scope.donut : false,
              titleFontColor: $scope.titleFontColor || "#999999",
              valueFontColor: $scope.valueFontColor || "#010101",
              labelFontColor: $scope.labelFontColor || "#b3b3b3",
              decimals: $scope.decimals || 0,
              gaugeWidthScale: $scope.gaugeWidthScale || 1.0,
              gaugeColor: $scope.gaugeColor || "#edebeb",
              label: $scope.label || '',
              symbol: $scope.symbol || '',
              customSectors: customSectors,
              donutStartAngle: $scope.donutStartAngle || 90,
              relativeGaugeSize: angular.isDefined($scope.relativeGaugeSize) ? $scope.relativeGaugeSize : false,
              valueMinFontSize: $scope.valueMinFontSize || 16,
              titleMinFontSize: $scope.titleMinFontSize || 10,
              labelMinFontSize: $scope.labelMinFontSize || 10,
              minLabelMinFontSize: $scope.labelMinFontSize || 10,
              maxLabelMinFontSize: $scope.labelMinFontSize || 10,
              hideValue: $scope.hideValue || false,
              hideMinMax: $scope.hideMinMax || false
            })

            $scope.$watch('value', function (updatedValue) {
              if (updatedValue) {
                g.refresh(updatedValue)
              }
            }, true);
          });
        }
      };
    }]);