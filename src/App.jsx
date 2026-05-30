import { useEffect, useState, useRef } from "react";
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
  FiChevronLeft,
  FiChevronRight,
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

// ─── Scroll-triggered visibility hook ────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── AnimateIn wrapper ────────────────────────────────────────────────────────
function AnimateIn({ children, className = "", delay = 0, from = "bottom" }) {
  const [ref, visible] = useInView();
  const initial = {
    bottom: "translateY(26px)",
    left: "translateX(-26px)",
    right: "translateX(26px)",
  }[from];
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initial,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Mobile gallery: stacked swipeable cards ──────────────────────────────────
function GalleryStack({ items }) {
  const n = items.length;
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(null);

  const goPrev = () => setCurrent((c) => (c - 1 + n) % n);
  const goNext = () => setCurrent((c) => (c + 1) % n);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    if (dragX < -55) goNext();
    else if (dragX > 55) goPrev();
    setDragX(0);
    setDragging(false);
    startX.current = null;
  };

  // Back → middle → top (current)
  const stack = [
    { idx: (current + 2) % n, rotate: "4deg",   scale: 0.875, ty: 18, z: 0 },
    { idx: (current + 1) % n, rotate: "-2.5deg", scale: 0.935, ty: 9,  z: 1 },
    { idx: current,            rotate: "0deg",    scale: 1,     ty: 0,  z: 2 },
  ];

  return (
    <div className="md:hidden select-none">
      <div
        className="relative mx-6 touch-pan-y"
        style={{ height: 264 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {stack.map(({ idx, rotate, scale, ty, z }) => {
          const isTop = z === 2;
          const tx = isTop ? dragX : 0;
          const opacity =
            isTop && Math.abs(dragX) > 80
              ? Math.max(0.35, 1 - (Math.abs(dragX) - 80) / 160)
              : 1;
          return (
            <div
              key={idx}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transform: `rotate(${rotate}) scale(${scale}) translate(${tx}px, ${ty}px)`,
                transition:
                  isTop && dragging
                    ? "none"
                    : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                zIndex: z,
                opacity,
                boxShadow: isTop
                  ? "0 22px 48px rgba(31,41,51,0.20)"
                  : "0 6px 18px rgba(31,41,51,0.10)",
              }}
            >
              <img
                src={items[idx].image}
                alt={items[idx].title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent px-4 pb-4 pt-10">
                <p className="text-white text-sm font-semibold">
                  {items[idx].title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Photo ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-1.5 bg-ocean-500"
                : "w-1.5 h-1.5 bg-sand-300"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-ink-400 mt-2 tracking-wide">
        {current + 1} / {n} · swipe to browse
      </p>
    </div>
  );
}

// ─── Desktop gallery lightbox ─────────────────────────────────────────────────
function GalleryLightbox({ items, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const n = items.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % n);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-5"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Close"
      >
        <FiX size={18} />
      </button>

      {/* Image + arrows */}
      <div
        className="relative flex items-center justify-center w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setCurrent((c) => (c - 1 + n) % n)}
          className="absolute left-0 z-10 grid place-items-center w-11 h-11 rounded-full bg-ink-900/60 hover:bg-ink-900/90 text-white transition -translate-x-1"
          aria-label="Previous"
        >
          <FiChevronLeft size={22} />
        </button>

        <img
          key={current}
          src={items[current].image}
          alt={items[current].title}
          className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
          style={{ animation: "fadeIn 0.22s ease both" }}
        />

        <button
          onClick={() => setCurrent((c) => (c + 1) % n)}
          className="absolute right-0 z-10 grid place-items-center w-11 h-11 rounded-full bg-ink-900/60 hover:bg-ink-900/90 text-white transition translate-x-1"
          aria-label="Next"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* Caption + counter */}
      <div
        className="flex items-center justify-between w-full max-w-5xl px-1"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white font-medium">{items[current].title}</p>
        <p className="text-white/50 text-sm tabular-nums">{current + 1} / {n}</p>
      </div>

      {/* Thumbnail strip */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={item.title}
            className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
              i === current
                ? "border-ocean-400 opacity-100 scale-105"
                : "border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="grid place-items-center w-10 h-10 rounded-lg bg-ocean-500 text-white font-display text-lg font-bold shadow-sm">
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

// ─── Navigation ───────────────────────────────────────────────────────────────
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
              className="text-sm font-medium text-ink-600 hover:text-ocean-600 transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-ocean-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${PHONE_PRIMARY}`}
          className="hidden md:inline-flex items-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm"
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

// ─── SectionHead ─────────────────────────────────────────────────────────────
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

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SSInnHotels() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 px-5 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="inline-flex items-center gap-2 bg-ocean-50 text-ocean-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 anim-hero anim-d1">
              <FiMapPin size={13} /> Gopanpally, Hyderabad
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-ink-900 mb-5 anim-hero anim-d2">
              A clean, comfortable stay — for a night or a season.
            </h1>
            <p className="text-lg text-ink-600 leading-8 font-light mb-7 max-w-xl anim-hero anim-d3">
              SS.INN OYO &amp; Hotels offers tidy A/C &amp; Non-A/C rooms with
              free WiFi, home-style meals and 24/7 security in Gopanpally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 anim-hero anim-d4">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center justify-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-6 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md"
              >
                <FiPhone size={18} /> Call {PHONE_PRIMARY_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white border border-sand-300 hover:border-ocean-500 text-ink-900 transition px-6 py-4 rounded-xl font-semibold hover:shadow-sm"
              >
                <FiMessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500 anim-hero anim-d5">
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

          {/* Hero image with soft decorative glow */}
          <div className="relative anim-img">
            <div className="absolute -inset-6 bg-gradient-to-br from-ocean-100/50 to-sand-300/40 rounded-3xl blur-2xl -z-10 pointer-events-none" />
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
          {quickFacts.map(({ Icon, label }, i) => (
            <AnimateIn key={label} delay={160 + i * 80}>
              <div className="flex items-center gap-3 bg-white border border-sand-200 rounded-xl px-4 py-3.5 h-full hover:border-ocean-300 transition-colors">
                <Icon size={20} className="text-ocean-500 shrink-0" />
                <span className="text-sm font-medium text-ink-800 leading-tight">
                  {label}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="bg-white border-y border-sand-200 px-5 sm:px-6"
      >
        <div className="max-w-6xl mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <AnimateIn className="order-2 md:order-1" from="left">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-ink-900/10 group">
              <img
                src={building}
                alt="SS.INN OYO & Hotels in Gopanpally"
                className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          </AnimateIn>

          <AnimateIn className="order-1 md:order-2" from="right">
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
          </AnimateIn>
        </div>
      </section>

      {/* ── Rooms ────────────────────────────────────────────────────────── */}
      <section id="rooms" className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <SectionHead
              eyebrow="Our rooms"
              title="Pick the room that fits your stay."
              intro="Every room is cleaned daily and kept simple, bright and comfortable."
            />
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room, i) => (
              <AnimateIn key={room.name} delay={i * 100}>
                <article className="group h-full bg-white border border-sand-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
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
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="inline-flex items-center justify-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white transition px-6 py-3.5 rounded-xl font-semibold shadow-sm"
              >
                <FiPhone size={16} /> Check availability
              </a>
              <span className="text-sm text-ink-500">
                Best rates when you book direct.
              </span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Amenities ────────────────────────────────────────────────────── */}
      <section
        id="amenities"
        className="bg-ocean-700 text-white px-5 sm:px-6 py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <SectionHead
              light
              eyebrow="Amenities"
              title="Everything taken care of."
              intro="The little things that make a stay easy — quietly handled."
            />
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {amenities.map(({ label, Icon }, i) => (
              <AnimateIn key={label} delay={i * 60}>
                <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 rounded-xl px-5 py-4 transition-colors border border-white/10 h-full">
                  <div className="grid place-items-center w-9 h-9 rounded-lg bg-white/15 shrink-0">
                    <Icon size={18} className="text-ocean-100" />
                  </div>
                  <span className="font-medium text-sand-100">{label}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section id="gallery" className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <SectionHead
                eyebrow="Gallery"
                title="A look around."
                intro="Bright, well-kept rooms and shared spaces designed to feel calm and clean."
              />
              <p className="hidden md:block shrink-0 text-xs text-ink-500 mb-12 ml-4">
                Click any photo to enlarge
              </p>
            </div>
          </AnimateIn>

          {/* Mobile: stacked swiper */}
          <GalleryStack items={gallery} />

          {/* Desktop: masonry columns */}
          <div className="hidden md:block columns-3 gap-4">
            {gallery.map((item, i) => (
              <div key={i} className="break-inside-avoid mb-4">
                <AnimateIn delay={i * 55}>
                  <figure
                    className="group relative overflow-hidden rounded-2xl cursor-zoom-in"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/20 transition-colors duration-500" />
                    <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-ink-900/75 to-transparent text-white text-sm font-medium translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {item.title}
                    </figcaption>
                  </figure>
                </AnimateIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-white border-t border-sand-200 px-5 sm:px-6 py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14">
          <AnimateIn from="left">
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
                  className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition group"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 group-hover:bg-ocean-600 transition-colors text-white shrink-0">
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
                  className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition group"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 group-hover:bg-ocean-600 transition-colors text-white shrink-0">
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
                  className="flex items-center gap-4 bg-sand-100 hover:bg-ocean-50 rounded-xl px-5 py-4 transition group"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-lg bg-ocean-500 group-hover:bg-ocean-600 transition-colors text-white shrink-0">
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
          </AnimateIn>

          <AnimateIn from="right" className="h-full">
            <div className="rounded-2xl overflow-hidden border border-sand-200 min-h-[300px] h-full bg-sand-100">
              <iframe
                title="SS.INN OYO & Hotels location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2512203535807!2d78.3063459!3d17.447686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9300391285a1%3A0x58a82e939d81c247!2sSS%20INN%20PG%26%20CO-LIVE%20HOSTEL%20%26%20OYO!5e0!3m2!1sen!2sin!4v1780148257394!5m2!1sen!2sin"
                className="w-full h-full min-h-[300px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="hover:text-white transition"
            >
              {PHONE_PRIMARY_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              className="hover:text-white transition"
            >
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
