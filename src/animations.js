//Variables and Elements for intro animation
let introText = "Hi, I'm Andrew Lin";
const introHolder = document.getElementById('intro');
const introTextElement = document.getElementById("intro-text-holder");
const hand = document.getElementById('hand');
const header_top = document.getElementById("header-top");
const header_side = document.getElementById("header-side");
// const menu_cont = document.getElementById("menu-container");
// const menu = document.getElementById("menu");

// let introDelay = 400;
// let introTimeout = 50;

// //calls addChar for each character in the intro text
// //then calls wavehand
// function addChar(i, timeout) {
//     if (i < introText.length) {
//         introTextElement.innerHTML += introText[i];
//         i++;
//         setTimeout(addChar, timeout, i, timeout);
//     } else {
//         hand.classList.remove('hidden');
//         introHolder.classList.add('animate-cursorBlink');
//     }
// }

// //calls addChar
// function animateTypeWriter() {
//     let i = 0;
//     introTextElement.innerHTML = "";
//     hand.classList.add('hidden');
//     hand.classList.remove('animate-waving');
//     introHolder.classList.add('border-r-4');
//     introHolder.classList.remove('animate-cursorBlink');
//     setTimeout(addChar, introDelay, i, introTimeout);
// }

// //when blinking animation ends, start waving animation
// introHolder.addEventListener('animationend', () => {
//     hand.classList.add('animate-waving');
// })

// //when waving animation ends, wait a bit, then start the whole thing over
// hand.addEventListener('animationend', () => {
//     setTimeout(animateTypeWriter, 750);
// })


