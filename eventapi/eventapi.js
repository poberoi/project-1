$(document).ready(function(){

var click = function() {
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
    //   // var results = response.data;
    //   // for (i=0; i<results.length; i++){
    //   //   var gifDiv = $('<span class="items">').attr('class', 'col-md-4');
    //   //   var rating = results[i].rating;
    //   //   var p = $('<p>').text('Rating: ' + rating);
    //   //   var personImage = $('<img>');
    //   //   personImage.attr('src', results[i].images.original_still.url);
    //   //   personImage.attr('width', 200);
    //   //   personImage.attr('data-still', results[i].images.original_still.url);
    //   //   personImage.attr('data-animate', results[i].images.fixed_height.url);
    //   //   personImage.attr('data-state', 'still');
    //   //   console.log(personImage);
    //   //   gifDiv.append(p)
    //   //   gifDiv.append(personImage)
    //   //   $('#eventsDisplay').append(gifDiv);
    //   // }
      
    // });
      
    }).error(function(data) {
      console.log('in error', data);
    });
    return false;
  });
  };


click();
})