import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckSquare, Square, Sparkles, Send, CheckCircle2, Award, Coffee, Zap } from 'lucide-react';
import { playClickSound, playChimeSound } from '../utils/sound';

export const MatchChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  const criteria = [
    {
      id: 0,
      title: 'High-trust, collaborative product & engineering culture',
      desc: 'Teams where design and engineering partner from Day 0 without gatekeeping or rigid handoff silos.',
    },
    {
      id: 1,
      title: 'Hard, meaningful engineering & software problems',
      desc: 'Transforming dense workflows, complex backend data pipelines, and high-scale consumer interfaces into fast, reliable tools.',
    },
    {
      id: 2,
      title: 'Fast iteration loops & zero ego',
      desc: 'Ship working code early, test with real humans, incorporate sharp feedback, and avoid endless analysis paralysis.',
    },
    {
      id: 3,
      title: 'Direct full-stack prototyping in code (React/TypeScript)',
      desc: 'Belief that interactive micro-interactions, responsive states, and motion physics are best built in real code.',
    },
    {
      id: 4,
      title: 'Remote flexibility or Delhi (IST) / global timezone overlap',
      desc: 'Healthy async work habits, respect for deep work blocks, and an appreciation for great masala chai and filter coffee.',
    },
  ];

  const toggleItem = (id: number) => {
    playClickSound();
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);

    const checkedCount = Object.values(next).filter(Boolean).length;
    if (checkedCount === criteria.length) {
      playChimeSound();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#133827', '#FBBF24', '#B43B22', '#10B981'],
        });
      } catch {
        // Ignore if confetti blocked
      }
    }
  };

  const matchCount = Object.values(checkedItems).filter(Boolean).length;
  const matchPercentage = Math.round((matchCount / criteria.length) * 100);

  return (
    <section id="checklist" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#EFECE0] text-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2DFC9] border border-[#D5D0B5] text-xs font-['DM_Mono',monospace] text-[#334131]">
            <Award className="w-3.5 h-3.5 text-emerald-800" />
            <span>Interactive Matchmaker • What I Look For</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#133827]">
            Are We a Match?
          </h2>
          <p className="text-base sm:text-lg text-[#5C6656] max-w-xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
            Check off what applies to your team or project to see how aligned our working styles are!
          </p>
        </div>

        {/* The Interactive Checklist Board */}
        <div className="bg-[#FAF9F5] rounded-3xl border-2 border-[#DDD8C0] p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Top Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 bg-amber-200/90 border-x border-amber-300 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Checklist Items */}
            <div className="lg:col-span-8 space-y-3.5">
              {criteria.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 select-none ${
                      isChecked
                        ? 'bg-white border-[#133827] shadow-sm'
                        : 'bg-[#FAF9F5] border-[#E2DFC9] opacity-75 hover:opacity-100 hover:border-[#C4BE9F]'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 shrink-0 text-[#133827] focus:outline-none"
                      aria-label={isChecked ? 'Uncheck' : 'Check'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-6 h-6 fill-[#133827] text-white" />
                      ) : (
                        <Square className="w-6 h-6 text-stone-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <h4 className={`text-base font-bold font-['Syne',sans-serif] ${isChecked ? 'text-[#133827]' : 'text-stone-700'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Match Score Indicator & Stamped Result */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#EFECE0] rounded-2xl border border-[#DDD8C0] text-center space-y-4">
              
              <div className="w-24 h-24 rounded-full bg-[#133827] text-white flex flex-col items-center justify-center shadow-lg border-4 border-[#FAF9F5]">
                <span className="text-2xl font-black font-['Syne',sans-serif]">{matchPercentage}%</span>
                <span className="text-[9px] font-['DM_Mono',monospace] uppercase text-emerald-300">MATCH FIT</span>
              </div>

              <div>
                <div className="text-xs font-bold font-['DM_Mono',monospace] text-[#7C8575]">
                  {matchCount} of {criteria.length} CRITERIA CHECKED
                </div>
                <p className="font-['Caveat',cursive] text-xl font-bold text-[#B43B22] mt-1">
                  {matchPercentage === 100
                    ? '★ Perfect alignment! Let’s build together.'
                    : matchPercentage >= 60
                    ? 'Great foundation for a conversation.'
                    : 'Check more boxes to unlock 100% alignment!'}
                </p>
              </div>

              {matchPercentage === 100 && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-['DM_Mono',monospace] font-bold animate-in zoom-in-90">
                  🎉 100% ALIGNMENT UNLOCKED!
                </div>
              )}

              <a
                href="#contact"
                onClick={() => playClickSound()}
                className="w-full py-3 rounded-xl bg-[#133827] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs hover:bg-[#1E4D37] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>Reach Out to Kanishq</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
