"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight, ChevronDown, Rocket, Building2,
  Zap, Wrench, Library, TrendingUp, Trophy,
  Users, Star, Code2, PenTool, Workflow,
  ArrowUpRight, ChevronUp
} from "lucide-react";
import dynamic from "next/dynamic";

import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { FlipWords } from "@/components/ui/flip-words";
import { ApplyForm } from "@/components/apply-form";
import { MovingBorder } from "@/components/ui/moving-border";

const HeroParticles = dynamic(
  () => import("@/components/hero-particles").then((m) => m.HeroParticles),
  { ssr: false }
);
const VideoIntro = dynamic(
  () => import("@/components/video-intro").then((m) => m.VideoIntro),
  { ssr: false }
);

// ─── DATA ─────────────────────────────────────────────────

const CLIENTS = [
  { name: "Signeasy", type: "enterprise" },
  { name: "Appknox", type: "enterprise" },
  { name: "Novelty", type: "startup" },
  { name: "Nevara", type: "startup" },
  { name: "Oximy", type: "startup" },
  { name: "Reward360", type: "enterprise" },
  { name: "Cardboard", type: "startup" },
  { name: "Pazo Care", type: "startup" },
];

const INDIVIDUALS = [
  { handle: "@ManthanGupta", role: "Builder" },
  { handle: "@Shubhram", role: "Founder" },
  { handle: "@Saksham", role: "Engineer" },
  { handle: "@Sharjeel", role: "Operator" },
];

const SKILLS = [
  {
    icon: <PenTool className="h-5 w-5" />,
    name: "Paul Graham Writing",
    desc: "Distills complex ideas into clear, direct essays. No fluff, maximum insight. Used by Paul Graham himself.",
    tag: "Content",
    credit: "Paul Graham",
  },
  {
    icon: <Star className="h-5 w-5" />,
    name: "X Writing & Research",
    desc: "Deep research → punchy X threads and long-form articles that compound reach over time.",
    tag: "Social",
    credit: "@ManthanGupta · 3M+ impressions",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    name: "Full-Stack Dev Agent",
    desc: "Designs, codes, reviews PRs, and ships features. Full autonomy from ticket to deploy.",
    tag: "Engineering",
    credit: null,
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    name: "Outreach Machine",
    desc: "Finds leads, researches them, writes personalized outreach, follows up. Runs 24/7.",
    tag: "Growth",
    credit: null,
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    name: "Autonomous SEO Marketer",
    desc: "Researches keywords, writes SEO-optimized content, builds internal links, tracks rankings. Fully autonomous.",
    tag: "SEO",
    credit: null,
  },
  {
    icon: <Users className="h-5 w-5" />,
    name: "Churn Analyzer",
    desc: "Monitors product usage signals, flags at-risk accounts, drafts retention playbooks before customers leave.",
    tag: "Retention",
    credit: null,
  },
  {
    icon: <Star className="h-5 w-5" />,
    name: "Market Intel Claw",
    desc: "Monitors competitors, scrapes signals, synthesizes daily briefings before you wake up.",
    tag: "Research",
    credit: null,
  },
  {
    icon: <Users className="h-5 w-5" />,
    name: "The Chief of Staff",
    desc: "Manages your inbox, calendar, tasks, and follow-ups. The executive assistant that never sleeps.",
    tag: "Operations",
    credit: null,
  },
];

const LEADERBOARD = [
  { rank: 1, use: "Automated sales outreach → 3x reply rate", company: "Appknox", votes: 847 },
  { rank: 2, use: "Daily market intelligence briefings", company: "Signeasy", votes: 712 },
  { rank: 3, use: "PG-style founder essays, weekly", company: "@ManthanGupta", votes: 634 },
  { rank: 4, use: "Full contract review + redlining", company: "Nevara", votes: 521 },
  { rank: 5, use: "Engineering sprint planning + PR reviews", company: "Cardboard", votes: 489 },
  { rank: 6, use: "Patient intake + care coordination", company: "Pazo Care", votes: 445 },
  { rank: 7, use: "Competitive monitoring + weekly reports", company: "Oximy", votes: 398 },
  { rank: 8, use: "Twitter content engine (5 posts/day)", company: "@Shubhram", votes: 361 },
];

