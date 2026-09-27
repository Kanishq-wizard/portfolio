import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Sparkles, MapPin, Layers, MousePointer, ShieldCheck, Compass } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { playPaperRustle, playClickSound } from '../utils/sound';
import kanishqProfilePhoto from '../assets/images/kanishq_profile_photo_1790498789973.jpg';

export const Hero: React.FC = () => {
  const [stampCount, setStampCount] = useState(0);

  const handleBadgeClick = () => {
    playClickSound();
    setStampCount((prev) => prev + 1);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F6F5EE]">
      {/* Three.js 3D Interactive Paper origami canvas */}
      <ThreeCanvas />

      {/* Floating Scrapbook Elements / Draggable Badges */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6D6]/80 border border-[#D5D0B5] text-xs font-['DM_Mono',monospace] text-[#334131] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <MapPin className="w-3.5 h-3.5 text-emerald-800" />
            <span>Based in Delhi, India</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="hero-badge-interactive"
              onClick={handleBadgeClick}
              className="group relative cursor-pointer px-3 py-1.5 bg-[#FAF9F5] border border-dashed border-[#B43B22] text-[#B43B22] rounded-md text-xs font-['DM_Mono',monospace] font-semibold transform hover:-rotate-2 transition-transform shadow-xs"
              title="Click to stamp"
            >
              <span>✦ 8+ YRS FULL-STACK & CODE</span>
              {stampCount > 0 && (
                <span className="ml-1 px-1 bg-[#B43B22] text-white rounded-full text-[10px]">
                  +{stampCount}
                </span>
              )}
            </button>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#133827] text-[#E8EFE6] rounded-md text-xs font-['DM_Mono',monospace] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Full-Stack Engineering</span>
            </div>
          </div>
        </div>

        {/* Main Headline & Handwritten Annotations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-6">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Handwritten scribble note */}
            <div className="inline-block relative">
              <span className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#B43B22] transform -rotate-2 inline-block">
                “ideas tested fast in working code...”
              </span>
              <svg className="w-20 h-4 text-[#B43B22] -mt-1 ml-4" viewBox="0 0 100 20" fill="none" stroke="currentColor">
                <path d="M5,10 Q50,20 95,5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#133827] tracking-tight leading-[1.08] font-['Syne',sans-serif]">
              Building software that <span className="underline decoration-[#B43B22] decoration-wavy decoration-2">empowers</span> people to do their best work.
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5446] max-w-2xl font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed font-normal">
              I’m <strong className="text-[#133827] font-semibold">Kanishq</strong>, a full-stack developer, software engineer, and rapid prototyper based in Delhi, India. I turn complex systems, messy backend flows, and ambitious ideas into tactile, lightning-fast digital products.
            </p>

            {/* CTA and Quick jump pills */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                id="hero-view-work-cta"
                onClick={() => playPaperRustle()}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#133827] text-[#FAF9F5] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-base shadow-md hover:bg-[#1C4D36] hover:shadow-lg active:scale-98 transition-all"
              >
                <span>Explore Selected Work</span>
                <ArrowDownRight className="w-5 h-5 text-amber-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#cutting-board"
                id="hero-cutting-board-cta"
                onClick={() => playPaperRustle()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF9F5] border-2 border-[#133827] text-[#133827] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-base hover:bg-[#EAE6D6] transition-all"
              >
                <Layers className="w-4 h-4 text-emerald-800" />
                <span>Open Studio Cutting Board</span>
              </a>
            </div>

            {/* Micro Tags */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-['DM_Mono',monospace] text-[#5C6656]">
              <span className="bg-[#EAE6D6] px-2.5 py-1 rounded">● Design Systems</span>
              <span className="bg-[#EAE6D6] px-2.5 py-1 rounded">● 0→1 Product Strategy</span>
              <span className="bg-[#EAE6D6] px-2.5 py-1 rounded">● React & TypeScript</span>
              <span className="bg-[#EAE6D6] px-2.5 py-1 rounded">● Micro-Interactions</span>
              <span className="bg-[#EAE6D6] px-2.5 py-1 rounded">● Three.js & Tactile UX</span>
            </div>
          </div>

          {/* Interactive Floating Polaroid & Scrapbook Elements on the Right */}
          <div className="lg:col-span-4 relative flex flex-col items-center lg:items-end">
            
            {/* Draggable-like Polaroid Card */}
            <motion.div
              drag
              dragConstraints={{ left: -60, right: 60, top: -40, bottom: 60 }}
              whileHover={{ scale: 1.03, rotate: -2 }}
              whileTap={{ scale: 0.98 }}
              onDragStart={() => playPaperRustle()}
              className="relative cursor-grab active:cursor-grabbing w-72 sm:w-80 bg-white p-3.5 pb-6 rounded-sm shadow-xl border border-[#E0DBC5] transform rotate-3 transition-shadow"
            >
              {/* Masking Washi Tape at Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-200/80 backdrop-blur-xs rotate-1 border-x border-[#D1C694] opacity-90 pointer-events-none shadow-xs"></div>

              {/* Photo with Profile Image */}
              <div className="w-full h-64 bg-[#EBE7D8] rounded-xs overflow-hidden relative group border border-[#DDD8C0]">
                <img
                  src= "WhatsApp Image 2026-09-27 at 2.12.36 PM.jpeg"
                  alt="Kanishq profile portrait"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-['DM_Mono',monospace]">
                  Delhi Studio ✦ 2026
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="mt-3 text-center">
                <p className="font-['Caveat',cursive] text-xl font-bold text-[#133827]">
                  Kanishq — Full-Stack Developer
                </p>
                <p className="text-[11px] text-[#7C8575] font-['DM_Mono',monospace]">
                  (Drag me around!)
                </p>
              </div>

              {/* Stamp on corner */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full border-2 border-dashed border-[#B43B22] text-[#B43B22] flex items-center justify-center text-[10px] font-bold font-['DM_Mono',monospace] transform -rotate-12 bg-[#FFF8F6] shadow-xs">
                PROVED
              </div>
            </motion.div>

            {/* Quick Sticky Note */}
            <motion.div
              drag
              dragConstraints={{ left: -40, right: 40, top: -30, bottom: 40 }}
              onDragStart={() => playPaperRustle()}
              className="relative cursor-grab active:cursor-grabbing w-56 bg-[#FFF9C4] p-3 rounded-xs shadow-md border border-[#F0E68C] transform -rotate-6 mt-4 self-start lg:self-center"
            >
              <div className="absolute -top-2 left-4 w-12 h-4 bg-[#E0D59D]/70 rotate-2"></div>
              <div className="font-['Caveat',cursive] text-lg font-bold text-[#423C13] leading-snug">
                “Software should feel like picking up a physical tool made of cedar and brass.”
              </div>
              <div className="text-[10px] text-right font-['DM_Mono',monospace] text-[#786D24] mt-1">
                — Kanishq
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Interactive Hint */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2DFC9]/60 text-xs font-['DM_Mono',monospace] text-[#6B7264]">
          <div className="flex items-center gap-2">
            <MousePointer className="w-3.5 h-3.5 text-emerald-800 animate-bounce" />
            <span>Interactive Elements: Try dragging polaroids, notes, and cutting board tools</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#133827]" />
            <span>Scroll for Selected Case Studies</span>
          </div>
        </div>

      </div>

      {/* Torn Paper Edge Divider (SVG jagged paper tear) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#133827]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L40,40 L80,10 L120,50 L160,15 L200,45 L240,10 L280,35 L320,5 L360,40 L400,20 L440,60 L480,15 L520,40 L560,5 L600,45 L640,20 L680,50 L720,10 L760,40 L800,15 L840,45 L880,5 L920,40 L960,15 L1000,50 L1040,10 L1080,45 L1120,20 L1160,55 L1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};
