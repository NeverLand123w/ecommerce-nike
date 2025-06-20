document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  tl.to('#loader-text', {
    opacity: 0,
    duration: 0.5,
    delay: 1.5,
    ease: 'power1.in'
  });

  tl.to('#top-panel', {
    yPercent: -100,
    duration: 1.2,
    ease: 'power3.inOut'
  });

  tl.to('#bottom-panel', {
    yPercent: 100,
    duration: 1.2,
    ease: 'power3.inOut'
  }, '<');

  tl.set('#loader-overlay', {
    display: 'none'
  });
});
