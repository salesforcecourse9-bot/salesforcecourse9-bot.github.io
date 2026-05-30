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
const WHATSAPP_URL = `https://wa.me/91${PHONE_PRIMARY}`;

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="grid place-items-center w-10 h-10 rounded-lg bg-ocean-500 text-white font-display text-lg font-bold">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-bold text-ink-900">
          SS.INN
        </span>
        <span className="block text-[10px] uppercase tracking-[0.22em] text-ocean-600 font-semibold mt-1">
          OYO &amp; Hotels
        </span>
      </span>
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 hover:text-ocean-600 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${PHONE_PRIMARY}`}
          className="hidden md:inline-flex items-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-5 py-2.5 rounded-lg font-semibold text-sm"
        >
          <FiPhone size={15} /> Call us
        </a>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden p-2 -mr-2 text-ink-900"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-sand-50 border-t border-sand-300">
          <nav className="px-5 py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-base font-medium text-ink-800 border-b border-sand-200 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function SectionHead({ eyebrow, title, intro, center = false, light = false }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl mb-12`}>
      <p
        className={`text-xs uppercase tracking-[0.2em] font-semibold mb-3 ${
          light ? "text-ocean-100" : "text-ocean-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl md:text-4xl font-semibold leading-tight ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-8 font-light ${
            light ? "text-sand-200" : "text-ink-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export default function SSInnHotels() {
  const quickFacts = [
    { Icon: FiThermometer, label: "A/C & Non-A/C rooms" },
    { Icon: FiCalendar, label: "Daily · Weekly · Monthly" },
    { Icon: FiTruck, label: "Bike & car parking" },
    { Icon: LuUtensils, label: "Home-style meals" },
  ];

  const rooms = [
    {
      name: "Deluxe A/C Room",
      image: room1,
      desc: "Air-conditioned comfort with a plush bed and clean en-suite bath — ideal for a restful stay.",
      tags: ["A/C", "Attached bath", "Free WiFi"],
    },
    {
      name: "Standard Room",
      image: room3,
      desc: "Bright, spotless and well-ventilated — everything you need for a comfortable single or twin stay.",
      tags: ["Non-A/C", "Hot water", "Free WiFi"],
    },
    {
      name: "Family Room",
      image: room4,
      desc: "Roomy layout for families and groups, with flexible bedding for 2 to 4 guests.",
      tags: ["2–4 guests", "Spacious", "Housekeeping"],
    },
  ];

  const amenities = [
    { label: "High-speed WiFi", Icon: FiWifi },
    { label: "24/7 CCTV security", Icon: FiVideo },
    { label: "A/C & Non-A/C rooms", Icon: FiThermometer },
    { label: "Bike & car parking", Icon: FiTruck },
    { label: "Daily, weekly & monthly", Icon: FiCalendar },
    { label: "South & North Indian food", Icon: LuUtensils },
    { label: "Hot & cold water", Icon: FiCoffee },
    { label: "Laundry service", Icon: FiDroplet },
    { label: "24/7 front desk", Icon: FiClock },
  ];

  const gallery = [
    { title: "Deluxe Room", image: room1 },
    { title: "Bedroom", image: room2 },
    { title: "Standard Room", image: room3 },
    { title: "Family Room", image: room4 },
    { title: "Twin Room", image: room5 },
    { title: "Guest Lounge", image: lounge },
    { title: "Bathroom", image: bathroom },
    { title: "The Property", image: building },
  ];

  return (
    <div
      id="top"
      className="min-h-screen bg-sand-100 text-ink-900 font-sans antialiased pb-[68px] md:pb-0"
    >
      <Navigation />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="inline-flex items-center gap-2 bg-ocean-50 text-ocean-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
              <FiMapPin size={13} /> Gopanpally, Hyderabad
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-ink-900 mb-5">
              A clean, comfortable stay — for a night or a season.
            </h1>
            <p className="text-lg text-ink-600 leading-8 font-light mb-7 max-w-xl">
              SS.INN OYO &amp; Hotels offers tidy A/C &amp; Non-A/C rooms with
              free WiFi, home-style meals and 24/7 security in Gopanpally.
            </p>

            {/* Primary actions — details up front */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center justify-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-6 py-4 rounded-xl font-semibold"
              >
                <FiPhone size={18} /> Call {PHONE_PRIMARY_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white border border-sand-300 hover:border-ocean-500 text-ink-900 transition px-6 py-4 rounded-xl font-semibold"
              >
                <FiMessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-amber-500" size={13} />
                ))}
                <span className="ml-1 text-ink-700 font-medium">
                  4.5 on Google
                </span>
              </span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ocean-600 transition"
              >
                <FiMapPin size={14} /> Get directions
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl shadow-ink-900/10">
              <img
                src={heroRoom}
                alt="A guest room at SS.INN OYO & Hotels"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quick facts strip */}
        <div className="max-w-6xl mx-auto mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickFacts.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white border border-sand-200 rounded-xl px-4 py-3.5"
            >
              <Icon size={20} className="text-ocean-500 shrink-0" />
              <span className="text-sm font-medium text-ink-800 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white border-y border-sand-200 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-ink-900/10">
              <img
                src={building}
                alt="SS.INN OYO & Hotels in Gopanpally"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ocean-600 mb-3">
              About the hotel
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-ink-900 mb-5">
              A warm, well-kept place to stay.
            </h2>
            <p className="text-ink-600 text-lg leading-8 font-light mb-4">
              Located near Eedhamma Temple beside the Gopanpally flyover, SS.INN
              OYO &amp; Hotels welcomes travellers, families and working
              professionals with clean, modern rooms and friendly service.
            </p>
            <p className="text-ink-500 leading-8 font-light mb-7">
              From high-speed WiFi and CCTV security to home-style meals and
              24/7 drinking water, every detail is built around a comfortable,
              hassle-free stay.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="flex items-center gap-3 border border-sand-300 hover:border-ocean-500 rounded-xl px-4 py-3 transition"
              >
                <FiPhone className="text-ocean-500 shrink-0" size={18} />
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-ink-500 font-semibold">
                    Reservations
                  </span>
                  <span className="block text-sm font-semibold text-ink-900">
                    {PHONE_PRIMARY_DISPLAY}
                  </span>
                </span>
              </a>
              <a
                href={`tel:${PHONE_SECONDARY}`}
                className="flex items-center gap-3 border border-sand-300 hover:border-ocean-500 rounded-xl px-4 py-3 transition"
              >
                <FiPhone className="text-ocean-500 shrink-0" size={18} />
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-ink-500 font-semibold">
                    Front desk
                  </span>
                  <span className="block text-sm font-semibold text-ink-900">
                    {PHONE_SECONDARY_DISPLAY}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Our rooms"
            title="Pick the room that fits your stay."
            intro="Every room is cleaned daily and kept simple, bright and comfortable."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <article
                key={room.name}
                className="bg-white border border-sand-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-ink-600 leading-6 font-light mb-4">
                    {room.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {room.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium text-ocean-700 bg-ocean-50 rounded-full px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="inline-flex items-center justify-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-6 py-3.5 rounded-xl font-semibold"
            >
              <FiPhone size={16} /> Check availability
            </a>
            <span className="text-sm text-ink-500">
              Best rates when you book direct.
            </span>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="bg-ocean-700 text-white px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            light
            eyebrow="Amenities"
            title="Everything taken care of."
            intro="The little things that make a stay easy — quietly handled."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {amenities.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-4"
              >
                <Icon size={20} className="text-ocean-100 shrink-0" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Gallery"
            title="A look around."
            intro="Bright, well-kept rooms and shared spaces designed to feel calm and clean."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((item, index) => (
              <figure
                key={index}
                className="group relative overflow-hidden rounded-xl bg-white border border-sand-200 aspect-square"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink-900/80 to-transparent text-white text-xs font-medium">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t border-sand-200 px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ocean-600 mb-3">
              Contact &amp; location
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-ink-900 mb-6">
              Ready to book your stay?
            </h2>

            <div className="space-y-3 mb-8">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition"
              >
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 text-white shrink-0">
                  <FiPhone size={18} />
                </span>
                <span>
                  <span className="block text-xs text-ink-500 font-medium">
                    Call us
                  </span>
                  <span className="block text-base font-semibold text-ink-900">
                    {PHONE_PRIMARY_DISPLAY}
                  </span>
                  <span className="block text-sm text-ink-600">
                    {PHONE_SECONDARY_DISPLAY}
                  </span>
                </span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition"
              >
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 text-white shrink-0">
                  <FiMessageCircle size={18} />
                </span>
                <span>
                  <span className="block text-xs text-ink-500 font-medium">
                    Message us
                  </span>
                  <span className="block text-base font-semibold text-ink-900">
                    Chat on WhatsApp
                  </span>
                </span>
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition"
              >
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 text-white shrink-0">
                  <FiMapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs text-ink-500 font-medium">
                    Address
                  </span>
                  <span className="block text-sm font-medium text-ink-900 leading-5">
                    H.No. 2-89/1/7/5, Near Eedhamma Temple, Beside Flyover,
                    Gopanpally — 500019
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-sand-200 min-h-[300px] bg-sand-100">
            <iframe
              title="SS.INN OYO & Hotels location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2512203535807!2d78.3063459!3d17.447686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9300391285a1%3A0x58a82e939d81c247!2sSS%20INN%20PG%26%20CO-LIVE%20HOSTEL%20%26%20OYO!5e0!3m2!1sen!2sin!4v1780148257394!5m2!1sen!2sin"
              className="w-full h-full min-h-[300px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-900 text-sand-200 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-lg bg-ocean-500 text-white font-display text-lg font-bold">
              S
            </span>
            <div className="leading-none">
              <span className="block font-display text-lg font-bold text-white">
                SS.INN OYO &amp; Hotels
              </span>
              <span className="block text-xs text-sand-300 mt-1">
                Gopanpally, Hyderabad
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`tel:${PHONE_PRIMARY}`} className="hover:text-white transition">
              {PHONE_PRIMARY_DISPLAY}
            </a>
            <a href={`tel:${PHONE_SECONDARY}`} className="hover:text-white transition">
              {PHONE_SECONDARY_DISPLAY}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Google Maps
            </a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="max-w-6xl mx-auto py-5 text-xs text-sand-300 text-center">
            &copy; 2026 SS.INN OYO &amp; Hotels. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky mobile call / WhatsApp bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-sand-50/95 backdrop-blur border-t border-sand-300 grid grid-cols-2 gap-2 p-2.5">
        <a
          href={`tel:${PHONE_PRIMARY}`}
          className="inline-flex items-center justify-center gap-2 bg-ocean-500 text-white py-3 rounded-lg font-semibold text-sm"
        >
          <FiPhone size={16} /> Call now
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white border border-sand-300 text-ink-900 py-3 rounded-lg font-semibold text-sm"
        >
          <FiMessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
