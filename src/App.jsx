import { useEffect, useState } from "react";
import {
  FiWifi,
  FiVideo,
  FiThermometer,
  FiTruck,
  FiCalendar,
  FiCoffee,
  FiDroplet,
  FiClock,
  FiPhone,
  FiMapPin,
  FiMessageCircle,
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";
import { LuUtensils } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

import heroRoom from "./assets/images/IMG_4847.jpeg";
import building from "./assets/images/IMG_4850.jpeg";
import room1 from "./assets/images/IMG_4860.jpeg";
import room2 from "./assets/images/IMG_4861.jpeg";
import room3 from "./assets/images/IMG_4855.jpeg";
import room4 from "./assets/images/IMG_4858.jpeg";
import room5 from "./assets/images/IMG_4859.jpeg";
import lounge from "./assets/images/IMG_4864.jpeg";
import bathroom from "./assets/images/IMG_4856.jpeg";

const MAPS_URL = "https://maps.app.goo.gl/jvSAir54EBCQnucMA?g_st=ic";
const PHONE_PRIMARY = "7799619090";
const PHONE_SECONDARY = "7799629090";
const PHONE_PRIMARY_DISPLAY = "+91 77996 19090";
const PHONE_SECONDARY_DISPLAY = "+91 77996 29090";

const NAV_LINKS = [
  { label: "Stay", href: "#stay" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ tone = "dark" }) {
  const main = tone === "light" ? "text-ivory-50" : "text-espresso-900";
  return (
    <a href="#top" className="flex flex-col leading-none">
      <span className={`font-display text-2xl font-semibold tracking-wide ${main}`}>
        SS<span className="text-gold-500">.</span>INN
      </span>
      <span className="text-[9px] uppercase tracking-[0.42em] text-gold-500 mt-1 pl-0.5">
        OYO &amp; Hotels
      </span>
    </a>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        dark
          ? "bg-ivory-100/92 backdrop-blur-md border-b border-espresso-900/10 py-0"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Wordmark tone={dark ? "dark" : "light"} />

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] uppercase tracking-[0.18em] font-medium transition ${
                dark
                  ? "text-espresso-700 hover:text-gold-600"
                  : "text-ivory-50/85 hover:text-gold-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${PHONE_PRIMARY}`}
          className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] uppercase tracking-[0.16em] font-medium transition border ${
            dark
              ? "border-espresso-900/20 text-espresso-900 hover:bg-espresso-900 hover:text-ivory-50 hover:border-espresso-900"
              : "border-ivory-50/40 text-ivory-50 hover:bg-ivory-50 hover:text-espresso-900"
          }`}
        >
          <FiPhone size={14} />
          Reserve
        </a>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className={`md:hidden p-2 -mr-2 ${dark ? "text-espresso-900" : "text-ivory-50"}`}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory-100/97 backdrop-blur-md border-t border-espresso-900/10">
          <nav className="px-6 py-5 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-sm uppercase tracking-[0.18em] font-medium text-espresso-800 border-b border-espresso-900/10 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-espresso-900 text-ivory-50 px-5 py-3.5 text-sm uppercase tracking-[0.16em] font-medium"
            >
              <FiPhone size={14} /> Call {PHONE_PRIMARY_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Eyebrow({ index, children, light = false }) {
  return (
    <div
      className={`flex items-center gap-4 mb-6 text-[12px] uppercase tracking-[0.32em] font-medium ${
        light ? "text-gold-400" : "text-gold-600"
      }`}
    >
      {index && <span className="font-display text-base tracking-normal">{index}</span>}
      <span className={`h-px w-10 ${light ? "bg-gold-400/50" : "bg-gold-500/50"}`} />
      <span>{children}</span>
    </div>
  );
}

export default function SSInnHotels() {
  const rooms = [
    {
      name: "The Deluxe Room",
      image: room1,
      desc: "Air-conditioned and softly lit, with a plush bed, writing desk and a spotless en-suite bath — our most comfortable room for an unhurried stay.",
      facts: ["Air-conditioned", "Queen bed", "En-suite bath", "Free WiFi"],
    },
    {
      name: "The Standard Room",
      image: room3,
      desc: "Bright, airy and immaculately kept, with everything a single or twin traveller needs — calm, clean and quietly comfortable.",
      facts: ["Non-A/C", "Twin / single", "Hot water", "Free WiFi"],
    },
    {
      name: "The Family Suite",
      image: room4,
      desc: "A roomier layout for families and small groups, with flexible bedding for up to four guests and generous storage throughout.",
      facts: ["2–4 guests", "Spacious", "Daily housekeeping", "Free WiFi"],
    },
  ];

  const amenities = [
    { label: "High-speed WiFi", Icon: FiWifi },
    { label: "24/7 CCTV security", Icon: FiVideo },
    { label: "A/C & Non-A/C rooms", Icon: FiThermometer },
    { label: "Bike & car parking", Icon: FiTruck },
    { label: "Day, week & month stays", Icon: FiCalendar },
    { label: "South & North Indian food", Icon: LuUtensils },
    { label: "Hot & cold water", Icon: FiCoffee },
    { label: "Laundry service", Icon: FiDroplet },
    { label: "24/7 front desk", Icon: FiClock },
  ];

  const gallery = [
    { title: "The Deluxe Room", image: room1 },
    { title: "Bedroom", image: room2 },
    { title: "Standard Room", image: room3 },
    { title: "Family Suite", image: room4 },
    { title: "Twin Room", image: room5 },
    { title: "Guest Lounge", image: lounge },
    { title: "The Bath", image: bathroom },
    { title: "The Property", image: building },
  ];

  return (
    <div id="top" className="min-h-screen bg-ivory-100 text-espresso-900 font-sans antialiased">
      <Navigation />

      {/* Hero — cinematic full screen */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <img
          src={heroRoom}
          alt="A guest room at SS.INN OYO & Hotels"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-900/55 via-espresso-900/30 to-espresso-900/80" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-ivory-50/80 text-xs uppercase tracking-[0.32em] mb-7">
              <FiMapPin size={14} className="text-gold-400" />
              Gopanpally · Hyderabad
            </p>
            <h1 className="font-display text-ivory-50 text-5xl sm:text-6xl lg:text-[5.5rem] font-light leading-[1.02] mb-7">
              A quiet, elegant stay —
              <span className="block italic text-gold-400 font-normal">
                made simple.
              </span>
            </h1>
            <p className="text-ivory-100/80 text-lg leading-8 max-w-xl font-light mb-9">
              Clean, well-kept A/C &amp; Non-A/C rooms with free WiFi, home-style
              meals and round-the-clock care — for a night, a week or a season.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-espresso-900 transition px-7 py-4 text-[13px] uppercase tracking-[0.16em] font-semibold"
              >
                <FiPhone size={15} /> Book your stay
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ivory-50/40 text-ivory-50 hover:bg-ivory-50/10 transition px-7 py-4 text-[13px] uppercase tracking-[0.16em] font-medium"
              >
                <FiMapPin size={15} /> Directions
              </a>
            </div>
          </div>
        </div>

        {/* bottom hairline bar */}
        <div className="absolute bottom-0 inset-x-0 border-t border-ivory-50/15">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-ivory-50/70 text-xs uppercase tracking-[0.22em]">
            <span className="flex items-center gap-2">
              <FaStar className="text-gold-400" size={12} /> Loved on Google
            </span>
            <a href={`tel:${PHONE_PRIMARY}`} className="hover:text-gold-400 transition">
              {PHONE_PRIMARY_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Stay — editorial intro */}
      <section id="stay" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow index="01">Welcome</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08] text-espresso-900 mb-8">
              A calm retreat beside the
              <span className="italic text-gold-600"> Gopanpally flyover.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl">
              <p className="text-taupe-600 text-[17px] leading-8 font-light">
                Set near Eedhamma Temple, SS.INN OYO &amp; Hotels welcomes
                travellers, families and working professionals with bright,
                modern rooms and warm, attentive service.
              </p>
              <p className="text-taupe-600 text-[17px] leading-8 font-light">
                From high-speed WiFi and CCTV-secured corridors to home-style
                meals and 24/7 drinking water, every detail is arranged around a
                restful, hassle-free stay.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="border-t border-espresso-900/15 divide-y divide-espresso-900/10">
              {[
                { v: "4.5", s: "★", l: "Guest rating on Google" },
                { v: "24/7", s: "", l: "Reception & security" },
                { v: "1–4", s: "", l: "Guests per room" },
              ].map((stat) => (
                <div key={stat.l} className="flex items-baseline justify-between py-5">
                  <span className="font-display text-4xl md:text-5xl font-light text-espresso-900">
                    {stat.v}
                    <span className="text-gold-500 text-3xl">{stat.s}</span>
                  </span>
                  <span className="text-taupe-500 text-sm uppercase tracking-[0.14em] text-right max-w-[55%]">
                    {stat.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms — alternating editorial showcase */}
      <section id="rooms" className="bg-ivory-200/50 border-y border-espresso-900/10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 md:mb-20">
            <Eyebrow index="02">Accommodations</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08]">
              Rooms kept simple,
              <span className="italic text-gold-600"> bright and clean.</span>
            </h2>
          </div>

          <div className="space-y-20 md:space-y-28">
            {rooms.map((room, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={room.name}
                  className="grid md:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  <div
                    className={`md:col-span-7 ${flip ? "md:order-2" : "md:order-1"}`}
                  >
                    <div className="aspect-[16/11] overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        loading="lazy"
                        className="h-full w-full object-cover hover:scale-105 transition duration-[1200ms]"
                      />
                    </div>
                  </div>

                  <div
                    className={`md:col-span-5 ${flip ? "md:order-1" : "md:order-2"}`}
                  >
                    <span className="font-display text-gold-500 text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-light text-espresso-900 mt-2 mb-4">
                      {room.name}
                    </h3>
                    <p className="text-taupe-600 leading-8 font-light mb-7">
                      {room.desc}
                    </p>
                    <ul className="grid grid-cols-2 gap-y-3 gap-x-6 mb-8">
                      {room.facts.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-espresso-800"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`tel:${PHONE_PRIMARY}`}
                      className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.16em] font-medium text-espresso-900 border-b border-gold-500/60 pb-1 hover:text-gold-600 transition"
                    >
                      Enquire about this room <FiArrowRight size={14} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities — minimal hairline list on dark band */}
      <section id="amenities" className="bg-espresso-900 text-ivory-50 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <Eyebrow index="03" light>
              The Essentials
            </Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08]">
              Everything quietly
              <span className="italic text-gold-400"> taken care of.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 border-t border-ivory-50/15">
            {amenities.map(({ label, Icon }, index) => (
              <div
                key={index}
                className="flex items-center gap-5 py-7 border-b border-ivory-50/15"
              >
                <Icon size={22} className="text-gold-400 shrink-0" strokeWidth={1.5} />
                <span className="text-lg font-light tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — horizontal scroll */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <Eyebrow index="04">Gallery</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08]">
              A look <span className="italic text-gold-600">around.</span>
            </h2>
          </div>
          <p className="text-taupe-500 text-sm uppercase tracking-[0.2em] flex items-center gap-2">
            Scroll to explore <FiArrowRight size={15} />
          </p>
        </div>

        <div className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-2">
          {gallery.map((item, index) => (
            <figure
              key={index}
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-[1200ms]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-espresso-900/85 via-espresso-900/20 to-transparent">
                <h3 className="text-ivory-50 font-display text-xl font-light">
                  {item.title}
                </h3>
              </figcaption>
            </figure>
          ))}
          <div className="shrink-0 w-2" aria-hidden />
        </div>
      </section>

      {/* Reviews — quiet testimonial band */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center border-y border-espresso-900/15 py-16 md:py-20">
          <div className="flex justify-center gap-1.5 mb-7">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-gold-500" size={18} />
            ))}
          </div>
          <p className="font-display text-2xl md:text-4xl font-light italic leading-snug text-espresso-900 mb-8">
            “Clean rooms, warm hosts and a genuinely comfortable stay.”
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] font-medium text-espresso-900 hover:text-gold-600 transition"
          >
            Read our Google reviews <FiArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {/* Contact — closing dark section */}
      <section
        id="contact"
        className="relative bg-espresso-900 text-ivory-50 py-24 md:py-32 px-6 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_50%_0%,#C6A565,transparent_55%)]"
        />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <Eyebrow index="05" light>
              Reservations
            </Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8">
              Come stay with
              <span className="italic text-gold-400"> us.</span>
            </h2>
            <p className="text-ivory-100/75 text-lg font-light leading-8 mb-10 max-w-md">
              Call us or message on WhatsApp and we&rsquo;ll arrange everything —
              we&rsquo;d love to host you.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-espresso-900 transition px-7 py-4 text-[13px] uppercase tracking-[0.16em] font-semibold"
              >
                <FiPhone size={15} /> Call {PHONE_PRIMARY_DISPLAY}
              </a>
              <a
                href={`https://wa.me/91${PHONE_PRIMARY}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ivory-50/35 hover:bg-ivory-50/10 transition px-7 py-4 text-[13px] uppercase tracking-[0.16em] font-medium"
              >
                <FiMessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:pt-4">
            <div className="divide-y divide-ivory-50/15 border-y border-ivory-50/15">
              <div className="py-6 flex items-start gap-4">
                <FiMapPin className="text-gold-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ivory-100/50 mb-1.5">
                    Address
                  </p>
                  <p className="text-ivory-50 font-light leading-7">
                    H.No. 2-89/1/7/5, Near Eedhamma Temple,
                    <br />
                    Beside Flyover, Gopanpally — 500019, Hyderabad
                  </p>
                </div>
              </div>
              <div className="py-6 flex items-start gap-4">
                <FiPhone className="text-gold-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ivory-100/50 mb-1.5">
                    Telephone
                  </p>
                  <p className="text-ivory-50 font-light leading-7">
                    <a href={`tel:${PHONE_PRIMARY}`} className="hover:text-gold-400 transition">
                      {PHONE_PRIMARY_DISPLAY}
                    </a>
                    <br />
                    <a href={`tel:${PHONE_SECONDARY}`} className="hover:text-gold-400 transition">
                      {PHONE_SECONDARY_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>
              <div className="py-6 flex items-start gap-4">
                <FiMapPin className="text-gold-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-ivory-100/50 mb-1.5">
                    Location
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-ivory-50 font-light hover:text-gold-400 transition"
                  >
                    View on Google Maps <FiArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso-800 text-ivory-50 px-6">
        <div className="max-w-7xl mx-auto py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Wordmark tone="light" />
          <p className="text-ivory-100/55 text-sm font-light max-w-xs md:text-right leading-6">
            Clean, comfortable rooms in Gopanpally, Hyderabad — for travellers,
            families and professionals.
          </p>
        </div>
        <div className="border-t border-ivory-50/10">
          <p className="max-w-7xl mx-auto py-6 text-xs text-ivory-100/40 text-center tracking-wide font-light">
            &copy; 2026 SS.INN OYO &amp; Hotels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
