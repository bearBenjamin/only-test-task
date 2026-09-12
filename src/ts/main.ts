import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () : void => {
  const headerBg = document.querySelector('.main-header__bg') as HTMLElement | null;
	const navContainer = document.querySelector('.main-header__container') as HTMLElement | null;
	const titleTexts = document.querySelectorAll('.hero__title-text');
  const heroText = document.querySelector('.hero__text') as HTMLElement | null;

  if (!headerBg || !navContainer || titleTexts.length === 0 || !heroText) return;

	const timeLine = gsap.timeline();

  timeLine.fromTo(headerBg,
    { opacity: 0, scale: 1.15 },
    { opacity: 1, scale: 1, duration: 2.2, ease: 'power3.out' },
    0 // Стартуем в момент времени 0
  )

  .fromTo(navContainer,
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: 'power2.out' },
    0 // Стартуем строго одновременно с фоном
  )

  .to(titleTexts,
    { y: '0%', duration: 1.4, ease: 'power4.out' },
    0 // Стартуем строго одновременно с остальными элементами
  )

  .to(heroText,
    { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
    0 // Стартуем строго одновременно со всеми
  );
});
