//Ensure the DOM has loaded
$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    let tweetLength = $(this).val().length;
    let charRemaining = 140 - tweetLength;
    
    // turn the counter red if more that 140 characters
    $(this).parent().find(".counter").css("color", "black");
    if (charRemaining < 0) {
      $(this).parent().find(".counter").css("color", "red");
    }
    
    $(this).parent().find(".counter").text(charRemaining);

  })








});