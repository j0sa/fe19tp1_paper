//<!-- redirect information page -->
$(document).ready(function () {
    if (typeof Cookies.get('secondvisit') === 'undefined') {
        window.location.href = "about.html";
    }
})
//<!-- Adds second Visit cookie -->
  $(document).ready(function () {
    // Create cookie so that the user is no longer redirected
    var a = Cookies.set('secondvisit', 'true', {
      expires: 7
    });
  });