/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function () {
  console.log("document is ready");


  const renderTweets = function (tweets) {

    for (const tweet of tweets) {

      const newTweet = createTweetElement(tweet);

      $('#tweets').append(newTweet);
    }

  };



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
    <p>${tweetData.created_at}</p>
  </footer>
</article>`);

    return $tweet;
  };


  renderTweets(data);


});