	
/**
*	Unix timestamp to UTC.
*/
angular.module('shared').filter('unixTimestampToUTC', function () {
	return function (utcDate) {					
		return new Date(utcDate*1000).getTime();
	}
});

/**
*	Seconds to readable time.
*/
angular.module('shared').filter('readableTime', function () {
return function(seconds) {
        //var seconds = Math.floor(milliseconds / 1000);
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
        var dateTimeDurationString = '';
        if ((days > 0) && (hours === 0 && minutes === 0)) dateTimeDurationString += (days > 1) ? (days + ' days ') : (days + ' day ');
        if ((days > 0) && (hours > 0 || minutes > 0)) dateTimeDurationString += (days > 1) ? (days + ' days, ') : (days + ' day, ');
        if ((hours > 0) && (minutes > 0)) dateTimeDurationString += (hours > 1) ? (hours + ' hours, ') : (hours + ' hour, ');
        if ((hours > 0) && (minutes === 0)) dateTimeDurationString += (hours > 1) ? (hours + ' hours ') : (hours + ' hour ');
        if (minutes > 0) dateTimeDurationString += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
        return dateTimeDurationString;
    };
});
		
/**
*	Calc windchill factor.
*/
angular.module('shared').filter('calcWindchillFactor', function () {
	return function (temperature, speed) {		
		//convert mps to kmh
		speed = speed * 0.36;
		
		return 13.12+(0.6215 * temperature)-(11.37*Math.pow(speed,0.16))+(0.3965*Math.pow(speed,0.16));			
	}
});

/**
*	Change the font size after the point form a decimal value.
*/
angular.module('shared').filter('smallDecimal', function ($sce) {
        return function (value, unit, topunit) {

        		var idx= value.indexOf(".");
        		var part1, part2
        		var result

        		if(idx != -1) {
        			part1 = value.substring(0,idx);
        			part2 = value.substring(idx);
        		} else {
        			part1=value;
        			part2='';
        		}        		
            	
            	result ='<span class="number">' + part1 + '</span>' +
        				'<span class="decimal">' + part2 + '</span>';

        		if( topunit )
        			result += '<span class="decimal valign-top">' + unit + '</span>';
        		else
        			result += '<span class="decimal">' + unit + '</span>';


            	return $sce.trustAsHtml( result );
                
            
        }
});

