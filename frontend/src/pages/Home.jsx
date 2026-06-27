import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronRight, Star, Gem, ArrowRight } from "lucide-react";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import JewelryCategoriesGrid from "../components/JewelryCategoriesGrid";
import FeaturedCollectionGrid from "../components/FeaturedCollectionGrid";
import ProductDescriptionModal from "../components/ProductDescriptionModal";
import CartDrawer from "../components/CartDrawer";
import CheckoutSection from "../components/CheckoutSection";
import Footer from "../components/Footer";

import { apiGet, apiPost } from "../config/api";

import heroImg from "../assets/jewelry_showroom_dark_elegant.jpg";
import detailImg from "../assets/elegant_diamond_necklace_dark_background.jpg";
import scrollImg1 from "../assets/diamond_earrings_luxury_jewelry.jpg";
import scrollImg2 from "../assets/luxury_jewelry_gold_rings_diamonds.jpg";
import scrollImg3 from "../assets/luxury_gold_bracelet_jewelry.jpg";
import scrollImg4 from "../assets/gold_jewelry_collection_luxury.jpg";
import scrollImg5 from "../assets/luxury_watch_gold_jewelry.jpg";

const scrollProducts = [
  { id: 101, name: "Diamond Stud Earrings", price: 4200, image: scrollImg1, tag: "Bestseller" },
  { id: 102, name: "Gold Eternity Ring", price: 3800, image: scrollImg2, tag: "New" },
  { id: 103, name: "Gold Link Bracelet", price: 5600, image: scrollImg3, tag: "Limited" },
  { id: 104, name: "Heritage Gold Set", price: 8900, image: scrollImg4, tag: "Collection" },
  { id: 105, name: "Chronograph Luxe", price: 12400, image: scrollImg5, tag: "Exclusive" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const cartCount = cartItems.reduce((sum, i) => sum + (i.qty ?? 1), 0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const hScrollRef = useRef(null);
  const detailRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const hScrollInView = useInView(hScrollRef, { once: true, margin: "-80px" });
  const detailInView = useInView(detailRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  useEffect(() => {
    apiGet("/api/products")
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
    apiGet("/api/categories")
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => (p.category ?? p.categoryName) === selectedCategory)
    : products;

  const onAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const onRemoveItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const onUpdateQty = (id, qty) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const onCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const onPlaceOrder = async (payload) => {
    setOrderProcessing(true);
    try {
      const res = await apiPost("/api/order", payload);
      setOrderConfirmation(res);
      setCartItems([]);
    } catch (e) {
      setOrderConfirmation({ error: e.message });
    } finally {
      setOrderProcessing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffcf7", fontFamily: "'Jost', sans-serif" }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* HERO */}
      <div ref={heroRef} className="relative">
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>
          <HeroSection />
        </motion.div>
      </div>

      {/* H-SCROLL — Season's Highlights */}
      <section ref={hScrollRef} className="relative w-full" style={{ backgroundColor: "#fffcf7" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hScrollInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#b4915a" }}>
              Curated Picks
            </p>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              This Season&apos;s Highlights
            </h2>
          </motion.div>

          <div
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {scrollProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={hScrollInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex-shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ scrollSnapAlign: "start", width: "280px", minWidth: "280px", backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}
                onClick={() => setModalProduct(item)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block font-['Jost'] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: "#b4915a", color: "#fff" }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-['Marcellus'] text-lg mb-1" style={{ color: "#2c1a0e" }}>{item.name}</h3>
                  <p className="font-['Jost'] text-sm font-medium" style={{ color: "#b4915a" }}>
                    ${item.price.toLocaleString()}
                  </p>
                  <div className="mt-4 flex items-center gap-2 transition-colors duration-300" style={{ color: "#a08060" }}>
                    <span className="font-['Jost'] text-xs font-medium">View Details</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: "#e8d9c0" }} />
      </section>

      {/* DETAIL — 50/50 split */}
      <section ref={detailRef} className="relative w-full" style={{ backgroundColor: "#fff8ee" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={detailInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img src={detailImg} alt="Signature piece" className="w-full h-[420px] sm:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "rgba(180,145,90,0.4)", backgroundColor: "rgba(255,252,247,0.85)", backdropFilter: "blur(8px)" }}>
                  <Gem size={14} style={{ color: "#b4915a" }} />
                  <span className="font-['Jost'] text-xs font-medium" style={{ color: "#b4915a" }}>Signature Collection</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={detailInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <p className="font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#b4915a" }}>
                The Crown Jewel
              </p>
              <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl font-normal mb-6" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                The Celestine Necklace
              </h2>
              <p className="font-['Jost'] text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#6b4c2a" }}>
                Hand-set with 47 conflict-free diamonds on an 18K gold chain, the Celestine is the
                centerpiece of our Atelier collection. Each stone is selected for brilliance and
                clarity, then set by master artisans in our Milan workshop.
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { label: "Diamonds", value: "47" },
                  { label: "Gold Purity", value: "18K" },
                  { label: "Craft Time", value: "120h" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-['Marcellus'] text-2xl sm:text-3xl" style={{ color: "#b4915a" }}>{s.value}</p>
                    <p className="font-['Jost'] text-xs uppercase tracking-wider mt-1" style={{ color: "#a08060" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => onAddToCart({ id: 999, name: "The Celestine Necklace", price: 18500, image: detailImg })}
                  className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300"
                  style={{ backgroundColor: "#b4915a", color: "#fff" }}
                >
                  Add to Cart — $18,500
                  <ChevronRight size={16} strokeWidth={2.5} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => setModalProduct({ id: 999, name: "The Celestine Necklace", price: 18500, image: detailImg, description: "Hand-set with 47 conflict-free diamonds on an 18K gold chain." })}
                  className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm px-8 py-3.5 rounded-full border transition-all duration-300"
                  style={{ borderColor: "#e8d9c0", color: "#6b4c2a", backgroundColor: "transparent" }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: "#e8d9c0" }} />
      </section>

      {/* STATS */}
      <section ref={statsRef} className="relative w-full" style={{ backgroundColor: "#fffcf7" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: "1924", label: "Established" },
              { num: "12K+", label: "Pieces Crafted" },
              { num: "47", label: "Countries Shipped" },
              { num: "100%", label: "Conflict-Free" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="text-center"
              >
                <p className="font-['Marcellus'] text-4xl sm:text-5xl md:text-6xl mb-2" style={{ color: "#b4915a", lineHeight: 1.1 }}>
                  {stat.num}
                </p>
                <p className="font-['Jost'] text-sm uppercase tracking-wider" style={{ color: "#a08060" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: "#e8d9c0" }} />
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff8ee" }}>
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,248,238,0.95) 0%, rgba(255,245,225,0.88) 100%)" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star size={16} style={{ color: "#b4915a" }} fill="#b4915a" />
              <Star size={16} style={{ color: "#b4915a" }} fill="#b4915a" />
              <Star size={16} style={{ color: "#b4915a" }} fill="#b4915a" />
              <Star size={16} style={{ color: "#b4915a" }} fill="#b4915a" />
              <Star size={16} style={{ color: "#b4915a" }} fill="#b4915a" />
            </div>
            <h2 className="font-['Marcellus'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-6 max-w-3xl mx-auto" style={{ color: "#2c1a0e", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Begin Your Legacy
            </h2>
            <p className="font-['Jost'] text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#6b4c2a" }}>
              Every piece at Demelo Jewels is designed to be treasured for generations. Explore the
              collection and find the jewel that speaks to you.
            </p>
            <motion.a
              href="#collection"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-flex items-center justify-center gap-2 font-['Jost'] font-medium text-sm sm:text-base px-10 py-4 rounded-full transition-all duration-300"
              style={{ backgroundColor: "#b4915a", color: "#fff" }}
            >
              Shop the Collection
              <ChevronRight size={18} strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative" style={{ backgroundColor: "#fffcf7" }}>
        <JewelryCategoriesGrid
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
        />
      </section>

      {/* COLLECTION */}
      <section id="collection" className="relative" style={{ backgroundColor: "#fffcf7" }}>
        <FeaturedCollectionGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onShowProductModal={setModalProduct}
        />
      </section>

      {/* Checkout */}
      {checkoutOpen && (
        <CheckoutSection
          onPlaceOrder={onPlaceOrder}
          processing={orderProcessing}
          confirmation={orderConfirmation}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <CartDrawer
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
        onUpdateQty={onUpdateQty}
        onCheckout={onCheckout}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <ProductDescriptionModal
        product={modalProduct}
        onAddToCart={onAddToCart}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
