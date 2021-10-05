//Ensure the DOM has loaded
$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    let tweetLength = $(this).val().length;
    let charRemaining = 140 - tweetLength;
    console.log(charRemaining);
    $(this).parent().find(".counter").css("color", "black");
    if (charRemaining < 0) {
      $(this).parent().find(".counter").css("color", "red");
    }
    console.log($(this).parent().find(".counter"));
    $(this).parent().find(".counter").text(charRemaining);


  })








});