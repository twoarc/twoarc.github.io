import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar.jsx'
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Apps from "./pages/Apps.jsx";
import About from "./pages/About.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
