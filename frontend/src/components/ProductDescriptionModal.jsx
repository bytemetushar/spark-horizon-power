import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Gem, ShieldCheck, Truck } from "lucide-react";

export default function ProductDescriptionModal({ product, onAddToCart, onClose }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, product]);

  if (!product) return null;

  const safeProduct = product ?? {};
  const image = safeProduct.image ?? null;
  const title = safeProduct.title ?? safeProduct.name ?? "Luxury Jewelry Piece";
  const price = safeProduct.price ?? null;
  const description =
    safeProduct.description ??
    "A meticulously crafted piece that embodies timeless elegance. Designed for those who appreciate the finer details in life, each element is hand-selected and set by master artisans.";
  const rating = safeProduct.rating ?? 4.9;
  const reviews = safeProduct.reviews ?? 12;
  const material = safeProduct.material ?? "18K Gold & Diamonds";
  const inStock = safeProduct.inStock ?? true;

  const handleAdd = () => {
    if (onAddToCart && product) onAddToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(44,26,14,0.55)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Card */}
        <motion.div
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl"
          style={{ backgroundColor: "#fffcf7", border: "1px solid #e8d9c0", boxShadow: "0 24px 64px rgba(44,26,14,0.18)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
            style={{ backgroundColor: "#f0e8d8", color: "#6b4c2a" }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-1/2 h-72 md:h-auto" style={{ backgroundColor: "#f5ede0" }}>
              {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Gem className="w-16 h-16" style={{ color: "rgba(180,145,90,0.3)" }} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-sm font-['Jost'] font-medium" style={{ color: "#b4915a" }}>
                  <Star className="w-4 h-4 fill-[#b4915a]" style={{ color: "#b4915a" }} />
                  {typeof rating === "number" ? rating.toFixed(1) : rating}
                </span>
                <span className="text-sm font-['Jost']" style={{ color: "#a08060" }}>
                  ({typeof reviews === "number" ? reviews : 0} reviews)
                </span>
              </div>

              <h2 className="font-['Marcellus'] text-2xl md:text-3xl leading-tight mb-2" style={{ color: "#2c1a0e" }}>
                {title}
              </h2>

              <p className="font-['Jost'] text-xl md:text-2xl font-medium mb-4" style={{ color: "#b4915a" }}>
                {price != null ? `$${Number(price).toLocaleString()}` : "Price on request"}
              </p>

              <p className="font-['Jost'] text-sm md:text-base leading-relaxed mb-6" style={{ color: "#6b4c2a" }}>
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {[
                  { icon: Gem, label: material },
                  { icon: ShieldCheck, label: "Authenticity Certified" },
                  { icon: Truck, label: "Complimentary Shipping" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-['Jost'] text-xs font-medium"
                    style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0", color: "#6b4c2a" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: "#b4915a" }} />
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  disabled={!inStock}
                  className="inline-flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-3xl font-['Jost'] font-semibold text-base transition-all duration-300"
                  style={
                    inStock
                      ? { backgroundColor: "#b4915a", color: "#fff" }
                      : { backgroundColor: "#e8d9c0", color: "#a08060", cursor: "not-allowed" }
                  }
                >
                  <ShoppingBag className="w-5 h-5" />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-3xl font-['Jost'] font-semibold text-base border transition-all duration-300"
                  style={{ borderColor: "#e8d9c0", color: "#6b4c2a", backgroundColor: "transparent" }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
