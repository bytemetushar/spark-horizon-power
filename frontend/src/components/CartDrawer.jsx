import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ cartItems, onRemoveItem, onUpdateQty, onCheckout, open, onClose }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape' && open) onClose(); }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const items = cartItems ?? [];
  const subtotal = items.reduce((sum, item) => sum + (item?.price ?? 0) * (item?.qty ?? item?.quantity ?? 1), 0);
  const itemCount = items.reduce((sum, item) => sum + (item?.qty ?? item?.quantity ?? 1), 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(44,26,14,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col"
            style={{
              backgroundColor: "#fffcf7",
              borderLeft: "1px solid #e8d9c0",
              boxShadow: "-8px 0 48px rgba(44,26,14,0.12)",
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-10 pb-6 border-b" style={{ borderColor: "#e8d9c0" }}>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" style={{ color: "#b4915a" }} />
                <h2 className="font-['Marcellus'] text-2xl font-normal tracking-wide" style={{ color: "#2c1a0e" }}>
                  Your Cart
                </h2>
                <span
                  className="ml-2 px-3 py-0.5 rounded-full font-['Jost'] text-xs font-medium tracking-wider"
                  style={{ backgroundColor: "rgba(180,145,90,0.12)", color: "#b4915a" }}
                >
                  {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full transition-colors duration-200"
                style={{ backgroundColor: "#f0e8d8", color: "#6b4c2a" }}
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(180,145,90,0.08)" }}>
                    <ShoppingBag className="w-10 h-10" style={{ color: "rgba(180,145,90,0.4)" }} />
                  </div>
                  <p className="font-['Jost'] text-base" style={{ color: "#a08060" }}>Your cart is empty</p>
                  <p className="font-['Jost'] text-sm" style={{ color: "#c0a080" }}>Discover our exquisite jewelry collection</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-8 py-3 rounded-full font-['Jost'] font-medium text-sm transition-all duration-300 hover:brightness-105 active:scale-95"
                    style={{ backgroundColor: "#b4915a", color: "#fff" }}
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={item?.id ?? index}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      className="flex gap-4 p-4 rounded-2xl border transition-colors duration-300"
                      style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0" }}
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ backgroundColor: "#f5ede0" }}>
                        {item?.image ? (
                          <img src={item.image} alt={item?.name ?? 'Product'} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8" style={{ color: "rgba(180,145,90,0.3)" }} />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="font-['Marcellus'] text-base truncate" style={{ color: "#2c1a0e" }}>
                            {item?.name ?? 'Unnamed Item'}
                          </h3>
                          {item?.variant && (
                            <p className="font-['Jost'] text-xs mt-0.5" style={{ color: "#a08060" }}>{item.variant}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQty?.(item?.id, Math.max(1, (item?.qty ?? 1) - 1))}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                              style={{ backgroundColor: "#f0e8d8", color: "#6b4c2a" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-['Jost'] text-sm font-medium w-6 text-center" style={{ color: "#2c1a0e" }}>
                              {item?.qty ?? 1}
                            </span>
                            <button
                              onClick={() => onUpdateQty?.(item?.id, (item?.qty ?? 1) + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                              style={{ backgroundColor: "#f0e8d8", color: "#6b4c2a" }}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex items-center gap-3">
                            <span className="font-['Jost'] text-sm font-semibold" style={{ color: "#b4915a" }}>
                              ${((item?.price ?? 0) * (item?.qty ?? 1)).toLocaleString()}
                            </span>
                            <button
                              onClick={() => onRemoveItem?.(item?.id)}
                              className="p-1.5 rounded-full transition-colors duration-200 group"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4 transition-colors duration-200" style={{ color: "#c0a080" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="px-8 pt-6 pb-10 border-t space-y-6"
                style={{ borderColor: "#e8d9c0" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between font-['Jost'] text-sm" style={{ color: "#a08060" }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-['Jost'] text-sm">
                    <span style={{ color: "#a08060" }}>Shipping</span>
                    <span style={{ color: "#b4915a" }}>Complimentary</span>
                  </div>
                  <div className="h-px" style={{ backgroundColor: "#e8d9c0" }} />
                  <div className="flex justify-between font-['Jost'] text-base font-semibold">
                    <span style={{ color: "#2c1a0e" }}>Total</span>
                    <span style={{ color: "#b4915a" }}>${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4 rounded-full font-['Jost'] font-semibold text-base transition-all duration-300 hover:brightness-105 active:scale-95"
                  style={{ backgroundColor: "#b4915a", color: "#fff", boxShadow: "0 4px 20px rgba(180,145,90,0.25)" }}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full font-['Jost'] font-medium text-sm border transition-all duration-300"
                  style={{ borderColor: "#e8d9c0", color: "#6b4c2a", backgroundColor: "transparent" }}
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
