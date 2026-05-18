import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Default ease aligned with brand motion tokens
gsap.defaults({
  ease: "expo.out",
  duration: 0.9,
});

export { gsap, ScrollTrigger };