// //starts animation loop
// animateTypeWriter();



 document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    let introTL = gsap.timeline({ repeat: -1});
    let mm = gsap.matchMedia();

    //intro typing animation (e.g. Hi, I'm Andrew Lin ✋)
    introTL.set("#intro", {borderRightColor: '#FF6600'});
    introTL.fromTo("#intro", {borderRightColor: 'transparent'}, {borderRightColor: '#FF6600', duration: 1, ease:"steps(1)"}, '>+=0.5s');
    introTL.to("#intro-text-holder", {duration: 1, text: "Hi, I'm Andrew Lin", ease: "none"});
    introTL.to("#hand", {duration: 0.15, text: "✋", ease: "none"});

    introTL.fromTo("#intro", {borderRightColor: '#FF6600'}, {borderRightColor: 'transparent', duration: 1, ease:"steps(1)", repeat: 1}, '<');
    introTL.to("#hand", {scale: 1.3, duration: 0.25}, '>+=0.5s');
    introTL.to("#hand", {
        keyframes: {
            rotation: [0, 15, 0, -15, 0],
            x: [0, 10, 0, -10, 0],
            easeEach: 'none',
        },
        duration: 0.5,
        repeat: 1
    }, "<");
    introTL.to("#hand", {scale: 1, duration: 0.25}, '-=0.3s');
    introTL.fromTo("#intro", {borderRightColor: '#FF6600'}, {borderRightColor: 'transparent', duration: 1, ease:"steps(1)", repeat: 1}, '>+=0.5s');
    introTL.set("#intro", {backgroundColor: '#79A0D0'});
    introTL.set("#intro", {borderRightColor: '#FF6600'}, '>+=0.75s');

    //header and links animation
    let tl = gsap.timeline();
    tl.fromTo("#header-top", {yPercent: -100}, {yPercent:0, duration: 1});
    tl.from("#header-top", {opacity:0, duration: 1.7}, "<");

    tl.fromTo("#menu-container", {xPercent: 75}, {xPercent: 0, duration: 1}, "<");
    tl.from("#menu", {opacity:0, duration: 1.7}, "<");

    tl.fromTo(".link-icon", {xPercent: -200}, {xPercent:0, duration: 0.7, pointerEvents: 'auto', ease: 'power3.out', stagger:0.15}, "<+=0.7s");
    tl.from(".link-icon", {opacity:0, duration: 1.3, stagger: 0.15}, "<");

    //tilt animation
    const tilt_elements = document.querySelectorAll('.tilt');
    tilt_elements.forEach(element => {
        gsap.set(element, {transformPerspective: 500});
        element.addEventListener('mousemove', (e) => {
            const {width, height, left, top } = element.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const deltaX = Math.min(1,(e.clientX - centerX) / (width / 2));
            const deltaY = Math.min(1,(e.clientY - centerY) / (height / 2));

            const coeff = element.getAttribute("tilt-coeff") || 20;

            const rotateX = deltaY * coeff;
            const rotateY = -deltaX * coeff;
            gsap.to(element, {rotationX: rotateX, rotationY: rotateY, duration: 0.1});
        });
        const zoom = element.getAttribute("tilt-zoom") || 1.2;
        element.addEventListener('mouseover', () => {gsap.to(element, {scale:zoom, duration: 0.1})});
        element.addEventListener('mouseleave', () => {gsap.to(element, {scale:1, rotateX: 0, rotateY:0, duration: 0.1})})
    })

    //wide screen animations
    mm.add("(min-width:1024px)", () => {
        // header background darken on scroll animation
        gsap.to("#header-top", {
            scrollTrigger: {
                trigger: '#header-top',
                start: 'top +=-100px',
                end: 'top +=-300px',
                scrub: true
            },
            backgroundColor: 'rgba(19, 19, 21, 0.4)',
        });

        
        //About section scroll animation
        let aboutTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#About",
                start: 'top 92px',
                end: '+=200%',
                toggleActions: "play none none reset",
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
            defaults: {duration: 15}
        });
        // aboutTL.from('#About', { yPercent: 20, opacity: 0, ease: 'power3.out'});
        aboutTL.from('#about-title', { yPercent: 40, opacity: 0, ease: 'power3.out'}, '<');
        aboutTL.fromTo('#about-line', {width: 0}, {width:300},'>-=5s');
        aboutTL.from('#about-desc', {yPercent: 20, opacity: 0, ease: 'power3.out'}, '>-=1s');
        aboutTL.from('#pfp', {yPercent:15, xPercent: 15, rotation: 15, scale:0.8, opacity: 0, ease: 'power3.out'},);
        aboutTL.fromTo('.img-rect', {strokeDasharray: 1500, strokeDashoffset: 1500}, {strokeDashoffset: 0, duration: 20, stagger: 5});



        //Experience section scroll animation
        let experienceTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#Experience",
                start: 'top 10%',
                end: '+=300%',
                toggleActions: "play none none reset",
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
            defaults: {duration: 5}
        });
        gsap.set('.captions-bullet', {transformPerspective: 500});
        gsap.set('.lg-bullet', {transformPerspective: 500});
        experienceTL.from('#experience-title', {opacity: 0, yPercent: 20, ease: 'power3.out'});
        experienceTL.fromTo('#experience-line', {width: 0}, {width:400},'>-=3s');
        experienceTL.fromTo('#corner', {strokeDasharray: 20, strokeDashoffset: -20}, {strokeDashoffset: 0, duration: 1}, '<');
        experienceTL.fromTo('#v-line-1', {strokeDasharray: 100, strokeDashoffset: 100}, {strokeDashoffset: 0, duration: 2}, '<+=1s');
        experienceTL.fromTo('#circle-1', {strokeDasharray: "0, 200", strokeDashoffset: -43}, {strokeDasharray: "80, 200", strokeDashoffset: 20, duration: 5}, '<+=2s');
        experienceTL.fromTo('#h-line-1', {strokeDasharray: 50, strokeDashoffset: 50}, {strokeDashoffset: 0, duration: 2}, '<+=1.5s');
        experienceTL.from('#captions-head', {clipPath:'inset(0 100% 0 0)', duration: 30});
        // experienceTL.from('#captions-title', {clipPath:'inset(0 100% 0 0)', duration: 5});
        experienceTL.fromTo('#v-line-2', {strokeDasharray: 500, strokeDashoffset: 500}, {strokeDashoffset: 0, duration:120});
        experienceTL.from('.captions-bullet', {y:-10, rotateX:-90, ease: 'bounce', duration: 15, stagger:10}, '<');
        // experienceTL.to('.captions-bullet', {y:0, rotateX:0, ease: 'power1.inOut', duration: 20, stagger:10, reversed: true});


        experienceTL.fromTo('#circle-2', {strokeDasharray: "0, 200", strokeDashoffset: -43}, {strokeDasharray: "80, 200", strokeDashoffset: 20, duration: 5});
        experienceTL.fromTo('#h-line-2', {strokeDasharray: 50, strokeDashoffset: 50}, {strokeDashoffset: 0, duration: 2}, '<+=1.5s');
        experienceTL.from('#lg-head', {clipPath:'inset(0 100% 0 0)', duration: 30});
        experienceTL.fromTo('#v-line-3', {strokeDasharray: 500, strokeDashoffset: 500}, {strokeDashoffset: 0, duration:120});
        experienceTL.from('.lg-bullet', {y:-10, rotateX:-90, ease: 'bounce', duration: 15, stagger:10}, '<');
    });



    // Small Screen Menu open and close animation
    mm.add("(max-width:1023px)", () => {
        let menu_tl = gsap.timeline();
        menu_tl.to('#bottom-rect2', {scaleY: 4.5, scaleX: 2.3, y: 390, x: -150, duration: 0.4, ease: 'power3.in'});
        menu_tl.to('#bottom-rect1', {scaleY: 4.5, scaleX: 1.4, y: 298, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s');
        menu_tl.to('#middle-rect', {scaleY: 4.5, scaleX: 2.2, y: 218, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s');
        menu_tl.to('#top-rect2', {scaleY: 4.5, scaleX: 3, y: 136, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s');
        menu_tl.to('#top-rect1', {scaleY: 4.5, scaleX: 1.75, y: 46, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s');
        
        menu_tl.to('#header-side', {
            x: -330,
            duration: 0.3,
            backgroundColor: 'rgba(19, 19, 21, 0.4)',
        }, '<-=0.2s');
        menu_tl.fromTo('#header-text', {opacity: 0}, {opacity:1, duration:0.2}, '-=0.1s');
        menu_tl.to('.menu-rect', {opacity: 0, duration: 0.2}, '-=0.1s');
        menu_tl.pause();

        menu.addEventListener('mouseover', () => {menu_tl.play();});
        menu.addEventListener('touchstart', () => {menu_tl.play();});

        header_side.addEventListener('mouseleave',  () => {menu_tl.reverse();});
        document.body.addEventListener('touchstart', (event) => { 
            if (!header_side.contains(event.target)) {
                menu_tl.reverse();
            }
        });
    });



    

   });