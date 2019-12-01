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
		expires: 2147483647
	});
});
$('.btn--edit').click(function () {

	$(this).text('').removeClass('success').addClass('loading').delay(1000).queue(function () {
		$(this).removeClass("loading").dequeue().addClass('success');
	});

});

let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
handleDarkmode(darkModeMediaQuery);
function handleDarkmode(e) {
	let darkModeOn = e.matches;
	let favicon = document.querySelector('link[rel="icon"]');
	if (darkModeOn) {

		favicon.href = './favicon-light.ico';
	} else {
		favicon.href = '/favicon-dark.ico';
	}

}
darkModeMediaQuery.addListener(handleDarkmode);