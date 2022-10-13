/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/




$(document).ready(function () {
  console.log("document is ready");




  //Ajax request for fetching tweets for /tweets
  const loadTweets = function () {
    console.log("load tweets happening");
    $.ajax({
      url: '/tweets/',
      method: 'GET',
    })
      .then(function (result) {
        renderTweets(result);
      });

  };

  loadTweets();





  // Calls the createTweetElement function on each tweet from
  // the database then appends them to the container on the twitter site
  const renderTweets = function (tweets) {
      
    for (const tweet of tweets) {

      const newTweet = createTweetElement(tweet);

      $('#tweets').prepend(newTweet);
    }

  };




  //Creates a new tweet from tweet information
  const createTweetElement = function (tweetData) {

    const $tweet = $(`
<article class="tweet">
  <header>
    <p>${tweetData.user.avatars}</p>
    <p>${tweetData.user.name}</p>
    <p>${tweetData.user.handle}</p>
  </header>
  <div>
    <p>${tweetData.content.text}</p>
  </div>
  <footer>
    <p>${timeago.format(tweetData.created_at)}</p>
  </footer>
</article>`);

    return $tweet;
  };





  //Ajax request for posting tweets
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    const tweetInput = $('#tweet-text').val()
    const serializedInput = $('#tweet-text').serialize()
   
    //checks whether any characters were entered for the tweet
    if (tweetInput === "") {
      return alert("No tweet message was submitted");
    }
    //Checks whether the tweet character limit was exceeded
    if (tweetInput.length >= 140) {
      return alert("Tweet exceeded character limit");
    } 

    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: serializedInput
    })
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    
    });









});
