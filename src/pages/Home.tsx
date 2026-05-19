import { useEffect } from "react";
import { Hero } from "../sections/Hero";
import { Sectors } from "../sections/Sectors";
import { SprintTiers } from "../sections/SprintTiers";
import { Process } from "../sections/Process";
import { Stack } from "../sections/Stack";
import { JoinUs } from "../sections/JoinUs";
import { Faq } from "../sections/Faq";
import { BookCall } from "../sections/BookCall";
import { ScrollTrigger } from "../lib/gsap";

export function Home() {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Hero />
      <Sectors />
      <SprintTiers />
      <Process />
      <Stack />
      <JoinUs />
      <Faq />
      <BookCall />
    </>
  );
}
