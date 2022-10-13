/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/




$(document).ready(function () {
  console.log("document is ready");

  
  
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
      
    for (const tweet of tweets) {
console.log(tweet)
      const newTweet = createTweetElement(tweet);

      $('#tweets').prepend(newTweet);
    }

  };

  
  //Ajax request for fetching tweets for /tweets
  const loadTweets = function () {
    console.log("load tweets happening");
    // $('.container').empty()
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
    .then(function (result) {
      renderTweets(result);
    });
    
  };
  
  
  loadTweets()
  
  









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
      url: '/tweets',
      data: serializedInput
    })
      .then((response) => {
        console.log(response)
        loadTweets()
      })
      .catch((error) => {
        console.log(error)
      })
    
    });









});
