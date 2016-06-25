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

  
  // 


  // Function gets current location of user
  function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function(position){
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
      var marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: 'Current Location'
      });
      
      var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&result_type=postal_code&key=AIzaSyDOQMDnJhK0du419usTwHx0OvngOQ9qPzA'

      $.ajax({ 
        url: queryURL, 
        method: 'GET',
        dataType: 'json'
      })
      .done(function(response) {
        console.log('done');
        console.log(response);
        var zip = response.results[0].address_components[0].long_name;
        console.log(zip);
        listEvents(zip);
      });
    });
  };

  // Function to set up map on load
  function initialize() {
        var mapProp = {
          center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
          zoom:10,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        getCurrentLocation();
      }

  // Function to update map
  function updateMap(lat,lng) {
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
    
    // Create event api url and set ajax and done request
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

  // function to display parking areas
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

  //events after clicking submit button
  $('#submit').on('click', function(){
    $('#eventsDisplay').empty();
    $('#eventsHeading').empty();
    var p= $('#zipCode').val();
    listEvents(p);
    $("#msg").html('&nbsp;');
    return false;
  });

  //events after clicking event divs
  $(document).on('click', '.eventButtons', function(){
    console.log(this);
    var lat = $(this).data('lat');
    var lng = $(this).data('lng');
    updateMap(lat,lng);
    $("#msg").html('&nbsp;');
    var key = '8957d645f4fbb29b6265b2d55de30c5a';
    var url = 'https://crossorigin.me/http://api.parkwhiz.com/search?key=' + key + '&lat=' + lat + '&lng=' + lng;
    $.ajax({
        url: url, method: 'GET'
    }).done(function(result){
        paintParkingSpots(result, {lat: lat, lng: lng});
    });
  });

  initialize();
});

