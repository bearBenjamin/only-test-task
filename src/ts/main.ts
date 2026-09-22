import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeaderLoader } from "./init-loader";
import { initScrollHeader } from "./scroll-header";
import { initScrollMain } from "./scroll-main";
import { initScrollFooter } from "./scroll-footer";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () : void => {
	//создаю трекер медиа-условий
  const mediaTracker = gsap.matchMedia();

  mediaTracker.add("(prefers-reduced-motion: no-preference)", () => {
		initHeaderLoader();
    initScrollHeader();
    initScrollMain();
    initScrollFooter();
	});

	ScrollTrigger.refresh();
  ScrollTrigger.update();
}, { once:true });
