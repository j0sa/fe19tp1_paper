document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

/* Redirect code start page  */
//<!-- redirect information page -->
$(document).ready(function () {
  if (typeof Cookies.get('secondvisit') === 'undefined') {
    window.location.href = "start.html";
  }
})

//<!-- Adds second Visit cookie -->
$(document).ready(function () {
  // Create cookie so that the user is no longer redirected
  let a = Cookies.set('secondvisit', 'true', {
    expires: 7
  });
});

$(document).ready(function () {
  let menu = "close";
  $(".menu-toggle, .mobile .menu-toggle").click(function () {
    if (menu === "close") {
      $(this).parent().next(".mobile-nav").css("transform", "translate(0, 0)");
      menu = "open";
    } else {
      $(this).parent().next(".mobile-nav").css("transform", "translate(-100%, 0)");
      menu = "close";
    }
  });
});