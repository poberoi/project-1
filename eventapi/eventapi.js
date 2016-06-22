$(document).ready(function(){

    $('#submit').on('click', function(){
      console.log("it clicked");
      $('#eventsDisplay').empty();
      var p= $('#zipCode').val();
      console.log(p);
    
    
    var queryURL = 'https://crossorigin.me/http://api.eventful.com/json/events/search?app_key=P69H26fPKMJfCRcm&q=music&l=' + p + '&within=10&units=miles';

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
      var eventLength = response.events.event.length;
      var event = response.events.event;
      console.log(eventLength);
      for (i=0; i<eventLength; i++){
        var infoDiv = $('<button>').attr('class', 'col-md-4');
        var eventTitle = event[i].title;
        console.log(eventTitle);
        var eventCity = event[i].city_name;
        console.log(eventCity);
        infoDiv.append(eventCity);
        infoDiv.append('<br/>');
        infoDiv.append(eventTitle);
        infoDiv.attr('data-lat', event[i].latitude);
        infoDiv.attr('data-lng', event[i].longitude);
        console.log(infoDiv.data('lat'));
        console.log(infoDiv.data('lng'));
        $('#eventsDisplay').append(infoDiv);
      }
      
    }).error(function(data) {
      console.log('in error', data);
    });
    return false;
  });
});
