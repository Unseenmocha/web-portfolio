const header_side = document.getElementById('header-side');

export function setUpSmallScreenAnimations() {
    //header and links animation
    let tl = gsap.timeline();

    tl.fromTo('#menu-visible', {xPercent: 300}, {xPercent: 0, duration: 1, ease: 'power3.out'}, '<');
    tl.fromTo('#menu-visible', {opacity:0}, {opacity:1, duration: 1.7}, '<');

    tl.fromTo('.link-icon', {xPercent: -200}, {xPercent:0, duration: 0.7, pointerEvents: 'auto', ease: 'power3.out', stagger:0.15}, '<+=0.7s');
    tl.to('.link-icon', {opacity:1, duration: 1.3, stagger: 0.15}, '<');

    // Small Screen Menu open and close animation
    let menu_tl = gsap.timeline()
    .fromTo('#header-side', {
        x:0,
        backgroundColor: 'rgba(19, 19, 21, 0.4)'
    }, {
        x: -330,
        duration: 0.2,
        backgroundColor: 'rgba(19, 19, 21, 0.4)',
    },'<-=0.1s')
    .to('#menu-animated', {x: -342, duration: 0}, '+=0.1s')
    .to('#menu-animated', {opacity:1, duration: 0.5}, '>-=0.2s')

    .fromTo('#menu-visible', {opacity:1}, {opacity: 0, duration: 0.5}, '<-=0.2s')
    .to('#bottom-rect2', {scaleY: 4.5, scaleX: 2.3, y: 390, x: -150, duration: 0.4, ease: 'power3.in'}, '<')
    .to('#bottom-rect1', {scaleY: 4.5, scaleX: 1.4, y: 298, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
    .to('#middle-rect', {scaleY: 4.5, scaleX: 2.2, y: 218, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
    .to('#top-rect2', {scaleY: 4.5, scaleX: 3, y: 136, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')
    .to('#top-rect1', {scaleY: 4.5, scaleX: 1.75, y: 46, x: -150, duration: 0.4, ease: 'power3.in'}, '<+=0.05s')

    .fromTo('#header-text', {opacity: 0}, {opacity:1, duration:0.2}, '-=0.1s')
    .to('.menu-rect', {opacity: 0, duration: 0.2}, '-=0.1s')
    .pause();

    let side_menu_out = false;

    let menu = document.getElementById('menu-visible');

    const open_menu = () => {
        side_menu_out = true;
        menu_tl.play();
    }

    Observer.create({
        target: menu,
        type: 'touch pointer',
        onHover: () => {open_menu()},
        onPress: () => {
            open_menu();
        },
    });

    Observer.create({
        target: header_side,
        type: 'pointer',
        onHoverEnd: () => {menu_tl.reverse();},
    });

    const inBounds = (bounds, x, y) => (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom)

    const close_side_menu = (o) => {
        setTimeout(()=>{
            let menu_bounds = header_side.getBoundingClientRect();
            let icon_bounds = menu.getBoundingClientRect();
            let inMenu = inBounds(menu_bounds, o.x, o.y);
            let inIcon = inBounds(icon_bounds, o.x, o.y);                
            
            if (!inMenu && !inIcon && side_menu_out) {
                menu_tl.reverse();
                side_menu_out = false;
            }
        }, 100);
    };

    //close menu if touching or hovering anywhere but the menu
    Observer.create({
        target: document.body,
        type: 'touch pointer',
        onPress: close_side_menu,
        onHover: close_side_menu,
    })
    

    // let button = document.getElementById('download-button');
    // let buttonPressed = false;
    // Observer.create({
    //     target: '#download-button',
    //     onPress: () => {
    //         if (!buttonPressed) {
    //             buttonPressed = true;
    //             gsap.to('#download-button', {scale: 0.95, duration: 0.2, yoyo:true, repeat: 1});
    //             setTimeout(() => {
    //                 buttonPressed = false;
    //                 button.download = 'Andrew-Lin-Resume';
    //                 button.href = './Andrew-Lin-Resume.pdf';
    //                 button.click();
    //                 button.removeAttribute('href');
    //                 button.removeAttribute('download');
    //             }, 400)
    //         }
    //     }
    // })
}