"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const CC_HANDLE = "same_vigor_92";

type CFStat = {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solved: number;
  profileUrl: string;
};

type CCStat = {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  stars: number | null;
  solved: number | null;
  profileUrl: string;
};

type CPData = {
  cf1: CFStat | null;
  cf2: CFStat | null;
  cc: CCStat | null;
};

function getRankColor(rank: string): string {
  const r = rank.toLowerCase();
  if (r.includes("grandmaster")) return "text-red-400";
  if (r.includes("master")) return "text-orange-400";
  if (r.includes("candidate")) return "text-violet-400";
  if (r.includes("expert")) return "text-blue-400";
  if (r.includes("specialist")) return "text-cyan-400";
  if (r.includes("pupil")) return "text-green-400";
  return "text-zinc-500";
}

// Fully self-contained animated counter — starts only when both visible AND has real value
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const started = useRef(false);

  const runCounter = useCallback(() => {
    if (started.current || value <= 0) return;
    started.current = true;
    const duration = 1400;
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      // Ease out cubic
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setDisplay(Math.round(progress * value));
      if (frame >= totalFrames) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, 1000 / fps);
    return timer;
  }, [value]);

  useEffect(() => {
    if (!isInView || value <= 0) return;
    const timer = runCounter();
    return () => { if (timer) clearInterval(timer); };
  }, [isInView, value, runCounter]);

  return <span ref={ref}>{display}</span>;
}

// Skeleton card while loading
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-20 h-3 bg-white/10 rounded" />
        </div>
      </div>
      <div className="w-36 h-5 bg-white/10 rounded mb-2" />
      <div className="w-16 h-4 bg-white/10 rounded mb-6" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="w-10 h-6 bg-white/10 rounded mx-auto mb-1" />
            <div className="w-8 h-3 bg-white/5 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CFCard({ data, index }: { data: CFStat; index: number }) {
  return (
    <motion.a
      href={data.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] cursor-pointer"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Codeforces</span>
        </div>
        <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="font-mono text-lg font-bold text-white mb-1">@{data.handle}</p>
      <p className={`text-sm font-medium capitalize mb-6 ${getRankColor(data.rank)}`}>{data.rank}</p>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-xl font-bold text-white"><AnimatedNumber value={data.rating} /></p>
          <p className="text-xs text-white/40 mt-0.5">Rating</p>
        </div>
        <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-xl font-bold text-white"><AnimatedNumber value={data.maxRating} /></p>
          <p className="text-xs text-white/40 mt-0.5">Peak</p>
        </div>
        <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-xl font-bold text-white"><AnimatedNumber value={data.solved} /></p>
          <p className="text-xs text-white/40 mt-0.5">Solved</p>
        </div>
      </div>
    </motion.a>
  );
}

function CCCard({ data }: { data: CCStat }) {
  return (
    <motion.a
      href={data.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] cursor-pointer"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">CodeChef</span>
        </div>
        <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="font-mono text-lg font-bold text-white mb-1">@{data.handle}</p>
      <p className="text-sm text-white/30 mb-6 font-mono">
        {data.stars ? "★".repeat(data.stars) + "☆".repeat(Math.max(0, 7 - data.stars)) : "View Profile →"}
      </p>

      <div className={`grid gap-3 ${data.solved ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-xl font-bold text-white">
            {data.rating ? <AnimatedNumber value={data.rating} /> : "—"}
          </p>
          <p className="text-xs text-white/40 mt-0.5">Rating</p>
        </div>
        <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-xl font-bold text-white">
            {data.maxRating ? <AnimatedNumber value={data.maxRating} /> : "—"}
          </p>
          <p className="text-xs text-white/40 mt-0.5">Peak</p>
        </div>
        {data.solved && (
          <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
            <p className="text-xl font-bold text-white"><AnimatedNumber value={data.solved} /></p>
            <p className="text-xs text-white/40 mt-0.5">Solved</p>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function CPStats() {
  const [data, setData] = useState<CPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/cp-stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((d: CPData) => setData(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="cp" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] rounded-full blur-[150px] bg-yellow-900/10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] rounded-full blur-[150px] bg-orange-900/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Competitive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Programming</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Live stats fetched directly from my coding profiles — updates every time you visit.
          </p>
        </div>


        {/* Static Global Ranks Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { platform: "Codeforces", rank: "#4,320", context: "Round 1059 (Div. 3)", badge: "Pupil", rankColor: "text-green-400", badgeBg: "bg-green-500/10 border-green-500/20 text-green-400" },
            { platform: "Codeforces", rank: "#3,530", context: "Pinely Round 5",      badge: "Global", rankColor: "text-blue-400",  badgeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400"  },
            { platform: "CodeChef",   rank: "#471",   context: "Starters 209",         badge: "Global", rankColor: "text-orange-400", badgeBg: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 hover:bg-white/[0.05] transition-colors shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold tabular-nums ${a.rankColor}`}>{a.rank}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{a.platform}</p>
                  <p className="text-xs text-white/40">{a.context}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${a.badgeBg}`}>{a.badge}</span>
            </motion.div>
          ))}
        </div>

        {/* Live Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}


        {/* Error state */}
        {error && !loading && (
          <p className="text-center text-white/30 font-mono text-sm">Could not fetch stats. Check back later.</p>
        )}

        {/* Data loaded */}
        {!loading && !error && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.cf1 && <CFCard data={data.cf1} index={0} />}
            {data.cf2 && <CFCard data={data.cf2} index={1} />}
            {data.cc  && <CCCard data={data.cc} />}
          </div>
        )}
      </div>
    </section>
  );
}
