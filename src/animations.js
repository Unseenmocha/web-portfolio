//Variables and Elements for intro animation
let introText = "Hi, I'm Andrew Lin";
const introHolder = document.getElementById('intro');
const introTextElement = document.getElementById("intro-text-holder");
const hand = document.getElementById('hand');
const header_top = document.getElementById("header-top");
const header_side = document.getElementById("header-side");
// const menu_cont = document.getElementById("menu-container");
const menu = document.getElementById("menu");

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
        hand.classList.remove('hidden');
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
    introHolder.classList.remove('animate-cursorBlink');
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



 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    let tl = gsap.timeline();
    let mm = gsap.matchMedia();

    //header intro and bg color animation
    mm.add("(min-width:768px)", () => {
        tl.fromTo("#header-top", {yPercent: -100}, {yPercent:0, duration: 1});
        tl.from("#header-top", {opacity:0, duration: 1.7}, "<");

        gsap.to("#header-top", {
            scrollTrigger: {
                trigger: '#header-top',
                start: 'top +=-50px',
                end: 'top +=-250px',
                scrub: true
            },
            backgroundColor: 'rgba(19, 19, 21, 0.4)',
        });

    });

    // Small Screen Menu open and close animation
    mm.add("(max-width:767px)", () => {
        let menu_tl = gsap.timeline();
        menu_tl.to('#top-rect1', {scaleY: 4.5, scaleX: 1.75, y: 46, x: -150, duration: 0.5,});
        menu_tl.to('#top-rect2', {scaleY: 4.5, scaleX: 3, y: 136, x: -150, duration: 0.5,}, '<');
        menu_tl.to('#middle-rect', {scaleY: 4.5, scaleX: 2.2, y: 218, x: -150, duration: 0.5,}, '<');
        menu_tl.to('#bottom-rect1', {scaleY: 4.5, scaleX: 1.4, y: 298, x: -150, duration: 0.5,}, '<');
        menu_tl.to('#bottom-rect2', {scaleY: 4.5, scaleX: 2.3, y: 390, x: -150, duration: 0.5,}, '<');
        menu_tl.to('#header-side', {
            x: -330,
            duration: 0.4,
            ease: 'power3.out',
            backgroundColor: 'rgba(19, 19, 21, 0.4)'
        }, '<');
        menu_tl.fromTo('#header-text', {opacity: 0}, {opacity:1, duration:0.25}, '-=0.1s');
        menu_tl.to('.menu-rect', {opacity: 0, duration: 0.25}, '-=0.2s');
        menu_tl.pause();

        menu.addEventListener('mouseover', () => {menu_tl.play();});
        menu.addEventListener('touchstart', () => {menu_tl.play();});

        header_side.addEventListener('mouseleave',  () => {
            menu_tl.reverse();
        });
        document.body.addEventListener('touchstart', (event) => { 
            if (!header_side.contains(event.target)) {
                menu_tl.reverse();
            }
        });
    });



    

   });