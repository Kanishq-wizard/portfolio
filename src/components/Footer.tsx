import React from 'react';
import { ArrowUp, Heart, Sparkles, Compass } from 'lucide-react';
import { playClickSound, playPaperRustle } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playPaperRustle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#091811] text-[#FAF9F5] border-t border-[#133827] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="flex items-center gap-2 font-['Syne',sans-serif] font-bold text-lg text-white">
            <span>Kanishq</span>
            <span className="text-amber-400">✦</span>
          </div>
          <p className="text-xs text-[#9CB5A7] font-['Plus_Jakarta_Sans',sans-serif]">
            “Objects that capture an idea quickly are temporary, yet the most essential part of making.”
          </p>
        </div>

        {/* Center Stamped Badge */}
        <div className="border-2 border-dashed border-[#23533D] px-4 py-2 rounded-xl text-center">
          <span className="text-[11px] font-['DM_Mono',monospace] text-emerald-400 font-bold tracking-widest block">
            DELHI • EST. 2016
          </span>
          <span className="text-[9px] text-[#7C9A89] font-['DM_Mono',monospace]">
            CRAFTED WITH REACT & THREE.JS
          </span>
        </div>

        {/* Right Scroll to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-['DM_Mono',monospace] text-[#7C9A89]">
            © {new Date().getFullYear()} Kanishq
          </span>
          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#133827] hover:bg-[#1F4E38] text-white border border-[#23533D] hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
