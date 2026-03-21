const smartphones = document.querySelector(".smartphones");
const smartphoneLink = document.querySelector(".phones");

smartphoneLink.addEventListener("mouseenter", () => {
    smartphones.style.opacity = "1";
});

smartphoneLink.addEventListener("mouseleave", () => {
    smartphones.style.opacity = "0";
});

