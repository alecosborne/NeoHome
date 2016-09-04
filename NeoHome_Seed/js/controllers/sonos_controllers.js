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
			refreshFavourites();
			refreshPlaylists();
			refreshRadios();
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
	* Refresh the favourites
	*/
	function refreshFavourites() {
		var name = $scope.fhem.Name;
		var cmd = "get " + name + " Favourites";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	/**
	* Refresh the playlists
	*/
	function refreshPlaylists() {
		var name = $scope.fhem.Name;
		var cmd = "get " + name + " Playlists ";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	/**
	* Refresh the radios
	*/
	function refreshRadios() {
		var name = $scope.fhem.Name;
		var cmd = "get " + name + " Radios ";
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	/**
	* Load/Start a new favourites
	*/
	$scope.startFavourite = function(favourite){
		var name = $scope.fhem.Name;
		favourite=favourite.replace(/ /g, '%20')
		var cmd = "set " + name + " StartFavourite " + favourite ;
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	/**
	* Load/Start a new radio
	*/
	$scope.startRadio  = function(radio){
		var name = $scope.fhem.Name;
		radio=radio.replace(/ /g, '%20')
		var cmd = "set " + name + " StartRadio " + radio ;
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}
	
	/**
	* Load/Start a new playlist
	*/
	$scope.startPlaylist  = function(playlist){
		var name = $scope.fhem.Name;
		playlist=playlist.replace(/ /g, '%20')
		var cmd = "set " + name + " StartPlaylist " + playlist ;
		FhemWebSocketFactory.sendFhemCommand(cmd);
	}

	/**
	* Refresh the model parameters.
	*/
	function setTempSonosParameters() {
		$scope.fhem = {"Name":"sonos_Allgemein","Internals":"","Readings":{"infoSummarize2":{"Value":"PLAYING => <NormalAudio>[Keine Musikdatei]</NormalAudio> <Strea$","Time":"Wed Aug 24 15:50:16 2016 GMT"},"roomNameAlias":{"Value":"Allgemein","Time":"Sat Aug 13 16:43:21 2016 GMT"},"RepeatOne":{"Value":"0","Time":"Tue Aug  2 07:55:59 2016 GMT"},"Mute":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"0"},"RadiosVersion":{"Value":"RINCON_B8E937E7B3C401400,6","Time":"Sat Aug 13 18:37:55 2016 GMT"},"Volume":{"Value":"30","Time":"Wed Aug 24 16:30:24 2016 GMT"},"AlarmList":{"Value":"{}","Time":"Wed Aug 24 15:50:14 2016 GMT"},"currentAlbum":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"nextTrackDuration":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"nextTrackURI":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"softwareRevision":{"Time":"Tue Aug  2 07:55:49 2016 GMT","Value":"6.3"},"roomName":{"Time":"Sat Aug 13 16:43:21 2016 GMT","Value":"Allgemein"},"roomIcon":{"Value":"living","Time":"Tue Aug  2 07:56:00 2016 GMT"},"nextAlbumArtURL":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"/fhem/sonos/cover/empty.jpg"},"currentTitle":{"Time":"Sat Aug 13 16:43:03 2016 GMT","Value":""},"SlavePlayer":{"Value":"[]","Time":"Tue Aug  2 07:55:49 2016 GMT"},"nextArtist":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"state":{"Value":"appeared","Time":"Wed Aug 24 15:50:14 2016 GMT"},"QueueHash":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"9a1c7ee2c7ce38d4bbbaf29ab9f2ac1e"},"nextOriginalTrackNumber":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"GroupMute":{"Value":"0","Time":"Tue Aug  2 07:55:59 2016 GMT"},"infoSummarize4":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"presence":{"Time":"Wed Aug 24 15:50:09 2016 GMT","Value":"appeared"},"currentTrackURI":{"Value":"aac://mp3channels.webradio.antenne.de/antenne.aac","Time":"Wed Aug 24 15:50:14 2016 GMT"},"SubPolarity":{"Value":"0","Time":"Tue Aug  2 07:56:00 2016 GMT"},"SleepTimer":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"off"},"SubEnable":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"1"},"nextAlbumArtist":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"LastActionResult":{"Value":"GetFavourites: \"1LIVE diggi - Multimedia - 1LIVE\",\"Antenne\",\"sunshine live - Lounge\",\"sunshine live - classics\",\"sunshine live - house\"","Time":"Wed Aug 24 16:31:29 2016 GMT"},"Balance":{"Time":"Tue Aug  2 07:55:49 2016 GMT","Value":"0"},"Treble":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"0"},"currentSenderInfo":{"Value":"ANTENNE BAYERN - Wetter","Time":"Wed Aug 24 16:31:10 2016 GMT"},"SubGain":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"0"},"serialNum":{"Value":"B8-E9-37-E7-B3-C4:F","Time":"Tue Aug  2 07:55:49 2016 GMT"},"nextTitle":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"currentOriginalTrackNumber":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"Bass":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"0"},"DailyIndexRefreshTime":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"OutputFixed":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"0"},"infoSummarize1":{"Value":"<NormalAudio>[Keine Musikdatei]</NormalAudio> <Strea$","Time":"Wed Aug 24 15:50:16 2016 GMT"},"currentAlbumArtist":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"currentAlbumArtURI":{"Time":"Wed Aug 24 15:50:16 2016 GMT","Value":"./www/images/default/SONOSPLAYER/sonos_Allgemein_AlbumArt.gif"},"currentArtist":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"ZonePlayerUUIDsInGroup":{"Time":"Sat Aug 13 16:43:06 2016 GMT","Value":"RINCON_B8E937E7B3C401400"},"currentTrackPosition":{"Value":"0:00:00","Time":"Wed Aug 24 15:50:16 2016 GMT"},"Repeat":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"0"},"infoSummarize3":{"Value":"LautstÃ¤rke: 30 ~ Ton An ~ Balance: Mitte<HeadphoneConnected in$","Time":"Wed Aug 24 16:31:10 2016 GMT"},"playerType":{"Value":"S1","Time":"Tue Aug  2 07:55:49 2016 GMT"},"Loudness":{"Value":"1","Time":"Tue Aug  2 07:56:00 2016 GMT"},"QueueVersion":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":""},"currentAlbumArtURL":{"Time":"Wed Aug 24 15:50:16 2016 GMT","Value":"http://192.168.190.41:1400/getaa?s=1&u=x-sonosapi-stream%3as15030%3fsid%3d254%26flags%3d8224%26sn%3d0"},"location":{"Time":"Tue Aug  2 07:55:49 2016 GMT","Value":"http://192.168.190.41:1400/xml/device_description.xml"},"ZoneGroupName":{"Value":"Allgemein","Time":"Sat Aug 13 16:43:21 2016 GMT"},"nextAlbumArtURI":{"Value":"./www/images/default/SONOSPLAYER/sonos_Allgemein_NextAlbumArt.png","Time":"Tue Aug  2 07:55:59 2016 GMT"},"saveRoomName":{"Time":"Sat Aug 13 16:43:21 2016 GMT","Value":"Allgemein"},"PlaylistsVersion":{"Time":"Sat Aug 13 16:42:18 2016 GMT","Value":"RINCON_B8E937E7B3C401400,0"},"currentNormalAudio":{"Time":"Wed Aug 24 15:50:16 2016 GMT","Value":"0"},"currentTrackDuration":{"Value":"0:00:00","Time":"Tue Aug 23 18:26:55 2016 GMT"},"AlarmListVersion":{"Value":"RINCON_B8E937E7B3C401400:0","Time":"Wed Aug 24 15:50:14 2016 GMT"},"nextTrackProvider":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"currentSender":{"Time":"Sat Aug 13 16:52:53 2016 GMT","Value":"ANTENNE BAYERN"},"MasterPlayer":{"Value":"sonos_Allgemein","Time":"Tue Aug  2 07:55:49 2016 GMT"},"AlarmRunning":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"0"},"GroupVolume":{"Value":"30","Time":"Wed Aug 24 16:30:24 2016 GMT"},"fieldType":{"Value":"","Time":"Tue Aug  2 07:55:49 2016 GMT"},"HeadphoneConnected":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"0"},"AlarmRunningID":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"transportState":{"Time":"Wed Aug 24 15:50:14 2016 GMT","Value":"PLAYING"},"nextAlbum":{"Value":"","Time":"Tue Aug  2 07:55:59 2016 GMT"},"currentSenderCurrent":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"Shuffle":{"Value":"0","Time":"Tue Aug  2 07:55:59 2016 GMT"},"SleepTimerVersion":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":""},"numberOfTracks":{"Value":"2","Time":"Wed Aug 24 15:50:14 2016 GMT"},"FavouritesVersion":{"Value":"RINCON_B8E937E7B3C401400,6","Time":"Sat Aug 13 18:37:55 2016 GMT"},"currentTrack":{"Value":"1","Time":"Wed Aug 24 15:50:14 2016 GMT"},"AlarmListIDs":{"Value":"","Time":"Wed Aug 24 15:50:14 2016 GMT"},"TruePlay":{"Time":"Tue Aug  2 07:56:00 2016 GMT","Value":"0"},"ZoneGroupID":{"Value":"RINCON_B8E937E7B3C401400:__","Time":"Tue Aug  2 07:56:00 2016 GMT"},"currentStreamAudio":{"Value":"1","Time":"Wed Aug 24 15:50:14 2016 GMT"},"IsMaster":{"Time":"Tue Aug  2 07:55:49 2016 GMT","Value":"1"},"currentTrackProvider":{"Value":"Radio","Time":"Wed Aug 24 15:50:14 2016 GMT"},"CrossfadeMode":{"Time":"Tue Aug  2 07:55:59 2016 GMT","Value":"0"}},"Attributes":"","Sets":"","Gets":"","AttrList":""}
		//Check Favourites
		if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('GetFavourites')){
			$scope.favourites = $scope.fhem.Readings.LastActionResult.Value.substring(15).replace(/\"/g,'').split(',');
		}
		//
		//Check Playlists 
		if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('GetPlaylists')){
			$scope.playlists = $scope.fhem.Readings.LastActionResult.Value.substring(15).replace(/\"/g,'').split(',');
		}
		//
		//Check Radios 
		if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('GetRadios')){
			$scope.radios = $scope.fhem.Readings.LastActionResult.Value.substring(15).replace(/\"/g,'').split(',');
		}
		//
		
			
		if (typeof $scope.fhem.Readings.Volume != 'undefined'){
			if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('SetVolume')){
				var tmpVolume = $scope.fhem.Readings.LastActionResult.Value.split(" ")[1];
				
				if($scope.fhem.Readings.Volume.Value == tmpVolume)
					$scope.sonos_volume=$scope.fhem.Readings.Volume.Value;
				//else
				//	$scope.sonos_volume = tmpVolume;
			}
			else
				$scope.sonos_volume=$scope.fhem.Readings.Volume.Value;
		}
		if (typeof $scope.fhem.Readings.Bass != 'undefined'){
			if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('SetBass')){
				var tmpBass = $scope.fhem.Readings.LastActionResult.Value.split(" ")[1];
				
				if($scope.fhem.Readings.Bass.Value == tmpBass)
					$scope.sonos_bass=$scope.fhem.Readings.Bass.Value;
				//else	
				//	$scope.sonos_bass = tmpBass;
					
			}
			else
				$scope.sonos_bass=$scope.fhem.Readings.Bass.Value;
		}
		if (typeof $scope.fhem.Readings.Treble != 'undefined'){
			if (typeof $scope.fhem.Readings.LastActionResult != 'undefined' && $scope.fhem.Readings.LastActionResult.Value.startsWith('SetTreble')){
				var tmpTreble = $scope.fhem.Readings.LastActionResult.Value.split(" ")[1];
				
				if($scope.fhem.Readings.Treble.Value == tmpTreble)
					$scope.sonos_treble=$scope.fhem.Readings.Treble.Value;
				//else
				//	$scope.sonos_treble = tmpTreble;	
					
			}
			else	
				$scope.sonos_treble=$scope.fhem.Readings.Treble.Value;
		}
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
