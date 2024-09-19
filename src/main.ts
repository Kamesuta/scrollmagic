import './main.scss';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// horiontall scroll
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// console.clear();

const select = (e: string): HTMLElement | null => document.querySelector(e);
const selectAll = (e: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(e);

const tracks = selectAll('.sticky-element');

console.log(tracks);

tracks.forEach((track, i) => {
  let trackWrapper: NodeListOf<HTMLElement> = track.querySelectorAll('.track');
  let trackFlex: NodeListOf<HTMLElement> =
    track.querySelectorAll('.track-flex');
  let allImgs: NodeListOf<HTMLElement> = track.querySelectorAll('.image');
  let progress: NodeListOf<HTMLElement> = track.querySelectorAll(
    '.progress--bar-total'
  );

  let sliders: HTMLElement[] = gsap.utils.toArray('.panel-wide');
  let thumbs: HTMLElement[] = gsap.utils.toArray('.thumbs');
  let visible: HTMLElement[] = gsap.utils.toArray('.visible');

  let trackWrapperWidth = () => {
    let width = 0;
    trackWrapper.forEach((el) => (width += el.offsetWidth));
    return width;
  };

  let trackFlexWidth = () => {
    let width = 0;
    trackFlex.forEach((el) => (width += el.offsetWidth));
    return width;
  };

  ScrollTrigger.defaults({});

  gsap.defaults({
    ease: 'none',
  });

  let scrollTween = gsap.to(trackWrapper, {
    x: () => -trackWrapperWidth() + window.innerWidth,
    scrollTrigger: {
      trigger: track,
      pin: true,
      anticipatePin: 1,
      //pinType: "transform",
      scrub: 1,
      start: 'center center',
      end: () => '+=' + (track.scrollWidth - window.innerWidth),
    //   onRefresh: (self) => self.getTween().resetTo('totalProgress', 0),
      // fixes a very minor issue where the progress was starting at 0.001.
      invalidateOnRefresh: true,
    },
  });

  allImgs.forEach((img, i) => {
    // the intended parallax animation
    const parallaxWidth = img.dataset.parallax;
    gsap.fromTo(
      img,
      {
        x: `-${parallaxWidth}vw`,
      },
      {
        x: `${parallaxWidth}vw`,
        scrollTrigger: {
          trigger: img.parentNode as HTMLElement, //.panel-wide
          containerAnimation: scrollTween,
          start: 'left right',
          end: 'right left',
          scrub: true,
          invalidateOnRefresh: true,
        //   onRefresh: (self) => {
        //     if (self.start < 0) {
        //       self.animation?.progress(
        //         gsap.utils.mapRange(self.start, self.end, 0, 1, 0)
        //       );
        //     }
        //   },
        },
      }
    );
  });

//   let progressBar = gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: trackWrapper,
//         containerAnimation: scrollTween,
//         start: 'left left',
//         end: () => '+=' + (trackWrapperWidth() - window.innerWidth),
//         scrub: true,
//       },
//     })
//     .to(progress, {
//       width: '100%',
//       ease: 'none',
//     });

//   sliders.forEach((slider, i) => {
//     let anim = gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: slider,
//           containerAnimation: scrollTween,
//           start: 'left right',
//           end: 'right right',
//           scrub: true,
//           //onEnter: () => playLottie(i),
//         },
//       })
//       .to(visible[i], {
//         width: '100%',
//         backgroundColor: '#1e90ff',
//         ease: 'none',
//       });
//   });

//   sliders.forEach((slider, i) => {
//     thumbs[i].onclick = () => {
//       console.log(slider.getBoundingClientRect().left);
//       gsap.to(window, {
//         //scrollTo: "+=" + slider.getBoundingClientRect(i).left,
//         scrollTo: {
//           y: '+=' + slider.getBoundingClientRect().left,
//         },
//         duration: 0.5,
//         overwrite: 'auto',
//       });
//     };
//   });
});
