$(document).ready(function () {





  const $textArea = $('#tweet-text');
  //Adjusts page counter based on amount of characters typed into textArea
  $textArea.on("input", function () {
    const counter = $(this).closest("form").find("#counter")[0];
    counter.value = (140 - $(this).val().length);
    //Turns counter red if character limit is exceeded
    if (counter.value <= -1) {
      $(counter).addClass('active');
    } else if (counter.value >= 0) {
      $(counter).removeClass('active');
    }
  });

});