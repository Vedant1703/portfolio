"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";


const SKILL_CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    color: "from-purple-500 to-fuchsia-500",
    borderColor: "border-purple-500/50",
    glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    dotColor: "bg-purple-400",
    skills: ["Go", "TypeScript", "JavaScript", "C++", "Python"],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/50",
    glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    dotColor: "bg-cyan-400",
    skills: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500/50",
    glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    dotColor: "bg-orange-400",
    skills: ["Node.js", "Express.js", "REST APIs", "WebSockets", "JWT", "Goroutines"],
  },
  {
    id: "databases",
    label: "Databases",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/50",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    dotColor: "bg-emerald-400",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "from-pink-500 to-rose-500",
    borderColor: "border-pink-500/50",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    dotColor: "bg-pink-400",
    skills: ["XGBoost", "Scikit-Learn", "Python ML Pipelines"],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    color: "from-yellow-500 to-lime-500",
    borderColor: "border-yellow-500/50",
    glowColor: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    dotColor: "bg-yellow-400",
    skills: ["Docker", "Git", "Linux", "Vercel", "Render", "Lua"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">

      {/* Subtle top-right ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-purple-900/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px] bg-cyan-900/20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600">
              Stack
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            The tools and technologies I work with to bring ideas to life.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`relative group rounded-2xl border-l-4 ${category.borderColor} bg-white/[0.03] border border-white/5 border-l-[4px] p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.06] ${hoveredCategory === category.id ? category.glowColor : ""}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${category.dotColor} shadow-[0_0_8px_currentColor]`} />
                <h3 className={`font-mono text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                  {category.label}
                </h3>
              </div>

              {/* Skills Pills */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={pillVariants}
                    className="px-3.5 py-1.5 text-sm font-medium text-white/70 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Hover shimmer effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
