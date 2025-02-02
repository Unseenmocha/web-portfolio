import { horizontalLoop } from "./horizontalLoop.js";
import { setUpLargeScreenAnimations } from "./largeScreen.js";
import { setUpSmallScreenAnimations } from "./smallScreen.js";
import { colors } from "./colors.js";

history.scrollRestoration = "manual";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

document.addEventListener('DOMContentLoaded', (event) => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(Observer)

    let introTL = gsap.timeline({ repeat: -1});
    let mm = gsap.matchMedia();

    mm.add({
        isLarge: '(min-width:1024px)',
        isSmall: '(max-width:1023px)'
    },
    (context) => {
        let { isLarge, isSmall } = context.conditions;
        if (isLarge) {setUpLargeScreenAnimations();}
        if (isSmall) {setUpSmallScreenAnimations();}
    })

    //intro typing animation (e.g. Hi, I'm Andrew Lin ✋)
    introTL.set('#intro', {borderRightColor: colors.flame});
    introTL.fromTo('#intro', {borderRightColor: 'transparent'}, {borderRightColor: colors.flame, duration: 1, ease:'steps(1)'}, '>+=0.5s');
    introTL.to('#intro-text-holder', {duration: 1, text: "Hi, I'm Andrew Lin", ease: 'none'});
    introTL.to('#hand', {duration: 0.15, text: '✋', ease: 'none'});

    introTL.fromTo('#intro', {borderRightColor: colors.flame}, {borderRightColor: 'transparent', duration: 1, ease:'steps(1)', repeat: 1}, '<');
    introTL.to('#hand', {scale: 1.3, duration: 0.25}, '>+=0.5s');
    introTL.to('#hand', {
        keyframes: {
            rotation: [0, 15, 0, -15, 0],
            x: [0, 10, 0, -10, 0],
            easeEach: 'none',
        },
        duration: 0.5,
        repeat: 1
    }, '<');
    introTL.to('#hand', {scale: 1, duration: 0.25}, '-=0.3s');
    introTL.fromTo('#intro', {borderRightColor: colors.flame}, {borderRightColor: 'transparent', duration: 1, ease:'steps(1)', repeat: 1}, '>+=0.5s');
    introTL.set('#intro', {backgroundColor: '#79A0D0'});
    introTL.set('#intro', {borderRightColor: colors.flame}, '>+=0.75s');


    //Resume download button animations
    gsap.set('#download-button-fill', {clipPath: 'circle(0px at 0px 0px'})
    let downloadButtonTL = gsap.timeline({paused:true})
    .to('#download-arrow', {rotation:360, transformOrigin:'center', duration:0.4})
    .to('#download-arrow', {y:-10, duration:0.2}, '<')
    .to('#download-rect', {y:10, duration:0.2}, '<')
    .to('#download-arrow', {y:1, duration:0.2}, '>')
    .to('#download-rect', {y:-1, duration:0.2}, '<')

    let buttonFill = document.getElementById('download-button-fill');
    let button = document.getElementById('download-button');
    let buttonOffTimeout, animationFrameId, buttonPressed = false;

    //Creates the download
    Observer.create({
        target: '#download-button',
        type: 'pointer',
        onHover: ()=>{downloadButtonTL.play()},
        onHoverEnd: (self) => {
            clearTimeout(buttonOffTimeout);

            //Set timeout to account for duration of onMove animation
            buttonOffTimeout = setTimeout(() => {downloadButtonTL.reverse();
                const {width, height, left, top } = buttonFill.getBoundingClientRect();
                const x = (self.x - left);
                const y = (self.y - top); 
                gsap.to('#download-button-fill', {clipPath: 'circle(0px at '+x+'px '+y+'px)'});
            }, 100)

        },
        onMove: (self) => {
            //using animationFrames to limit callback rate
            if (animationFrameId) {return;}
            animationFrameId = requestAnimationFrame(() => {
                animationFrameId = null;
                const {width, height, left, top } = buttonFill.getBoundingClientRect();
                const x = (self.x - left);
                const y = (self.y - top); 
                gsap.to('#download-button-fill', {clipPath: 'circle(150px at '+x+'px '+y+'px)', duration:0.3});
            })
            
        },
        onPress: () => {
            if (!buttonPressed) {
                buttonPressed = true;
                gsap.to('#download-button', {scale: 0.95, duration: 0.2, yoyo:true, repeat: 1});
                setTimeout(() => {
                    buttonPressed = false;
                    button.download = 'Andrew-Lin-Resume';
                    button.href = './Andrew-Lin-Resume.pdf';
                    button.click();
                    button.removeAttribute('href');
                    button.removeAttribute('download');
                }, 400)
            }
        }
    })

    //tilt animation
    const tilt_elements = document.querySelectorAll('.tilt');
    tilt_elements.forEach(element => {
        gsap.set(element, {transformPerspective: 500});
        const zoom = element.getAttribute('tilt-zoom') || 1.1;
        Observer.create({
            target: element,
            type: 'pointer',
            onMove: (o) => {
                const {width, height, left, top } = element.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const deltaX = Math.min(1,(o.x - centerX) / (width / 2));
                const deltaY = Math.min(1,(o.y - centerY) / (height / 2));

                const coeff = element.getAttribute('tilt-coeff') || 20;

                const rotateX = deltaY * coeff;
                const rotateY = -deltaX * coeff;
                gsap.to(element, {rotationX: rotateX, rotationY: rotateY, duration: 0.1});
            },
            onHover: () => {gsap.to(element, {scale:zoom, duration: 0.1})},
            onHoverEnd: () => {
                setTimeout(()=> {
                    gsap.to(element, {scale:1, rotateX: 0, rotateY:0, duration: 0.1});
                }, 100)},
        })
    });

    //growing arrow animation on hover for links (if included)
    const link_arrows = document.querySelectorAll('a .arrow');
    link_arrows.forEach(arrow => {
        parent = arrow.parentElement;
        const animateArrow = gsap.from(arrow, {scale: 0, xPercent: -100, yPercent: 100, duration: 0.1, paused: true});
        Observer.create({
        target: parent,
        type: 'pointer',
        onHover: () => {animateArrow.play();},
        onHoverEnd: () => {animateArrow.reverse();}
        })
    })


    //skills section horizontal loop animation
    const setupHorizontalLoop = () => {
        const skills_top = gsap.utils.toArray(".skill-box-top");
    
        const loop_top = horizontalLoop(skills_top, {
            center: true,
            repeat: -1,
        });
    
        const skills_bottom = gsap.utils.toArray(".skill-box-bottom");
    
        const loop_bottom = horizontalLoop(skills_bottom, {
            center: true,
            repeat: -1,
            reversed: true,
        })
    }
    
    window.addEventListener("load", () => {
        setTimeout(setupHorizontalLoop, 50);
    })    

    //Nav scroll animation
    const setUpNavScroll = () => {
        let links = gsap.utils.toArray(".header a");
        links.forEach(a => {
        let element = document.querySelector(a.getAttribute("href")),
            linkST = ScrollTrigger.create({
                    trigger: element,
                    start: "top top"
                });
        ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onToggle: self => self.isActive && setActive(a)
        });
        a.addEventListener("click", e => {
            e.preventDefault();
            gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
        });
        });

        function setActive(link) {
            links.forEach(el => el.classList.remove("active"));
            link.classList.add("active");
        }
    }
    setUpNavScroll();

    window.addEventListener("resize", setUpNavScroll);

    //project section link on hover change bg color
    let project_links = gsap.utils.toArray('.project-title');
    project_links.forEach((link) => {
        Observer.create({
            target: link,
            type: 'pointer',
            onHover: () => {
                gsap.to(link, {
                    backgroundColor: colors.raisin, 
                    duration: 0.1,
                })
            },
            onHoverEnd: () => {
                gsap.to(link, {
                    backgroundColor: colors.jet,
                    duration: 0.1,
                })
            }
        })
    })

    //contact links on hover change bg color and svg fill/stroke color
    let contact_links = gsap.utils.toArray('.contact-link');
    contact_links = contact_links.concat(gsap.utils.toArray('.top-contact-link'));

    contact_links.forEach((link) => {
        let isTop = link.classList.contains('top-contact-link');
        let isGithub = link.classList.contains('github');
        Observer.create({
            target: link,
            type: 'pointer',
            onHover: () => {
                gsap.to(link, {
                    backgroundColor: isTop? colors.jet : colors.raisin, 
                    fill: colors.flame, 
                    stroke: isGithub ? 'transparent' : colors.flame,
                    duration: 0.1,
                })
            },
            onHoverEnd: () => {
                gsap.to(link, {
                    backgroundColor: isTop? colors.raisin : colors.jet,
                    fill: colors.platinum,
                    stroke: isGithub? 'transparent': colors.platinum,
                    duration: 0.1,
                })
            }
        })
    })
    

    //animations for arrow that brings you back to the top of the page
    const back_to_top_arrow = document.getElementById('back-to-top-arrow');

    const hoverObserver = Observer.create({
        target:back_to_top_arrow,
        type: 'pointer',
        onHover: () => {gsap.to('#back-to-top-arrow', {scale: 1.2, duration: 0.3});},
        onHoverEnd: ()=> {gsap.to('#back-to-top-arrow', {scale: 1, duration: 0.3});},
    });

    Observer.create({
        target:back_to_top_arrow,
        type: 'pointer, touch',
        onPress: () => {
            hoverObserver.disable();
            gsap.to(window, {duration: 1, scrollTo: {y: 0}, overwrite: 'auto', onComplete: () => { hoverObserver.enable() }});
        }
    });


    gsap.fromTo('#back-to-top-arrow', {scale: 0}, {scale:1, duration:0.5, display:'flex',
        scrollTrigger: {
            trigger: '#Skills', start: 'top bottom', toggleActions: 'play none none reverse'
        },
    });


    //confetti animation for reaching the bottom
    const jsConfetti = new JSConfetti()
    let confetti_out = false;

    const setUpConfetti = () => {
        let confettiObserver = Observer.create({
            target: window,
            type: 'scroll',
            onChangeY: () => {
                if ((window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) && !confetti_out) {
                    confetti_out = true;
                    jsConfetti.addConfetti().then(()=> {
                        jsConfetti.clearCanvas();
                        confetti_out = false;
                    })
                }
            }
        })
    }
    setUpConfetti();
    window.addEventListener("resize", setUpConfetti);
    

    let timeout;

    //reload on resize but only on large screen size
    window.addEventListener("resize", () => {
        //debouncing in case of too many resize calls
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            //Reloading on resize instead of handling resetting animations seems to just work better overall
            let width = Math.max(
                document.body.scrollWidth,
                document.documentElement.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.offsetWidth,
                document.documentElement.clientWidth
              );
            if (width >= 1024) {
                location.reload();
            }
        }, 500)
    });

});