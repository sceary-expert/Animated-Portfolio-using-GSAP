function reveal_to_span()
{
    document.querySelectorAll(".reveal")
    .forEach(function (elem) {
        let spanParent = document.createElement("span");
        let spanChild = document.createElement("span");
        spanParent.classList.add("parent");
        spanChild.classList.add("child");
        spanChild.textContent = elem.textContent;
        spanParent.appendChild(spanChild);
        elem.innerHTML = "";
        elem.appendChild(spanParent);

    })
}

function loader_animation()
{

gsap.to(".parent .child", {
    y:"-100%",
    duration:1,
    delay:0.5,
    ease : Expo.easeInOut
})


var tl = gsap.timeline();
tl.to("#black-screen", {
    height : 0,
    duration:2,
    delay:1.5,
    ease: "expo.out",
    onComplete: function () {
        console.log("Animation completed for #black-screen");
    }

})
tl.to("#cyan-screen", {

    height : "100%",
    duration:2,
    delay : -0.7,
    ease: "expo.out"

})
tl.to("#white-screen", {

    height : "100%",
    duration:2,
    delay : -2,
    ease: "expo.out"

})
}
reveal_to_span();
loader_animation()
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    card.addEventListener('click', function() {
        // Assuming URLs are stored in an array
        const urls = [
            'https://asbdesign.in/',
            'https://github.com/sceary-expert/Codeforces-Problem-of-The-Day',
            'https://github.com/sceary-expert/Glimpse-Portal-in-React',
            'https://github.com/sceary-expert/epic-count-converter',
            'https://github.com/sceary-expert/Blog-App-in-React-and-GO',
            'https://github.com/sceary-expert/reunion_assessment_real_estate_buy_and_sell_react'
            // ... more URLs ...
        ];

        // Open the corresponding URL based on the index
        window.location.href = urls[index];
    });
});
