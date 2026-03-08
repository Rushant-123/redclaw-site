"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function VideoIntro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finish = () => {
      setFading(true);
      setTimeout(() => { setVisible(false); onDone(); }, 1000);
    };

    video.play().catch(() => finish());
    video.addEventListener("ended", finish);

    // Show the sound prompt after a short delay
    const t = setTimeout(() => setShowSoundPrompt(true), 600);

    return () => {
      video.removeEventListener("ended", finish);
      clearTimeout(t);
    };
  }, [onDone]);

  const unmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    setShowSoundPrompt(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          style={{ width: "100vw", height: "100dvh" }}
        >
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)" }}
          />

          {/* Sound prompt — prominent centered button */}
          <AnimatePresence>
            {showSoundPrompt && muted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={unmute}
                className="absolute inset-0 flex flex-col items-center justify-end w-full cursor-pointer"
                style={{ paddingBottom: "max(6rem, env(safe-area-inset-bottom) + 2rem)" }}
              >
                <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm px-6 py-3 hover:border-white/40 hover:bg-black/70 transition-all duration-200">
                  <VolumeX className="h-4 w-4 text-white/60" />
                  <span className="text-sm font-medium text-white/80 tracking-wide">Tap for sound</span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mute toggle (once sound is on) */}
          {!muted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={toggleMute}
              className="absolute left-6 flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-widest font-medium"
            style={{ bottom: "max(2rem, env(safe-area-inset-bottom) + 0.75rem)" }}
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Sound on</span>
            </motion.button>
          )}

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={() => {
              setFading(true);
              setTimeout(() => { setVisible(false); onDone(); }, 1000);
            }}
            className="absolute right-6 text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase font-medium"
            style={{ bottom: "max(2rem, env(safe-area-inset-bottom) + 0.75rem)" }}
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
