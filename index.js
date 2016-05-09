$(document).ready(function(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $("#loading").hide();
      $("#coords").html("Latitude : " + position.coords.latitude + " Longitude : " + position.coords.longitude);
    });
  }
});
