import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Header({ cartCount = 0, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Collections", href: "#collections" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Our Story", href: "#our-story" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,252,247,0.97)" : "rgba(255,252,247,0.88)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          borderBottom: scrolled ? "1px solid rgba(180,145,90,0.25)" : "1px solid rgba(180,145,90,0.12)",
          boxShadow: scrolled ? "0 2px 24px rgba(150,110,60,0.08)" : "none",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 z-10" aria-label="Home">
          <span
            className="text-[22px] md:text-[26px] font-normal tracking-wide"
            style={{ fontFamily: "'Marcellus', serif", color: "#2c1a0e" }}
          >
            Demelo Jewels
          </span>
          <span
            className="hidden sm:inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#b4915a" }}
          />
        </a>

        {/* Center Nav — Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: "'Jost', sans-serif", color: "#6b4c2a" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#b4915a] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 z-10">
          <button
            aria-label="Open cart"
            onClick={onCartOpen}
            className="relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300"
            style={{
              borderColor: "rgba(180,145,90,0.35)",
              backgroundColor: "rgba(180,145,90,0.08)",
              color: "#6b4c2a",
            }}
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: "#b4915a", color: "#fff" }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300"
            style={{
              borderColor: "rgba(180,145,90,0.3)",
              backgroundColor: "rgba(180,145,90,0.07)",
              color: "#6b4c2a",
            }}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden relative overflow-hidden"
            style={{
              backgroundColor: "rgba(255,252,247,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(180,145,90,0.15)",
            }}
          >
            <nav className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05, duration: 0.25 }}
                  className="text-base font-medium py-3 transition-colors duration-200"
                  style={{ fontFamily: "'Jost', sans-serif", color: "#6b4c2a" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
