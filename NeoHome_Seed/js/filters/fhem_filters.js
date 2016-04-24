	
/**
*	Check if the item had a attribute room '?' and a attribute type '?'.
*/
angular.module('fhem_filters').filter('isASwitch', function () {
	return function (items, room, type) {
		var filtered = [];
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item.Attributes.room == room && item.Internals.TYPE == type) {
					filtered.push(item);
				}
			}
		return filtered;
	};
});			
