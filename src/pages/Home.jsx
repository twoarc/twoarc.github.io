import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import heroImg from "../assets/home_hero.png";
import appsImg from "../assets/app_icon.png";
import aboutLogo from "../assets/logo_2Arc.png";

import ContactSection from "../components/ContactSection";

/**
 * Scroll görünür olunca reveal animasyonu (1 kez tetiklenir)
 */
function useRevealOnScroll({ threshold = 0.25, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const options = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, visible];
}

export default function Home() {
  const location = useLocation();

  const scrollToHomeContact = () => {
    document.getElementById("home-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash === "#home-contact") {
      setTimeout(scrollToHomeContact, 50);
    }
  }, [location.hash]);

  const [appsRef, appsVisible] = useRevealOnScroll({ threshold: 0.25 });
  const [aboutRef, aboutVisible] = useRevealOnScroll({ threshold: 0.25 });

  const NAVBAR_PX = 80;

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-slate-200"
        style={{ height: `calc(100vh - ${NAVBAR_PX}px)` }}
      >
        <img
          src={heroImg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-100 saturate-120"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="absolute left-0 bottom-0 px-4 pb-8 md:px-16 md:pb-16 max-w-xl">
          <h1 className="text-white text-4xl md:text-6xl font-black">
            We build fun
            <span className="block">mobile experiences.</span>
          </h1>

          <p className="mt-4 text-white/85 text-base md:text-lg">
            Entertainment-first apps built for sharing, quick sessions and daily engagement.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/apps"
              className="px-6 py-3 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-700 transition"
            >
              OUR APPS
            </Link>

            <button
              onClick={scrollToHomeContact}
              className="px-6 py-3 rounded-xl border border-white/30 text-white font-extrabold hover:bg-white/10 transition"
            >
              CONTACT
            </button>
          </div>
        </div>
      </section>

      {/* OUR APPS */}
      <section ref={appsRef} className="max-w-6xl mx-auto px-4 py-20 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className={[
              "flex justify-center",
              "transition-all duration-1200 ease-out will-change-transform",
              appsVisible ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0",
            ].join(" ")}
          >
            {/* ✅ Küçülttüm: w-6xl -> w-[420px] (istersen 380/360 da yaparız) */}
            <div className="w-[420px] max-w-full rounded-[120px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
              <img src={appsImg} alt="Apps showcase" className="w-full h-auto block" />
            </div>
          </div>

          <div
            className={[
              "transition-all duration-1200 ease-out delay-200 will-change-transform",
              appsVisible ? "translate-x-0 opacity-100" : "translate-x-64 opacity-0",
            ].join(" ")}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              We reach all over the globe
            </h2>

            <p className="mt-4 text-xl md:text-2xl text-orange-600 font-black">
              Our apps have been played by +40M users.
            </p>

            <p className="mt-5 text-slate-600 leading-relaxed">
              We build new worlds that players can explore, interact and enjoy. We value our
              community and keep bringing new experiences.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                to="/apps"
                className="px-7 py-4 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-700 transition"
              >
                OUR APPS
              </Link>

              <button
                onClick={scrollToHomeContact}
                className="px-7 py-4 rounded-xl border border-slate-300 text-slate-900 font-extrabold hover:border-orange-500 hover:text-orange-600 transition"
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div
              className={[
                "transition-all duration-1200 ease-out will-change-transform",
                aboutVisible ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0",
              ].join(" ")}
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                About <span className="text-orange-500">2Arc</span>
              </h2>

              <p className="mt-5 text-indigo-600 font-extrabold text-lg md:text-xl">
                2Arc was founded to reach millions with high-quality entertainment apps.
              </p>

              <p className="mt-6 text-slate-600 leading-relaxed">
                We put the user at the center. We iterate fast, test ideas, and ship what feels
                fun.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  to="/about"
                  className="px-7 py-4 rounded-xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 transition"
                >
                  ABOUT US
                </Link>

                <button
                  onClick={scrollToHomeContact}
                  className="px-7 py-4 rounded-xl border border-slate-300 text-slate-900 font-extrabold hover:border-indigo-500 hover:text-indigo-600 transition"
                >
                  CONTACT
                </button>
              </div>
            </div>

            <div
              className={[
                "flex justify-center",
                "transition-all duration-1200 ease-out delay-200 will-change-transform",
                aboutVisible ? "translate-x-0 opacity-100" : "translate-x-64 opacity-0",
              ].join(" ")}
            >
              <img
                src={aboutLogo}
                alt="2Arc logo"
                className="w-[540px] max-w-full rounded-3xl drop-shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection id="home-contact" companyName="2Arc" email="business@2arc.co" />
    </div>
  );
}
