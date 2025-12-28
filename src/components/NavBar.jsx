import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo_2Arc.png";

const linkClass = ({ isActive }) =>
  [
    "px-2 py-2 text-sm md:text-base font-extrabold uppercase",
    "text-slate-800 hover:text-indigo-600 transition-colors",
    isActive ? "text-indigo-600" : "",
  ].join(" ");

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // route değişince mobile menüyü kapat
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const goContactSection = () => {
    let targetId = "contact"; // About ve Apps için
    if (location.pathname === "/") targetId = "home-contact";

    const el = document.getElementById(targetId);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      navigate("/#home-contact");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 md:-ml-10">
          {/* ✅ Mobil küçük, ✅ Desktop tıpatıp aynı */}
          <img
            src={logo}
            alt="2Arc Logo"
            className="h-14 md:h-40 w-auto mt-1 md:mt-4"
          />
        </Link>

        {/* Desktop Navigation (PC aynı) */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 md:mr-6">
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/apps" className={linkClass}>
            Apps
          </NavLink>

          <button
            type="button"
            onClick={goContactSection}
            className="px-2 py-2 text-sm md:text-base font-extrabold uppercase
                       text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-slate-900"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {/* Hamburger */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={[
          "md:hidden overflow-hidden border-t border-slate-200 bg-white",
          "transition-[max-height,opacity] duration-300 ease-out",
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/apps" className={linkClass}>
            Apps
          </NavLink>

          <button
            type="button"
            onClick={goContactSection}
            className="text-left px-2 py-2 text-sm font-extrabold uppercase
                       text-slate-800 hover:text-indigo-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
