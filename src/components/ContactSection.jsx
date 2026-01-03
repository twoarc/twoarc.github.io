import { useRef, useState } from "react";
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
                                       }) {
  const year = new Date().getFullYear();
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mojvwbjz", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });


      if (response.ok) {
        setStatus("SUCCESS");
        alert("✅ Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        setStatus("ERROR");
        alert("❌ Oops! There was a problem sending your message.");
      }
    } catch (error) {
      setStatus("ERROR");
      alert("❌ Oops! Connection error.");
    }
  };

  return (
      <section id={id} className="max-w-6xl mx-auto px-4 py-20 scroll-mt-24">
        <div className="flex flex-col-reverse gap-12 items-start md:grid md:grid-cols-2 md:gap-12">

          {/* INFO + SOCIALS */}
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

          {/* FORM */}
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
                onSubmit={handleSubmit}
                className="mt-10 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              <input
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
              />

              <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 min-h-[220px] resize-none"
              />

              <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-lg bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
              >
                Send Message
              </button>

              {status === "SUCCESS" && <p className="text-green-600 mt-2 font-medium">Message sent!</p>}
              {status === "ERROR" && <p className="text-red-600 mt-2 font-medium">Something went wrong.</p>}
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
