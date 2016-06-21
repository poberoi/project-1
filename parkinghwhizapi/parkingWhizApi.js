var parkingWhizUrl = "";


  function initialize() {
        var address = (document.getElementById('pac-input'));
        var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }
        /*********************************************************************/
        /* var address contain your autocomplete address *********************/
        /* place.geometry.location.lat() && place.geometry.location.lat() ****/
        /* will be used for current address latitude and longitude************/
        /*********************************************************************/
       
       document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('long').innerHTML = place.geometry.location.lng();
        parkingWhizUrl= "http://api.parkwhiz.com/venue/search/?lat="+ $("#lat").text()
        + "&lng=" +$("#lat").text() + "&key=7e1b913bf5063585f1bd14b74d2b383b";
        console.log("gggg");
        // console.log(lng);
        console.log(parkingWhizUrl);
        });

  }

   //google.maps.event.addDomListener(window, 'load', initialize);
   


   $('#submit').on('click', function() {
    //debugger
        var location = $('#pac-input').val().trim();
        console.log(location);     

/* address,city,distance,name,state,zip*/



        /*var queryURL = "http://api.parkwhiz.com/venue/search/?lat=42.082089&lng=-71.2796045&key=";
        var apiKey = "7e1b913bf5063585f1bd14b74d2b383b";*/
        //var queryURL="https://crossorigin.me/http://api.parkwhiz.com/venue/search/?lat=42.082089&lng=-71.2796045&key=7e1b913bf5063585f1bd14b74d2b383b"

        var queryURL = "https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+$("#lat").val()+","+("#lng").val()+"&radius=500&type=restaurant&key=AIzaSyDOQMDnJhK0du419usTwHx0OvngOQ9qPzA";


       //var queryURL = 'https://crossorigin.me/http://api.parkwhiz.com/venue/search/?name=' + location +'&key=7e1b913bf5063585f1bd14b74d2b383b';
        console.log(queryURL);
        $.ajax({
                //url: parkingWhizUrl,
                url: queryURL,//queryURL, //+ apiKey,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                // step 1: Run this file, click a button, and see what the data looks like in the browser's console. Open up the Object, then open up the data key, then open up 0. Study the keys and how the JSON is structured.
                //console.log(response);
                // step 2: since the image information is inside of the data key then make a variable named results and set it equal to response.data
                //------------put step 2 in between these dashes--------------------
                // var resAddress = response[0].address;
                // var resCity = response[0].city;
                // var resDistance = response[0].distance;
                // var resName = response[0].name;
                // var resState = response[0].state;
                // var resZip = response[0].zip;
                
                //  console.log(resAddress + resCity+ resDistance +resName+resState +resZip);
                //console.log('results', results);
                //----------------- ---------------
               /* for (var i = 0; i < results.length; i++) {                   
                    var animalDiv = $('<div>');
                    var p = $('<p>'); 
                   
                    p.text(results[i].rating);
                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#gifsAppearHere').append(animalDiv);
                }*/
                
            });
            return false;
            

    });
   initialize();