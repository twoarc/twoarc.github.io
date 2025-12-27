import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import aboutHero from "../assets/about_hero.png";
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

export default function About() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const [missionRef, missionVisible] = useRevealOnScroll({ threshold: 0.25 });
  const [howRef, howVisible] = useRevealOnScroll({ threshold: 0.25 });

  const HERO_H_MOBILE = 500;

  return (
    <div className="bg-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-slate-200 md:h-[700px]"
        style={{ height: `${HERO_H_MOBILE}px` }}
      >
        <img
          src={aboutHero}
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-fuchsia-500/10 to-emerald-400/10" />

        {/* İçerik */}
        <div className="relative max-w-6xl mx-auto px-4 h-full">
          {/* ✅ GÜNCELLEME: 
              "md:-ml-6" ekleyerek yazıyı masaüstünde 24px sola çektik.
          */}
          <div className="absolute left-0 bottom-[20%] md:bottom-[22%] px-4 md:-ml-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              ABOUT US
            </h1>

            <p className="mt-3 text-white/80 text-base md:text-lg leading-relaxed max-w-[620px]">
              We are a mobile application developer &amp; publisher studio based in Ankara, Turkey.
              With a dedicated team of passionate developers, we create apps that provide a
              great user-experience filled with enjoyment. From development to publishing, we
              do everything in-house.
            </p>
          </div>
        </div>
      </section>

      {/* KATMAN 1: Mission (kart gibi) */}
      <section ref={missionRef} className="max-w-6xl mx-auto px-4 py-20 overflow-hidden">
        <div
          className={[
            "rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]",
            "p-8 md:p-12",
            "transition-all duration-1200 ease-out will-change-transform",
            missionVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          ].join(" ")}
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-orange-600 font-extrabold tracking-wide">OUR MISSION</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
                Build apps people genuinely enjoy.
              </h2>

              <p className="mt-6 text-slate-600 leading-relaxed">
                Our mission is simple: create mobile apps that feel good to use. Entertainment
                should be lightweight, accessible, and built around social interaction.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                We iterate fast, learn from real feedback, and focus on long-term engagement —
                not hype.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
              <h3 className="text-xl font-extrabold text-slate-900">What we care about</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Delightful, quick sessions</li>
                <li>• Shareable moments</li>
                <li>• Retention over downloads</li>
                <li>• Simple design, strong performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* KATMAN 2: How we work (Home reveal gibi sağ/sol) */}
      <section ref={howRef} className="bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* left text */}
            <div
              className={[
                "transition-all duration-1200 ease-out will-change-transform",
                howVisible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0",
              ].join(" ")}
            >
              <p className="text-indigo-600 font-extrabold tracking-wide">HOW WE WORK</p>

              <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                Small team. Fast iteration. Clear taste.
              </h2>

              <p className="mt-6 text-slate-600 leading-relaxed">
                We operate as a small, agile team with a strong product mindset. Ideas are tested
                quickly, refined continuously, and improved based on real-world usage.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Our process emphasizes clarity, performance, and design simplicity — without
                corporate overhead or unnecessary complexity.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  to="/apps"
                  className="px-7 py-4 rounded-xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 transition"
                >
                  SEE APPS
                </Link>

                <button
                  onClick={scrollToContact}
                  className="px-7 py-4 rounded-xl border border-slate-300 text-slate-900 font-extrabold hover:border-indigo-500 hover:text-indigo-600 transition"
                >
                  CONTACT
                </button>
              </div>
            </div>

            {/* right cards */}
            <div
              className={[
                "transition-all duration-1200 ease-out delay-200 will-change-transform",
                howVisible ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0",
              ].join(" ")}
            >
              <div className="grid gap-5">
                {[
                  { title: "Test quickly", text: "We prototype fast and validate with real behavior." },
                  { title: "Ship continuously", text: "Small improvements add up to big gains." },
                  { title: "Raise the bar", text: "Quality, polish, and performance always matter." },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                  >
                    <h3 className="text-xl font-extrabold text-slate-900">{c.title}</h3>
                    <p className="mt-2 text-slate-600">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection id="contact" companyName="2Arc" email="business@twoarc.studio" />
    </div>
  );
}