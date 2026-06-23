import { type ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Facebook, Instagram, Youtube, MapPin, Mail, Phone, Leaf, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/mission", label: "Mission" },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/events", label: "Events" },
  { to: "/committees", label: "Committees" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 h-16 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 rounded-full gradient-leaf flex items-center justify-center shadow-lg shadow-leaf/30">
              <Leaf className="h-5 w-5 text-white" />
              <span className="absolute inset-0 rounded-full ring-2 ring-amber-glow/40 group-hover:scale-110 transition-transform" />
            </div>
            <div className="leading-tight">
              <div className="font-bold tracking-tight text-base">TeamBD</div>
              <div className="script text-[10px] text-amber-glow">Bangladesh First</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors [&.active]:bg-leaf [&.active]:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#donate"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full gradient-warm px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-amber-glow/30 hover:shadow-amber-glow/50 hover:-translate-y-0.5 transition-all"
            >
              Donate <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-muted"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50 bg-background"
            >
              <div className="px-5 py-3 flex flex-col">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm font-medium border-b border-border/50 last:border-0 [&.active]:text-leaf"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      <footer id="donate" className="relative mt-24 bg-ink text-white overflow-hidden">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-leaf/30 blob" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-amber-glow/20 blob" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full gradient-leaf flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div className="font-bold">TeamBD</div>
            </div>
            <p className="script text-amber-glow text-sm">… because Bangladesh First.</p>
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              A volunteer-powered movement for a greener, kinder, and more equitable Bangladesh.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-leaf hover:border-leaf transition-all">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-amber-glow">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Banani, Dhaka, Bangladesh</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> info@teambangladesh.org</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> +880 1911-480021</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
            <div className="script text-amber-glow text-sm">For causes that</div>
            <h3 className="text-white text-2xl font-bold mb-3">Really Matter</h3>
            <p className="text-white/60 text-sm mb-4">Join the newsletter — field updates & ways to help.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input type="email" required placeholder="your@email" className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm placeholder-white/40 outline-none focus:ring-2 focus:ring-leaf" />
              <button className="rounded-full gradient-warm px-4 py-2.5 text-sm font-semibold text-ink">Join</button>
            </form>
          </div>
        </div>
        <div className="relative border-t border-white/10 py-6 text-center text-xs text-white/50">
          © 2026 Team Bangladesh. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  stats,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-ink text-white">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-leaf-deep/70" />
      </div>
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-leaf/40 blob" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-amber-glow/30 blob" />

      <div className="relative mx-auto max-w-7xl px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="script text-amber-glow text-xl mb-3">{eyebrow}</div>
          <h1 className="text-5xl lg:text-7xl font-bold text-balance max-w-4xl text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">{subtitle}</p>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5">
                <div className="text-3xl font-bold shimmer-text">{s.value}</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* wave divider */}
      <svg className="absolute bottom-0 left-0 w-full h-16 text-background" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,32 C320,80 720,0 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
