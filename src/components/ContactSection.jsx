import { useRef } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function ContactSection({
  id = "contact",
  companyName = "2Arc",
  email = "twoarc@proton.me",
  socials = {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
  onSubmit,
}) {
  const year = new Date().getFullYear();
  const formRef = useRef(null);

  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-20 scroll-mt-24">
      {/* ✅ Mobil: column-reverse (info kesin altta) | ✅ Desktop: grid (PC aynı) */}
      <div className="flex flex-col-reverse gap-12 items-start md:grid md:grid-cols-2 md:gap-12">
        {/* INFO + SOCIALS (mobilde altta, desktop solda) */}
        <div className="pt-4">
          <p className="text-slate-700 text-sm">
            Copyright © {year} {companyName} | All rights reserved.
          </p>

          <div className="mt-10 flex items-center gap-6 text-slate-700">
            <SocialIcon label="Facebook" href={socials.facebook} Icon={FaFacebookF} />
            <SocialIcon label="Instagram" href={socials.instagram} Icon={FaInstagram} />
            <SocialIcon label="LinkedIn" href={socials.linkedin} Icon={FaLinkedinIn} />
            <SocialIcon label="YouTube" href={socials.youtube} Icon={FaYoutube} />
          </div>
        </div>

        {/* FORM (mobilde üstte, desktop sağda) */}
        <div>
          <h3 className="text-4xl font-black text-slate-900 text-center md:text-left">
            Contact Us
          </h3>

          <p className="mt-4 text-slate-600 max-w-xl mx-auto md:mx-0">
            If you have anything to share, please fill out this form. We’d love to hear from you!
          </p>

          <p className="mt-6 text-slate-600">
            You can also reach us at:{" "}
            <a className="font-extrabold text-slate-900" href={`mailto:${email}`}>
              {email}
            </a>
          </p>

          <form
            ref={formRef}
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();

              if (onSubmit) onSubmit(e);
              else alert("✅ You successfully submitted your message");

              formRef.current?.reset();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="firstName"
                placeholder="First Name"
                className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>

            <input
              name="email"
              placeholder="Email Address"
              type="email"
              className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 min-h-[220px] resize-none"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-lg bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ label, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={label}
      className="w-10 h-10 rounded-full border border-slate-300 grid place-items-center
                 hover:border-indigo-500 hover:text-indigo-600 transition"
    >
      <Icon size={18} />
    </a>
  );
}
