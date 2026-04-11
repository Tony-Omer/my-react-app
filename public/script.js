
const shoppingButtons = document.querySelectorAll(".shoppingBtn");

const slider = document.querySelector(".slider");
const totalOriginalSlides = 4;
let index = 0;
let sliderInterval; // Variable to hold the interval ID

// Function to start the slider
function startSlider() {
    sliderInterval = setInterval(function () {
        index++;

        // 1. Start the smooth transition
        slider.style.transition = "transform 0.6s ease-in-out";
        slider.style.transform = `translateX(-${index * 100}vw)`;

        // 2. Check if we moved to the cloned slide
        if (index === totalOriginalSlides) {
            setTimeout(function () {
                slider.style.transition = "none";
                slider.style.transform = "translateX(0)";
                index = 0;
            }, 600);
        }
    }, 3000);
}

// Function to stop the slider
function stopSlider() {
    clearInterval(sliderInterval);
}

// Event Listeners for Hover
shoppingButtons.forEach(button => {
    button.addEventListener("mouseenter", stopSlider);
});

shoppingButtons.forEach(button => {
    button.addEventListener("mouseleave", startSlider);
});

// Event Listeners for Click
shoppingButtons.forEach(button => {
    button.addEventListener("click", stopSlider);
});

// Initialize the slider on page load
startSlider();