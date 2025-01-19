//Variables and Elements for intro animation
let introText = "Hi, I'm Andrew Lin"
const introHolder = document.getElementById('intro');
const introTextElement = document.getElementById("intro-text-holder");
const hand = document.getElementById('hand');

let introDelay = 400;
let introTimeout = 50;

//calls addChar for each character in the intro text
//then calls wavehand
function addChar(i, timeout) {
    if (i < introText.length) {
        introTextElement.innerHTML += introText[i];
        i++;
        setTimeout(addChar, timeout, i, timeout);
    } else {
        hand.classList.remove('hidden')
        introHolder.classList.add('animate-cursorBlink');
    }
}

//calls addChar
function animateTypeWriter() {
    let i = 0;
    introTextElement.innerHTML = "";
    hand.classList.add('hidden');
    hand.classList.remove('animate-waving');
    introHolder.classList.add('border-r-4');
    introHolder.classList.remove('animate-cursorBlink')
    setTimeout(addChar, introDelay, i, introTimeout);
}

//when blinking animation ends, start waving animation
introHolder.addEventListener('animationend', () => {
    hand.classList.add('animate-waving');
})

//when waving animation ends, wait a bit, then start the whole thing over
hand.addEventListener('animationend', () => {
    setTimeout(animateTypeWriter, 750);
})


//starts animation loop
animateTypeWriter();


 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    let tl = gsap.timeline();

    tl.from(".header", {yPercent: -400, duration: 1});
    tl.from(".header", {opacity:0, duration: 1.4}, "<");


   });