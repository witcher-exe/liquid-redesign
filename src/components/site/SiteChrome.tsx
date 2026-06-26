import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TreePine, Menu, X, Mail, Phone, MapPin,
  Facebook, Instagram, Twitter, Youtube, ChevronDown, ChevronRight,
} from "lucide-react";

/* ---------- nav data ---------- */
export type NavItem = { label: string; to?: string; href?: string; items?: NavItem[] };
type NavEntry = NavItem;

const NAV: NavEntry[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    items: [
      { label: "Our Mission And Vision", to: "/mission" },
      { label: "How We Work", href: "/#about" },
      { label: "Our Committees", to: "/committees" },
      { label: "Our Working Arenas", href: "/#areas" },
      { label: "Partners", href: "/#partners" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
  { label: "Campaigns", to: "/campaigns" },
  {
    label: "More",
    items: [
      {
        label: "Monthly Recognition",
        items: [
          { label: "Green Club / Society", href: "#" },
          { label: "Great Volunteer", href: "#" },
          { label: "Great Leader", href: "#" },
          { label: "Best District Committee", href: "#" },
          { label: "Best Thana Committee", href: "#" },
          { label: "Green School of this month", href: "#" },
          { label: "Green Lover of this month", href: "#" },
        ],
      },
      { label: "Events", to: "/events" },
      { label: "Campaigns", to: "/campaigns" },
      { label: "Our Committees", to: "/committees" },
      { label: "Photo Gallery", href: "#" },
      { label: "Video Gallery", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Join With Us (Volunteer)", href: "/#join" },
      { label: "Products", href: "#" },
      { label: "Donation", href: "/#join" },
    ],
  },
];

function NavLeaf({ it, className, onClick }: { it: NavItem; className: string; onClick?: () => void }) {
  if (it.to) return <Link to={it.to} className={className} onClick={onClick}>{it.label}</Link>;
  return <a href={it.href ?? "#"} className={className} onClick={onClick}>{it.label}</a>;
}

/* ---------- animated dropdown item ---------- */
function DropdownItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- shared navbar ---------- */
export function SiteNavbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // when not transparent (sub-pages), always treat as scrolled (glass light bar)
  const useGlassLight = scrolled || !transparentOnTop;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
          useGlassLight ? "glass" : "glass-dark"
        }`}>
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-leaf-glow to-leaf shadow-lg"
            >
              <TreePine className="h-5 w-5 text-white" />
            </motion.div>
            <span className={`font-extrabold text-lg tracking-tight ${useGlassLight ? "text-ink" : "text-white"}`}>
              TeamBD
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((m) => {
              const triggerClass = `relative flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                useGlassLight ? "text-ink hover:text-leaf" : "text-white/90 hover:text-white"
              }`;
              const isActive = activeMenu === m.label;

              const underline = (
                <motion.span
                  layoutId="nav-underline-hover"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-leaf to-ember"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              );

              if (!m.items) {
                return (
                  <div
                    key={m.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(m.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <NavLeaf it={m} className={triggerClass} />
                    {isActive && underline}
                  </div>
                );
              }
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(m.label)}
                  onMouseLeave={() => { setActiveMenu(null); setActiveSub(null); }}
                >
                  <button className={triggerClass}>
                    {m.label}
                    <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.span>
                    {isActive && underline}
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full pt-2 w-64"
                      >
                        <div className="glass-card rounded-2xl p-2 shadow-2xl ring-1 ring-leaf/10">
                          {m.items!.map((it, idx) => {
                            if (it.items) {
                              const subActive = activeSub === it.label;
                              return (
                                <div
                                  key={it.label}
                                  className="relative"
                                  onMouseEnter={() => setActiveSub(it.label)}
                                  onMouseLeave={() => setActiveSub(null)}
                                >
                                  <motion.button
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    whileHover={{ x: 4 }}
                                    className="group w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-ink rounded-xl hover:bg-leaf/10 hover:text-leaf-deep transition-colors"
                                  >
                                    <span>{it.label}</span>
                                    <motion.span animate={{ x: subActive ? 3 : 0 }}>
                                      <ChevronRight className="h-3.5 w-3.5" />
                                    </motion.span>
                                  </motion.button>
                                  <AnimatePresence>
                                    {subActive && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -10, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -10, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-full top-0 pl-2 w-64"
                                      >
                                        <div className="glass-card rounded-2xl p-2 shadow-2xl ring-1 ring-leaf/10">
                                          {it.items.map((sub, si) => (
                                            <motion.div
                                              key={sub.label}
                                              initial={{ opacity: 0, x: -6 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: si * 0.025 }}
                                              whileHover={{ x: 4 }}
                                            >
                                              <NavLeaf
                                                it={sub}
                                                className="block px-4 py-2.5 text-sm font-medium text-ink rounded-xl hover:bg-leaf/10 hover:text-leaf-deep transition-colors"
                                              />
                                            </motion.div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            }
                            return (
                              <motion.div
                                key={it.label}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ x: 4 }}
                              >
                                <NavLeaf
                                  it={it}
                                  className="block px-4 py-2.5 text-sm font-medium text-ink rounded-xl hover:bg-leaf/10 hover:text-leaf-deep transition-colors"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <motion.a
              href="/#join"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="ml-3 px-5 py-2.5 rounded-full bg-ember text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-ember/30 hover:shadow-ember/50"
            >
              Donate
            </motion.a>
          </nav>

          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${useGlassLight ? "text-ink" : "text-white"}`}>
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
                {NAV.map((m) => {
                  if (!m.items) {
                    return (
                      <NavLeaf
                        key={m.label}
                        it={m}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-3 text-sm font-bold uppercase tracking-wider text-ink rounded-lg hover:bg-leaf/10"
                      />
                    );
                  }
                  return (
                    <details key={m.label} className="group">
                      <summary className="flex items-center justify-between px-3 py-3 text-sm font-bold uppercase tracking-wider text-ink cursor-pointer rounded-lg hover:bg-leaf/10">
                        {m.label}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180 transition" />
                      </summary>
                      <div className="pl-4">
                        {m.items.map((it) => {
                          if (it.items) {
                            return (
                              <details key={it.label} className="group/sub">
                                <summary className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-ink cursor-pointer rounded-lg hover:bg-leaf/10">
                                  {it.label}
                                  <ChevronDown className="h-3.5 w-3.5 group-open/sub:rotate-180 transition" />
                                </summary>
                                <div className="pl-4">
                                  {it.items.map((sub) => (
                                    <NavLeaf key={sub.label} it={sub} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-leaf" />
                                  ))}
                                </div>
                              </details>
                            );
                          }
                          return (
                            <NavLeaf key={it.label} it={it} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-leaf" />
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
                <a href="/#join" className="block mt-2 px-5 py-3 text-center rounded-full bg-ember text-white font-bold uppercase tracking-wider">Donate</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------- shared footer ---------- */
export function SiteFooter() {
  return (
    <footer id="donate" className="relative mt-24 bg-ink text-white overflow-hidden">
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-ember/20 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-2">
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
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-leaf hover:border-leaf transition-colors"
              >
                <I className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {[
              { label: "About Us", href: "/#about" },
              { label: "Our Activities", href: "/#areas" },
              { label: "Organization Policies", href: "#" },
              { label: "Donation", href: "/#join" },
            ].map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-ember transition story-link">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Help</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {[
              { label: "FAQ", href: "#" },
              { label: "Support", href: "#" },
              { label: "Contact Us", href: "/#contact" },
            ].map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-ember transition story-link">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contact Info</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Bangladesh</li>
            <li className="flex gap-2 break-all"><Mail className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> Contact.TeamBangladesh@gmail.com</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-leaf shrink-0 mt-0.5" /> +880 1911-480021</li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
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
        <div className="mx-auto max-w-[1600px] px-10 lg:px-16 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/50">
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
