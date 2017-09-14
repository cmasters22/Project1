
$(document).ready(function() {

    var config = {
    apiKey: "AIzaSyCJex1acwpZx-jydhhdr0UAkFWqK0uT_v0",
    authDomain: "project1-9ab9c.firebaseapp.com",
    databaseURL: "https://project1-9ab9c.firebaseio.com",
    projectId: "project1-9ab9c",
    storageBucket: "project1-9ab9c.appspot.com",
    messagingSenderId: "522865655856"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var location = "";


    var search ="";
  
      $("#submitBtn").on("click", function(event) {
        
        // doesn't want it to submit before user clicks it
        event.preventDefault();

        search = $("#exampleText").val();
        location = $("#exampleText").val();
        console.log(search);
        console.log("hello");
        $(".resultsPage").removeClass("hidden");
        $("#mainText").css("margin-top","20px");
        $("#searchBar").css("margin-top", "25px");

        database.ref().push({
          location: location
        });
        
        console.log("right below");
        //console.log(snapshot().val().location);
        getWeather(search);
        $("#cityLabel").html(search);
        getHotels();
        getEventful();
});

      $(document).on("click", ".searchButton", function(event){
           var l= event.target.innerHTML;
          getWeather(l);
           
           $("#cityLabel").html(l);
              getHotels();
             getEventful();
      });

       database.ref().on("child_added", function(childSnapshot){
            var loc = childSnapshot.val().location;
            displaySearch(loc);
         });


   function displaySearch(loc){

        var a = $("<button>");

        a.addClass("searchButton");
        a.attr("search", loc);

        a.text(loc);

        $("#inputSearch").append(a);

 }
   
  function getWeather(search, state){ 
    var weatherURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + search + "%2C%20" + state + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
      $.ajax({
         url: weatherURL,
         method: "GET" 
      }).done (function(results){
        console.log("it worked");
        console.log(results);
      console.log(results.query.results.channel.item.condition.temp);

      var uri = "http://www.catprotection.com.au/wp-content/uploads/2014/11/5507692-cat-m.jpg";
      var rex = encodeURI(uri);
      //$("#imgEx").attr("src" , uri);
      var yahooPic = results.query.results.channel.image.url;
      //$("imgEx").attr("src", yahooPic);
      //$("#imgEx").attr("src", yahooPic);

     var currentTemp = results.query.results.channel.item.condition.temp;

      $("#tempInput").html(currentTemp + "&#176;" + " F");
    });
  }
});

function getHotels (search){
    var apikeyh = "n8g8ckeyquhmd6j5trnnvgcn";
    var hotelsURL = "http://api.hotwire.com/v1/deal/hotel?dest=" + search + "&distance=*~30&apikey="+ apikeyh + "&limit=5&format=jsonp";
    console.log(hotelsURL)

    $.ajax({
       url: hotelsURL,
       method: "GET",
       crossDomain: true,
       dataType: 'jsonp',
     }).done (function(results){
       console.log("working");
       console.log(results.Result[0]);
       console.log(results.Result[1]);
       console.log(results.Result[2]);

      $("#description").html(results.Result[0].Headline);
       $("#description2").html(results.Result[1].Headline);
       $("#description3").html(results.Result[2].Headline);

      // $("#hotelLink").html(results.Result[0].Url);

      var tLink = results.Result[0].Url;
       var tlink2 = results.Result[1].Url;
       var tlink3 = results.Result[0].Url;

  $("#hotelLink").attr("href", tLink);
   $("#hotelLink2").attr("href", tLink2);
   $("#hotelLink3").attr("href", tLink3);

    });

    function test(r){
      console.log(r);
    }

function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', apikeyh);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
}
}


function getEventful(search){
var eventfulURL = "http://api.eventful.com/json/events/search/rss?...&location=" + search +"&app_key=2DvXq6pGcC472L2b&sort_order=popularity";
        $.ajax({
      url: eventfulURL,
      method: 'GET',
      crossDomain: true,
      dataType: "jsonp",
      jsonpCallback: "test",
      }).done (function(results){
       console.log("working123");
       console.log(results.events.event[0]);
       // console.log(results.events.event[0].title);
       $("#eventTitle").html(results.events.event[0].title);
       $("#eventTitle2").html(results.events.event[1].title);
       $("#eventTitle3").html(results.events.event[2].title);

      $("#venue").html(results.events.event[0].venue_name);
       $("#venue2").html(results.events.event[1].venue_name);
       $("#venue3").html(results.events.event[2].venue_name);

      $("#eventPic").html(results.events.event[0].image.url);
       $("#eventPic2").html(results.events.event[1].image.url);
       $("#eventPic3").html(results.events.event[2].image.url);


    });

function test(r) {
    console.log(r);
    }

 function setHeader(xhr) {
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
    }
}



