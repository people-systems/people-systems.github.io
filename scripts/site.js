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
console.log("hello");
$(document).ready(function() {
    fetch("./image_paths.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(images => {
            shuffle(images);

            const imageList = $("#imageList");
            imageList.empty();

            const selectedImages = images.slice(0, 5);
            selectedImages.forEach(function(src) {
                const listItem = $('<li></li>');
                const imgElement = $('<img>').attr('src', src).attr('alt', 'Img').addClass('small-img');
                const captionElement = $('<div></div>').addClass('caption');
                listItem.append(imgElement).append(captionElement);
                imageList.append(listItem);

                const textToType = "This is an example text that will appear one character at a time.";
                const typingDelay = 50; // Delay in milliseconds

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const caption = entry.target.nextElementSibling;
                            if (caption) {
                                caption.style.visibility = 'visible';
                                typeText(caption, textToType, typingDelay);
                                observer.unobserve(entry.target);
                            }
                        }
                    });
                }, {
                    threshold: 0.8 // Trigger when 80% of the image is visible
                });

                observer.observe(imgElement[0]);
            });

            $(".container img").each(function() {
                $(this).slideDown("slow");
                $(this).css("visibility", 'visible');
                $(this).css("border", '1px solid #4F4F4F');
            });
        })
        .catch(error => {
            console.error('Error fetching image paths:', error);
        });
});