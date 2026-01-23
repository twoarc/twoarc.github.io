import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import ContactSection from "../components/ContactSection";

import heroImg from "../assets/apps-hero.webp";
import app1Img from "../assets/app_icon.png";

import googlePlayBadge from "../assets/google-play-badge.png";
import appStoreBadge from "../assets/app-store-badge.png";

/**
 * Scroll görünür olunca reveal animasyonu (1 kez tetiklenir)
 * ✅ FIX: IntersectionObserver yoksa crash etmesin
 */
function useRevealOnScroll({ threshold = 0.25, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const options = useMemo(() => ({ threshold, rootMargin }), [threshold, rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ✅ Fallback: bazı browser/webview’larda IntersectionObserver yok
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

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

const APPS = [
  {
    id: "app-1",
    name: "Ranking Filters: Fun Challenge",
    desc:
      "Ranking Filters is a short-form video ranking game. Pick a category, rank items from best to worst, and record your reaction as you decide. Your list builds step by step while you film — making every choice fun, surprising, and shareable. Create rankings, challenge friends, compare results, and post your favorite moments.",
    image: app1Img,
    googlePlayUrl: "https://play.google.com/store",
    appStoreUrl: "https://www.apple.com/app-store/",
  },
];

export default function Apps() {
  const location = useLocation();

  // /apps#contact gibi hash ile gelince otomatik scroll
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(t);
  }, [location.hash]);

  // HERO text reveal
  const [heroTextRef, heroTextVisible] = useRevealOnScroll({ threshold: 0.2 });

  // About ile aynı boyut: mobile 500px, desktop 700px
  const HERO_H_MOBILE = 500;

  return (
    <div>
      {/* HERO (About ile aynı boyut) */}
      <section
        className="relative overflow-hidden border-b border-slate-200 md:h-[700px]"
        style={{ height: `${HERO_H_MOBILE}px` }}
      >
        <img
          src={heroImg}
          alt="Our Apps Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-fuchsia-500/10 to-emerald-400/10" />

        {/* METİN BLOĞU */}
        <div
          ref={heroTextRef}
          className={[
            "absolute left-6 md:left-16 bottom-14 md:bottom-24",
            "transition-all duration-700 ease-out will-change-transform",
            heroTextVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0 md:-translate-x-64",
          ].join(" ")}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            OUR APPS
          </h1>

          <p className="mt-3 text-white/80 text-base md:text-lg leading-relaxed max-w-[620px]">
            Short-form ranking apps where you record, react, and share your list with friends.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {APPS.map((app) => (
            <AppRowAnimated
              key={app.id}
              app={app}
              googlePlayBadge={googlePlayBadge}
              appStoreBadge={appStoreBadge}
            />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection id="contact" companyName="2Arc" email="twoarc@proton.me" />
    </div>
  );
}

function AppRowAnimated({ app, googlePlayBadge, appStoreBadge }) {
  const [rowRef, rowVisible] = useRevealOnScroll({ threshold: 0.2 });

  return (
    <div ref={rowRef} className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* IMAGE -> soldan gelsin */}
        <div
          className={[
            "flex justify-center",
            "transition-all duration-1200 ease-out will-change-transform",
            rowVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0 md:-translate-x-64",
          ].join(" ")}
        >
          <div className="rounded-[72px] sm:rounded-[96px] md:rounded-[120px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <img
              src={app.image}
              alt={app.name}
              className="w-full max-w-[260px] sm:max-w-[320px] md:w-[420px] md:max-w-full object-cover block"
            />
          </div>
        </div>

        {/* TEXT -> sağdan gelsin */}
        <div
          className={[
            "transition-all duration-1200 ease-out delay-200 will-change-transform",
            rowVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-6 opacity-0 md:translate-x-64",
          ].join(" ")}
        >
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
            {app.name}
          </h2>

          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            {app.desc}
          </p>

          <div className="mt-6 md:mt-8 flex gap-5 flex-wrap items-center">
            {/* Google Play - Closed Testing (pasif) */}
            <div className="relative">
              <img
                src={googlePlayBadge}
                alt="Google Play – Closed Testing"
                className="h-12 md:h-16 opacity-60 grayscale cursor-not-allowed"
              />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                Closed Testing
              </span>
            </div>

            {/* App Store - Aktif */}
            <a
              href="https://apps.apple.com/tr/app/ranking-filter-fun-challenge/id6757232644?l=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-12 md:h-16"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

