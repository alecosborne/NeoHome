/**
*	Shared Factory.
*/	
angular.module('shared').factory('SharedFactory', ['GENERAL_CONFIG', function(GENERAL_CONFIG) {
	
	var sharedFactory = {};
	
	/**
	*	Generate a new UUID.
	*/
	sharedFactory.generateUUID = function () {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	};	

	/**
	*	Add leading zeroes to jsDate when days or months are < 10.. 
	*	i.e.
	*	   formatDate(new Date("1/3/2013") 
	*	returns
	*   "01.03.2105"
	*/
	sharedFactory.formatDate  = function (jsDate){
	  return (jsDate.getDate()<10?("0"+jsDate.getDate()):jsDate.getDate()) + "." + 
	      ((jsDate.getMonth()+1)<10?("0"+(jsDate.getMonth()+1)):(jsDate.getMonth()+1)) + "." + 
	      jsDate.getFullYear();
	}

	
	/**
	*	Convert a json object to a lower case key json.
	*/
	var lowerCache = {};
	sharedFactory.keysToLowerCase = function (obj)
	{
	    if (typeof(obj) === "string" || typeof(obj) === "number")
	        return obj;

	        var l = obj.length;
	    if (l) {
	        l |= 0;
	        var result = [];
	        result.length = l;
	        for (var i = 0; i < l; i++) {
	            var newVal = obj[i];
	            result[i] = typeof(newVal) === "string" ? newVal : this.keysToLowerCase(newVal);
	        }
	        return result;
	    } else {
	     var ret = {};
	     for (var key in obj) {

	         var keyStr = typeof(key) === "string" ? key : String(key);
	         var newKey = lowerCache[keyStr];
	         if (newKey === undefined) {
	             newKey = keyStr.toLowerCase();
	             lowerCache[keyStr] = newKey;
	         }

	         var newVal = obj[key];
	         ret[newKey] = typeof(newVal) === "string" ? newVal : this.keysToLowerCase(newVal);
	     }
	     return ret;
	    }
	};

	
	return sharedFactory;
}]);


/**
*	Set/Load FHEM data.
*/	
angular.module('shared').factory('FhemFactory', ['$http','FHEM_CONFIG', function($http, FHEM_CONFIG) {
	
	var fhemFactory = {};
	
	// Load fhem control data.
	fhemFactory.getControlData = function (name) {
		<!-- return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + '?XHR=1&cmd=jsonlist2+'+ name});-->
		
		<!--DEBUG-->
		if(name === 'Alarmanlage_Ext'){
			return $http({ method: 'GET', url: 'alarm.json'});
		}
		else if(name === 'Alarmanlage_Int'){
			return $http({ method: 'GET', url: 'alarm2.json'});
		}
		else if(name === 'QNAP'){
			return $http({ method: 'GET', url: 'qnap.json'});
		}
		else if(name === 'BZ.Fenster2'){
			return $http({ method: 'GET', url: 'BZ.Fenster2.json'});
		}
		else if(name === 'WZ.Jalousie1'){
			return $http({ method: 'GET', url: 'WZ.Jalousie1.json'});
		}
		else if(name === 'group=Bereiche'){
			return $http({ method: 'GET', url: 'fenster.json'});
		}
		else if(name === 'ST.Heizung2_Clima'){
			return $http({ method: 'GET', url: 'heizung_st_clima.json'});
		} else {
			return $http({ method: 'GET', url: 'heizung_st.json'});
		}
		
	};	

	// Set fhem control state.
	fhemFactory.setControlState = function (name, state) {
		return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + state});
	};	

	// Set fhem manual temperature state.
	fhemFactory.setTemperatureManual = function (name, temperature) {
		return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + 'controlManu'+ "%20" + temperature});
	};	

	// Set fhem temperature mode and state.
	fhemFactory.setTemperature = function (name, mode) {
		return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + 'controlMode'+ "%20" + mode});
	};	

	// Set fhem burstXmit.	
	fhemFactory.setBurstXmit = function (name) {
		return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + 'burstXmit'});
	};	


	// 
	/**
	*	Set fhem blind direction and value. 
	*
	*	If no direction was set. The blinds open up to the value.
	*	If the direction up/down. The blinds are opened/closed by the value in the corresponding direction.  
	*
	*	@name: Name of the fhem device.
	*	@direction: Direction e.g. up/down
	*	@value: [0-100]
	*/	
	fhemFactory.setBlindState = function (name, direction, value) {
		if(direction == 'up' || direction == 'down')
			return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + direction + "%20" + value});
		else
			return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + "?XHR=1&cmd." + name + "=set%20" + name + "%20" + value});
	};	
	
	// TEST.
	fhemFactory.getTEST = function () {		
		//var date = new Date().getTime();
		return $http({ method: 'GET', url: FHEM_CONFIG.FHEM_URL + '?XHR=1&cmd=get logdb - webchart 2015-05-05 2015-05-06 GA.Rasenmaeher_Pwr timerange TIMESTAMP power'});
	};		
		
	return fhemFactory;
}]);



