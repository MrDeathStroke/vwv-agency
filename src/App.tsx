import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { Sectors } from "./sections/Sectors";
import { SprintTiers } from "./sections/SprintTiers";
import { Process } from "./sections/Process";
import { Stack } from "./sections/Stack";
import { Faq } from "./sections/Faq";
import { BookCall } from "./sections/BookCall";
import { ScrollTrigger } from "./lib/gsap";
import { useSystemTheme } from "./hooks/useSystemTheme";

function App() {
  useSystemTheme();

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sectors />
        <SprintTiers />
        <Process />
        <Stack />
        <Faq />
        <BookCall />
      </main>
      <Footer />
    </>
  );
}

export default App;
