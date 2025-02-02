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
 export function animateScrollablePinPanel(tl, setupTLFunc, altGapCalcElementId, scrollPanelId, scrollDurationCoeff, scrollDelayCoeff, scrollMargin) {
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


    // let timeout;
    // //reset timeline on resize but only on large screen size
    // window.addEventListener("resize", () => {
    //     //debouncing in case of too many resize calls
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
            
    //         if (window.innerWidth >= 1024) {
    //             fill_tl();
    //         } else {
    //             // if screen size is less than large, set all tweens progress to 1 except for the scroll tween which we want at the beginning
    //             let children = tl.getChildren();
    //             for (let i = 0; i < children.length; ++i) {
    //                 children[i].progress(1);
    //             }
    //             tl.getTweensOf('#'+scrollPanelId).forEach(tween => {
    //                 tween.progress(0);
    //             })
    //         }
    //     }, 500)
    // });
    
}