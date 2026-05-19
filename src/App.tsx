import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollToHash } from "./components/ScrollToHash";
import { Home } from "./pages/Home";
import { Careers } from "./pages/Careers";
import { useSystemTheme } from "./hooks/useSystemTheme";

function App() {
  useSystemTheme();

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/join" element={<Careers />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
