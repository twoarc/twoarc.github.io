import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import ContactSection from "../components/ContactSection";

import heroImg from "../assets/apps-hero.webp";
import app1Img from "../assets/app_icon.png";
import app2Img from "../assets/goalx.png";

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
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.twoarc.rankingfilterfunchallenge",
    appStoreUrl: "https://apps.apple.com/tr/app/ranking-filter-fun-challenge/id6757232644",
  },
  {
    id: "app-2",
    name: "GoalX: Football Prediction",
    desc: "Predict football match outcomes, track live scores, challenge your friends in private leagues, and climb the global leaderboards.",
    image: app2Img,
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.twoarc.goalx",
    appStoreUrl: "",
  },
];

export default function Apps() {
  const location = useLocation();

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

  const [heroTextRef, heroTextVisible] = useRevealOnScroll({ threshold: 0.2 });

  const HERO_H_MOBILE = 500;

  return (
    <div>
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

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {APPS.map((app, index) => (
            <AppRowAnimated
              key={app.id}
              app={app}
              index={index}
              googlePlayBadge={googlePlayBadge}
              appStoreBadge={appStoreBadge}
            />
          ))}
        </div>
      </section>

      <ContactSection id="contact" companyName="2Arc" email="twoarc@proton.me" />
    </div>
  );
}

function AppRowAnimated({ app, index, googlePlayBadge, appStoreBadge }) {
  const [rowRef, rowVisible] = useRevealOnScroll({ threshold: 0.2 });
  const isReverse = index % 2 === 1;

  return (
    <div ref={rowRef} className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div
          className={[
            "flex justify-center",
            isReverse ? "md:order-last" : "",
            "transition-all duration-1200 ease-out will-change-transform",
            rowVisible
              ? "translate-x-0 opacity-100"
              : isReverse 
                ? "translate-x-6 opacity-0 md:translate-x-64"
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

        <div
          className={[
            isReverse ? "md:order-first" : "",
            "transition-all duration-1200 ease-out delay-200 will-change-transform",
            rowVisible
              ? "translate-x-0 opacity-100"
              : isReverse
                ? "-translate-x-6 opacity-0 md:-translate-x-64"
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
            {app.googlePlayUrl ? (
              <a
                href={app.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={googlePlayBadge}
                  alt="Download on Google Play"
                  className="h-12 md:h-16"
                />
              </a>
            ) : null}

            {app.appStoreUrl ? (
              <a
                href={app.appStoreUrl}
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
            ) : (
              <div className="relative inline-block opacity-60 cursor-not-allowed group">
                <img
                  src={appStoreBadge}
                  alt="Coming Soon on the App Store"
                  className="h-12 md:h-16 grayscale"
                />
                <div className="absolute inset-0 rounded-lg bg-black/40 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white px-2 py-1 leading-none tracking-wider whitespace-nowrap drop-shadow-md">
                    SOON
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}