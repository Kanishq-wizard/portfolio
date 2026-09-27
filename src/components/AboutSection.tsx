import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Utensils, Code2, Zap, Compass, Sparkles, Smile, Shield, Check, Heart } from 'lucide-react';
import { ABOUT_STORIES } from '../data/portfolioData';
import { playPaperRustle, playClickSound, playChimeSound } from '../utils/sound';
import kanishqProfilePhoto from '../assets/images/kanishq_profile_photo_1790498789973.jpg';

export const AboutSection: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [activePersona, setActivePersona] = useState<string>('coder');
  const [likedStories, setLikedStories] = useState<Record<string, number>>({});

  const personas = [
    {
      id: 'coder',
      icon: '💻',
      label: 'Full-Stack Developer',
      quote: '“Code is the ultimate medium. When frontend performance, architecture, and intuitive design merge, software feels magical.”',
    },
    {
      id: 'chai',
      icon: '☕',
      label: 'Masala Chai Enthusiast',
      quote: '“Brewing fresh ginger-cardamom chai in the morning sets the tone for crafting thoughtful, grounded software.”',
    },
    {
      id: 'doodler',
      icon: '✏️',
      label: 'System Doodler',
      quote: '“Every complex system or API pipeline gets sketched on a dot-grid pad before writing the first component or endpoint.”',
    },
    {
      id: 'night-owl',
      icon: '🦉',
      label: 'Night Owl',
      quote: '“Between 11 PM and 2 AM, with lo-fi beats and a quiet studio in Delhi, the hardest architectural problems solve themselves.”',
    },
    {
      id: 'hardware',
      icon: '⌨️',
      label: 'Keyboards & Haptics',
      quote: '“Lubed linear switches, solid brass plates, and tactile micro-clicks. Real tactile feedback makes computing joyfully human.”',
    },
  ];

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      playChimeSound();
    }
  };

  const handleLikeStory = (id: string) => {
    playClickSound();
    setLikedStories((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="about" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#EFECE0] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2DFC9] border border-[#D5D0B5] text-xs font-['DM_Mono',monospace] text-[#334131] mb-3">
            <User className="w-3.5 h-3.5 text-emerald-800" />
            <span>Behind the Terminal • Engineering Bio & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#133827]">
            More Than Just Syntax
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#5C6656] max-w-2xl font-['Plus_Jakarta_Sans',sans-serif]">
            My journey from hands-on creative experiments to architecting high-scale digital products and full-stack systems. Drag the mask to reveal my profile picture!
          </p>
        </div>

        {/* Interactive Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Draggable Bio Reveal Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm bg-white p-4 pb-6 rounded-2xl shadow-xl border-2 border-[#DDD8C0] overflow-hidden">
              
              {/* Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-200/90 border-x border-amber-300 pointer-events-none z-30 shadow-xs"></div>

              {/* Photo Box with Draggable Mask Layer */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-stone-900 select-none border border-[#DDD8C0]">
                
                {/* Underlying Portrait (Revealed) */}
                <img
                  src="WhatsApp Image 2026-09-27 at 2.12.36 PM.jpeg"
                  alt="Kanishq Profile Photo"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Draggable Mask / Sticker */}
                {!revealed ? (
                  <motion.div
                    drag
                    dragConstraints={{ left: -180, right: 180, top: -180, bottom: 180 }}
                    onDragEnd={(e, info) => {
                      if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
                        handleReveal();
                      }
                    }}
                    onDragStart={() => playPaperRustle()}
                    className="absolute inset-0 bg-[#133827] text-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center cursor-grab active:cursor-grabbing z-20 shadow-2xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#1F4E38] flex items-center justify-center mb-4 border border-[#2D6A4F] animate-pulse">
                      <Sparkles className="w-8 h-8 text-amber-300" />
                    </div>
                    <p className="font-['Syne',sans-serif] font-bold text-lg text-white">
                      Drag This Mask to Reveal Photo
                    </p>
                    <p className="text-xs text-[#A7F3D0] font-['DM_Mono',monospace] mt-2">
                      ⇄ Swipe away in any direction!
                    </p>

                    <button
                      onClick={handleReveal}
                      className="mt-4 px-3 py-1.5 rounded-lg bg-amber-400 text-[#133827] font-bold text-xs font-['DM_Mono',monospace] hover:bg-amber-300 transition-colors"
                    >
                      Instant Click Reveal
                    </button>
                  </motion.div>
                ) : (
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-['DM_Mono',monospace] font-bold animate-in fade-in">
                    ✓ Photo Revealed!
                  </div>
                )}
              </div>

              {/* Bio Details */}
              <div className="mt-4 text-center space-y-1">
                <h3 className="text-xl font-bold font-['Syne',sans-serif] text-[#133827]">
                  Kanishq
                </h3>
                <p className="text-xs font-['DM_Mono',monospace] text-[#6B7264]">
                  Full-Stack Developer & Prototyper • Delhi, India
                </p>
              </div>

              {/* Quick Persona Selector */}
              <div className="mt-4 pt-4 border-t border-[#E2DFC9]">
                <div className="text-[11px] font-bold font-['DM_Mono',monospace] uppercase text-[#7C8575] text-center mb-2">
                  Select a Side of Kanishq:
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {personas.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playClickSound();
                        setActivePersona(p.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        activePersona === p.id
                          ? 'bg-[#133827] text-white shadow-sm scale-105'
                          : 'bg-[#EFECE0] text-[#334131] hover:bg-[#E2DFC9]'
                      }`}
                    >
                      <span>{p.icon}</span> <span className="ml-1 font-['DM_Mono',monospace] text-[11px]">{p.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Persona Quote Box */}
                <div className="mt-3 p-3 bg-[#FAF9F5] rounded-xl border border-[#DDD8C0] text-xs text-[#2E3B2D] font-['Plus_Jakarta_Sans',sans-serif] italic min-h-[60px] flex items-center justify-center text-center">
                  {personas.find((p) => p.id === activePersona)?.quote}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Origin Stories & Craft Philosophy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-['DM_Mono',monospace] uppercase tracking-wider text-[#7C8575] font-bold">
              4 Formative Chapters
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#DDD8C0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EAE6D6] text-[10px] font-['DM_Mono',monospace] font-bold text-[#133827]">
                        {story.tag}
                      </span>
                      <button
                        onClick={() => handleLikeStory(story.id)}
                        className="flex items-center gap-1 text-xs text-rose-700 hover:scale-110 transition-transform"
                        title="Cheer for this story"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span className="font-['DM_Mono',monospace] text-[11px]">
                          {likedStories[story.id] || 3}
                        </span>
                      </button>
                    </div>

                    <h4 className="text-base font-bold font-['Syne',sans-serif] text-[#133827]">
                      {story.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#4A5446] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                      {story.snippet}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#EFECE0] text-[10px] font-['DM_Mono',monospace] text-[#7C8575] flex items-center justify-between">
                    <span>Authentic Memory</span>
                    <span>Delhi ✦</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Engineering Principles Banner */}
            <div className="p-6 rounded-2xl bg-[#133827] text-[#FAF9F5] space-y-3 mt-4">
              <h4 className="text-lg font-bold font-['Syne',sans-serif] text-[#E8EFE6] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>My Uncompromising Engineering Principles</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-[#C2D6CA]">
                <div className="p-3 bg-[#1F4E38] rounded-xl border border-[#2D6A4F]">
                  <strong className="text-white block mb-1 font-['DM_Mono',monospace]">1. Sub-Millisecond Speed</strong>
                  Optimize every render cycle and network request so the interface responds with zero perceptible latency.
                </div>
                <div className="p-3 bg-[#1F4E38] rounded-xl border border-[#2D6A4F]">
                  <strong className="text-white block mb-1 font-['DM_Mono',monospace]">2. Tactile Physics</strong>
                  Digital interfaces should respond with realistic spring mechanics, smooth frame pacing, and responsive feedback.
                </div>
                <div className="p-3 bg-[#1F4E38] rounded-xl border border-[#2D6A4F]">
                  <strong className="text-white block mb-1 font-['DM_Mono',monospace]">3. Resilient Architecture</strong>
                  Type safety, clean abstractions, and robust error handling ensure systems scale effortlessly under heavy load.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
