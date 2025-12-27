import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between text-sm">
        {/* Left */}
        <div className="text-slate-600">
          © {year} <span className="font-semibold text-slate-900">2Arc Interactive</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className="text-slate-600 hover:text-indigo-600 transition"
          >
            About
          </Link>

          <Link
            to="/apps"
            className="text-slate-600 hover:text-indigo-600 transition"
          >
            Apps
          </Link>

          <a
            href="mailto:hello@dream.studio"
            className="text-slate-600 hover:text-indigo-600 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
