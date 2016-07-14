/**
*	Controller for a fhem Sonos element.
*/	
angular.module('sonos').controller('SonosCtrl',['$rootScope', '$scope' ,'$timeout','FhemWebSocketFactory','GENERAL_CONFIG', function($rootScope, $scope, $timeout, FhemWebSocketFactory, GENERAL_CONFIG){	
	
	
	/**
	*	Init the controler variables.
	*/
	var deviceName = undefined;	
	
	$scope.sonos_volume = 0;
	$scope.sonos_treble = 0;
	$scope.sonos_bass = 0;
	
	//var pauseWatching = false;
    // create the timer variable
    var clickTimer;
	
	$scope.sonosVolumePopover = {
		content: '',
		templateUrl: 'views/templates/sonos_volume_template.html',
		title: 'Volume'
	};
	
	$scope.sonosBassPopover = {
		content: '',
		templateUrl: 'views/templates/sonos_bass_template.html',
		title: 'Bass'
	};
	
	$scope.sonosTreblePopover = {
		content: '',
		templateUrl: 'views/templates/sonos_treble_template.html',
		title: 'Treble'
	};
	
	
    $scope.spinOption = {
        min: 0,
        max: 100,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
    };
	
	$scope.knobstyle = {
			min: 0,
			max: 50,
		 	size: 150,
		 	unit: "",
		 	startAngle: 270,
  			endAngle: 90,
		 	displayPrevious: true,
	  		trackColor: 'rgba(28, 132, 198, .1)',
	  		prevBarColor: 'rgba(28, 132, 198, .2)',
	  		barColor: 'rgba(28, 132, 198, .5)',
		  	trackWidth: 10,
	  		barWidth: 20,
		 	scale: {
			    enabled: true,
			    type: 'dots',
			    color: 'gray',
			    width: 1,
			    quantity: 20,
			    height: 8
			  },
		  	step: 1
		};

	
	
	$scope.$watch("sonos_volume", function(newValue, oldValue) {
		$timeout.cancel(clickTimer);
		if(newValue != oldValue){
			clickTimer = $timeout(function () {
				setSonosState('Volume',$scope.sonos_volume)
			}, 1000);
		}
	});
	
	$scope.$watch("sonos_bass", function(newValue, oldValue) {
		$timeout.cancel(clickTimer);
		if(newValue != oldValue){
			clickTimer = $timeout(function () {
				setSonosState('Bass',$scope.sonos_bass)
			}, 1000);
		}
	});
	
	$scope.$watch("sonos_treble", function(newValue, oldValue) {
		$timeout.cancel(clickTimer);
		if(newValue != oldValue){
			clickTimer = $timeout(function () {
				setSonosState('Treble',$scope.sonos_treble)
			}, 1000);
		}
	});
	
	
	$scope.init = function() {
		//$scope.fhem = {"Name":"sonos_Allgemein","Internals":"","Readings":{"Treble":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"1"},"GroupVolume":{"Time":"Di 28 Jun 2016 07:40:20 CEST GMT","Value":"0"},"currentTrackURI":{"Time":"Di 28 Jun 2016 06:29:53 CEST GMT","Value":"aac://mp3channels.webradio.antenne.de/antenne.aac"},"nextOriginalTrackNumber":{"Time":"So 26 Jun 2016 00:14:01 CEST GMT","Value":""},"Shuffle":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"0"},"PlaylistsVersion":{"Value":"RINCON_XXXXXXXXXXXXXXXXX,40","Time":"Sa 18 Jun 2016 10:27:48 CEST GMT"},"Balance":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"QueueHash":{"Value":"9a1c7ee2c7ce38d4bbbaf29ab9f2ac1e","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"presence":{"Time":"Di 28 Jun 2016 06:29:48 CEST GMT","Value":"appeared"},"softwareRevision":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"6.2"},"serialNum":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"B8-E9-37-E7-B3-C4:F"},"QueueVersion":{"Value":"","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"SubGain":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"0"},"CrossfadeMode":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"nextAlbumArtist":{"Value":"","Time":"So 26 Jun 2016 00:14:01 CEST GMT"},"infoSummarize4":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":""},"currentTitle":{"Value":"","Time":"Di 28 Jun 2016 06:29:55 CEST GMT"},"currentTrack":{"Value":"1","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"DailyIndexRefreshTime":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":""},"nextArtist":{"Value":"","Time":"Di 28 Jun 2016 06:29:55 CEST GMT"},"currentOriginalTrackNumber":{"Time":"So 26 Jun 2016 00:19:45 CEST GMT","Value":""},"fieldType":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":""},"nextTrackDuration":{"Time":"Di 28 Jun 2016 06:29:55 CEST GMT","Value":""},"SubEnable":{"Value":"1","Time":"Sa 18 Jun 2016 09:55:11 CEST GMT"},"infoSummarize1":{"Value":"ANTENNE BAYERN: Echosmith - Cool Kids","Time":"Di 28 Jun 2016 09:43:39 CEST GMT"},"nextTrackURI":{"Value":"","Time":"Di 28 Jun 2016 06:29:52 CEST GMT"},"location":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"http://192.168.190.41:1400/xml/device_description.xml"},"RadiosVersion":{"Value":"RINCON_XXXXXXXXXXXXXXXXX,28","Time":"Sa 18 Jun 2016 10:29:40 CEST GMT"},"OutputFixed":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"0"},"infoSummarize2":{"Time":"Di 28 Jun 2016 09:43:39 CEST GMT","Value":"PLAYING => ANTENNE BAYERN: Echosmith - Cool Kids"},"nextAlbum":{"Value":"","Time":"Sa 25 Jun 2016 23:36:29 CEST GMT"},"SleepTimer":{"Value":"off","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"HeadphoneConnected":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"0"},"nextTrackProvider":{"Value":"","Time":"So 26 Jun 2016 00:14:01 CEST GMT"},"currentSender":{"Time":"Di 28 Jun 2016 06:29:54 CEST GMT","Value":"ANTENNE BAYERN"},"IsMaster":{"Value":"1","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"RepeatOne":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"currentAlbumArtURI":{"Time":"Di 28 Jun 2016 06:29:54 CEST GMT","Value":"./www/images/default/SONOSPLAYER/sonos_Allgemein_AlbumArt.gif"},"currentTrackProvider":{"Time":"Di 28 Jun 2016 06:29:53 CEST GMT","Value":"Radio"},"Mute":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"0"},"Bass":{"Value":"4","Time":"So 19 Jun 2016 12:47:47 CEST GMT"},"currentArtist":{"Time":"Di 28 Jun 2016 06:29:55 CEST GMT","Value":""},"currentNormalAudio":{"Value":"0","Time":"Di 28 Jun 2016 06:29:55 CEST GMT"},"AlarmRunningID":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":""},"currentTrackDuration":{"Time":"Di 28 Jun 2016 06:29:48 CEST GMT","Value":"0:00:00"},"SleepTimerVersion":{"Value":"","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"roomIcon":{"Value":"living","Time":"Sa 18 Jun 2016 09:55:11 CEST GMT"},"GroupMute":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:11 CEST GMT"},"roomNameAlias":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"Allgemein"},"currentAlbumArtURL":{"Time":"Di 28 Jun 2016 06:29:54 CEST GMT","Value":"http://192.168.190.41:1400/getaa?s=1&u=x-sonosapi-stream%3as15034%3fsid%3d254%26flags%3d8224%26sn%3d0"},"AlarmList":{"Time":"Di 28 Jun 2016 06:29:53 CEST GMT","Value":"{}"},"AlarmRunning":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"nextAlbumArtURI":{"Time":"Di 28 Jun 2016 06:29:52 CEST GMT","Value":"./www/images/default/SONOSPLAYER/sonos_Allgemein_NextAlbumArt.png"},"MasterPlayer":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"sonos_Allgemein"},"nextAlbumArtURL":{"Time":"Di 28 Jun 2016 06:29:52 CEST GMT","Value":"/fhem/sonos/cover/empty.jpg"},"currentSenderInfo":{"Time":"Di 28 Jun 2016 09:43:39 CEST GMT","Value":"Echosmith - Cool Kids"},"currentStreamAudio":{"Value":"1","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"playerType":{"Value":"S1","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"ZoneGroupID":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"RINCON_XXXXXXXXXXXXXXXXX:__"},"Volume":{"Value":"0","Time":"Di 28 Jun 2016 07:40:20 CEST GMT"},"currentSenderCurrent":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":""},"Loudness":{"Value":"0","Time":"So 19 Jun 2016 12:47:46 CEST GMT"},"transportState":{"Value":"PLAYING","Time":"Di 28 Jun 2016 06:29:54 CEST GMT"},"state":{"Value":"appeared","Time":"Di 28 Jun 2016 06:29:52 CEST GMT"},"FavouritesVersion":{"Time":"Sa 18 Jun 2016 10:29:40 CEST GMT","Value":"RINCON_XXXXXXXXXXXXXXXXX,28"},"Repeat":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"0"},"nextTitle":{"Time":"Di 28 Jun 2016 06:29:55 CEST GMT","Value":""},"roomName":{"Value":"Allgemein","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"numberOfTracks":{"Value":"2","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"currentAlbumArtist":{"Time":"Di 28 Jun 2016 06:29:52 CEST GMT","Value":""},"saveRoomName":{"Value":"Allgemein","Time":"Sa 18 Jun 2016 09:55:10 CEST GMT"},"AlarmListIDs":{"Value":"","Time":"Di 28 Jun 2016 06:29:53 CEST GMT"},"currentAlbum":{"Value":"","Time":"So 26 Jun 2016 00:19:45 CEST GMT"},"TruePlay":{"Value":"0","Time":"Sa 18 Jun 2016 09:55:11 CEST GMT"},"currentTrackPosition":{"Time":"So 26 Jun 2016 00:35:19 CEST GMT","Value":"0:00:00"},"AlarmListVersion":{"Time":"Di 28 Jun 2016 06:29:53 CEST GMT","Value":"RINCON_XXXXXXXXXXXXXXXXX:0"},"SlavePlayer":{"Time":"Sa 18 Jun 2016 09:55:10 CEST GMT","Value":"[]"},"SubPolarity":{"Time":"Sa 18 Jun 2016 09:55:11 CEST GMT","Value":"0"},"LastActionResult":{"Value":"GetFavourites: \"1LIVE\",\"Antenne\",\"DASDING\",\"PN-Eins\",\"Pure-FM\",\"ROCK-ANTENNE\",\"Radio-Gong\",\"sunshine live\",\"sunshine live - Die 90er\",\"sunshine live - EDM\",\"sunshine live - house\"","Time":"Di 28 Jun 2016 09:46:35 CEST GMT"},"infoSummarize3":{"Value":"LautstÃ¤rke: 0 ~ Ton An ~ Balance: Mitte ~ Kein KopfhÃ¶rer","Time":"Di 28 Jun 2016 07:43:25 CEST GMT"}},"Attributes":"","Sets":"","Gets":"","AttrList":"","Image":"images/controls/window_blind_25.png"};
		
		if (typeof deviceName != 'undefined') {
			if (typeof $rootScope.devicelist[deviceName] != 'undefined'){
				
				$scope.fhem = $rootScope.devicelist[deviceName];
				
	
			}

			setTempSonosParameters();
		}
	}

	/**
	*	Method to register a listener callback to be executed 
	*	whenever a device changes.
	*/
	$scope.registerName = function (name) {	
		deviceName = name; 

		$scope.$watch(
            "$root.devicelist['"+name+"']",
			watchListenerCallback,true
        );
	}

	/**
	*	Listener callback for the scope watch.
	*/
	var watchListenerCallback = function(newValue, oldValue) {
		if (typeof newValue != 'undefined'){
			if(GENERAL_CONFIG.APP_DEBUG)
				console.log("Fire from "+ newValue.Name +":" + JSON.stringify(newValue));

			$scope.fhem = newValue;	
			
			setTempSonosParameters();
			
		}	
	}

	/**
	* Refresh the model parameters.
	*/
	function setTempSonosParameters() {
		if (typeof $scope.fhem.Readings.Volume != 'undefined')
			$scope.sonos_volume=$scope.fhem.Readings.Volume.Value;
		if (typeof $scope.fhem.Readings.Bass != 'undefined')	
			$scope.sonos_bass=$scope.fhem.Readings.Bass.Value;
		if (typeof $scope.fhem.Readings.Treble != 'undefined')
			$scope.sonos_treble=$scope.fhem.Readings.Treble.Value;
	}
	
	
	$scope.setPlay = function(){
		var name = $scope.fhem.Name;
		var cmd = "set " + name + " Play";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	$scope.setPause = function(){
		var name = $scope.fhem.Name;
		var cmd = "set " + name + " Pause";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	$scope.setStop = function(){
		var name = $scope.fhem.Name;
		var cmd = "set " + name + " Stop";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}

	/**
	* Set the Sonos state.
	* type: Volume, Bass, Treble
	*/
	setSonosState = function(type, value) {
		var name = $scope.fhem.Name;		
		var cmd = "set " + name + " " + type + " " + value;
		//var cmd = "setreading " + name + " " + type + " " + value;
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}	
}]);

/**
*	SONOS Modal Controller - used to run modal view
*/	
angular.module('sonos').controller('SonosModalCtrl',['$scope','$uibModal', function($scope, $uibModal){	

	$scope.items  =  {
		text: $scope.text,
		description: $scope.description, 
		fhemDevices: $scope.fhemDevices, 
		fhemDeviceReadings:  $scope.fhemDeviceReadings,
		fhemDeviceReadingsTextsArray:   $scope.fhemDeviceReadingsTexts,
	};

	$scope.openStatisticDialog = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/templates/sonos_detail_dialog.html',
            controller: 'SonosCtrl',
            windowClass: "animated flipInY",
            resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
        });
    };

}]);
