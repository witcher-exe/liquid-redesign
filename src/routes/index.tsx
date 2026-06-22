import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Users, TreePine, GraduationCap, PawPrint, Stethoscope, Building2,
  Zap, CloudRain, Droplets, Sparkles, ChevronLeft, ChevronRight,
  Target, ListChecks, Quote, Menu, X, Mail, Phone, MapPin,
  Facebook, Instagram, Twitter, Youtube, ChevronDown, Heart, ArrowUpRight,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import unity from "@/assets/unity.png";
import projTree from "@/assets/proj-tree.jpg";
import projAnimal from "@/assets/proj-animal.jpg";
import projMedical from "@/assets/proj-medical.jpg";
import team1 from "@/assets/team-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Team Bangladesh — Let's Build a Greener Future" },
      { name: "description", content: "Team Bangladesh: building a greener, cleaner and healthier Bangladesh through inclusive development, tree plantation, education, and healthcare." },
    ],
  }),
  component: Index,
});

/* ---------- shared bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="font-script text-2xl md:text-3xl text-ember mb-2"
    >
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-3xl md:text-5xl font-extrabold text-ink"
    >
      {children}
    </motion.h2>
  );
}

/* ---------- navigation ---------- */

const NAV = [
  {
    label: "About Us",
    items: ["Our Mission And Vision", "How We Work", "Our Committees", "Our Working Arenas", "Partners", "Contact Us"],
  },
  { label: "Campaigns", items: ["Events", "Campaigns", "Our Committees", "Photo Gallery", "Video Gallery", "Blog", "FAQ", "Join With Us (Volunteer)", "Products", "Donation"] },
  {
    label: "More",
    items: ["Monthly Recognition", "Green Club / Society", "Great Volunteer", "Great Leader", "Best District Committee", "Best Thana Committee", "Green School of this month", "Green Lover of this month"],
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
          scrolled ? "glass" : "glass-dark"
        }`}>
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-leaf-glow to-leaf shadow-lg">
              <TreePine className="h-5 w-5 text-white" />
            </div>
            <span className={`font-extrabold text-lg tracking-tight ${scrolled ? "text-ink" : "text-white"}`}>
              TeamBD
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((m) => (
              <div
                key={m.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(m.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition ${
                  scrolled ? "text-ink hover:text-leaf" : "text-white/90 hover:text-white"
                }`}>
                  {m.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {activeMenu === m.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-2 w-64"
                    >
                      <div className="glass-card rounded-2xl p-2">
                        {m.items.map((it) => (
                          <a
                            key={it}
                            href="#"
                            className="block px-4 py-2.5 text-sm font-medium text-ink rounded-xl hover:bg-leaf/10 hover:text-leaf-deep transition"
                          >
                            {it}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="#join" className="ml-3 px-5 py-2.5 rounded-full bg-ember text-white text-sm font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition">
              Join Us
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-ink" : "text-white"}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 glass-card rounded-2xl overflow-hidden"
            >
              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAV.map((m) => (
                  <details key={m.label} className="group">
                    <summary className="flex items-center justify-between px-3 py-3 text-sm font-bold uppercase tracking-wider text-ink cursor-pointer rounded-lg hover:bg-leaf/10">
                      {m.label}
                      <ChevronDown className="h-4 w-4 group-open:rotate-180 transition" />
                    </summary>
                    <div className="pl-4">
                      {m.items.map((it) => (
                        <a key={it} href="#" className="block px-3 py-2 text-sm text-muted-foreground hover:text-leaf">{it}</a>
                      ))}
                    </div>
                  </details>
                ))}
                <a href="#join" className="block mt-2 px-5 py-3 text-center rounded-full bg-ember text-white font-bold uppercase tracking-wider">Join Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden text-white">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroBg} alt="" width={1920} height={1280} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-leaf-deep/70 via-leaf-deep/60 to-leaf-deep/95" />
      </motion.div>

      {/* floating glass orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-leaf-glow/20 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-ember/20 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl px-4 pt-40 md:pt-48 pb-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="font-script text-3xl md:text-4xl text-ember mb-4">
            Let's build a greener future
          </p>

          <h1 className="font-bengali font-bold text-5xl md:text-7xl leading-[1.1] tracking-tight drop-shadow-2xl">
            করবো কাজ – গড়বো দেশ,
            <br />
            <span className="text-gradient-leaf">সবার আগে বাংলাদেশ</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            A people-powered movement for inclusive development, a cleaner environment, and a healthier Bangladesh — driven by volunteers, neighborhood by neighborhood.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="group relative inline-flex items-center gap-2 rounded-full bg-leaf px-8 py-4 font-bold text-white shadow-2xl transition hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full bg-leaf-glow opacity-0 blur-xl group-hover:opacity-60 transition" />
              <span className="relative">Join Us</span>
              <ChevronRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#about" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium">
              Learn more <ChevronDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* giant watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="pointer-events-none absolute -bottom-10 left-0 right-0 text-center"
        >
          <div className="font-extrabold tracking-[0.3em] text-white text-[18vw] md:text-[14vw] leading-none">
            BANGLADESH
          </div>
        </motion.div>
      </motion.div>

      {/* wave divider */}
      <svg className="absolute bottom-0 left-0 right-0 z-10 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 80 }}>
        <path fill="var(--ivory)" d="M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}

/* ---------- about ---------- */

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dur = 1600;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-leaf-glow/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-ember/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-leaf-glow/30 to-ember/20 blur-2xl" />
          <img src={unity} alt="Unity emblem" width={800} height={800} className="relative h-full w-full object-contain animate-float-slow" loading="lazy" />
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
            <div className="relative grid h-28 w-28 md:h-32 md:w-32 place-items-center rounded-full bg-gradient-to-br from-leaf to-leaf-deep text-white text-center shadow-2xl animate-pulse-ring">
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span className="text-[10px] uppercase tracking-wider">Since 2024</span>
                </div>
                <div className="font-extrabold text-sm mt-1">Bangladesh</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionEyebrow>Who We Are</SectionEyebrow>
          <SectionTitle>Team Bangladesh</SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-2 text-sm font-semibold text-leaf-deep"
          >
            <Heart className="h-4 w-4" /> Registered under Social Welfare of Bangladesh
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed"
          >
            Team Bangladesh is a non-profit organisation of volunteers, educators, healthcare workers, and changemakers from across the country. We unite around a single mission: a greener, cleaner, healthier nation, built block by block, neighborhood by neighborhood.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            From tree plantations and free medical camps to renewable energy and inclusive education — we turn local action into national change, with collaboration at the heart of everything we do.
          </motion.p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: 24, l: "Years of Support" },
              { n: 1000, l: "Team Members" },
              { n: 100, l: "Inspired Causes" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-leaf-deep">
                  <Counter to={s.n} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- key areas ---------- */

const AREAS = [
  { icon: Users, title: "Inclusive Development", desc: "Social, educational, and economic inclusion for every community." },
  { icon: TreePine, title: "Tree Plantation", desc: "Building a leafier nation, one neighborhood drive at a time." },
  { icon: GraduationCap, title: "Educational Development", desc: "Standing beside learners and supporting underserved schools." },
  { icon: PawPrint, title: "Care for Homeless Paws", desc: "Food, shelter, and medical care for our voiceless street friends." },
  { icon: Stethoscope, title: "Free Mega Medical Campaign", desc: "Free checkups, medicine, and outreach for villages in need." },
  { icon: Building2, title: "Green City – Clean City", desc: "Cleaner streets, sorted waste, and proud, walkable cities." },
  { icon: Zap, title: "Renewable Energy Solutions", desc: "Advocating sustainable energy for homes, schools, and farms." },
  { icon: CloudRain, title: "Climate Change", desc: "Community-led action to reduce, adapt, and stay resilient." },
  { icon: Droplets, title: "Rainwater Harvesting", desc: "Smart water systems to fight scarcity in vulnerable regions." },
  { icon: Sparkles, title: "Talent Beyond Poverty", desc: "Spotting bright young minds and opening doors to opportunity." },
];

function KeyAreas() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-ivory to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>Our Key Initiatives</SectionEyebrow>
        <SectionTitle>Key Areas of Action</SectionTitle>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-3xl p-5 md:p-6 text-left relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-leaf-glow/20 blur-2xl group-hover:bg-leaf-glow/40 transition" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-leaf-deep text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-5 font-extrabold text-ink text-base md:text-lg">{a.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ongoing projects ---------- */

const PROJECTS = [
  { img: projTree, title: "Tree Plantation", desc: "Planting native species across districts to revive lost canopy." },
  { img: projAnimal, title: "Street Animal Care", desc: "Rescue, feed and treat the animals who share our streets." },
  { img: projMedical, title: "Free Mega Medical Camp", desc: "Bringing doctors, medicine and care to underserved towns." },
];

function Projects() {
  return (
    <section className="relative py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>What We Have Done So Far</SectionEyebrow>
        <SectionTitle>Our Ongoing Projects</SectionTitle>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-leaf-deep/95 via-leaf-deep/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
                <h3 className="text-xl md:text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/85 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                  {p.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 glass rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                <ChevronRight className="h-4 w-4 text-ink" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- executive team ---------- */

const TEAM = [
  { name: "Dr Muhit A Rana", role: "Member", org: "Team Bangladesh", img: team1, bio: "Driving the strategic and humanitarian operations of Team Bangladesh, leading our community programs and grassroots initiatives that touch thousands of lives." },
  { name: "Nazmul", role: "Member", org: "Team Bangladesh", img: team1, bio: "Actively contributing to the strategic and humanitarian operations of Team Bangladesh, driving progressive change within the community." },
  { name: "Sakib Rahman", role: "Coordinator", org: "Team Bangladesh", img: team1, bio: "Coordinating field volunteers, green campaigns, and district level planning across the country." },
];

function Team() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % TEAM.length);
  const prev = () => setIdx((i) => (i - 1 + TEAM.length) % TEAM.length);
  const m = TEAM[idx];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-secondary/40 to-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionEyebrow>Leadership</SectionEyebrow>
        <SectionTitle>Our Executive Team</SectionTitle>

        <div className="relative mt-14">
          <div className="glass-card rounded-3xl p-6 md:p-12 mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center text-left"
              >
                <div className="relative mx-auto">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-leaf-glow to-ember opacity-50 blur-xl" />
                  <img src={m.img} alt={m.name} width={400} height={400} loading="lazy" className="relative h-64 w-64 md:h-80 md:w-80 object-cover rounded-3xl border-4 border-white shadow-2xl" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-ink">{m.name}</h3>
                  <p className="mt-2 text-leaf font-semibold">{m.role}</p>
                  <p className="mt-1 text-leaf-deep font-bold">{m.org}</p>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{m.bio}</p>
                  <div className="mt-6 flex gap-3">
                    {[Youtube, Facebook, Instagram, Twitter].map((Ic, i) => (
                      <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-leaf/10 text-leaf-deep hover:bg-leaf hover:text-white transition">
                        <Ic className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prev} className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass hover:scale-110 transition">
            <ChevronLeft className="h-5 w-5 text-leaf-deep" />
          </button>
          <button onClick={next} className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass hover:scale-110 transition">
            <ChevronRight className="h-5 w-5 text-leaf-deep" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {TEAM.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-leaf" : "w-2 bg-leaf/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- mission ---------- */

function Mission() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden text-white" style={{ background: "linear-gradient(135deg, oklch(0.18 0.04 250), oklch(0.22 0.05 220))" }}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-leaf/40 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-ember/30 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <p className="font-script text-3xl text-ember mb-2">Our Mission</p>
        <h2 className="text-3xl md:text-5xl font-extrabold">A coordinated movement, grounded in trust</h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          The group coordinates policymaking, planning, and decision-making among local committee members.
        </p>

        <div className="mt-14 grid md:grid-cols-2 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-3xl p-8"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ember/20 text-ember mb-5">
              <Target className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-extrabold">Our Vision</h3>
            <p className="mt-3 text-white/75 leading-relaxed">
              The group is formed to make the constitution, policymaking, planning, and implementation of all eminent committees and tasks among the various members of various levels of the organization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-dark rounded-3xl p-8"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ember/20 text-ember mb-5">
              <ListChecks className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-extrabold">Organization Policies</h3>
            <ul className="mt-3 space-y-3 text-white/75">
              {[
                "Share any matter related to the organization.",
                "Maintain your association rules and conduct.",
                "Anyone can use the feedback to the committee.",
                "Refrain from making subordinates or junior tasks.",
                "On gratification of the committee of the honorable Chairman, you certify the position.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonial ---------- */

const TESTIMONIALS = [
  { quote: "Team Bangladesh closely respects the empathy approach Team Bangladesh takes towards change. Their model and community outreach are exceptional.", name: "Dr Haroon Ali", role: "Professor" },
  { quote: "A grassroots force that gets things done. The volunteers carry incredible energy and a deep sense of duty to the country.", name: "Sadia Karim", role: "Community Lead" },
  { quote: "From medical camps to tree drives, every initiative is delivered with care, transparency, and impact.", name: "Mehedi Hasan", role: "Volunteer" },
];

function Testimonial() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-28 md:py-36 overflow-hidden text-white">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" width={1920} height={1280} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-leaf-deep/85" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <p className="font-script text-3xl text-ember">What People Say</p>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2">Testimonial</h2>

        <div className="mt-12 glass-dark rounded-3xl p-8 md:p-12 relative">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-ember/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl italic text-white/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6">
                <div className="font-extrabold text-ember">{t.name}</div>
                <div className="text-sm text-white/60">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-ember" : "w-2 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section id="join" className="relative py-20 md:py-24 overflow-hidden" style={{ background: "linear-gradient(120deg, oklch(0.78 0.13 130), oklch(0.7 0.16 145))" }}>
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ height: 200 }}>
          <path fill="white" fillOpacity="0.3" d="M0,100 Q360,180 720,100 T1440,100 L1440,200 L0,200 Z" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 grid md:grid-cols-[1fr_auto] items-center gap-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-ink leading-tight">
            Let's build a greener, cleaner and<br />healthier Bangladesh – together.
          </h2>
        </div>
        <a href="#" className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-white font-bold shadow-2xl hover:scale-105 transition whitespace-nowrap">
          Are We Doing Volunteer
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer id="donate" className="relative mt-24 bg-ink text-white overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-ember/20 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-4 gap-12">
        {/* brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-leaf-glow to-leaf flex items-center justify-center shadow-lg shadow-leaf/30">
              <TreePine className="h-5 w-5 text-white" />
            </div>
            <div className="font-bold">TeamBD</div>
          </div>
          <p className="font-script text-ember text-sm">… because Bangladesh First.</p>
          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            A volunteer-powered movement for a greener, kinder, and more equitable Bangladesh.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-leaf hover:border-leaf transition-all">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {["About Us", "Our Activities", "Organization Policies", "Donation"].map((l) => (
              <li key={l}><a href="#" className="hover:text-ember transition">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Bangladesh</li>
            <li className="flex gap-2 break-all"><Mail className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Contact.TeamBangladesh@gmail.com</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> +880 197-4400321</li>
          </ul>
        </div>

        {/* newsletter */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
          <div className="font-script text-ember text-sm">For causes that</div>
          <h3 className="text-white text-2xl font-bold mb-3">Really Matter</h3>
          <p className="text-white/60 text-sm mb-4">Join the newsletter — field updates & ways to help.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email"
              className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-leaf-glow"
            />
            <button className="rounded-full bg-gradient-to-r from-ember to-leaf-glow px-4 py-2.5 text-sm font-semibold text-ink shrink-0 hover:shadow-lg hover:shadow-ember/30 transition-all">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/50">
          <p>© 2024 Team Bangladesh. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-leaf-glow transition">Terms of use</a>
            <a href="#" className="hover:text-leaf-glow transition">Privacy policy</a>
            <a href="#" className="hover:text-leaf-glow transition">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function Index() {
  return (
    <div className="bg-ivory text-ink overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <KeyAreas />
      <Projects />
      <Team />
      <Mission />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}
