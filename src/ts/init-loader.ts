import { gsap } from "gsap";

export const initHeaderLoader = (): void => {
  const headerBg = document.querySelector<HTMLElement>('.main-header__bg');
  const navContainer = document.querySelector<HTMLElement>('.main-header__container');
  const titleTexts = document.querySelectorAll('.hero__title-text');
  const heroText = document.querySelector<HTMLElement>('.hero__text');

  if (!headerBg || !navContainer || titleTexts.length === 0 || !heroText) return;

  if (window.scrollY === 0) {
    const initTimeLine = gsap.timeline();
    initTimeLine
      .fromTo(headerBg,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 2.2, ease: 'power3.out' },
        0
      )
      .fromTo(navContainer,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' },
        0
      )
      .to(titleTexts, { y: '0%', duration: 1.4, ease: 'power4.out' }, 0)
      .to(heroText, { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' }, 0);
  } else {
    gsap.set(headerBg, { opacity: 1, scale: 1 });
    gsap.set(navContainer, { opacity: 1 });
    gsap.set(titleTexts, { y: '0%' });
    gsap.set(heroText, { y: 0, opacity: 1 });
  }
};
