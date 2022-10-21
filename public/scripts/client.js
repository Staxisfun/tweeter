/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/




$(document).ready(function () {




  //Escaping function for protection against XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;

  };


  //Creates a new tweet from tweet information
  const createTweetElement = function (tweetData) {
    const $tweet = $(`
  <article class="tweet">
    <header>
      <span>
      <img src =${tweetData.user.avatars}/>
      <p>${tweetData.user.name}</p>
      </span>
      <p>${tweetData.user.handle}</p>
    </header>
    <div>
      <p>${escape(tweetData.content.text)}</p>
    </div>
    <footer>
      <p>${timeago.format(tweetData.created_at)}</p>
    <span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-sharp fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </span>
    </footer>
  </article>`);

    return $tweet;
  };


  // Calls the createTweetElement function on each tweet from
  // the database then appends them to the container on the twitter site
  const renderTweets = function (tweets) {
    $('#tweets').empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);

      $('#tweets').prepend(newTweet);
    }

  };


  //Ajax request for fetching tweets for /tweets
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .then(function (result) {
        $('#tweet-text').val("");
        $('#counter').val(140);
        renderTweets(result);
      })

      .catch((error) => {
        console.log(error);
      });

  };


  loadTweets();




  //Ajax request for posting tweets
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    const tweetInput = $('#tweet-text').val();
    const serializedInput = $('#tweet-text').serialize();
    $('#error-container').hide();
    //checks whether any characters were entered for the tweet
    if (tweetInput === "") {
      $('.error-message').html("No tweet message was submitted");
      return $('#error-container').show();
    }
    //Checks whether the tweet character limit was exceeded
    if (tweetInput.length > 140) {
      $('.error-message').html("Tweet exceeded character limit");
      return $('#error-container').show();
    }

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serializedInput
    })
      .then((response) => {
        console.log(response);
        loadTweets();
      })
      .catch((error) => {
        console.log(error);
      });

  });

});