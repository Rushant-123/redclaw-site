"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

type Status = "idle" | "loading" | "success" | "error";

export function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    linkedin: "",
    useCase: "",
    goodFit: "",
    velocity: "",
    timeline: "",
    referral: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C41E3A]/40 focus:bg-white/[0.05] transition-all duration-200";
  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35 mb-2";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5 py-10"
        >
          <div className="rounded-full bg-[#C41E3A]/10 border border-[#C41E3A]/20 p-5">
            <CheckCircle className="h-8 w-8 text-[#C41E3A]" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold mb-2">Application received.</p>
            <p className="text-white/35 text-sm max-w-xs mx-auto">We review every one personally. You'll hear back within 48 hours if it's a fit.</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-5 text-left"
        >
          {/* Row 1 — Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name *</label>
              <input required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input required type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={inputCls} />
            </div>
          </div>

          {/* Row 2 — Company + LinkedIn/X */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Company / Handle</label>
              <input value={form.company} onChange={set("company")} placeholder="Acme Inc. or @handle" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>LinkedIn or X</label>
              <input value={form.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/you or @you" className={inputCls} />
            </div>
          </div>

          {/* Use case */}
          <div>
            <label className={labelCls}>What do you want your red claw to do? *</label>
            <textarea
              required
              value={form.useCase}
              onChange={set("useCase")}
              rows={3}
              placeholder="Be specific. The more detail, the better we can assess fit."
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Good fit */}
          <div>
            <label className={labelCls}>What makes you a good fit? *</label>
            <textarea
              required
              value={form.goodFit}
              onChange={set("goodFit")}
              rows={3}
              placeholder="What do you ship? What's your track record? Why should we work with you?"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Row 3 — Velocity + Timeline */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>How fast do you move?</label>
              <select value={form.velocity} onChange={set("velocity")} className={`${inputCls} appearance-none`}>
                <option value="" disabled>Select one</option>
                <option>We ship daily</option>
                <option>We ship weekly</option>
                <option>We move deliberately</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Timeline</label>
              <select value={form.timeline} onChange={set("timeline")} className={`${inputCls} appearance-none`}>
                <option value="" disabled>Select one</option>
                <option>Ready now</option>
                <option>Within a month</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>

          {/* Referral */}
          <div>
            <label className={labelCls}>How did you hear about RedClaw?</label>
            <input value={form.referral} onChange={set("referral")} placeholder="Twitter, friend, YC network..." className={inputCls} />
          </div>

          {/* Error */}
          {status === "error" && (
            <p className="text-[#E8344F] text-sm text-center">Something went wrong. Email us directly at rushantashtputre2002@gmail.com</p>
          )}

          {/* Submit */}
          <div className="pt-2 flex justify-center">
            <ShimmerButton
              shimmerColor="#ff6080"
              background="#C41E3A"
              borderRadius="9999px"
              className="px-10 py-4 text-base font-semibold shadow-[0_0_50px_rgba(196,30,58,0.35)] disabled:opacity-50"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Apply for a Red Claw <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </ShimmerButton>
          </div>

          <p className="text-xs text-white/20 text-center">We review every application personally.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
