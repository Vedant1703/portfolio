"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Sentinel",
    tagline: "Distributed Rate Limiting System",
    description:
      "Architected a distributed rate-limiting system in Go capable of handling 50,000+ RPS per node with a 2ms p99 latency overhead.",
    bullets: [
      "Optimized high-concurrency request processing leveraging goroutines and atomic operations; implemented a thread-safe cleanup sweeper.",
      "Engineered HTTP middleware featuring longest-prefix route matching to secure nested subpaths.",
      "Integrated a path-labeled Prometheus exporter to track allowed and blocked requests globally with 1ms precision.",
    ],
    tech: ["Go (Golang)", "Redis", "REST APIs", "Goroutines", "Docker", "Prometheus"],
    link: "#",
    github: "https://github.com/Vedant1703/Sentinel",
    color: "from-cyan-500/20 to-blue-600/20",
    shadow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    border: "border-cyan-500/30",
    accentColor: "from-cyan-400 to-blue-500",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "BawarchiAI",
    tagline: "AI-Driven Food Waste Reduction",
    description:
      "End-to-end AI-powered platform for institutional kitchens that forecasts real food demand using historical and contextual data.",
    bullets: [
      "Architected a scalable microservices backend in Go (Gin) and a containerized FastAPI ML service.",
      "Engineered a hybrid forecasting algorithm blending 5-Fold CV XGBoost (97.9% R²) with historical baselines (350ms latency).",
      "Developed responsive Next.js dashboards featuring real-time canteen telemetry enabling seamless surplus redistribution.",
    ],
    tech: ["Next.js", "Go", "Supabase", "Python", "FastAPI", "XGBoost", "Docker"],
    link: "#",
    github: "https://github.com/Vedant1703/Bawarchi.AI",
    color: "from-emerald-500/20 to-green-600/20",
    shadow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    border: "border-emerald-500/30",
    accentColor: "from-emerald-400 to-green-500",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-emerald-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Opensource Compass",
    tagline: "AI Open Source Discovery",
    description:
      "Microservices-based platform with 5 Go services to rank GitHub repositories based on issue accessibility and maintainer responsiveness.",
    bullets: [
      "Designed an AI enrichment pipeline using Groq (Mixtral) and Gemini to generate contribution guides for first-time contributors.",
      "Built a concurrent real-time notification infrastructure using Go WebSockets and GitHub OAuth authentication.",
      "Led development during a FOSS event, onboarding 10+ contributors and maintaining workflows through issue triaging.",
    ],
    tech: ["Next.js 15", "TypeScript", "Go", "Supabase", "WebSockets", "Groq", "Docker"],
    link: "#",
    github: "https://github.com/Vedant1703/opensource-compass",
    color: "from-orange-500/20 to-red-600/20",
    shadow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
    border: "border-orange-500/30",
    accentColor: "from-orange-400 to-red-500",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-orange-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const currentProject = PROJECTS[currentIndex];

  return (
    <section id="projects" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">
      
      {/* Dynamic Background Glow matching current active project */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 bg-gradient-to-tr ${currentProject.color}`}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600">Work</span>
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-white/50 max-w-2xl mx-auto">
            A selection of impactful projects spanning distributed systems, AI/ML, and real-time applications. Swipe to explore.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[650px] sm:h-[620px] w-full flex items-center justify-center perspective-[2000px] mt-8">
          
          {PROJECTS.map((project, index) => {
            // Calculate relative position
            let diff = index - currentIndex;
            // Handle wrap-around for infinite feel (optional, but standard logic for short arrays)
            if (diff < -1) diff += PROJECTS.length;
            if (diff > 1) diff -= PROJECTS.length;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            // If it's not directly adjacent or center, it's hidden in the back
            const isHidden = !isCenter && !isLeft && !isRight;

            // Calculate animation states based on position
            let xItem = 0;
            let scaleItem = 1;
            let rotateYItem = 0;
            let zIndexItem = 30;
            let opacityItem = 1;

            if (isLeft) {
              xItem = -220; // Move left
              scaleItem = 0.85;
              rotateYItem = 25; // Tilt right
              zIndexItem = 20;
              opacityItem = 0.4;
            } else if (isRight) {
              xItem = 220; // Move right
              scaleItem = 0.85;
              rotateYItem = -25; // Tilt left
              zIndexItem = 20;
              opacityItem = 0.4;
            } else if (isHidden) {
              xItem = diff < 0 ? -400 : 400;
              scaleItem = 0.6;
              rotateYItem = diff < 0 ? 40 : -40;
              zIndexItem = 10;
              opacityItem = 0;
            }

            return (
              <motion.div
                key={project.id}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  x: xItem,
                  scale: scaleItem,
                  rotateY: rotateYItem,
                  zIndex: zIndexItem,
                  opacity: opacityItem,
                }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className={`absolute w-full max-w-4xl rounded-3xl border ${project.border} bg-black/40 backdrop-blur-xl flex flex-col md:flex-row overflow-hidden ${isCenter ? project.shadow : 'shadow-none'} ${isCenter ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Left visual panel */}
                <div className={`w-full md:w-2/5 h-48 md:h-auto md:self-stretch bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                  />
                  <div className={`absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/10 animate-[spin_8s_linear_infinite]`} />
                  <div className={`absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-white/5 animate-[spin_12s_linear_infinite_reverse]`} />

                  <motion.div
                    animate={isCenter ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.8, opacity: 0.8, rotate: -10 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 flex flex-col items-center gap-3 md:gap-4"
                  >
                    <div className={`p-4 md:p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                      {project.icon}
                    </div>
                    <span className={`font-mono text-[10px] md:text-xs tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${project.accentColor} uppercase text-center px-4 md:px-2 max-w-[200px] leading-relaxed`}>
                      {project.tagline}
                    </span>
                  </motion.div>
                </div>

                {/* Right content area */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-white/60 mb-5 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/50 leading-relaxed">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${project.accentColor}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mb-6 hidden sm:flex">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-[10px] sm:text-xs font-mono text-white/70 bg-white/5 rounded-full border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 sm:py-2.5 rounded-lg transition-colors border border-white/10">
                        View Demo
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/60 hover:text-white px-4 py-2 sm:py-2.5 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                      Source Code
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}

          {/* Navigation Controls (Dots) */}
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all backdrop-blur-sm"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div className="flex gap-2">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 cursor-pointer hover:bg-white/50'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all backdrop-blur-sm"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
