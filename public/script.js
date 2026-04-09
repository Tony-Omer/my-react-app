const slider = document.querySelector(".slider");
const totalOriginalSlides = 4; // Phones, Laptops, Earphones, Headphones
let index = 0;

setInterval(function () {
    index++;

    // 1. Start the smooth transition to the next slide
    slider.style.transition = "transform 0.6s ease-in-out";
    slider.style.transform = `translateX(-${index * 100}vw)`;

    // 2. Check if we just moved to the CLONED slide (index 4)
    if (index === totalOriginalSlides) {
        
        setTimeout(function () {
            slider.style.transition = "none"; 
            slider.style.transform = "translateX(0)"; 
            index = 0; 
        }, 600); 
    }
}, 3000); 