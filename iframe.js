// Example JavaScript code to add functionality to the page
console.log("YouTube video embedded!");
// Get the YouTube video iframe
var youtubeVideo = document.getElementById('youtube-video');

// Get the play, pause, and mute buttons
var playButton = document.getElementById('play-button');
var pauseButton = document.getElementById('pause-button');
var muteButton = document.getElementById('mute-button');

// Add event listeners to the buttons
playButton.addEventListener('click', function() {
	youtubeVideo.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
});

pauseButton.addEventListener('click', function() {
	youtubeVideo.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
});

muteButton.addEventListener('click', function() {
	youtubeVideo.contentWindow.postMessage('{"event":"command","func":"' + 'mute' + '","args":""}', '*');
});