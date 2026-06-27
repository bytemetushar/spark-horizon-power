import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroImg from '../assets/jewelry_showroom_dark_elegant.jpg';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '88vh' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury jewelry showroom"
          className="w-full h-full object-cover"
        />
        {/* Light warm overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,248,235,0.88) 0%, rgba(255,245,225,0.70) 50%, rgba(255,240,210,0.82) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto"
        style={{ minHeight: '88vh' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-['Jost'] text-xs sm:text-sm uppercase tracking-[0.2em] mb-5"
            style={{ color: '#b4915a' }}
          >
            Handcrafted Since 1924
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-['Marcellus'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
            style={{ color: '#2c1a0e' }}
          >
            Timeless Elegance,
            <br />
            <span style={{ color: '#b4915a' }}>Modern Luxury</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-['Jost'] text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            style={{ color: '#6b4c2a' }}
          >
            Discover our curated collection of fine jewelry — where master
            craftsmanship meets contemporary design. Each piece tells a story.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: '#b4915a', color: '#fff' }}
            >
              Explore Collection
              <ChevronRight size={18} strokeWidth={2.5} />
            </motion.a>

            <motion.a
              href="#categories"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm sm:text-base px-8 py-3.5 rounded-full border transition-all duration-300"
              style={{
                borderColor: '#b4915a',
                color: '#b4915a',
                backgroundColor: 'rgba(180,145,90,0.08)',
              }}
            >
              Shop by Category
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gold line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #b4915a 20%, #b4915a 80%, transparent 100%)',
        }}
      />
    </section>
  );
}
