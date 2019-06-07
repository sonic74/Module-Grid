COBI.init('token');

// Make clock appear in upper right corner
COBI.app.clockVisible.write(false);
// Also listen to standard controller events
COBI.devkit.overrideThumbControllerMapping.write(true);

// Disable Reordering in Experience
var inEditMode = (COBI.parameters.context() == COBI.context.offRideSettings || COBI.parameters.context() == COBI.context.onRideSettings);

// Allow user to zoom in and out
COBI.hub.externalInterfaceAction.subscribe(function(action) {
  // Listen to inputs and update zoom index variable
  if ((action == 'UP' || action == 'RIGHT')) {
    zoomIn();
  }
  if ((action == 'DOWN' || action == 'LEFT')) {
    zoomOut();
  }
});

// Display detailled item names if touch interaction is allowed
COBI.app.touchInteractionEnabled.subscribe(function(touchInteractionEnabled) {
  updateInterfaceVisibility(touchInteractionEnabled);


  console.log("touchInteractionEnabled="+touchInteractionEnabled);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//      transfer=true;
      console.log('XMLHttpRequest.DONE');
//      if(keys.length>0)keypressHandler();
    }
  }
//  var url=document.URL+'?key='+encodeURIComponent(keys);
//192.168.30.11 - - [15/Feb/2019:15:43:10 +0100] "GET /COBI.Bike/Module-Grid/?key=false HTTP/1.1" 200 649 "http://sven.killig.de/COBI.Bike/Module-Grid/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
  var url=document.URL+'?batteryLevel='+encodeURIComponent(batteryLevel);
  console.log('GET '+url);
  xmlhttp.open('GET', url, true);
//  keys='';
  xmlhttp.send(null);

COBI.battery.state.read(function(response, timestamp) {
  console.log('response='+response);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      console.log('XMLHttpRequest2.DONE');
    }
  }
  var url=document.URL+'?response='+JSON.stringify(response);
  console.log('GET2 '+url);
  xmlhttp.open('GET', url, true);
  xmlhttp.send(null);
});

});

// Define id, name, events, formatting functions, units and default value for each item
var definitions = [
  {
    id: 'speed',
    name: 'Speed',
    subscribe: COBI.rideService.speed.subscribe,
    unsubscribe: COBI.rideService.speed.unsubscribe,
    formatter: formatSpeedDot1,
    unit: 'km/h',
    defaultValue: '-'
  },
  {
    id: 'average_speed',
    name: 'Avg Speed',
    subscribe: COBI.tourService.averageSpeed.subscribe,
    unsubscribe: COBI.tourService.averageSpeed.unsubscribe,
    formatter: formatSpeedDot1,
    unit: 'Ø km/h',
    defaultValue: '-'
  },
  {
    id: 'user_power',
    name: 'User Power',
    subscribe: COBI.rideService.userPower.subscribe,
    unsubscribe: COBI.rideService.userPower.unsubscribe,
    formatter: formatInt,
    unit: 'watts',
    defaultValue: '-'
  },
  {
    id: 'cadence',
    name: 'Cadence',
    subscribe: COBI.rideService.cadence.subscribe,
    unsubscribe: COBI.rideService.cadence.unsubscribe,
    formatter: formatInt,
    unit: 'rpm',
    defaultValue: '-'
  },
  {
    id: 'distance',
    name: 'Distance',
    subscribe: COBI.tourService.ridingDistance.subscribe,
    unsubscribe: COBI.tourService.ridingDistance.unsubscribe,
    formatter: formatDistanceDot1,
    unit: 'km total',
    defaultValue: '-'
  },
  {
    id: 'calories',
    name: 'Calories',
    subscribe: COBI.tourService.calories.subscribe,
    unsubscribe: COBI.tourService.calories.unsubscribe,
    formatter: formatInt,
    unit: 'kcal',
    defaultValue: '-'
  },
  {
    id: 'ascent',
    name: 'Ascent',
    subscribe: COBI.tourService.ascent.subscribe,
    unsubscribe: COBI.tourService.ascent.unsubscribe,
    formatter: formatInt,
    unit: 'm',
    defaultValue: '-'
  },
  {
    id: 'heart_rate',
    name: 'Heart Rate',
    subscribe: COBI.rideService.heartRate.subscribe,
    unsubscribe: COBI.rideService.heartRate.unsubscribe,
    formatter: formatInt,
    unit: 'bpm',
    defaultValue: '-'
  },
  {
    id: 'duration',
    name: 'Duration',
    subscribe: COBI.tourService.ridingDuration.subscribe,
    unsubscribe: COBI.tourService.ridingDuration.unsubscribe,
    formatter: formatMins,
    unit: 'min',
    defaultValue: '-'
  },
  {
    id: 'battery',
    name: 'Battery',
    subscribe: COBI.battery.state.subscribe,
    unsubscribe: COBI.battery.state.unsubscribe,
    formatter: formatBattery,
    unit: '%',
    defaultValue: '-'
  }
];
