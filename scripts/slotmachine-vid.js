$.fn.pause = function(duration) {
    $(this).animate({ dummy: 1 }, duration);
    return this;
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function typeText(element, text, delay) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, delay);
        }
    }
    type();
}

$(document).ready(function() {
    const typingDelay = 10;

    shuffle(videos);
    const videoList = $("#videoList");
    videoList.empty();

    const selectedVideos = videos.slice(0, 30);
    selectedVideos.forEach(function(src, index) {
        const listItem = $('<li></li>');
        const videoElement = $('<video>').attr('src', src).attr('autoplay', true).attr('muted', true).attr('loop', true).attr('playsinline', true).addClass('small-vid').css('width', '100%');
        const captionElement = $('<div></div>').addClass('captions');
        listItem.append(videoElement).append(captionElement);
        videoList.append(listItem);

        if (index < selectedVideos.length) {
            typeText(captionElement[0], "    ", typingDelay);
        }
    });
});
