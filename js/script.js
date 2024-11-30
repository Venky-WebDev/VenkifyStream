// Array to hold video sources
const videoSources = [
    "assets/videos/v1.mp4",
    "assets/videos/v2.mp4",
    "assets/videos/v3.mp4",
    "assets/videos/v4.mp4",
    "assets/videos/v5.mp4",
    "assets/videos/v6.mp4"
];

let currentVideoIndex = 0; // Keeps track of the current video index
const video = document.getElementById("video");
const videoWrapper = document.getElementById("videoWrapper");

// Submit Name
function submitName() {
    const name = document.getElementById("nameInput").value;

    if (name) {
        document.getElementById("displayName").innerText = `Hello, ${name}!`;
        document.getElementById("output").style.display = "block";
        video.play();
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("submitButton").style.display = "none";
    } else {
        alert("Please enter your name.");
    }
}

// Refresh Page
function refreshPage() {
    location.reload();
}

// Play the next video
function nextVideo() {
    if (currentVideoIndex < videoSources.length - 1) {
        currentVideoIndex++;
        changeVideo('next');
    } else {
        alert("You are already at the last video!");
    }
}

// Play the previous video
function prevVideo() {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
        changeVideo('prev');
    } else {
        alert("You are already at the first video!");
    }
}

// Change video and update like button
function changeVideo(direction) {
    if (direction === 'next') {
        videoWrapper.classList.add('video-slide-left');
    } else if (direction === 'prev') {
        videoWrapper.classList.add('video-slide-right');
    } else {
        videoWrapper.classList.add('video-slide-top');
    }
    
    setTimeout(() => {
        video.src = videoSources[currentVideoIndex];
        video.load();
        video.play();
        videoWrapper.classList.remove('video-slide-left');
        videoWrapper.classList.remove('video-slide-right');
        videoWrapper.classList.remove('video-slide-top');
        videoWrapper.classList.remove('video-slide-bottom');
    }, 500); // Wait for the slide-out animation to finish

    updateLikeButton(); // Update like button for the new video
}

// Initialize like button state for the current video
function updateLikeButton() {
    const likeButton = document.getElementById("likeButton");
    const likeKey = `videoLiked_${currentVideoIndex}`;
    const isLiked = localStorage.getItem(likeKey) === 'true';

    if (isLiked) {
        likeButton.classList.add('liked');
    } else {
        likeButton.classList.remove('liked');
    }
}

// Toggle like state for the current video
function toggleLike() {
    const likeButton = document.getElementById("likeButton");
    const likeKey = `videoLiked_${currentVideoIndex}`;
    const isLiked = likeButton.classList.contains('liked');

    if (isLiked) {
        likeButton.classList.remove('liked');
        localStorage.removeItem(likeKey);
    } else {
        likeButton.classList.add('liked');
        localStorage.setItem(likeKey, 'true');
    }
}

// Event listener for video end (auto-play next video)
video.addEventListener('ended', () => {
    if (currentVideoIndex < videoSources.length - 1) {
        currentVideoIndex++;
        changeVideo('next');
    }
});

// Swipe or drag functionality
let startX, endX;

// For mobile swipe detection
videoWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

videoWrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) { // Swipe left
        nextVideo();
    } else if (endX - startX > 50) { // Swipe right
        prevVideo();
    }
});

// For desktop drag detection
let isDragging = false;

videoWrapper.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
});

videoWrapper.addEventListener('mousemove', (e) => {
    if (isDragging) {
        endX = e.clientX;
    }
});

videoWrapper.addEventListener('mouseup', () => {
    if (startX - endX > 50) { // Drag left
        nextVideo();
    } else if (endX - startX > 50) { // Drag right
        prevVideo();
    }
    isDragging = false;
});

// Initialize the video and like button on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLikeButton(); // Initialize the like button state for the current video
});