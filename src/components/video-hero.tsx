"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClawMark } from "@/components/claw-mark";

export function VideoHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);

  return (
    <section
      ref={ref}
      className="noise-overlay relative flex min-h-screen flex-col items-center justify-center px-6 pt-16"
    >
      {/* Video background */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          onError={() => setVideoError(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
          <ClawMark className="h-[500px] w-[400px]" />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/30 to-[#0A0A0A]" />

      {/* Radial red glow behind text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(196,30,58,0.15), transparent)",
        }}
      />

      {/* Parallax hero content */}
      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-5xl text-center">
        {children}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