const TERMINAL_LINES = [
  { t: "$ redclaw deploy --team acme", c: "#e5e7eb" },
  { t: "› Inheriting from 847 prior setups...", c: "#6b7280" },
  { t: "› Loading 23 matched skill patterns...", c: "#6b7280" },
  { t: "› Applying PG writing harness...", c: "#6b7280" },
  { t: "› Configuring outreach workflows...", c: "#6b7280" },
  { t: "✓ Your red claw is stronger than all 847 before it", c: "#4ade80" },
  { t: "✓ Ready to deploy", c: "#4ade80" },
];

// ─── POWER CURVE ──────────────────────────────────────────
function PowerCurve() {
  // Build SVG path from exponential curve points
  const d = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59;
    const x = t * 320;
    const y = 80 - Math.pow(t, 1.8) * 75;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  return (
    <div className="relative">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-4 font-semibold">
        Power per red claw
      </div>
      <motion.svg
        viewBox="0 0 320 90"
        className="w-full max-w-sm overflow-visible"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C41E3A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff5070" stopOpacity="1" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated curve */}
        <motion.path
          d={d}
          stroke="url(#curveGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { pathLength: { duration: 1.8, ease: "easeInOut" }, opacity: { duration: 0.3 } },
            },
          }}
        />

        {/* Glow dot at end — fades in after curve draws */}
        <motion.circle
          cx="320" cy="5" r="4" fill="#ff5070"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1, transition: { delay: 1.7, duration: 0.4, ease: "easeOut" } },
          }}
        />
        <motion.circle
          cx="320" cy="5" r="10" fill="#ff5070" fillOpacity="0.18"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: [0, 1, 0],
              scale: [0.5, 1.8, 1.8],
              transition: { delay: 1.7, duration: 1.0, ease: "easeOut" },
            },
          }}
        />

        {/* Axis labels */}
        <text x="0" y="88" fill="#444" fontSize="8">1</text>
        <text x="270" y="88" fill="#444" fontSize="8">1,000,000</text>
      </motion.svg>

      <div className="mt-2 text-xs text-white/20">
        <span>Red claws deployed →</span>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────
