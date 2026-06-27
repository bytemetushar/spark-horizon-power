import React from "react";
import { motion } from "framer-motion";

const brandLinks = [
  { label: "Our Story", href: "#" },
  { label: "Craftsmanship", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Press", href: "#" },
];

const exploreLinks = [
  { label: "Collections", href: "#" },
  { label: "New Arrivals", href: "#" },
  { label: "Bespoke", href: "#" },
  { label: "Gift Guide", href: "#" },
];

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "Care Guide", href: "#" },
  { label: "FAQ", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative w-full" style={{ backgroundColor: "#2c1a0e" }}>
      <div className="h-[1px] w-full" style={{ backgroundColor: "#b4915a", opacity: 0.6 }} />

      <motion.div
        className="mx-auto max-w-[1280px] px-6 py-16 md:py-20 lg:px-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
          {/* Brand column */}
          <motion.div className="max-w-sm" variants={itemVariants}>
            <h3
              className="text-[22px] font-normal leading-tight tracking-[-0.02em]"
              style={{ fontFamily: "'Marcellus', serif", color: "#fff8ee" }}
            >
              DEMELO JEWELS
            </h3>
            <p
              className="mt-4 text-[15px] font-normal leading-relaxed"
              style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,248,238,0.65)" }}
            >
              Timeless jewelry, crafted with intention. Every piece is designed
              to be lived in, loved, and passed on.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {["instagram", "pinterest", "email"].map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200"
                  style={{ borderColor: "rgba(180,145,90,0.35)", color: "rgba(255,248,238,0.6)" }}
                >
                  {name === "instagram" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {name === "pinterest" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="8" x2="12" y2="21" />
                      <path d="M5 12.55a7 7 0 1 1 10.8 5.8" />
                      <path d="M8 21l4-9" />
                    </svg>
                  )}
                  {name === "email" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 md:gap-12">
            {[
              { title: "Brand", links: brandLinks },
              { title: "Explore", links: exploreLinks },
              { title: "Support", links: supportLinks },
            ].map(({ title, links }) => (
              <motion.div key={title} variants={itemVariants}>
                <h4
                  className="text-[12px] font-medium uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "#b4915a" }}
                >
                  {title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[14px] font-normal transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,248,238,0.55)" }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div className="my-12 h-[1px] w-full" style={{ backgroundColor: "rgba(180,145,90,0.2)" }} variants={itemVariants} />

        {/* Bottom band */}
        <motion.div
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          variants={itemVariants}
        >
          <p className="text-[13px] font-normal" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,248,238,0.35)" }}>
            © {new Date().getFullYear()} Demelo Jewels. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] font-normal transition-colors duration-200"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,248,238,0.35)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
