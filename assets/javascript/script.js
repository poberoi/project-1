$(document).on('ready', function(){
    var map;
    var markers = [];
    var parkingMarkers = [];

    var parkingImage = {
        url: './assets/images/parking.png',
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      };

    function getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(function(position){
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
            var marker = new google.maps.Marker({
                position: initialLocation,
                map: map,
                title: 'Current Location'
            });
        });
    };

    function initialize() {
      var mapProp = {
        center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
        zoom:10,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
      getCurrentLocation();
    }

    function clearMarkers(){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        for (var i = 0; i < parkingMarkers.length; i++) {
            parkingMarkers[i].setMap(null);
        }

        markers = [];
        parkingMarkers = [];
    }

    initialize();

    function paintEvents(events){
        var resultsDiv = $("#results");
        $("#resultsWrapper").removeClass('hidden');
        if(events.length > 0) {
            resultsDiv.html('');
            clearMarkers();
            var eventData = [];
            var panToPos = null;

            for(x=0;x<events.length;x++){
                var evt = $(events[x]);
                var img = $(evt.children("medium")[0]).find("url").html();
                console.log('Image: ' + img);
                if(typeof img === 'undefined') {
                    img = './assets/images/placeholder1.png';
                }
                var evtDetails = {
                    title: evt.find("title").html(),
                    start: evt.find("start_time").html(),
                    end: evt.find("stop_time").html() ,
                    lat: evt.find("latitude").html(),
                    lng: evt.find("longitude").html(),
                    city: evt.find("city_name").html(),
                    region_name: evt.find("region_name").html(),
                    venue_address: evt.find("venue_address").html(),
                    image: img
                };

                eventData.push(evtDetails);
                console.log(evtDetails);
                var pos = {lat: parseFloat(evtDetails.lat), lng: parseFloat(evtDetails.lng)};
                if(panToPos === null) {
                    panToPos = pos;
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    title: evtDetails.title
                  });
                markers.push(marker);

                var evtDiv = $("<div></div>").attr("class", "event-details");
                var evtTitle =$("<span class='title'></span>").html(evtDetails.title + '&nbsp;'); 
                var parkingLink = $("<a href='' class='parking-link'></a>").html('Parking');
                parkingLink.attr('data-lat', evtDetails.lat);
                parkingLink.attr('data-lng', evtDetails.lng);
                parkingLink.attr('data-start', evtDetails.start);
                parkingLink.attr('data-end', evtDetails.end);
                evtTitle.append(parkingLink)
                evtDiv.append(evtTitle);
                resultsDiv.append(evtDiv);
            }
            map.setZoom(10);
            map.panTo(panToPos);
        } else {
            resultsDiv.html('No events found...');
        }
    }

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
            map.setZoom(16);
            map.panTo(eventPos);
        } else {
            alert('No parking spots around this event');
        }
    }

    $("#resultsWrapper").on("click", ".parking-link", function(e){
        e.preventDefault();
        var lat = $(this).data('lat');
        var lng = $(this).data('lng');
        var start = $(this).data('start');
        var end = $(this).data('end');
        if(end === '') {
            end = start;
        }

        var params = {
            'latitude': lat, 
            'longitude': lng,
            'start': new Date(start).getTime(),
            'end': new Date(end).getTime()
        };
        var key = '8957d645f4fbb29b6265b2d55de30c5a';
        var url = 'https://crossorigin.me/http://api.parkwhiz.com/search?key=' + key + '&lat=' + lat + '&lng=' + lng;
        $.ajax({
            url: url, method: 'GET'
        }).done(function(result){
            paintParkingSpots(result, {lat: lat, lng: lng});
        });
    });

    $("#btnSearch").on("click", function(e){
        e.preventDefault();
        var loc = $("#location").val().trim();
        var keywords = $("#eventName").val().trim();

        var key = 'cFDXkxdj6WG78bgK';

        var url = 'https://crossorigin.me/http://api.eventful.com/rest/events/search?app_key=' + key + '&keywords=' + keywords + '&location=' + loc + '&date=Future';

        //$.get(url, {}, function(events){
         $.ajax({url:url,method:'GET'}).done (function(result){
            console.log(result);
            var events = $(result).find("events event");
            paintEvents(events);
         });
    });

    

    // var initialLocation;
    // var siberia = new google.maps.LatLng(60, 105);
    // var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // var browserSupportFlag =  new Boolean();

    // function initialize() {
    //   var myOptions = {
    //     zoom: 6,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   var map = new google.maps.Map(document.getElementById("map"), myOptions);

    //   // Try W3C Geolocation (Preferred)
    //   if(navigator.geolocation) {
    //     browserSupportFlag = true;
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    //       map.setCenter(initialLocation);
    //     }, function() {
    //       handleNoGeolocation(browserSupportFlag);
    //     });
    //   }
    //   // Browser doesn't support Geolocation
    //   else {
    //     browserSupportFlag = false;
    //     handleNoGeolocation(browserSupportFlag);
    //   }

    //   function handleNoGeolocation(errorFlag) {
    //     if (errorFlag == true) {
    //       alert("Geolocation service failed.");
    //       initialLocation = newyork;
    //     } else {
    //       alert("Your browser doesn't support geolocation. We've placed you in New York.");
    //       initialLocation = newyork;
    //     }
    //     map.setCenter(initialLocation);
    //   }
    // }
    //  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOQMDnJhK0du419usTwHx0OvngOQ9qPzA&callback=initMap"
    // async defer></script> 



})
