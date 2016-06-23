$(document).ready(function(){

  $('#submit').on('click', function(){
    console.log("it clicked");
    $('#eventsDisplay').empty();
    var p= $('#zipCode').val();
    console.log(p);
  
    
    var queryURL = 'https://crossorigin.me/http://api.eventful.com/json/events/search?app_key=P69H26fPKMJfCRcm&q=music&l=' + p + '&within=10&units=miles&t=this+weekend';

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
        var infoDiv = $('<button>').attr('class','eventButtons btn-primary');
        var eventTitle = event[i].title;
        console.log(eventTitle);
        var eventCity = event[i].city_name;
        console.log(eventCity);
        var eventRegion = event[i].region_abbr;
        var eventVenue = event[i].venue_name;
        var venueAddress = event[i].venue_address;
        infoDiv.append('Location: ', eventCity,', ', eventRegion, '<br/>');
        infoDiv.append('Event: ', eventTitle, '<br/>');
        infoDiv.append('Venue: ', eventVenue, '<br/>');
        infoDiv.append('Venue Address: ', venueAddress)
        infoDiv.attr('data-desc', event[i].description);
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

  $(document).on('click', '.eventButtons', function(){
    console.log(this);
    $('#eventDescription').empty();
    $('#eventDescription').html($(this).data('desc'));
  });

});
