import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gem, Watch, CircleDot, ChevronLeft, ChevronRight, Diamond } from 'lucide-react';

const STATIC_CATEGORIES = [
  { name: 'Rings', icon: CircleDot },
  { name: 'Necklaces', icon: Diamond },
  { name: 'Earrings', icon: Gem },
  { name: 'Bracelets', icon: Watch },
  { name: 'Watches', icon: Watch },
  { name: 'Pendants', icon: Gem },
  { name: 'Bangles', icon: CircleDot },
  { name: 'Anklets', icon: Diamond },
];

const ICON_MAP = {
  rings: CircleDot,
  necklaces: Diamond,
  earrings: Gem,
  bracelets: Watch,
  watches: Watch,
  pendants: Gem,
  bangles: CircleDot,
  anklets: Diamond,
  all: Gem,
};

function getIcon(name) {
  const key = (name ?? '').toLowerCase().trim();
  for (const k of Object.keys(ICON_MAP)) {
    if (key.includes(k)) return ICON_MAP[k];
  }
  return Gem;
}

export default function JewelryCategoriesGrid({ categories, onSelectCategory, selectedCategory }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const rawList = (categories ?? []).length ? categories : STATIC_CATEGORIES;
  const list = rawList.map((c) => (typeof c === 'string' ? { name: c } : c));

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      ro.disconnect();
    };
  }, [list.length]);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative w-full" style={{ backgroundColor: '#fffcf7' }}>
      <div className="h-px w-full" style={{ backgroundColor: '#e8d9c0' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 sm:mb-10"
        >
          <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#b4915a' }}>
            Browse by Category
          </p>
          <h2 className="font-['Marcellus'] text-3xl sm:text-4xl font-normal" style={{ color: '#2c1a0e', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Discover Our Collections
          </h2>
        </motion.div>

        <div className="relative">
          {canScrollLeft && (
            <>
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-20 z-10"
                style={{ background: 'linear-gradient(to right, #fffcf7 0%, rgba(255,252,247,0) 100%)' }}
              />
              <button
                aria-label="Scroll left"
                onClick={() => scrollBy('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#fff', border: '1.5px solid #b4915a', color: '#b4915a', boxShadow: '0 2px 12px rgba(180,145,90,0.15)' }}
              >
                <ChevronLeft size={18} />
              </button>
            </>
          )}

          {canScrollRight && (
            <>
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-20 z-10"
                style={{ background: 'linear-gradient(to left, #fffcf7 0%, rgba(255,252,247,0) 100%)' }}
              />
              <button
                aria-label="Scroll right"
                onClick={() => scrollBy('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#fff', border: '1.5px solid #b4915a', color: '#b4915a', boxShadow: '0 2px 12px rgba(180,145,90,0.15)' }}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {list.map((cat, idx) => {
              const name = cat?.name ?? 'Category';
              const isSelected = selectedCategory === name;
              const Icon = cat?.icon ?? getIcon(name);

              return (
                <motion.button
                  key={`${name}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectCategory?.(name)}
                  className="flex-shrink-0 flex flex-col items-center gap-3 px-5 py-5 sm:px-6 sm:py-6 rounded-2xl transition-all duration-300"
                  style={{
                    scrollSnapAlign: 'start',
                    minWidth: '120px',
                    maxWidth: '160px',
                    backgroundColor: isSelected ? '#fff8ee' : '#fff',
                    border: isSelected ? '1.5px solid #b4915a' : '1.5px solid #e8d9c0',
                    boxShadow: isSelected ? '0 4px 20px rgba(180,145,90,0.18)' : '0 1px 6px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: isSelected ? 'rgba(180,145,90,0.15)' : 'rgba(180,145,90,0.07)' }}
                  >
                    <Icon
                      size={22}
                      style={{ color: isSelected ? '#b4915a' : '#8a6a40' }}
                      strokeWidth={1.6}
                    />
                  </div>
                  <span
                    className="font-['Jost'] text-sm font-medium text-center leading-tight"
                    style={{ color: isSelected ? '#b4915a' : '#6b4c2a', letterSpacing: '0.01em' }}
                  >
                    {name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ backgroundColor: '#e8d9c0' }} />
    </section>
  );
}
