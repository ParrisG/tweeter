/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //hide the error message in the new-tweet form
  const $errorMsg = $(".tweet-validation-error");
  $errorMsg.hide();

  //Define the escape function to use on the user input in the createTweetElement template literal below.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  const createTweetElement = function(tweetObj) {
    // Creates a new tweet article when provided the tweet object
    let $tweet = $(`
    <article class="tweet">
      <header>
        <span>
          <img src=${tweetObj.user.avatars}>
          <span>${tweetObj.user.name}</span>
        </span>
        <span class="user-handle" >${tweetObj.user.handle}</span>
      </header>
      <p>${escape(tweetObj.content.text)}</p>
      <footer>
        <span>${timeago.format(tweetObj.created_at)}</span>
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;
  };


  const renderTweets = function(tweets) {
    //accepts an array of tweets, loops through them calling createTweetElement for each tweet, then appends the returned tweet article to the tweets container
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      renderTweets(data);
    })
  };

  loadTweets();

  // New Text Form Submit handler
  const $newTweetForm = $("#new-tweet");
  $newTweetForm.on("submit", function(event) {
    event.preventDefault();
    $errorMsg.slideUp(100);

    // Validate that the message is between 1 and 140 characters
    const $charCounter = $("#char-counter").val();
    if ($charCounter > 139) {
      $errorMsg.children("span").text("Error: There is no message to tweet!");
      $errorMsg.slideDown(100);
      return;
    } else if ($charCounter < 0) {
      $errorMsg.children("span").text("Error: tweet has exceeded character limit!");
      $errorMsg.slideDown(100);
      return;
    }
    const serializedData = $(this).serialize();
    
    $.post("/tweets/", serializedData, (response) => {
      loadTweets();
    });

  })

});

