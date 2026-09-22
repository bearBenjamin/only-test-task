import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initScrollFooter = (): void => {
  const footer = document.querySelector<HTMLElement>('.page__footer')
  const footerTitleLines = footer?.querySelectorAll('.consultation__title-text') ?? [];
  const footerText = footer?.querySelector<HTMLElement>('.consultation__text');
  const footerButton = footer?.querySelector<HTMLElement>('.consultation__button');
  const footerImg = footer?.querySelector<HTMLElement>('.consultation__picture');

  if (!footer || footerTitleLines.length === 0 || !footerText || !footerButton || !footerImg) return;

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
      .to(footerTitleLines, { y: '0%', duration: 1.2, ease: 'power4.out' }, 0)
      .to(footerText, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0)
      .to(footerButton, { y: '0%', duration: 2.2, ease: 'power4.out' }, 0)
      .to(footerImg, { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' }, 0);
  }
};
