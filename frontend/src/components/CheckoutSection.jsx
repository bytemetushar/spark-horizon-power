import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Truck, ShieldCheck, ChevronRight, Loader2 } from "lucide-react";

export default function CheckoutSection({ onPlaceOrder, processing, confirmation }) {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "",
    city: "", zip: "", country: "",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateShipping = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Invalid email";
    if (!form.phone.trim()) next.phone = "Phone is required";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city.trim()) next.city = "City is required";
    if (!form.zip.trim()) next.zip = "ZIP code is required";
    if (!form.country.trim()) next.country = "Country is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    const next = {};
    if (!form.cardNumber.trim()) next.cardNumber = "Card number is required";
    if (!form.expiry.trim()) next.expiry = "Expiry date is required";
    if (!form.cvv.trim()) next.cvv = "CVV is required";
    if (!form.cardName.trim()) next.cardName = "Name on card is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => { if (step === 1 && validateShipping()) setStep(2); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2 && validatePayment()) onPlaceOrder?.(form);
  };

  const inputBase = "w-full border rounded-[14px] px-4 py-3 placeholder-[#c0a080] outline-none transition-all duration-200 font-['Jost'] text-[15px]";
  const inputStyle = { backgroundColor: "#fff", borderColor: "#e8d9c0", color: "#2c1a0e" };
  const inputFocusStyle = "focus:border-[#b4915a] focus:shadow-[0_0_0_2px_rgba(180,145,90,0.15)]";
  const labelBase = "block mb-1.5 text-[13px] font-medium tracking-wide font-['Jost']";

  if (confirmation) {
    return (
      <div className="w-full py-16 px-4" style={{ backgroundColor: "#fffcf7" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl mx-auto rounded-3xl p-10 text-center"
          style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 8px 40px rgba(44,26,14,0.08)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(180,145,90,0.12)" }}
          >
            <Check className="h-10 w-10" style={{ color: "#b4915a" }} strokeWidth={2.5} />
          </motion.div>
          <h2 className="font-['Marcellus'] text-[28px] mb-3" style={{ color: "#2c1a0e" }}>Order Confirmed</h2>
          <p className="font-['Jost'] text-[15px] leading-relaxed" style={{ color: "#6b4c2a" }}>
            Thank you for your purchase. A confirmation email has been sent to{" "}
            <span style={{ color: "#2c1a0e", fontWeight: 600 }}>{confirmation.email ?? form.email}</span>.
          </p>
          <div className="mt-8 rounded-2xl p-5 text-left" style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0" }}>
            <div className="flex items-center justify-between text-[14px]">
              <span className="font-['Jost']" style={{ color: "#a08060" }}>Order ID</span>
              <span className="font-medium font-['Jost']" style={{ color: "#2c1a0e" }}>{confirmation.orderId ?? "#DMJ-2024-001"}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[14px]">
              <span className="font-['Jost']" style={{ color: "#a08060" }}>Estimated Delivery</span>
              <span className="font-medium font-['Jost']" style={{ color: "#2c1a0e" }}>{confirmation.delivery ?? "3–5 Business Days"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4" style={{ backgroundColor: "#fffcf7" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <StepDot n={1} active={step >= 1} label="Shipping" />
          <div className="h-px w-10" style={{ backgroundColor: "#e8d9c0" }} />
          <StepDot n={2} active={step >= 2} label="Payment" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl p-6 sm:p-10"
          style={{ backgroundColor: "#fff", border: "1px solid #e8d9c0", boxShadow: "0 8px 40px rgba(44,26,14,0.06)" }}
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <div className="mb-6 flex items-center gap-3">
                  <Truck className="h-5 w-5" style={{ color: "#b4915a" }} />
                  <h3 className="font-['Marcellus'] text-[22px] font-normal" style={{ color: "#2c1a0e" }}>Shipping Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Jane Doe" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@example.com" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+1 (555) 000-0000" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Country" name="country" value={form.country} onChange={handleChange} error={errors.country} placeholder="United States" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="123 Luxury Lane" className="sm:col-span-2" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="New York" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="ZIP / Postal Code" name="zip" value={form.zip} onChange={handleChange} error={errors.zip} placeholder="10001" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                </div>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full rounded-[24px] px-8 py-4 text-[16px] font-semibold transition-all duration-300 hover:brightness-105 active:scale-95 font-['Jost'] flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#b4915a", color: "#fff" }}
                >
                  Continue to Payment
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="mb-6 flex items-center gap-3">
                  <CreditCard className="h-5 w-5" style={{ color: "#b4915a" }} />
                  <h3 className="font-['Marcellus'] text-[22px] font-normal" style={{ color: "#2c1a0e" }}>Payment</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name on Card" name="cardName" value={form.cardName} onChange={handleChange} error={errors.cardName} placeholder="Jane Doe" className="sm:col-span-2" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Card Number" name="cardNumber" value={form.cardNumber} onChange={handleChange} error={errors.cardNumber} placeholder="0000 0000 0000 0000" className="sm:col-span-2" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="Expiry (MM/YY)" name="expiry" value={form.expiry} onChange={handleChange} error={errors.expiry} placeholder="12/26" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                  <Field label="CVV" name="cvv" value={form.cvv} onChange={handleChange} error={errors.cvv} placeholder="123" inputBase={`${inputBase} ${inputFocusStyle}`} inputStyle={inputStyle} labelBase={labelBase} />
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-[14px] px-4 py-3" style={{ backgroundColor: "#fff8ee", border: "1px solid #e8d9c0" }}>
                  <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "#b4915a" }} />
                  <span className="text-[13px] font-['Jost']" style={{ color: "#6b4c2a" }}>
                    Your payment information is encrypted and secure.
                  </span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:flex-1 rounded-[24px] border px-8 py-4 text-[16px] font-medium transition-all duration-300 font-['Jost']"
                    style={{ borderColor: "#e8d9c0", backgroundColor: "transparent", color: "#6b4c2a" }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={processing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:flex-[2] rounded-[24px] px-8 py-4 text-[16px] font-semibold transition-all duration-300 hover:brightness-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed font-['Jost'] flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#b4915a", color: "#fff" }}
                  >
                    {processing ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                    ) : "Place Order"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}

function StepDot({ n, active, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-colors duration-300 font-['Jost']"
        style={active ? { backgroundColor: "#b4915a", color: "#fff" } : { backgroundColor: "#f0e8d8", color: "#a08060", border: "1px solid #e8d9c0" }}
      >
        {n}
      </div>
      <span
        className="text-[11px] font-medium tracking-wide font-['Jost']"
        style={{ color: active ? "#b4915a" : "#a08060" }}
      >
        {label}
      </span>
    </div>
  );
}

function Field({ label, name, value, onChange, error, placeholder, className = "", inputBase, inputStyle, labelBase }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelBase} style={{ color: "#6b4c2a" }}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputBase} ${error ? "border-red-400" : ""}`}
        style={inputStyle}
        autoComplete="off"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-[12px] text-red-500 font-['Jost']"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
