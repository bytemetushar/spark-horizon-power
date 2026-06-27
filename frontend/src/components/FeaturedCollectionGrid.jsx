import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, ChevronLeft, ChevronRight, Gem } from "lucide-react";

import diamondEarrings from "../assets/diamond_earrings_luxury_jewelry.jpg";
import diamondNecklace from "../assets/elegant_diamond_necklace_dark_background.jpg";
import goldCollection from "../assets/gold_jewelry_collection_luxury.jpg";
import goldBracelet from "../assets/luxury_gold_bracelet_jewelry.jpg";
import goldRings from "../assets/luxury_jewelry_gold_rings_diamonds.jpg";
import luxuryWatch from "../assets/luxury_watch_gold_jewelry.jpg";

const FALLBACK_IMAGES = [
  diamondEarrings,
  diamondNecklace,
  goldCollection,
  goldBracelet,
  goldRings,
  luxuryWatch,
];

const STATIC_PRODUCTS = [
  { id: 1, name: "Diamond Stud Earrings", category: "Earrings", price: 4200, image: diamondEarrings, badge: "Bestseller" },
  { id: 2, name: "Celestine Diamond Necklace", category: "Necklaces", price: 18500, image: diamondNecklace, badge: "Signature" },
  { id: 3, name: "Heritage Gold Set", category: "Collections", price: 8900, image: goldCollection, badge: "Collection" },
  { id: 4, name: "Gold Link Bracelet", category: "Bracelets", price: 5600, image: goldBracelet, badge: "Limited" },
  { id: 5, name: "Gold Eternity Ring", category: "Rings", price: 3800, image: goldRings, badge: "New" },
  { id: 6, name: "Chronograph Luxe", category: "Watches", price: 12400, image: luxuryWatch, badge: "Exclusive" },
];

function getImage(index) {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function formatPrice(value) {
  if (value == null) return "$0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num)) return "$0";
  return `$${num.toLocaleString()}`;
}

export default function FeaturedCollectionGrid({ products, onAddToCart, onShowProductModal }) {
  const scrollRef = useRef(null);

  const items = Array.isArray(products) && products.length > 0 ? products : STATIC_PRODUCTS;

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: "#fffcf7" }}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-2 inline-flex items-center gap-2 font-['Jost'] text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#b4915a" }}
            >
              <Gem className="h-3.5 w-3.5" />
              Curated Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Marcellus'] text-3xl font-normal sm:text-4xl md:text-5xl"
              style={{ color: "#2c1a0e" }}
            >
              Featured Collection
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:shadow-md active:scale-95"
              style={{ borderColor: "#e8d9c0", backgroundColor: "#fff", color: "#b4915a" }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:shadow-md active:scale-95"
              style={{ borderColor: "#e8d9c0", backgroundColor: "#fff", color: "#b4915a" }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {items.map((product, index) => {
              const id = product?.id ?? index;
              const name = product?.name ?? "Untitled Piece";
              const category = product?.category ?? "Jewelry";
              const price = product?.price ?? 0;
              const image = product?.image ?? getImage(index);
              const badge = product?.badge;

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative flex-shrink-0 snap-start"
                  style={{ width: "min(85vw, 320px)" }}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
                    style={{
                      border: "1px solid #e8d9c0",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {badge && (
                        <span
                          className="absolute left-3 top-3 rounded-full px-3 py-1 font-['Jost'] text-[11px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: "#b4915a", color: "#fff" }}
                        >
                          {badge}
                        </span>
                      )}

                      {/* Hover actions */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button
                          onClick={() => onShowProductModal?.(product)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-['Jost'] text-sm font-medium transition-all duration-300 active:scale-95"
                          style={{ backgroundColor: "rgba(255,252,247,0.92)", color: "#6b4c2a", backdropFilter: "blur(8px)" }}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => onAddToCart?.(product)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-['Jost'] text-sm font-semibold transition-all duration-300 hover:brightness-105 active:scale-95"
                          style={{ backgroundColor: "#b4915a", color: "#fff" }}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="mb-1 font-['Jost'] text-xs font-medium uppercase tracking-wider" style={{ color: "#b4915a" }}>
                        {category}
                      </p>
                      <h3 className="mb-2 font-['Marcellus'] text-lg font-normal leading-snug" style={{ color: "#2c1a0e" }}>
                        {name}
                      </h3>
                      <p className="font-['Jost'] text-base font-medium" style={{ color: "#6b4c2a" }}>
                        {formatPrice(price)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
