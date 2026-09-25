import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initScrollMain = (): void => {
  const aboutProduct = document.querySelector<HTMLElement>('.about-product');
  const aboutTitleLines = aboutProduct?.querySelectorAll('.about-product__title-text') ?? [];
  const aboutTexts = aboutProduct?.querySelectorAll('.about-product__text') ?? [];

  if (!aboutProduct || aboutTitleLines.length === 0 || aboutTexts.length === 0) return;

  const aboutTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: aboutProduct,
      start: 'top 75%',
      toggleActions: 'play none none none',
      invalidateOnRefresh: true,
    }
  });

  const triggerInstance = ScrollTrigger.create({
    trigger: aboutProduct,
    start: 'top 75%'
  });

  if (triggerInstance.scroll() > triggerInstance.start) {
    gsap.set(aboutTitleLines, { y: '0%' });
    gsap.set(aboutTexts, { opacity: 1, y: 0 });
    triggerInstance.kill();
  } else {
    triggerInstance.kill();
    aboutTimeLine
      .to(aboutTitleLines, { y: '0%', duration: 1.2, ease: 'power4.out' }, 0)
      .to(aboutTexts, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0);
  }
};
