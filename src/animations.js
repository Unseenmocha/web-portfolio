import { horizontalLoop } from "./horizontalLoop.js";

const header_top = document.getElementById('header-top');
const header_side = document.getElementById('header-side');

let colors = {
    'night': "#131315",
    'raisin': "#28282a",
    'jet': "#2E2E31",
    'flame': "#FF6600",
    'gray': "#989898",
    'platinum': "#EAEDE8",
    "eerie": "#1C1C1E",
  };

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

    //header and links animation
    let tl = gsap.timeline();
    const showHeader = gsap.from('#header-top', {yPercent: -100, duration: 0.2, paused: true});

    tl.fromTo('#header-top', {yPercent: -100}, {yPercent:0, duration: 1,
        onUpdate: () => {
            if (window.scrollY > 0) {
                tl.seek('header-out');
                showHeader.reverse();
            }
        }
    });
    tl.from('#header-top', {opacity:0, duration: 1.7}, '<');

    tl.add('header-out');

    tl.fromTo('#menu-container', {xPercent: 75}, {xPercent: 0, duration: 1}, '<');
    tl.from('#menu-visible', {opacity:0, duration: 1.7}, '<');

    tl.fromTo('.link-icon', {xPercent: -200}, {xPercent:0, duration: 0.7, pointerEvents: 'auto', ease: 'power3.out', stagger:0.15}, '<+=0.7s');
    tl.from('.link-icon', {opacity:0, duration: 1.3, stagger: 0.15}, '<');

    mm.add('(min-width:768px)', () => {
       
    })
    

    //wide screen animations
    mm.add('(min-width:1024px)', () => {

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

        // header background darken on scroll animation
        gsap.to('#header-top', {
            scrollTrigger: {
                trigger: '#header-top',
                start: 'top -150px',
                end: 'top -250px',
                scrub: true
            },
            backgroundColor: 'rgba(19, 19, 21, 0.4)',
        });
        // header disappear when scrolling down
        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                if (self.direction == -1) {
                    showHeader.play();
                } else {
                    showHeader.reverse();
                }
            }
        });
        // header blur when scroll past start
        window.addEventListener('scroll', ()=> {
            if (window.scrollY > 0) {
                header_top.classList.add('backdrop-blur-md');
            } else {
                header_top.classList.remove('backdrop-blur-md');
            }
        });

        //About section scroll animation
        let aboutTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#About',
                start: 'top 1px',
                end: '+=200%',
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
            
            defaults: {duration: 0.5}
        });

        // aboutTL.from('#About', { yPercent:40, opacity: 0, ease: 'power3.out'});
        aboutTL.from('#about-title', { yPercent: 40, opacity: 0, ease: 'power3.out'});
        aboutTL.fromTo('#about-line', {width: 0}, {width:300},'<+=0.2s');
        aboutTL.from('#about-desc', {yPercent: 20, opacity: 0, ease: 'power3.out'}, '<+=0.2s');
        aboutTL.from('#pfp', {yPercent:15, xPercent: 15, rotation: 15, scale:0.8, opacity: 0, ease: 'power3.out'},);
        aboutTL.fromTo('.img-rect', {strokeDasharray: 1500, strokeDashoffset: 1500}, {strokeDashoffset: 0, duration: 1, stagger: 0.2});

        
        /**
         * animation function for moving pinned sections (pinned sections that are too tall for the screen and must have the effect of scrolling
         * to show all the content of the animation)
         *
         * @param tl - The timeline for everything in the panel
         * @param setupTLFunc - a function to add animations to the timeline
         * @param altGapCalcElementId - an alternative element to use to calculate the gap between the bottom of the content and the bottom of the panel
         * @param scrollPanelId - the id of the element to be scrolled along with the tl animations
         * @param scrollDurationCoeff - a coefficient used in calculating the speed of the scrolling animation. higher = longer
         * @param scrollDelayCoeff - a coefficient used in calculating the delay of the scrolling animation. higher = longer
         * @param scrollMargin - an additional amount in px that the scroll panel should scroll past covering the gap. This creates a margin at the
         *                       bottom of the content
         */
        function animateScrollablePinPanel(tl, setupTLFunc, altGapCalcElementId, scrollPanelId, scrollDurationCoeff, scrollDelayCoeff, scrollMargin) {
            const fill_tl = () => {
                //distance between height of panel and screen height
                const scrollPanel = document.getElementById(scrollPanelId);
                let panelHeight = scrollPanel.offsetHeight;
                // console.log('\n');
                // console.log(scrollPanelId);
                // console.log('window.innerHeight', window.innerHeight);
                // console.log('panelHeight', panelHeight);

                const altGapElement = document.getElementById(altGapCalcElementId);
                const rect = altGapElement.getBoundingClientRect();
                const elementBottomY = rect.top + rect.height;
                const panelBottomY = scrollPanel.getBoundingClientRect().top + panelHeight;
                // console.log(elementBottomY, panelBottomY);
                
                // two ways of calculating the gap. The one that is smaller (larger magnitude) is the one to use. Will differ depending on browsers
                let gap1 = panelBottomY - elementBottomY - scrollMargin;
                let gap2 = window.innerHeight - panelHeight - scrollMargin;

                let gap = Math.min(gap1, gap2);

                if (tl) {
                    tl.pause(0);
                    tl.clear();
                }
                setupTLFunc(tl);

                let duration = Math.min(3, scrollDurationCoeff*Math.pow(-1/gap,1/3));
                let delay = scrollDelayCoeff*Math.pow(-1/gap,1/3);

                
                // console.log(gap)
                // console.log('\n')
                if (gap < -scrollMargin) {
                    tl.to('#'+scrollPanelId, {translateY:gap, duration: duration}, "start+="+delay+"s");
                }
            }
            fill_tl();

            //reset timeline on resize but only on large screen size
            window.addEventListener("resize", () => {

                //Reloading on resize instead of handling resetting animations seems to just work better overall
                location.reload();
                if (window.innerWidth >= 1024) {
                    fill_tl();
                } else {
                    // if screen size is less than large, set all tweens progress to 1 except for the scroll tween which we want at the beginning
                    let children = tl.getChildren();
                    for (let i = 0; i < children.length; ++i) {
                        children[i].progress(1);
                    }
                    // let lastChild = children[children.length-1];
                    // lastChild.progress(lastChild.targets().some(e => e.id === scrollPanelId) ? 0 : 1);
                    tl.getTweensOf('#'+scrollPanelId).forEach(tween => {
                        tween.progress(0);
                    })
                }
            });
            
        }

        //Experience section scroll animation
        gsap.set('.captions-bullet', {transformPerspective: 500});
        gsap.set('.lg-bullet', {transformPerspective: 500});

        let experienceTL = gsap.timeline({
            defaults: {duration: 0.2},
            scrollTrigger: {
                trigger: '#Experience',
                start: 'top 1px',
                end: '+=200%',
                scrub: 1,
                pin: true,
                pinSpacing: true,
                toggleActions: 'play none none reverse',

            }});

        const setup_exp_tl = (experienceTL) => {    
            //Captions
            experienceTL.add("start")
            .fromTo('#experience-title', {opacity: 0, yPercent: 20}, {opacity:1,yPercent: 0, ease: 'power3.out'}, '<')
            .fromTo('#experience-line', {width: 0}, {width:250},'<+=0.2s')
            .fromTo('#corner', {strokeDasharray: 20, strokeDashoffset: -20}, {strokeDashoffset: 0, duration: 0.1}, '<')
            .fromTo('#v-line-1', {strokeDasharray: 100, strokeDashoffset: 100}, {strokeDashoffset: 0})
            .fromTo('#circle-1', {strokeDasharray: '0, 200', strokeDashoffset: -43}, {strokeDasharray: '80, 200', strokeDashoffset: 20})
            .fromTo('#h-line-1', {strokeDasharray: 50, strokeDashoffset: 50}, {strokeDashoffset: 0})
            .fromTo('#captions-head', {clipPath:'inset(0 100% 0 0)'}, {clipPath:'inset(-5% -5% -5% -5%)', duration: 1})
            .fromTo('#v-line-2', {strokeDasharray: 500, strokeDashoffset: 500}, {strokeDashoffset: 0, duration:3})
            .fromTo('.captions-bullet', {opacity: 0},{opacity:1, duration: 0.2, stagger: 0.2},'<')
            .fromTo('.captions-bullet', {yPercent:-50, rotateX:-90}, {yPercent: 0, rotateX: 0, duration: 1, stagger:0.2}, '<')

            //LG
            .fromTo('#circle-2', {strokeDasharray: '0, 200', strokeDashoffset: -43}, {strokeDasharray: '80, 200', strokeDashoffset: 20})
            .fromTo('#h-line-2', {strokeDasharray: 50, strokeDashoffset: 50}, {strokeDashoffset: 0})
            .fromTo('#lg-head', {clipPath:'inset(0 100% 0 0)' }, {clipPath: 'inset(-5% -5% -5% -5%)', duration:1})
            .fromTo('#v-line-3', {strokeDasharray: 500, strokeDashoffset: 500}, {strokeDashoffset: 0, duration: 3})
            .fromTo('.lg-bullet', {opacity: 0},{opacity: 1, duration: 0.2, stagger: 0.2},'<')
            .fromTo('.lg-bullet', {yPercent:-50, rotateX:-90},{yPercent: 0, rotateX: 0, duration: 1, stagger:0.2}, '<')
        }

        animateScrollablePinPanel(experienceTL, setup_exp_tl, 'experience-alt-gap-element', 'experience-inner', 20, 20, 32);


        //Projects section scroll animation
        gsap.set('.project-bullet', {transformPerspective: 500});

        let projectsTL = gsap.timeline({
            defaults: {duration: 0.2},
            scrollTrigger: {
                trigger: '#Projects',
                start: 'top 1px',
                end: '+=200%',
                scrub:1,
                pin: true,
                pinSpacing: true,
                toggleActions: 'play none none reverse',
        }});

        const setup_proj_tl = () => {
            projectsTL.add('start')
            .fromTo('#projects-title', {opacity: 0, yPercent: 20}, {opacity: 1, yPercent: 0, ease: 'power3.out'}, '<')
            .fromTo('#projects-line', {width: 0}, {width:250},'<+=0.2s')
            .fromTo('.project-title', {opacity: 0, xPercent: -30}, {opacity: 1, xPercent: 0, ease: 'power3.out',stagger: 1.4, duration: 1}, '<')
            .fromTo('.project-date', {opacity: 0, xPercent: 30}, {opacity: 1, xPercent: 0, ease: 'power3.out', stagger: 1.4, duration: 1}, '<')
            .fromTo('.project-bullet', {opacity: 0},{opacity: 1, duration: 0.1, stagger: 0.5},'<+=0.3s')
            .fromTo('.project-bullet', {yPercent:-50, rotateX:-90},{yPercent: 0, rotateX: 0, duration: 1, stagger:0.5}, '<+=0.3s')
        }

        animateScrollablePinPanel(projectsTL, setup_proj_tl, 'projects-innermost', 'projects-inner', 25, 25, 32);

        //skills section animations
        gsap.from('#skills-title', {opacity: 0, yPercent: 20, scrollTrigger: {trigger: '#skills-title', start: 'top 90%', end: 'top 85%', scrub:1}})
        gsap.from('#skills-line', {width: 0, scrollTrigger: {trigger: '#skills-line', start: 'top 90%', end: 'top 85%', scrub:1}})
        gsap.from('#loop-top', {opacity: 0, xPercent: 100, duration: 0.5, ease: 'power3.out',
            scrollTrigger: {trigger: '#loop-top', start:'top 90%', toggleActions: 'play none none reverse'}})
        gsap.from('#loop-bottom', {opacity: 0, xPercent: -100, duration: 0.5, ease: 'power3.out',
            scrollTrigger: {trigger: '#loop-bottom', start:'top 90%', toggleActions: 'play none none reverse'}})


        //contact section animations
        gsap.from('#contact-title', {opacity: 0, yPercent: 20, scrollTrigger: {trigger: '#contact-title', start: 'top 90%', end: 'top 85%', scrub:1}})
        gsap.from('#contact-line', {width: 0, scrollTrigger: {trigger: '#contact-line', start: 'top 90%', end: 'top 85%', scrub:1}})
        gsap.from('.contact-link', {xPercent:-50, opacity: 0, duration: 0.5, stagger:0.2, 
            scrollTrigger: {trigger: '#contact-links', start:'top 85%', toggleActions: 'play none none reverse'} })

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
    });

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

    // Small Screen Menu open and close animation
    mm.add('(max-width:1023px)', () => {
        let menu_tl = gsap.timeline()
        .fromTo('#header-side', {
            x:0,
            backgroundColor: 'rgba(19, 19, 21, 0.4)'
        }, {
            x: -330,
            duration: 0.2,
            backgroundColor: 'rgba(19, 19, 21, 0.4)',
        },'<-=0.1s')
        .to('#menu-animated', {x:-330}, {x: 330, duration: 0}, '+=0.1s')
        .to('#menu-animated', {opacity:1, duration: 0.5}, '>-=0.2s')
        .to('#menu-visible', {opacity: 0, duration: 0.5}, '<-=0.2s')
        .to('#bottom-rect2', {scaleY: 4.5, scaleX: 2.3, y: 390, x: -150, duration: 0.4, ease: 'power3.in'}, '<')
        .to('#bottom-rect1', {scaleY: 4.5, scaleX: 1.4, y: 298, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
        .to('#middle-rect', {scaleY: 4.5, scaleX: 2.2, y: 218, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
        .to('#top-rect2', {scaleY: 4.5, scaleX: 3, y: 136, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
        .to('#top-rect1', {scaleY: 4.5, scaleX: 1.75, y: 46, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
        .fromTo('#header-text', {opacity: 0}, {opacity:1, duration:0.2}, '-=0.1s')
        .to('.menu-rect', {opacity: 0, duration: 0.2}, '-=0.1s')
        .pause();

        let menu = document.getElementById('menu-visible');
        Observer.create({
            target: menu,
            type: 'touch pointer',
            onHover: () => {menu_tl.play();},
            onPress: () => {
                menu_tl.play();
            },
        });

        Observer.create({
            target: header_side,
            type: 'pointer',
            onHoverEnd: () => {menu_tl.reverse();},
        });

        const close_side_menu = (o) => {
            setTimeout(()=>{
                let rect = header_side.getBoundingClientRect();
                if (!(o.x >= rect.left && o.x <= rect.right && o.y >= rect.top && o.y <=rect.bottom)) {
                    menu_tl.reverse();
                }
            }, 100);
        };

        Observer.create({
            target: document.body,
            type: 'touch pointer',
            onPress: close_side_menu,
            onHover: close_side_menu,
        })
    });

    

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
    
   });