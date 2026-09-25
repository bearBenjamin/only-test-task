import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeaderLoader } from "./animations/init-loader";
import { initScrollHeader } from "./animations/scroll-header";
import { initScrollMain } from "./animations/scroll-main";
import { initScrollFooter } from "./animations/scroll-footer";

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