/**
*	Fhem WebSocket Factory.
*/	
angular.module('shared').factory('FhemWebSocketFactory', ['$q', '$rootScope', 'SharedFactory', 'GENERAL_CONFIG','FHEM_CONFIG',  function($q, $rootScope, SharedFactory, GENERAL_CONFIG, FHEM_CONFIG) {

	var msgtypes = {};
	
	$rootScope.devices = {};
	$rootScope.commands ={};

	/**TEST*/
	$rootScope.devicelist = [];
	/**TEST*/
		
	//RootScope parameter approach.
	//$rootScope.fhem =  {};	
	//$rootScope.fhem.devices = {};

	var fhemWebSocketFactory = {};
	var webSocket = null;

	 // Create our websocket object with the address to the websocket
	if(FHEM_CONFIG.FHEM_WEB_SOCKET_SECURE)
    	webSocket = new WebSocket(FHEM_CONFIG.FHEM_WEB_SOCKET_SECURE_URL, ['json']);
    else
    	webSocket = new WebSocket(FHEM_CONFIG.FHEM_WEB_SOCKET_URL, ['json']);

    /**
    * WebSocket OnOpen: Fired when the connection was successfully opened.
    */
	webSocket.onopen = function(){  
		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
        	console.log("Socket has been opened!");            	
    };

    /**
    * WebSocket OnClose: Fired when the connection was successfully closed.
    */
    webSocket.onclose = function (e) {
    	if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
    		console.log("Socket has been closed!"); 
    		alert('WebSocket info: ' + e.data + '.');   
    };

    /**
    * WebSocket OnError: Fired when an error occurs.
    */
    webSocket.onerror = function(e) {    	
    	if(GENERAL_CONFIG.APP_SERVICE_DEBUG) {
			console.log('WebSocket error: ' + e.data + '.');
			alert('WebSocket error: ' + e.data + '.');
		}
	};
    
    /**
    * WebSocket OnMessage: Fired when a message arrives.
    */
    webSocket.onmessage = function(e) {                
        	if(Boolean(GENERAL_CONFIG.APP_SERVICE_DEBUG))
        		console.log('Receiving data: ' + JSON.stringify(e.data) + '.');
        	
			var msg = JSON.parse(e.data);
			/*debug("receiving message: "+JSON.stringify(msg));*/
			
			for(id in msgtypes[msg.type]) {
				msgtypes[msg.type][id](msg.payload);
			}
    };    

    /**
    *	Send a command to the WebSocket.
    *	Format: JSON - {
	*			type: 'command',
	*			payload: cmd
	*		}
	*	Send command function wrapped up the waitForConnection function to avoid 
	*	send misstakes by half open connections.
    */
	function sendCommand(cmd) {     
		fhemWebSocketFactory.waitForConnection(function () {
			if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
	       		console.log('Sending request.', cmd);
	      
			webSocket.send(JSON.stringify({
				type: 'command',
				payload: cmd
			}));
	        if (typeof callback !== 'undefined') {
	          callback();
	        }
	    }, 1000);
	};

	/**
	*	Send a list command and get a initial state. The event onListentry
	*	get the results.	
	*/
	function getListentry(devspec) {
		sendCommand({
			command: 'list',
			arg:     devspec
		});
	};	

	/**
	*	Send a smalllist command and get a initial state (only readings). The event onListentry
	*	get the results.	
	*/
	function getSmallListentry(devspec) {
		sendCommand({
			command: 'smalllist',
			arg:     devspec
		});
	};	

	/**
	*	Send a get command and get device property. The event onGetreply
	*	get the results.	
	*	
	*	@device: FHEM device.
	*	@property: Property of the device.
	*/
	function getDeviceProperty(device, property) {
		sendCommand({
			command: 'get',
			device:   device,
			property: property
		});
	};	


	/**
	*	Wait for connection wrapper. 
	*	Wrapper to wait for a WebSocket connection with a readyState.	
	*
	*	@callback: Callback function.
	*	@interval: Checkinterval.	
	*/	
	fhemWebSocketFactory.waitForConnection = function(callback, interval) {
	    if (webSocket.readyState === 1) {
	        callback();
	    } else {
	        var that = this;
	        setTimeout(function () {
	            that.waitForConnection(callback);
	        }, interval);
	    }
	};

	/** **Deprecated**
	*	With e.g subscribeEvent('','.*',name,'.*');
	*	a event withe the id can be subscribed
	*	for all events from the device with the name name. :-)
	*
	*	Deprecated - @id: Id of the subscribed event/device. (optional)
	*		 When id is null or nothing then generate a uid.
	*	@type: Type of the device.
	*	@name: Name of the device. A Name list is also possible. device1,device2,...,... .
	*	@changed: Changed states.
	*	@callback: Callback method in the controller.
	*/
	fhemWebSocketFactory.subscribeEventOld = function(type,nameList,changed,callback) {							

		var list = new Array();	
		list = nameList.split(",");

		for (var item in list) {

			id = SharedFactory.generateUUID();

			if(!$rootScope.devices[list[item]] || !$rootScope.devices[list[item]].callbacks) {
				//No entry exits
				$rootScope.devices[list[item]]={callbacks:{}};
				$rootScope.devices[list[item]].callbacks[id]=callback;

				//Init the device in the array
				fhemWebSocketFactory.devices[list[item]] = {
					Name: list[item], 
					Internals:  {},
					Readings:   {},
					Attributes: {},
					Sets:       {},
					Gets:       {},
					AttrList:   {}
				};


				sendCommand({
					command: 'subscribe',
					arg:     list[item],
					type:    type,
					name:    list[item],
					changed: changed
				});

				//Send list command and get the actual state.
				getListentry(list[item]); 

			}else
			{	
				//A entry for this device exits. Only add the callback.
				$rootScope.devices[list[item]].callbacks[id]=callback;
				getListentry(list[item]); 				
			}												     
		}
	};

	/**
	*	With e.g subscribeEvent('.*',name,'.*');
	*	a event withe the id can be subscribed
	*	for all events from the device with the name name. :-)
	*
	*	@type: Type of the device.
	*	@nameList: Name of the device. A Name list is also possible. device1,device2,...,... .
	*	@changed: Changed states.
	*	@callback: Callback method in the controller.
	*/
	fhemWebSocketFactory.subscribeEvent = function(type,nameList,changed) {							

		var list = new Array();	
		list = nameList.split(",");

		for (var item in list) {

			if(!$rootScope.devicelist[list[item]]) {
				//No entry exits
				//Init the device in the array
				$rootScope.devicelist[list[item]] = {
					Name: list[item], 
					Internals:  {},
					Readings:   {},
					Attributes: {},
					Sets:       {},
					Gets:       {},
					AttrList:   {}
				};


				sendCommand({
					command: 'subscribe',
					arg:     list[item],
					type:    type,
					name:    list[item],
					changed: changed
				});

				//Send list command and get the actual state.
				//getListentry(list[item]);
				getSmallListentry(list[item]);
				

			}else
			{	
				//A entry for this device exits. Only add the callback.
				//$rootScope.devices[list[item]].callbacks[id]=callback;
				//getListentry(list[item]);
				getSmallListentry(list[item]);				
			}										     
		}
	};

	/**
	*	Unsubscribe a event with the id.	@TODO: kick the callback;
	*
	*	@id: Id of the subscribed event/device.
	*/
	fhemWebSocketFactory.unsubscribeEvent = function(id) {
		sendCommand({
			command: 'unsubscribe',
			arg:     id
		});
	};

	/**
	*	Send a Fhem Command. After the command replay
	*	the callback method will be procesed.
	*
	*	@cmd: Command.
	*	@id: Id of the command.
	*	@callback: Callback method in the controller.
	*/
	fhemWebSocketFactory.sendFhemCommand = function(cmd, id, callback) {

		$rootScope.commands[cmd]= {
				id: id, 
				callback: callback};

    	sendCommand({
    		command: cmd    		
  		});
    }
    
    /**
    *	Set Fhem control state.
    *
    *	@name: Name of the device.
    *	@state: The new state.
    */
	fhemWebSocketFactory.setControlState = function (name, state) {
		sendCommand({
    		command: "set " + name + " " + state
  		});
		
	};	

	// Set fhem manual temperature state.
	fhemWebSocketFactory.setTemperatureManual = function (name, temperature) {
		sendCommand({
    		command: "set " + name + " controlManu " + temperature
  		});			
	};	

	// Set fhem temperature mode and state.
	fhemWebSocketFactory.setTemperature = function (name, mode) {
		sendCommand({
    		command: "set " + name + " controlMode " + mode
  		});		
	};	

	// Set fhem burstXmit.	
	fhemWebSocketFactory.setBurstXmit = function (name) {
		sendCommand({
    		command: "set " + name + " " + "burstXmit"
  		});		
	};	

	/** **Deprecated**
	*	Fired on a Event.
	*
	*	@event: Triggered event.
	*/
	function onEventOld(event) {
		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
			console.log("onEvent: " + JSON.stringify(event) + "-- by eventName:" + event.arg);					

		if (!fhemWebSocketFactory.devices[event.arg]) {
			fhemWebSocketFactory.devices[event.arg] = {
				Name: event.name, 
				Internals:  {},
				Readings:   {},
				Attributes: {},
				Sets:       {},
				Gets:       {},
				AttrList:   {}
			};
		}

		for(key in event.changed) {						
			if (key == 'STATE') {
				fhemWebSocketFactory.devices[event.arg].Internals['state'] = event.changed[key];

				/*Ist das wirklich zielführend oder sollten die Templates auf Internals umgestellt werden?*/
				fhemWebSocketFactory.devices[event.arg].Readings['state'] = {
					Value: event.changed[key],
					Time:  event.time
				};
			} else {
				fhemWebSocketFactory.devices[event.arg].Readings[key] = {
					Value: event.changed[key],
					Time:  event.time
				};
			}									
		}

		//RootScope callback approach.				
		//Call all callbacks from the device in the event.
		//$rootScope.devices[event.arg](fhemWebSocketFactory.devices[event.arg]);
		for(key in $rootScope.devices[event.arg].callbacks)
			$rootScope.devices[event.arg].callbacks[key](fhemWebSocketFactory.devices[event.arg]);

		//RootScope parameter approach.
		//$rootScope.fhem.devices[event.arg]=fhemWebSocketFactory.devices[event.arg];

		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
			console.log("onEvent: " + JSON.stringify(fhemWebSocketFactory.devices[event.arg]));
	};

	/**
	*	Fired on a Event.
	*
	*	@event: Triggered event.
	*/
	function onEvent(event) {
		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
			console.log("onEvent: " + JSON.stringify(event) + "-- by eventName:" + event.arg);					

		if (!$rootScope.devicelist[event.arg]) {
			$rootScope.devicelist[event.arg] = {
				Name: event.name, 
				Internals:  {},
				Readings:   {},
				Attributes: {},
				Sets:       {},
				Gets:       {},
				AttrList:   {}
			};
		}

		for(key in event.changed) {						
			if (key == 'STATE') {
				$rootScope.devicelist[event.arg].Internals['state'] = event.changed[key];

				/*Ist das wirklich zielführend oder sollten die Templates auf Internals umgestellt werden?*/
				$rootScope.devicelist[event.arg].Readings['state'] = {
					Value: event.changed[key],
					Time:  event.time
				};
			} else {
				$rootScope.devicelist[event.arg].Readings[key] = {
					Value: event.changed[key],
					Time:  event.time
				};
			}									
		}

		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
			console.log("onEvent: " + JSON.stringify($rootScope.devicelist[event.arg]));
	};

	/**
	*	Fired on a Getreply.
	*
	*	@event: Triggered reply.
	*/
	function onGetreply(reply) {
		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
    		console.log("onGetreply: " + JSON.stringify(reply));
		/*if (fhemWebSocketFactory.ongetreply != null) {
			fhemWebSocketFactory.ongetreply(reply.device,reply.property,reply.value);
		};*/
	};


	/**
	*	Fired on a Command.
	*
	*	@cmd: Triggered command.
	*/
	function onCommand(cmd) {
		
		if(GENERAL_CONFIG.APP_SERVICE_DEBUG)
			console.log("onCommand: " + JSON.stringify(cmd));

		// Check if the command in the command callbacklist. 
		// Only over fhemWebSocketFactory.sendFhemCommand sended 
		// commands has a callback.
		if($rootScope.commands.hasOwnProperty(cmd.command)) {
			// Call the callback when exist.
			//$rootScope.commands[cmd.command](cmd);
			if($rootScope.commands[cmd.command].callback != null)
				$rootScope.commands[cmd.command].callback($rootScope.commands[cmd.command].id, cmd);


			// Delete the callback in the command callbacklist.
			delete $rootScope.commands[cmd.command];
		}


		switch(cmd.command) {
		case 'not implemented yet':
			break;
		default:
			/*if (fhemWebSocketFactory.oncommandreply != null) {
				fhemWebSocketFactory.oncommandreply(cmd.command,cmd.reply);
			};*/
		}
	};
	
	/** **Deprecated**
	*	Fire on a List command. The list command can be use to get a
	*	initial state. 
	*
	*/
	function onListentryOld(entry) {
		
		if(Boolean(GENERAL_CONFIG.APP_SERVICE_DEBUG))
        		console.log("onListentry: " + JSON.stringify(entry) + "-- by eventName:" + event.arg);			

        fhemWebSocketFactory.devices[entry.name] = {
        			Name: entry.name, 
					Internals:  '',//entry.internals'',
					Readings:   entry.readings,
					Attributes: '',//entry.attributes,
					Sets:       '',//entry.sets,
					Gets:       '',//entry.gets,
					AttrList:   '',//entry.attrList
				};

		//RootScope callback approach.		
		//Call all callbacks from the device in the event.
		for(key in $rootScope.devices[entry.name].callbacks)
			$rootScope.devices[entry.name].callbacks[key](fhemWebSocketFactory.devices[entry.name]);

	};

	/** 
	*	Fire on a List command. The list command can be use to get a
	*	initial state. 
	*
	*/
	function onListentry(entry) {
		
		if(Boolean(GENERAL_CONFIG.APP_SERVICE_DEBUG))
        		console.log("onListentry: " + JSON.stringify(entry) + "-- by eventName:" + event.arg);			
		
        $rootScope.devicelist[entry.name] = {
        			Name: entry.name, 
					Internals:  '',//entry.internals'',
					Readings:   entry.readings,
					Attributes: '',//entry.attributes,
					Sets:       '',//entry.sets,
					Gets:       '',//entry.gets,
					AttrList:   '',//entry.attrList
				};
	};

	fhemWebSocketFactory.subscribeMsgType = function(type,fn,id) {
		if (!msgtypes[type]) {
			msgtypes[type] = {
				id: fn
			};
		} else {
			msgtypes[type][id] = fn;
		}
	};
	
	fhemWebSocketFactory.unsubscribeMsgType = function(type,id) {
		delete msgtypes[type][id];
	};

	fhemWebSocketFactory.subscribeMsgType('event',onEvent,'fhemWebSocketFactory');
	fhemWebSocketFactory.subscribeMsgType('listentry',onListentry,'fhemWebSocketFactory');
	fhemWebSocketFactory.subscribeMsgType('getreply',onGetreply,'fhemWebSocketFactory');
	fhemWebSocketFactory.subscribeMsgType('commandreply',onCommand,'fhemWebSocketFactory');
    


	
/*TODO: Ist das noch nötig*/
	var msgdevices = {};

	fhemWebSocketFactory.connected = false;
	fhemWebSocketFactory.secure = false;
	fhemWebSocketFactory.devices = {};
	fhemWebSocketFactory.ondebug = null;
	fhemWebSocketFactory.onerror = null;
	fhemWebSocketFactory.onconnected = null;
	fhemWebSocketFactory.ondisconnected = null;
	fhemWebSocketFactory.onevent = null;
	fhemWebSocketFactory.onlist = null;
	fhemWebSocketFactory.ongetreply = null;
	fhemWebSocketFactory.oncommandreply = null;   

	
    return fhemWebSocketFactory;
}])





