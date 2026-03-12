"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FocusedField = keyof FormState | null;

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<FocusedField>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ⚡ Replace YOUR_FORMSPREE_ID with your form ID from https://formspree.io
      // e.g. "https://formspree.io/f/xyzabcde"
      const res = await fetch("https://formspree.io/f/mwvrvqez", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (field: FocusedField) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-white/30 outline-none transition-all duration-300 text-sm
    ${focused === field
      ? "border-cyan-500/80 shadow-[0_0_0_1px_rgba(6,182,212,0.5),0_0_20px_rgba(6,182,212,0.15)]"
      : "border-white/10 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[160px] bg-cyan-900/20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full blur-[140px] bg-purple-900/20 pointer-events-none" />

      <div className="relative mx-auto max-w-2xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-cyan-500/30 rounded-br-sm" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-white/50">Thanks for reaching out — I'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  className={getInputClass("name")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  className={getInputClass("email")}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project or idea..."
                  className={`${getInputClass("message")} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full h-12 rounded-xl font-semibold text-sm text-black bg-white hover:bg-white/90 transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {/* shimmer on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Footer quick links */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <a href="https://github.com/Vedant1703" target="_blank" rel="noopener noreferrer"
                   className="text-white/30 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                <span className="text-white/10">|</span>
                <a href="https://www.linkedin.com/in/vedant-kulkarni-8b30ba327/" target="_blank" rel="noopener noreferrer"
                   className="text-white/30 hover:text-blue-400 transition-colors text-xs font-mono flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
