/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  const getTweets = function() {
    $.get("/tweets/", function(data) {
      renderTweets(data);
    })
  };

  getTweets();

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
      <p>${tweetObj.content.text}</p>
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



  // Handling the actual submission of the new tweet to the server
  const $newTweetForm = $("#new-tweet");
  $newTweetForm.on("submit", function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    
    $.post("/tweets/", serializedData, (response) => {
      getTweets();
    });

  })

});

