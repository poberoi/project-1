$(document).on('ready', function{
    function initialize() {
      var mapProp = {
        center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
        zoom:10,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize
    );

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
