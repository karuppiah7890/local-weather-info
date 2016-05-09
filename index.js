$(document).ready(function(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      console.log("Latitude : " + position.coords.latitude + " Longitude : " + position.coords.longitude);
      sendRequest(position.coords.latitude,position.coords.longitude);
    });
  }

});
function sendRequest(lat,lng) {
  $.ajax({
    method : "GET",
    url : "https://simple-weather.p.mashape.com/weatherdata?lat=" + lat + "&lng=" + lng,
    headers : {
      "X-Mashape-Key" : "pwrJioAnoBmshbFKlss0y4E3pj2bp1pAajejsnEY2GaGGc8x0y",
      "Accept" : "application/json"
    },
    dataType : "json",
    success : parseData
  });
}

function parseData(response) {
  console.log(response);

  var AllInfo = response.query.results.channel;
  var temp = AllInfo.item.condition.temp;
  var unit = AllInfo.units.temperature;

  $("#region").html(AllInfo.location.city + ", " + AllInfo.location.region + ", " + AllInfo.location.country);
  $("#info").html(AllInfo.item.condition.text);
  $("#temperature").html(temp);
  $("#unit").html(unit);
  $("#loading").hide();
  $("#weather").show();

  $("#unit").on("click",function(){
    changeTemp($("#temperature").text(),$("#unit").text());
  });
}

function changeTemp(temp,unit) {
  if(unit==="C") {
    temp = (temp * 1.8) + 32;
    unit = "F";
    $("#temperature").html(temp);
    $("#unit").html(unit);
  }

  else if(unit==="F") {
    temp = (temp - 32) / 1.8;
    unit = "C";
    $("#temperature").html(temp);
    $("#unit").html(unit);
  }
}
