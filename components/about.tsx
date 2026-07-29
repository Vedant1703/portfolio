"use client";

import React from "react";
import { motion } from "framer-motion";

const PHOTO_URL = "/Vedant.png";

const highlights = [
  { icon: "🏛️", label: "Institution", value: "IIIT Lucknow" },
  { icon: "📚", label: "Degree",      value: "BTech CS & Business" },
  { icon: "✨", label: "CGPA",        value: "8.62 / 10" },
  { icon: "📅", label: "Batch",       value: "2024 – 2028" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

const techStack = [
  {
    category: "Languages",
    icon: "🧠",
    color: "purple",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    hoverBorder: "hover:border-purple-500/40",
    labelColor: "text-purple-400",
    tagBg: "bg-purple-500/10 border-purple-500/20",
    items: ["Go", "TypeScript", "JavaScript", "C++", "Python"],
    span: "col-span-2",
  },
  {
    category: "Frontend",
    icon: "🎨",
    color: "cyan",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    hoverBorder: "hover:border-cyan-500/40",
    labelColor: "text-cyan-400",
    tagBg: "bg-cyan-500/10 border-cyan-500/20",
    items: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui"],
    span: "col-span-2 sm:col-span-1",
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "orange",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    hoverBorder: "hover:border-orange-500/40",
    labelColor: "text-orange-400",
    tagBg: "bg-orange-500/10 border-orange-500/20",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "JWT", "Goroutines"],
    span: "col-span-2 sm:col-span-1",
  },
  {
    category: "Databases",
    icon: "🗄️",
    color: "emerald",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    hoverBorder: "hover:border-emerald-500/40",
    labelColor: "text-emerald-400",
    tagBg: "bg-emerald-500/10 border-emerald-500/20",
    items: ["PostgreSQL", "MongoDB", "Redis"],
    span: "col-span-2 sm:col-span-1 lg:col-span-2",
  },
  {
    category: "AI / ML",
    icon: "🤖",
    color: "pink",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5",
    hoverBorder: "hover:border-pink-500/40",
    labelColor: "text-pink-400",
    tagBg: "bg-pink-500/10 border-pink-500/20",
    items: ["XGBoost", "Scikit-Learn", "Python ML Pipelines"],
    span: "col-span-2 sm:col-span-1 lg:col-span-2",
  },
  {
    category: "DevOps & Tools",
    icon: "🚀",
    color: "yellow",
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/5",
    hoverBorder: "hover:border-yellow-500/40",
    labelColor: "text-yellow-400",
    tagBg: "bg-yellow-500/10 border-yellow-500/20",
    items: ["Docker", "Git", "Linux", "Vercel", "Render", "Lua"],
    span: "col-span-2",
  },
];

const cpAchievements = [
  { platform: "Codeforces", rank: "#2,001", context: "Round 1107 (Div. 3)", badge: "Pupil", rankColor: "text-green-400", badgeBg: "bg-green-500/10 border-green-500/20 text-green-400" },
  { platform: "Codeforces", rank: "#3,530", context: "Pinely Round 5",      badge: "Global", rankColor: "text-blue-400",  badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400"  },
  { platform: "CodeChef",   rank: "#471",   context: "Starters 209",         badge: "Global", rankColor: "text-orange-400", badgeBg: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
];

const por = [
  {
    role: "Web Wing Member",
    org: "Axios Tech Club",
    period: "Sept 2025 – Present",
    desc: "Building and maintaining web projects for the technical club. Guiding juniors and collaborating on production-grade apps representing IIIT Lucknow.",
    dot: "bg-cyan-400",
    accent: "text-cyan-400",
  },
  {
    role: "Member",
    org: "Seraphim Social Awareness Club",
    period: "Sept 2024 – Present",
    desc: "Driving social awareness campaigns and community outreach programs across campus.",
    dot: "bg-purple-400",
    accent: "text-purple-400",
  },
  {
    role: "Member",
    org: "Zephyr Dance Society",
    period: "Sept 2024 – Present",
    desc: "Organizing and managing college cultural events, and guiding volunteers for performances.",
    dot: "bg-pink-400",
    accent: "text-pink-400",
  },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[160px] bg-purple-900/10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-[140px] bg-cyan-900/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 space-y-24">

        {/* ── Hero row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-4">About Me</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Engineer. Thinker.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Digital Creator.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-white/60">
              <p>
                I&apos;m a <span className="text-white font-medium">3rd-year BTech student</span> in Computer Science &amp; Business at{" "}
                <span className="text-cyan-400 font-medium">IIIT Lucknow</span>, with a CGPA of{" "}
                <span className="text-white font-medium">8.62</span>.
              </p>
              <p>
                I am deeply passionate about architecting scalable systems and AI-driven platforms. My work ranges from building distributed rate limiters and high-concurrency microservices in <span className="text-white font-medium">Go</span>, to engineering full-stack machine learning applications.
              </p>
              <p>
                Outside of development, I am an active competitive programmer and a two-time hackathon winner (DevMatrix &amp; Reckon 7.0). I also contribute to the{" "}
                <span className="text-white font-medium">Axios Tech Club&apos;s Web Wing</span>, and
                occasionally dance with Zephyr.
              </p>
            </div>

            {/* Stat chips */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-xl">{h.icon}</span>
                  <div>
                    <p className="text-xs text-white/40 font-mono uppercase tracking-wider">{h.label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{h.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume download */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/Vedant_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
              <a
                href="mailto:vedantkulkarni1703@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all duration-200"
              >
                Hire Me →
              </a>
            </div>
          </motion.div>

          {/* Right: photo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glowing aura */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 opacity-20 blur-xl group-hover:opacity-50 transition duration-700" />

              {/* Card */}
              <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden w-72 sm:w-80">
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTO_URL}
                  alt="Vedant Kulkarni"
                  className="w-full aspect-square object-cover object-top"
                />

                {/* Name plate */}
                <div className="p-5 border-t border-white/10">
                  <p className="font-bold text-white text-lg">Vedant Kulkarni</p>
                  <p className="text-sm text-cyan-400 font-mono mt-0.5">Full-Stack Developer</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-xs text-white/40 font-mono">Available for opportunities</span>
                  </div>
                  {/* Social links */}
                  <div className="flex gap-3 mt-4">
                    <a href="https://github.com/Vedant1703" target="_blank" rel="noopener noreferrer"
                       className="text-white/40 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/vedant-kulkarni-8b30ba327/" target="_blank" rel="noopener noreferrer"
                       className="text-white/40 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-sm" />
                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-purple-500/50 rounded-tr-sm" />
                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-sm" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-500/50 rounded-br-sm" />
              </div>
            </div>
          </motion.div>
        </div>


        {/* ── Positions of Responsibility ── */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-7 lg:p-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Positions of Responsibility</h3>
                  <p className="text-sm text-cyan-400/80 font-mono mt-1">IIIT Lucknow · 2024 – Present</p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {por.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
                >
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-white/5 border border-white/10 ${c.accent}`}>
                      {c.period}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-1">{c.role}</h4>
                    <p className={`text-sm font-semibold ${c.accent}`}>{c.org}</p>
                  </div>
                  
                  <p className="text-sm text-white/60 leading-relaxed mt-auto">
                    {c.desc}
                  </p>
                  
                  {/* Subtle hover glow matching the dot color */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-transparent to-white`} />
                  <div className={`absolute top-0 right-6 w-20 h-1 rounded-b-full opacity-50 ${c.dot}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
