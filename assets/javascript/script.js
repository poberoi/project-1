$(document).on('ready', function(){
    var map;

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

    initialize();



})