export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">
      <VideoIntro onDone={() => setIntroDone(true)} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 28 32" className="h-6 w-5" fill="none">
            <path d="M6 2C7 10 4 20 7 30" stroke="#C41E3A" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M14 2C15 10 12 20 14 30" stroke="#C41E3A" strokeWidth="4" strokeLinecap="round"/>
            <path d="M22 2C23 10 20 20 22 30" stroke="#C41E3A" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>RedClaw</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#leaderboard" className="text-sm text-white/40 hover:text-white/70 transition-colors hidden md:block">Leaderboard</a>
          <a href="#skills" className="text-sm text-white/40 hover:text-white/70 transition-colors hidden md:block">Skills</a>
          <a href="#cta">
            <ShimmerButton shimmerColor="#C41E3A" background="transparent" borderRadius="9999px" className="text-sm px-5 py-2 border border-white/10">
              Apply →
            </ShimmerButton>
          </a>
        </div>
      </nav>

      {/* ══ 1. HERO ════════════════════════════════════════ */}
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#080808] px-5 py-24 pt-32">

        {/* BG Layer 1 — radial glow from bottom-center */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 115%, rgba(196,30,58,0.20) 0%, rgba(196,30,58,0.05) 45%, transparent 65%)" }} />

        {/* BG Layer 2 — offset accent glow */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{ background: "radial-gradient(ellipse 55% 45% at 15% 65%, rgba(130,8,25,0.09) 0%, transparent 60%)" }} />

        {/* BG Layer 3 — Vercel-style grid */}
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />

        {/* BG Layer 4 — vignettes */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48" style={{ background: "linear-gradient(to bottom, #080808, transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48" style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-24" style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-24" style={{ background: "linear-gradient(to left, #080808, transparent)" }} />

        {/* BG Layer 5 — particles (subtle background texture) */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <HeroParticles />
        </div>

        {/* ── Hero Content (gated on introDone) ── */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C41E3A]/20 bg-[#C41E3A]/[0.06] px-4 py-1.5"
          >
            <Zap className="h-3 w-3 flex-shrink-0 text-[#E8344F]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8344F]">
              OpenClaw setup for the most cracked teams on earth
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.88] tracking-tighter text-white"
            style={{ fontSize: "clamp(64px, 12vw, 176px)", fontFamily: "var(--font-syne)" }}
          >
            RedClaw
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-2 font-bold tracking-tight"
            style={{
              fontSize: "clamp(16px, 2.8vw, 38px)",
              fontFamily: "var(--font-syne)",
              background: "linear-gradient(90deg, #7B0F1F 0%, #C41E3A 25%, #E8344F 45%, #FF7090 55%, #E8344F 75%, #C41E3A 85%, #7B0F1F 100%)",
              backgroundSize: "250% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 5s linear infinite",
            }}
          >
            A million red claws.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 max-w-[440px] text-[14px] leading-[1.75] text-white/35"
          >
            Most people have OpenClaw. Almost none of them know how to unlock it.
            We set it up for the fastest-growing teams, the most impressive individuals,
            and the enterprises that refuse to move slow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#cta">
              <ShimmerButton
                shimmerColor="#ff6080"
                background="#C41E3A"
                borderRadius="9999px"
                className="px-8 py-3.5 text-[13px] font-semibold tracking-wide shadow-[0_0_40px_rgba(196,30,58,0.3)]"
              >
                Get your Red Claw <ArrowRight className="inline h-3.5 w-3.5 ml-1.5" />
              </ShimmerButton>
            </a>
            <a href="#flywheel" className="text-[13px] font-medium text-white/30 hover:text-white/60 transition-colors duration-200">
              See how it works →
            </a>
          </motion.div>

          {/* Live counter pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C41E3A] animate-pulse" />
            <span className="text-white/35 text-[13px] font-medium tabular-nums">
              <NumberTicker value={847} className="text-white/50 font-semibold" />
              {" "}red claws deployed
            </span>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-white/20" />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </section>

      {/* ══ 2. THE FLYWHEEL ════════════════════════════════ */}
      <section id="flywheel" className="px-8 py-28 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-3">The flywheel</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-3xl">
              The 1,000,001st red claw<br />
              <span className="text-white/30">will be 1,000,000x stronger than the 1st.</span>
            </h2>
            <p className="text-white/35 text-base max-w-xl leading-relaxed mb-16">
              Every setup we do adds to a shared library of skills, harnesses, and workflows.
              Every new client inherits everything we've learned from every client before them.
              The later you join, the more powerful your starting point.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-6 w-6 text-[#C41E3A]" />,
                n: "01",
                title: "Setup",
                desc: "We get you running in days. Full OpenClaw configuration, skill installation, harness design tailored to exactly how your team works.",
                delay: 0.1,
              },
              {
                icon: <Wrench className="h-6 w-6 text-[#C41E3A]" />,
                n: "02",
                title: "Maintenance",
                desc: "We keep it sharp. As your needs evolve, we evolve the system. New skills, new workflows, continuous improvement.",
                delay: 0.2,
              },
              {
                icon: <Library className="h-6 w-6 text-[#C41E3A]" />,
                n: "03",
                title: "The Library",
                desc: "The secret weapon. Every setup adds to a shared knowledge base. Your claw inherits the collective intelligence of every red claw before it.",
                delay: 0.3,
              },
            ].map((card) => (
              <BlurFade key={card.n} delay={card.delay} inView>
                <div className="relative rounded-2xl border border-white/[0.05] bg-[#0D0D0D] p-8 h-full min-h-[260px] group hover:border-[#C41E3A]/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-[#C41E3A]/10 border border-[#C41E3A]/20">{card.icon}</div>
                    <span className="text-4xl font-black text-white/[0.04]" style={{ fontFamily: "var(--font-syne)" }}>{card.n}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{card.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Power curve visualization */}
          <BlurFade delay={0.4} inView>
            <div className="mt-16 rounded-2xl border border-white/[0.05] bg-[#0A0A0A] p-12 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-3">Compounding power</p>
                <h3 className="text-4xl font-bold mb-4 leading-tight">
                  Each claw we set up<br />makes the next one stronger.
                </h3>
                <p className="text-sm text-white/30 leading-relaxed max-w-sm">
                  It's not just skills — it's pattern recognition, failure learnings, edge cases, and domain expertise accumulated across every deployment we've ever done.
                </p>
              </div>
              <div className="flex-1">
                <PowerCurve />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-8 md:mx-16 lg:mx-24 h-px bg-gradient-to-r from-transparent via-[#C41E3A]/15 to-transparent" />

      {/* ══ 3. WHO GETS ONE ════════════════════════════════ */}
      <section className="px-8 py-28 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-3">The roster</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[0.9]">
              Not for everyone.
            </h2>
            <p className="text-white/35 text-base max-w-xl leading-relaxed mb-16">
              We work with the most cracked people and teams on the planet.
              Fast-growing startups. Enterprise teams with the top designers, writers, engineers.
              Founders and influencers who operate at a different level.
            </p>
          </motion.div>

          {/* Companies */}
          <BlurFade delay={0.15} inView>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-semibold mb-6">Companies</p>
            <div className="flex flex-wrap gap-3 mb-14">
              {CLIENTS.map((c) => (
                <div key={c.name} className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-[#0D0D0D] px-5 py-2.5 hover:border-[#C41E3A]/30 hover:shadow-[0_0_20px_rgba(196,30,58,0.08)] transition-all duration-300 group">
                  <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{c.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.type === 'enterprise' ? 'bg-blue-500/10 text-blue-400' : 'bg-[#C41E3A]/10 text-[#E8344F]'}`}>
                    {c.type === 'enterprise' ? 'Enterprise' : 'Startup'}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-full border border-white/[0.04] bg-[#0A0A0A] px-5 py-2.5">
                <span className="text-sm text-white/20">+more in pipeline</span>
              </div>
            </div>
          </BlurFade>

          {/* Individuals */}
          <BlurFade delay={0.2} inView>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-semibold mb-6">Individuals</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {INDIVIDUALS.map((p) => (
                <div key={p.handle} className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-[#0D0D0D] px-5 py-2.5 hover:border-[#C41E3A]/30 hover:shadow-[0_0_20px_rgba(196,30,58,0.08)] transition-all duration-300 group">
                  <ArrowUpRight className="h-3 w-3 text-[#C41E3A]/50" />
                  <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{p.handle}</span>
                  <span className="text-[10px] text-white/25">{p.role}</span>
                </div>
              ))}
            </div>
          </BlurFade>

          {/* Category tags */}
          <BlurFade delay={0.25} inView>
            <div className="flex flex-wrap gap-2 mt-6">
              {["YC Startups", "Enterprise", "Twitter Founders", "Deep Technical", "Top Designers", "Top Writers", "Operators"].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/[0.05] text-white/25 font-medium">{t}</span>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ══ 4. SKILLS SHOWCASE ════════════════════════════ */}
      <section id="skills" className="px-8 py-28 md:px-16 lg:px-24 bg-[#060606] section-alt">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-3">The library</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
              Skills that make your<br />
              <span className="text-white/30">claw legendary.</span>
            </h2>
            <p className="text-white/35 text-base max-w-xl leading-relaxed mb-16">
              Every red claw we've set up has contributed to this library. These aren't templates — they're battle-tested capabilities built from real use cases across every client we've served.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, i) => (
              <BlurFade key={skill.name} delay={0.1 + i * 0.07} inView>
                <div className="relative group rounded-2xl border border-white/[0.05] bg-[#0A0A0A] p-7 min-h-[200px] hover:border-[#C41E3A]/20 transition-all duration-300 h-full overflow-hidden">
                  <BorderBeam size={120} duration={6 + i} colorFrom="#C41E3A" colorTo="transparent" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-[#C41E3A]/10 border border-[#C41E3A]/20 text-[#C41E3A]">
                        {skill.icon}
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30 font-medium border border-white/[0.05]">{skill.tag}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">{skill.name}</h3>
                    <p className="text-sm text-white/30 leading-relaxed">{skill.desc}</p>
                    {skill.credit && (
                      <p className="mt-3 text-[11px] text-[#C41E3A]/60 font-medium">↳ {skill.credit}</p>
                    )}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.5} inView>
            <div className="mt-8 text-center">
              <span className="text-sm text-white/20">+ hundreds more in the library</span>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ══ 5. USE CASES LEADERBOARD ══════════════════════ */}
      <section id="leaderboard" className="px-8 py-28 md:px-16 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-3">Use cases</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
              What red claws<br />
              <span className="text-white/30">are actually doing.</span>
            </h2>
            <p className="text-white/35 text-base leading-relaxed mb-14">
              Real use cases, ranked by impact. This is what happens when you give an OpenClaw to someone who knows how to use it.
            </p>
          </motion.div>

          <div className="space-y-3">
            {LEADERBOARD.map((item, i) => (
              <BlurFade key={item.rank} delay={0.1 + i * 0.06} inView>
                <div className="group flex items-center gap-5 rounded-xl border border-white/[0.05] bg-[#0A0A0A] px-7 py-5 hover:border-[#C41E3A]/20 hover:bg-[#0D0D0D] transition-all duration-200">
                  <span
                    className="text-3xl font-black tabular-nums w-10 flex-shrink-0"
                    style={{
                      color: item.rank <= 3 ? `rgba(196,30,58,${1 - item.rank * 0.2})` : "rgba(255,255,255,0.06)",
                      fontFamily: "var(--font-syne)"
                    }}
                  >
                    {item.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors truncate">{item.use}</div>
                    <div className="text-xs text-white/25 mt-0.5">{item.company}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/20 flex-shrink-0">
                    <ChevronUp className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold tabular-nums">{item.votes}</span>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.6} inView>
            <div className="mt-8 text-center">
              <a href="#cta" className="text-sm text-[#C41E3A]/50 hover:text-[#C41E3A] transition-colors font-medium">
                Get your use case on the leaderboard →
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ══ 6. MISSION ════════════════════════════════════ */}
      <section className="px-8 py-40 md:px-16 text-center relative overflow-hidden bg-[#060606]">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(196,30,58,0.06), transparent)" }} />
        <BlurFade delay={0.1} inView className="relative mx-auto max-w-5xl">
          <h2
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(56px, 11vw, 150px)", fontFamily: "var(--font-syne)" }}
          >
            A million<br />
            <FlipWords
              words={["red claws.", "builders.", "founders.", "legends."]}
              duration={2500}
              className="text-[#C41E3A] whitespace-nowrap"
            />
          </h2>
          <p className="mt-7 text-lg text-white/25 max-w-md mx-auto leading-relaxed">
            Every fast-moving team on earth, running on a red claw that gets smarter every day.
          </p>
          <div className="mt-14 h-px max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-[#C41E3A]/25 to-transparent" />
        </BlurFade>
      </section>

      {/* ══ 7. CTA + FORM ════════════════════════════════ */}
      <section id="cta" className="relative px-6 py-28 md:px-16 overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%]" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(196,30,58,0.14), transparent)" }} />
        <div className="relative mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] font-semibold mb-4">Apply</p>
            <h2
              className="font-black tracking-tight leading-[0.9] mb-5"
              style={{ fontSize: "clamp(44px, 8vw, 96px)", fontFamily: "var(--font-syne)" }}
            >
              Are you cracked<br />enough?
            </h2>
            <p className="text-white/35 text-base max-w-sm mx-auto leading-relaxed">
              We don't work with everyone. Tell us who you are and what you're building.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 md:p-9"
          >
            <ApplyForm />
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.04] px-8 py-7 md:px-16">
        <div className="mx-auto max-w-6xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 28 32" className="h-4 w-4" fill="none">
              <path d="M6 2C7 10 4 20 7 30" stroke="#C41E3A" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M14 2C15 10 12 20 14 30" stroke="#C41E3A" strokeWidth="4" strokeLinecap="round"/>
              <path d="M22 2C23 10 20 20 22 30" stroke="#C41E3A" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-semibold text-white/40" style={{ fontFamily: "var(--font-syne)" }}>RedClaw</span>
            <span className="text-xs text-white/15 ml-1">· A million red claws</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/20">
            <span>© 2026 RedClaw</span>
            <a href="#leaderboard" className="hover:text-white/40 transition-colors">Leaderboard</a>
            <a href="#skills" className="hover:text-white/40 transition-colors">Skills</a>
            <a href="mailto:team@redclaw.ai" className="hover:text-white/40 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
