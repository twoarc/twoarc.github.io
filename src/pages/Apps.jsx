import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import ContactSection from "../components/ContactSection";

import heroImg from "../assets/apps-hero.webp";
import app1Img from "../assets/app_icon.png";

import googlePlayBadge from "../assets/google-play-badge.png";
import appStoreBadge from "../assets/app-store-badge.png";

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

const APPS = [
  {
    id: "app-1",
    name: "Ranking Filters: Fun Challange",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptatum magni tenetur minus mollitia, amet odio ad ipsam inventore adipisci cupiditate asperiores dolorem repellat nam voluptates consequatur quasi nostrum maxime.",
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

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [location.hash]);

  // HERO text reveal
  const [heroTextRef, heroTextVisible] = useRevealOnScroll({ threshold: 0.2 });

  // ✅ About ile tıpatıp aynı boyut
  // About: mobile 500px, desktop 700px
  const HERO_H_MOBILE = 500;
  const HERO_H_DESKTOP = 700;

  return (
    <div>
      {/* HERO (About ile aynı boyut) */}
      <section
        className={`relative overflow-hidden border-b border-slate-200 md:h-[${HERO_H_DESKTOP}px]`}
        style={{ height: `${HERO_H_MOBILE}px` }}
      >
        <img
          src={heroImg}
          alt="Our Apps Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-fuchsia-500/10 to-emerald-400/10" />

        {/* About'taki yerleşimle uyumlu: absolute + bottom oranı */}
        <div className="relative max-w-6xl mx-auto px-4 h-full">
          <div
            ref={heroTextRef}
            className={[
              "absolute left-0 bottom-[20%] md:bottom-[22%] px-4",
              "transition-all duration-700 ease-out will-change-transform",
              heroTextVisible ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0",
            ].join(" ")}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              OUR APPS
            </h1>

            <p className="mt-3 text-white/80 text-base md:text-lg leading-relaxed max-w-[620px]">
              Mobile apps built for fun, sharing and everyday play.
            </p>
          </div>
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

/**
 * App card: resim soldan, yazı sağdan gelsin (Home’daki gibi)
 */
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
            rowVisible ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0",
          ].join(" ")}
        >
          <div className="rounded-[120px] overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <img
              src={app.image}
              alt={app.name}
              className="w-[420px] max-w-full object-cover block"
            />

          </div>
        </div>

        {/* TEXT -> sağdan gelsin */}
        <div
          className={[
            "transition-all duration-1200 ease-out delay-200 will-change-transform",
            rowVisible ? "translate-x-0 opacity-100" : "translate-x-64 opacity-0",
          ].join(" ")}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            {app.name}
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">{app.desc}</p>

          <div className="mt-8 flex gap-5 flex-wrap items-center">
            <a
              href={app.googlePlayUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img src={googlePlayBadge} alt="Get it on Google Play" className="h-16" />
            </a>

            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img src={appStoreBadge} alt="Download on the App Store" className="h-16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
