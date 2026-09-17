import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () : void => {
	const header = document.querySelector('.main-header') as HTMLElement | null;
  const headerBg = document.querySelector('.main-header__bg') as HTMLElement | null;
	const navContainer = document.querySelector('.main-header__container') as HTMLElement | null;
	const titleTexts = document.querySelectorAll('.hero__title-text');
  const heroText = document.querySelector('.hero__text') as HTMLElement | null;
	const heroSection = document.querySelector('.main-header__hero') as HTMLElement | null;

	const main = document.querySelector('.page__main') as HTMLElement | null;
	const aboutProduct = document.querySelector('.about-product') as HTMLElement | null;
	const aboutTitleLines = document.querySelectorAll('.about-product__title-text');
	const aboutTexts = document.querySelectorAll('.about-product__text');

	const footer = document.querySelector('.page__footer') as HTMLElement | null;
	const footerTitleLines = document.querySelectorAll('.consultation__title-text');
	const footerText = document.querySelector('.consultation__text') as HTMLElement | null;
	const footerButton = document.querySelector('.consultation__button') as HTMLElement | null;
	const footerImg = document.querySelector('.consultation__picture') as HTMLElement | null;

  if (!header || !headerBg || !navContainer || titleTexts.length === 0 || !heroText || !heroSection
		|| !main || !aboutProduct || aboutTitleLines.length === 0 || aboutTexts.length === 0
		|| !footer || footerTitleLines.length === 0 || !footerText || !footerButton || !footerImg) return;

	const initTimeLine = gsap.timeline();

	/* анимация header при загрузке страницы */
	if (window.scrollY === 0) {
  initTimeLine.fromTo(headerBg,
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
    { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' },
    0 // Стартуем строго одновременно со всеми
  );
	} else {
		gsap.set(headerBg, { opacity: 1, scale: 1 });
		gsap.set(navContainer, { opacity: 1 });
		gsap.set(titleTexts, { y: '0%' });
		gsap.set(heroText, { y: 0 });
	}

const scrollTimeLine = gsap.timeline({
	scrollTrigger: {
			trigger: heroSection,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			invalidateOnRefresh: true, // Заставляет GSAP пересчитывать позиции при изменениях
		}
	});

/* анимация фона header при скролле */
	scrollTimeLine.to(headerBg, {
		'--bg-overlay-opacity': 1,
	}, 0)
	.to(titleTexts, {
		opacity: 0,
	}, 0)
	.to(heroText, {
      opacity: 0,
    }, 0);

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
        gsap.set([titleTexts, heroText], { opacity: 1 }); // Подстраховка текста
      }
		},
	});

	// анимация фиксированной шапки
	navContainer.classList.add('main-header__container--theme-dark');

	const halfNavHeight = navHeight / 2;

	// Светлый блок (main)
	ScrollTrigger.create({
		trigger: main,
		// Срабатывает, когда верх секции доходит до середины фиксированной шапки
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

	// Темный блок (футер)
	ScrollTrigger.create({
		trigger: footer,
		// Срабатывает, когда верх футера доходит до середины фиксированной шапки
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

	//main
	if (aboutTitleLines.length > 0 && aboutTexts.length > 0) {
		const aboutTimeLine = gsap.timeline({
			scrollTrigger: {
				trigger: aboutProduct,
				start: 'top 75%',
				toggleActions: 'play none none none', // играет один раз при прокрутке вниз
				invalidateOnRefresh: true, // проверка позиции при первой загрузке
			}
		});

		const triggerInstance = ScrollTrigger.create({
			trigger: aboutProduct,
			start: 'top 75%'
		});

		if (triggerInstance.scroll() > triggerInstance.start) {
			gsap.set(aboutTitleLines, { y: '0%' });
			gsap.set(aboutTexts, { opacity: 1, y: 0 });
			triggerInstance.kill(); // убиваю временный проверочный триггер
		} else {
			triggerInstance.kill();
		aboutTimeLine
			.to(aboutTitleLines, {
				y: '0%',
				duration: 1.2,
				ease: 'power4.out',
			}, 0)

			.to(aboutTexts, {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: 'power2.out',
			}, 0);
		}
	}

	//  футтер
	if (footerTitleLines.length > 0 && footerText && footerButton && footerImg) {
		const footerTl = gsap.timeline({
			scrollTrigger: {
				trigger: footer,
				start: 'top 75%',
				toggleActions: 'play none none none',
				invalidateOnRefresh: true,
			}
		});

		const footerTriggerInstance = ScrollTrigger.create({
			trigger: footer,
			start: 'top 75%'
		});

		if (footerTriggerInstance.scroll() > footerTriggerInstance.start) {
			gsap.set([footerTitleLines, footerButton], { y: '0%' });
			gsap.set([footerText, footerImg], { opacity: 1, y: 0, scale: 1 });
			footerTriggerInstance.kill();
		} else {
			footerTriggerInstance.kill();

			footerTl
				.to(footerTitleLines, {
					y: '0%',
					duration: 1.2,
					ease: 'power4.out',
				}, 0)

				.to(footerText, {
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: 'power2.out',
				}, 0)

				.to(footerButton, {
					y: '0%',
					duration: 2.2,
					ease: 'power4.out',
				}, 0)

				.to(footerImg, {
					opacity: 1,
					scale: 1,
					duration: 2,
					ease: 'power3.out',
				}, 0);
		}
	}

	ScrollTrigger.refresh();
  ScrollTrigger.update();
});
