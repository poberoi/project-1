$(document).ready(function(){
  var zipcode;
  var map;
  var parkingMarkers = [];
  var parkingImage = {
    url: './assets/images/parking.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

  // Function to create and update map
  function initialize(lat,lng) {
    var mapProp = {
      center: new google.maps.LatLng(lat, lng),
      zoom:12,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({
      position: mapProp.center,
      map: map,
      title: 'Current Location'
    });
  }

  // Function to create and update event list
  function listEvents(zipcode){
    
    // Create api url and set ajax and done request
    var queryURL = 'https://crossorigin.me/http://api.eventful.com/json/events/search?app_key=P69H26fPKMJfCRcm&q=music&l=' + zipcode + '&within=10&units=miles&t=this+weekend';

    console.log(queryURL);

    console.log('This occured');

    $.ajax({ 
      url: queryURL, 
      method: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      console.log('done');
      console.log(response);
      
      // Gather information from object and append information to appropriate divs
      var eventLength = response.events.event.length;
      var event = response.events.event;
      // console.log(eventLength);
      var instruc = $('<div>');
      instruc.append('<h4>Below are events near: ', zipcode,'</h4>');
      instruc.append('<h4>Click on Events to see exact location</h4>');
      $('#eventsHeading').append(instruc);
      for (i=0; i<eventLength; i++){
        var infoDiv = $('<div>').attr('class','eventButtons col-md-3');

        var heading = "Event " + (i+1);
        var eventTitle = event[i].title;
        // console.log(eventTitle);
        var eventCity = event[i].city_name;
        // console.log(eventCity);
        var eventRegion = event[i].region_abbr;
        // console.log(eventRegion);
        var eventInfo = event[i].start_time;
        // console.log(eventInfo);
        var eventVenue = event[i].venue_name;
        // console.log(eventVenue);
        var venueAddress = event[i].venue_address;
        // console.log(venueAddress);
        var eventUrl = event[i].url
        // console.log(eventUrl);
        var url = $('<a>').attr('href',eventUrl);
        url.attr('target', "_blank");
        url.append('Event Link');
        infoDiv.append(heading, '<br/>');
        infoDiv.append('Event: ', eventTitle, '<br/>');
        infoDiv.append('Location: ', eventCity,', ', eventRegion, '<br/>');
        infoDiv.append('Date and Time: ', moment(eventInfo).format('MMMM Do YYYY, h:mm:ss a'), '<br/>');
        infoDiv.append('Venue: ', eventVenue, '<br/>');
        infoDiv.append('Venue Address: ', venueAddress, '<br/>');
        infoDiv.append(url);
        infoDiv.attr('data-desc', event[i].description);
        infoDiv.attr('data-lat', event[i].latitude);
        infoDiv.attr('data-lng', event[i].longitude);
        // console.log(infoDiv.data('lat'));
        // console.log(infoDiv.data('lng'));
        $('#eventsDisplay').append(infoDiv);
      }
    })
    // If no object returned console error
    .error(function(data) {
      console.log('in error', data);
    });
  };

  // function getCurrentLocation(){
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     console.log(position);
  //     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  //     map.setCenter(initialLocation);
  //     var marker = new google.maps.Marker({
  //         position: initialLocation,
  //         map: map,
  //         title: 'Current Location'
  //     });
  //   });
  // };
  // getCurrentLocation();
  //create initial list with default zipcode and place on map
  listEvents('08859');
  initialize(40.4576,-74.3060);
  
  $('#submit').on('click', function(){
    $('#eventsDisplay').empty();
    $('#eventsHeading').empty();
    var p= $('#zipCode').val();
    listEvents(p);
    $("#msg").html('&nbsp;');
    return false;
  });

  function paintParkingSpots(parkingData, eventPos){
      if(parkingData.parking_listings && parkingData.parking_listings.length > 0) {
          parkingData.parking_listings.forEach(function(p){
              var marker = new google.maps.Marker({
                  map: map,
                  icon: parkingImage,
                  position: {lat: p.lat, lng: p.lng},
                  title: p.locaton_name
                });
              parkingMarkers.push(marker);
          });
          map.setZoom(14);
          $("#msg").html('&nbsp;');
      } else {
          $("#msg").html('<h4>No parking around this area!</h4>');
      }
  }

  $(document).on('click', '.eventButtons', function(){
    console.log(this);
    $('#thingsNearBy').empty();
    $('#eventDescription').html($(this).data('desc'));
    var lat = $(this).data('lat');
    var lng = $(this).data('lng');
    initialize(lat,lng);
    var params = {
        'latitude': lat, 
        'longitude': lng
    };
    $("#msg").html('&nbsp;');
    var key = '8957d645f4fbb29b6265b2d55de30c5a';
    var url = 'https://crossorigin.me/http://api.parkwhiz.com/search?key=' + key + '&lat=' + lat + '&lng=' + lng;
    $.ajax({
        url: url, method: 'GET'
    }).done(function(result){
        paintParkingSpots(result, {lat: lat, lng: lng});
    });
  });

});

// $(document).on('ready', function(){
//     var map;
//     var markers = [];
//     var parkingMarkers = [];

//     var parkingImage = {
//         url: './assets/images/parking.png',
//         size: new google.maps.Size(32, 32),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(0, 32)
//       };

//     function getCurrentLocation(){
//         navigator.geolocation.getCurrentPosition(function(position){
//             initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//             map.setCenter(initialLocation);
//             var marker = new google.maps.Marker({
//                 position: initialLocation,
//                 map: map,
//                 title: 'Current Location'
//             });
//         });
//     };

//     function initialize() {
//       var mapProp = {
//         center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
//         zoom:10,
//         mapTypeId:google.maps.MapTypeId.ROADMAP
//       };
//       map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//       getCurrentLocation();
//     }

//     function clearMarkers(){
//         for (var i = 0; i < markers.length; i++) {
//             markers[i].setMap(null);
//         }
//         for (var i = 0; i < parkingMarkers.length; i++) {
//             parkingMarkers[i].setMap(null);
//         }

//         markers = [];
//         parkingMarkers = [];
//     }

//     initialize();

//     function paintEvents(events){
//         var resultsDiv = $("#results");
//         $("#resultsWrapper").removeClass('hidden');
//         if(events.length > 0) {
//             resultsDiv.html('');
//             clearMarkers();
//             var eventData = [];
//             var panToPos = null;

//             for(x=0;x<events.length;x++){
//                 var evt = $(events[x]);
//                 var img = $(evt.children("medium")[0]).find("url").html();
//                 console.log('Image: ' + img);
//                 if(typeof img === 'undefined') {
//                     img = './assets/images/placeholder1.png';
//                 }
//                 var evtDetails = {
//                     title: evt.find("title").html(),
//                     start: evt.find("start_time").html(),
//                     end: evt.find("stop_time").html() ,
//                     lat: evt.find("latitude").html(),
//                     lng: evt.find("longitude").html(),
//                     city: evt.find("city_name").html(),
//                     region_name: evt.find("region_name").html(),
//                     venue_address: evt.find("venue_address").html(),
//                     image: img
//                 };

//                 eventData.push(evtDetails);
//                 console.log(evtDetails);
//                 var pos = {lat: parseFloat(evtDetails.lat), lng: parseFloat(evtDetails.lng)};
//                 if(panToPos === null) {
//                     panToPos = pos;
//                 }
//                 var marker = new google.maps.Marker({
//                     map: map,
//                     position: pos,
//                     title: evtDetails.title
//                   });
//                 markers.push(marker);

//                 var evtDiv = $("<div></div>").attr("class", "event-details");
//                 var evtTitle =$("<span class='title'></span>").html(evtDetails.title + '&nbsp;'); 
//                 var parkingLink = $("<a href='' class='parking-link'></a>").html('Parking');
//                 parkingLink.attr('data-lat', evtDetails.lat);
//                 parkingLink.attr('data-lng', evtDetails.lng);
//                 parkingLink.attr('data-start', evtDetails.start);
//                 parkingLink.attr('data-end', evtDetails.end);
//                 evtTitle.append(parkingLink)
//                 evtDiv.append(evtTitle);
//                 resultsDiv.append(evtDiv);
//             }
//             map.setZoom(10);
//             map.panTo(panToPos);
//         } else {
//             resultsDiv.html('No events found...');
//         }
//     }

//     function paintParkingSpots(parkingData, eventPos){
//         if(parkingData.parking_listings && parkingData.parking_listings.length > 0) {
//             parkingData.parking_listings.forEach(function(p){
//                 var marker = new google.maps.Marker({
//                     map: map,
//                     icon: parkingImage,
//                     position: {lat: p.lat, lng: p.lng},
//                     title: p.locaton_name
//                   });
//                 parkingMarkers.push(marker);
//             });
//             map.setZoom(16);
//             map.panTo(eventPos);
//         } else {
//             alert('No parking spots around this event');
//         }
//     }

//     $("#resultsWrapper").on("click", ".parking-link", function(e){
//         e.preventDefault();
//         var lat = $(this).data('lat');
//         var lng = $(this).data('lng');
//         var start = $(this).data('start');
//         var end = $(this).data('end');
//         if(end === '') {
//             end = start;
//         }

//         var params = {
//             'latitude': lat, 
//             'longitude': lng,
//             'start': new Date(start).getTime(),
//             'end': new Date(end).getTime()
//         };
//         var key = '8957d645f4fbb29b6265b2d55de30c5a';
//         var url = 'https://crossorigin.me/http://api.parkwhiz.com/search?key=' + key + '&lat=' + lat + '&lng=' + lng;
//         $.ajax({
//             url: url, method: 'GET'
//         }).done(function(result){
//             paintParkingSpots(result, {lat: lat, lng: lng});
//         });
//     });

//     
    

//     // var initialLocation;
//     // var siberia = new google.maps.LatLng(60, 105);
//     // var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
//     // var browserSupportFlag =  new Boolean();

//     // function initialize() {
//     //   var myOptions = {
//     //     zoom: 6,
//     //     mapTypeId: google.maps.MapTypeId.ROADMAP
//     //   };
//     //   var map = new google.maps.Map(document.getElementById("map"), myOptions);

//     //   // Try W3C Geolocation (Preferred)
//     //   if(navigator.geolocation) {
//     //     browserSupportFlag = true;
//     //     navigator.geolocation.getCurrentPosition(function(position) {
//     //       initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//     //       map.setCenter(initialLocation);
//     //     }, function() {
//     //       handleNoGeolocation(browserSupportFlag);
//     //     });
//     //   }
//     //   // Browser doesn't support Geolocation
//     //   else {
//     //     browserSupportFlag = false;
//     //     handleNoGeolocation(browserSupportFlag);
//     //   }

//     //   function handleNoGeolocation(errorFlag) {
//     //     if (errorFlag == true) {
//     //       alert("Geolocation service failed.");
//     //       initialLocation = newyork;
//     //     } else {
//     //       alert("Your browser doesn't support geolocation. We've placed you in New York.");
//     //       initialLocation = newyork;
//     //     }
//     //     map.setCenter(initialLocation);
//     //   }
//     // }



// })
