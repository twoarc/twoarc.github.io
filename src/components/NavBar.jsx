import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo_2Arc.png";

const linkClass = ({ isActive }) =>
  [
    "px-2 py-1 text-sm md:text-base font-extrabold uppercase",
    "text-slate-800 hover:text-indigo-600 transition-colors",
    isActive ? "text-indigo-600" : "",
  ].join(" ");

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goContactSection = () => {
    let targetId = "contact"; // Varsayılan ID (About ve Apps için)

    // Eğer Ana Sayfadaysak ID 'home-contact' olmalı
    if (location.pathname === "/") {
      targetId = "home-contact";
    }

    // İlgili elementi sayfada bulmaya çalış
    const el = document.getElementById(targetId);

    if (el) {
      // Element varsa oraya kaydır
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Güvenlik önlemi: Eğer element bulunamazsa (örn: farklı bir sayfadaysanız)
      // Ana sayfadaki contact'a yönlendir.
      navigate("/#home-contact");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 md:-ml-10">
          <img
            src={logo}
            alt="2Arc Logo"
            className="h-28 md:h-40 w-auto mt-2 md:mt-4"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 md:gap-6 md:mr-6">
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/apps" className={linkClass}>
            Apps
          </NavLink>

          <button
            type="button"
            onClick={goContactSection}
            className="px-2 py-1 text-sm md:text-base font-extrabold uppercase
                        text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}