// ================= SMARTPHONES DROPDOWN =================
const smartphones = document.querySelector(".smartphones");
const smartphoneLink = document.querySelector(".phones");

smartphoneLink.addEventListener("mouseenter", () => {
    smartphones.style.opacity = "1";
    smartphones.style.pointerEvents = "auto";
});

smartphoneLink.addEventListener("mouseleave", () => {
    smartphones.style.opacity = "0";
    smartphones.style.pointerEvents = "none";
});


// ================= HAMBURGER MENU =================
const hamburger = document.querySelector(".bars");
const navMenu = document.querySelector(".top-nav");
const x = document.querySelector(".top-nav .x");

hamburger.addEventListener("click", () => {
    navMenu.style.display = "flex";
    hamburger.style.display = "none";
    x.style.display = "block";
});

x.addEventListener("click", () => {
    navMenu.style.display = "none";
    hamburger.style.display = "block";
    x.style.display = "none";
});


// ================= SCREEN RESIZE FIX =================
function checkScreenSize() {
    if (window.innerWidth > 768) {
        navMenu.style.display = "flex";
        hamburger.style.display = "none";
        x.style.display = "none"; // ❗ fixed (should not show X on desktop)
    } else {
        navMenu.style.display = "none";
        hamburger.style.display = "block";
        x.style.display = "none";
    }
}

window.addEventListener("resize", checkScreenSize);

// run once on load
checkScreenSize();


//  LAPTOP DROPDOWN 
const container = document.querySelector(".container");
const laptopsLink = document.querySelector(".laptops");

laptopsLink.addEventListener("mouseenter", () => {
    container.style.opacity = "1";
    container.style.pointerEvents = "auto";
});

laptopsLink.addEventListener("mouseleave", () => {
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
});




