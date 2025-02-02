import { animateScrollablePinPanel } from "./scrollablePinPanel.js";

const headerTop = document.getElementById('header-top');

export function setUpLargeScreenAnimations() {
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
      tl.to('#header-top', {opacity:1, duration: 1.7}, '<');

      tl.add('header-out');

      tl.fromTo('.link-icon', {xPercent: -200}, {xPercent:0, duration: 0.7, pointerEvents: 'auto', ease: 'power3.out', stagger:0.15}, '<+=0.7s');
      tl.from('.link-icon', {opacity:0, duration: 1.3, stagger: 0.15}, '<');

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
              headerTop.classList.add('backdrop-blur-md');
          } else {
              headerTop.classList.remove('backdrop-blur-md');
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
      })
        .from('#about-title', { yPercent: 40, opacity: 0, ease: 'power3.out'})
        .fromTo('#about-line', {width: 0}, {width:300},'<+=0.2s')
        .from('#about-desc', {yPercent: 20, opacity: 0, ease: 'power3.out'}, '<+=0.2s')
        .fromTo('#download-button', {scale:0}, {scale:1})
        .from('#pfp', {yPercent:15, xPercent: 15, rotation: 15, scale:0.8, opacity: 0, ease: 'power3.out'}, '<')
        .fromTo('.img-rect', {strokeDasharray: 1500, strokeDashoffset: 1500}, {strokeDashoffset: 0, duration: 1, stagger: 0.2})
      
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
          experienceTL.add("start")
            //Captions
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

      
}