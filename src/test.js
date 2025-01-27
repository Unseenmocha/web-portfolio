import { horizontalLoop } from "./horizontalLoop.js";

document.addEventListener('DOMContentLoaded', (event) => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(Observer);

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

})





