import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import heroImg from "../assets/home_hero.webp";
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

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className="
          relative overflow-hidden border-b border-slate-200
          h-[70vh] md:h-[calc(100vh-80px)]
        "
      >
        <img
          src={heroImg}
          alt="Hero"
          className="
            absolute inset-0 w-full h-full
            object-cover
            object-[60%_center] md:object-center
            brightness-100 contrast-100 saturate-120
          "
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        {/* TEXT */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:left-0 md:inset-x-auto md:px-16 md:pb-16 max-w-xl">
          <div className="mx-auto max-w-[520px] md:mx-0">
            <h1 className="text-white text-3xl leading-tight md:text-6xl md:leading-none font-black">
              We build fun
              <span className="block">mobile apps.</span>
            </h1>

            <p className="mt-3 text-white/85 text-sm leading-relaxed md:mt-4 md:text-lg">
              We’re a two-person studio creating entertainment-first apps made for quick sessions,
              sharing, and everyday fun.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 md:mt-5">
              <Link
                to="/apps"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-700 transition text-center"
              >
                OUR APPS
              </Link>

              <button
                onClick={scrollToHomeContact}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/30 text-white font-extrabold hover:bg-white/10 transition"
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPS */}
      <section
        ref={appsRef}
        className="max-w-6xl mx-auto px-4 py-14 md:py-20 overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className={[
              "flex justify-center",
              "transition-all duration-1200 ease-out will-change-transform",
              appsVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-6 opacity-0 md:-translate-x-64",
            ].join(" ")}
          >
            <div className="w-full max-w-[260px] sm:max-w-[320px] md:w-[420px] md:max-w-full rounded-[64px] sm:rounded-[96px] md:rounded-[120px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
              <img src={appsImg} alt="Apps showcase" className="w-full h-auto block" />
            </div>
          </div>

          <div
            className={[
              "transition-all duration-1200 ease-out delay-200 will-change-transform",
              appsVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0 md:translate-x-64",
            ].join(" ")}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              First app is on the way
            </h2>

            <p className="mt-3 text-lg md:mt-4 md:text-2xl text-orange-600 font-black">
              We’re getting ready for our first release.
            </p>

            <p className="mt-4 md:mt-5 text-slate-600 leading-relaxed text-sm md:text-base">
              We build lightweight, fun experiences with a strong focus on clean UI, satisfying
              interactions, and replayability. We ship, learn fast, and improve with every update.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/apps"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-700 transition text-center"
              >
                OUR APPS
              </Link>

              <button
                onClick={scrollToHomeContact}
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-slate-300 text-slate-900 font-extrabold hover:border-orange-500 hover:text-orange-600 transition"
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div
              className={[
                "transition-all duration-1200 ease-out will-change-transform",
                aboutVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-6 opacity-0 md:-translate-x-64",
              ].join(" ")}
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                About <span className="text-orange-500">2Arc</span>
              </h2>

              <p className="mt-4 md:mt-5 text-indigo-600 font-extrabold text-base md:text-xl">
                We’re two developers building mobile entertainment apps with a simple goal: make
                people smile in under 30 seconds.
              </p>

              <p className="mt-4 md:mt-6 text-slate-600 leading-relaxed text-sm md:text-base">
                We focus on fast iteration, polished details, and fun-first design. Our first app is
                launching soon — and we’re excited to grow this into a small studio with multiple
                unique experiences.
              </p>

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 transition text-center"
                >
                  ABOUT US
                </Link>

                <button
                  onClick={scrollToHomeContact}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl border border-slate-300 text-slate-900 font-extrabold hover:border-indigo-500 hover:text-indigo-600 transition"
                >
                  CONTACT
                </button>
              </div>
            </div>

            <div
              className={[
                "flex justify-center",
                "transition-all duration-1200 ease-out delay-200 will-change-transform",
                aboutVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-6 opacity-0 md:translate-x-64",
              ].join(" ")}
            >
              <img
                src={aboutLogo}
                alt="2Arc logo"
                className="w-full max-w-[280px] sm:max-w-[360px] md:w-[540px] md:max-w-full rounded-3xl drop-shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection id="home-contact" companyName="2Arc" email="twoarc@proton.me" />
    </div>
  );
}
