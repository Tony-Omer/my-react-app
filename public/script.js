const smartphones = document.querySelector(".smartphones");
const smartphoneLink = document.querySelector(".phones");

smartphoneLink.addEventListener("mouseenter", () => {
    smartphones.style.opacity = "1";
});

smartphoneLink.addEventListener("mouseleave", () => {
    smartphones.style.opacity = "0";
});



// Hamburger menu

const hamburger = document.querySelector(".bars");
const navMenu = document.querySelector(".top-nav");
const x = document.querySelector(".top-nav .x");


hamburger.addEventListener("click", () => {
    navMenu.style.display = "flex";
    hamburger.style.display = "none";
    x.style.display = "block";

});


function checkScreenSize() {
    if (window.innerWidth > 768) {
        navMenu.style.display = "flex";
        hamburger.style.display = "none";
        x.style.display = "none";
    }
}
window.addEventListener("resize", checkScreenSize);



x.addEventListener("click", () => {
    navMenu.style.display = "none";
    hamburger.style.display = "block";
    x.style.display = "none";
});







