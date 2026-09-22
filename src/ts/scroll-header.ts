import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initScrollHeader = (): void => {
  const header = document.querySelector<HTMLElement>('.main-header');
  const headerBg = header?.querySelector<HTMLElement>('.main-header__bg');
  const navContainer = header?.querySelector<HTMLElement>('.main-header__container');
	const heroSection = document.querySelector<HTMLElement>('.main-header__hero');
  const titleTexts = heroSection?.querySelectorAll('.hero__title-text') ?? [];;
  const heroText = heroSection?.querySelector<HTMLElement>('.hero__text');

  const main = document.querySelector<HTMLElement>('.page__main');
  const footer = document.querySelector<HTMLElement>('.page__footer');

  if (!header || !headerBg || !navContainer || titleTexts.length === 0 || !heroText || !heroSection) return;

  /* Анимация исчезновения и наложения фона */
  const scrollTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
    }
  });

  scrollTimeLine
    .to(headerBg, { '--bg-overlay-opacity': 1 }, 0)
    .to(titleTexts, { opacity: 0 }, 0)
    .to(heroText, { opacity: 0 }, 0);

  /* Фиксация шапки при скролле */
  const navHeight = navContainer.offsetHeight;
  let isFixed = false;

  ScrollTrigger.create({
    trigger: header,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      const scrollPos = self.scroll();

      if (scrollPos > 0 && !isFixed) {
        isFixed = true;
        navContainer.classList.add('main-header__container--fixed');
        gsap.set(header, { paddingTop: navHeight });
      } else if (scrollPos === 0 && isFixed) {
        isFixed = false;
        navContainer.classList.remove('main-header__container--fixed');
        gsap.set(header, { clearProps: "paddingTop" });
        gsap.set([titleTexts, heroText], { opacity: 1 });
      }
    },
  });

  /* Переключение тем навигации (срабатывает, только если секции main и footer существуют на странице) */
  navContainer.classList.add('main-header__container--theme-dark');
  const halfNavHeight = navHeight / 2;

  if (main) {
    ScrollTrigger.create({
      trigger: main,
      start: () => `top ${halfNavHeight}px`,
      end: () => `bottom ${halfNavHeight}px`,
      onEnter: () => {
        navContainer.classList.remove('main-header__container--theme-dark');
        navContainer.classList.add('main-header__container--theme-light');
      },
      onLeaveBack: () => {
        navContainer.classList.remove('main-header__container--theme-light');
        navContainer.classList.add('main-header__container--theme-dark');
      }
    });
  }

  if (footer) {
    ScrollTrigger.create({
      trigger: footer,
      start: () => `top ${halfNavHeight}px`,
      onEnter: () => {
        navContainer.classList.remove('main-header__container--theme-light');
        navContainer.classList.add('main-header__container--theme-dark');
      },
      onLeaveBack: () => {
        navContainer.classList.remove('main-header__container--theme-dark');
        navContainer.classList.add('main-header__container--theme-light');
      }
    });
  }
};
