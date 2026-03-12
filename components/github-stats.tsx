"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const GH_USER = "Vedant1703";
const GH_URL  = `https://github.com/${GH_USER}`;

// Language → neon colour
const LANG_COLORS: Record<string, string> = {
  TypeScript:  "#3178c6",
  JavaScript:  "#f7df1e",
  Python:      "#3572A5",
  "C++":       "#f34b7d",
  C:           "#555",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
  Go:          "#00ADD8",
  Rust:        "#dea584",
  Java:        "#b07219",
};

// Event icon + label
function eventMeta(type: string) {
  switch (type) {
    case "PushEvent":        return { icon: "↑", label: "Pushed to" };
    case "PullRequestEvent": return { icon: "⤵", label: "PR on" };
    case "CreateEvent":      return { icon: "+", label: "Created" };
    case "IssuesEvent":      return { icon: "!", label: "Issue on" };
    default:                 return { icon: "·", label: "Activity on" };
  }
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const d = Math.floor(h / 24);
  if (d > 0)  return `${d}d ago`;
  if (h > 0)  return `${h}h ago`;
  return "just now";
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const started = useRef(false);

  const run = useCallback(() => {
    if (started.current || value <= 0) return;
    started.current = true;
    const total = 60;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(p * value));
      if (frame >= total) { setDisplay(value); clearInterval(id); }
    }, 1200 / total);
    return id;
  }, [value]);

  useEffect(() => {
    if (!isInView || value <= 0) return;
    const id = run();
    return () => { if (id) clearInterval(id); };
  }, [isInView, value, run]);

  return <span ref={ref}>{display}</span>;
}

type GHData = {
  username: string;
  name: string;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  ownRepos: number;
  totalStars: number;
  totalForks: number;
  yearsOnGH: number;
  topLanguages: { lang: string; count: number }[];
  recentCommits: number;
  recentPRs: number;
  recentActivity: { type: string; repo: string; time: string }[];
  profileUrl: string;
};

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center bg-white/5 rounded-xl p-4 border border-white/5">
      <p className="text-2xl font-bold text-white tabular-nums"><AnimatedNumber value={value} /></p>
      <p className="text-xs text-white/40 mt-1 text-center leading-tight">{label}</p>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />;
}

export default function GitHubStats() {
  const [data, setData] = useState<GHData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-stats")
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="relative w-full bg-[#030303] py-24 sm:py-32 xl:py-40 border-t border-white/5 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] rounded-full blur-[160px] bg-emerald-900/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] rounded-full blur-[140px] bg-violet-900/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            GitHub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Activity</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Live stats pulled from my GitHub profile — every push, PR, and repo counts.
          </p>
        </div>

        {loading ? (
          /* ── Skeleton ── */
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        ) : !data ? (
          <p className="text-center text-white/30 font-mono text-sm">Could not load GitHub stats.</p>
        ) : (
          <div className="space-y-6">

            {/* ── Row 1: Key numbers ── */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <StatBox label="Public Repos"    value={data.publicRepos}   />
              <StatBox label="Own Projects"    value={data.ownRepos}      />
              <StatBox label="Total Stars ⭐"  value={data.totalStars}    />
              <StatBox label="Forks"           value={data.totalForks}    />
              <StatBox label="Followers"       value={data.followers}     />
              <StatBox label="Commits (30d)"   value={data.recentCommits} />
            </motion.div>

            {/* ── Row 2: Languages + Activity feed ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Language breakdown */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-5">Top Languages</p>
                <div className="space-y-4">
                  {data.topLanguages.map(({ lang, count }, i) => {
                    const total = data.topLanguages.reduce((s, l) => s + l.count, 0);
                    const pct   = Math.round((count / total) * 100);
                    const color = LANG_COLORS[lang] ?? "#6b7280";
                    return (
                      <div key={lang}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-white font-medium">{lang}</span>
                          <span className="text-xs text-white/40 font-mono">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recent activity feed */}
              <motion.div
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="font-mono text-xs text-white/40 uppercase tracking-widest">Recent Activity</p>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="space-y-3">
                  {data.recentActivity.length === 0 ? (
                    <p className="text-white/30 text-sm">No recent public activity.</p>
                  ) : (
                    data.recentActivity.map((ev, i) => {
                      const { icon, label } = eventMeta(ev.type);
                      const repoName = ev.repo.replace(`${GH_USER}/`, "");
                      return (
                        <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                          <span className="text-emerald-400 font-mono text-sm w-4 shrink-0 mt-0.5">{icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/70 truncate">
                              {label}{" "}
                              <a
                                href={`https://github.com/${ev.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-emerald-400 transition-colors font-medium"
                              >
                                {repoName}
                              </a>
                            </p>
                          </div>
                          <span className="text-xs text-white/30 font-mono shrink-0">{timeAgo(ev.time)}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── Row 3: GitHub profile CTA ── */}
            <motion.a
              href={GH_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group flex items-center justify-between w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full ring-2 ring-white/10 group-hover:ring-emerald-500/40 transition-all" />
                <div>
                  <p className="text-white font-semibold">{data.name ?? data.username}</p>
                  <p className="text-white/40 text-sm font-mono">@{data.username} · {data.yearsOnGH}yr on GitHub</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors">
                <span className="text-sm font-mono hidden sm:block">View Profile</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>

          </div>
        )}
      </div>
    </section>
  );
}
