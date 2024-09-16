import './main.scss';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

console.clear();

gsap.registerPlugin(Flip, ScrollTrigger);

let flipCtx: gsap.Context;

const createTimeline = () => {
  flipCtx && flipCtx.revert();

  flipCtx = gsap.context(() => {
    const secondState = Flip.getState('.second .marker');
    const thirdState = Flip.getState('.third .marker');
    const flipConfig = {
      ease: 'none',
      duration: 1,
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.container.initial',
        start: 'clamp(top center)',
        endTrigger: '.final',
        end: 'clamp(top center)',
        scrub: 1,
        // markers: true
      },
    });

    const firstFit = Flip.fit('.box', secondState, flipConfig);
    const secondFit = Flip.fit('.box', thirdState, flipConfig);

    if (
      firstFit instanceof gsap.core.Tween &&
      secondFit instanceof gsap.core.Tween
    ) {
      tl.add(firstFit).add(secondFit, '+=0.5');
    }
  });
};

createTimeline();

window.addEventListener('resize', createTimeline);
