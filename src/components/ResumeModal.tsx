import React from 'react';
import { X, Download, Printer, CheckCircle2, Briefcase, GraduationCap, Code, Sparkles, MapPin } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F5] rounded-3xl shadow-2xl border-4 border-[#133827] overflow-hidden text-[#1E1E1E] my-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Tag */}
        <div className="bg-[#133827] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-['DM_Mono',monospace] uppercase text-emerald-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delhi, India • IST (UTC+5:30)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Syne',sans-serif] text-white mt-1">
              Kanishq
            </h2>
            <p className="text-sm text-white/80 font-['Plus_Jakarta_Sans',sans-serif]">
              Full-Stack Developer & Prototyper (8+ Years Experience)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                window.print();
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-['DM_Mono',monospace] flex items-center gap-1.5 transition-colors"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Executive Summary */}
          <div className="p-4 bg-[#EFECE0] rounded-2xl border border-[#DDD8C0]">
            <h3 className="text-xs uppercase font-bold font-['DM_Mono',monospace] text-[#7C8575] mb-1">
              Summary & Philosophy
            </h3>
            <p className="text-sm text-[#2E3B2D] leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
              8+ years building high-scale full-stack applications and intuitive developer tooling. Specializes in React, TypeScript, Node.js, Three.js, component architecture, and responsive micro-interactions. Passionate about empowering users through high-speed software and rock-solid code.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-base font-bold font-['Syne',sans-serif] text-[#133827] flex items-center gap-2 border-b border-[#E2DFC9] pb-2">
              <Briefcase className="w-4 h-4 text-emerald-800" />
              <span>Selected Work Experience</span>
            </h3>

            {/* Role 1 */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-[#133827]">Lead Full-Stack Engineer — OmniFlow (TFG)</span>
                <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">2022 — 2024</span>
              </div>
              <p className="text-xs text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif]">
                Led unified discovery architecture, multi-brand design tokens, and 1-tap checkout across 500+ top retail brands. +42% conversion lift and 2.8M monthly active users.
              </p>
            </div>

            {/* Role 2 */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-[#133827]">Principal Developer — Pulse</span>
                <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">2021 — 2022</span>
              </div>
              <p className="text-xs text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif]">
                Architected asynchronous team pulse surveys, sentiment heatmaps, and meeting-free standups used by 140+ remote engineering orgs.
              </p>
            </div>

            {/* Role 3 */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-[#133827]">Lead Frontend Engineer — Heygo</span>
                <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">2020 — 2021</span>
              </div>
              <p className="text-xs text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif]">
                Built low-latency live video streaming client connecting 1M+ global travelers with local guides in 90+ countries.
              </p>
            </div>
          </div>

          {/* Skills & Tooling */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-['Syne',sans-serif] text-[#133827] flex items-center gap-2 border-b border-[#E2DFC9] pb-2">
              <Code className="w-4 h-4 text-emerald-800" />
              <span>Skills & Technical Proficiencies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-[#DDD8C0] space-y-1">
                <span className="font-bold font-['DM_Mono',monospace] text-[#133827] block">Frontend & Interactive</span>
                <p className="text-[#5C6656]">
                  React, TypeScript, Next.js, Vite, Tailwind CSS, Three.js, Motion Physics, Web Audio API, Canvas DSP, Web Workers.
                </p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#DDD8C0] space-y-1">
                <span className="font-bold font-['DM_Mono',monospace] text-[#133827] block">Backend & Systems</span>
                <p className="text-[#5C6656]">
                  Node.js, Express, REST/GraphQL APIs, SQL/NoSQL Databases, Git, CI/CD pipelines, Performance Profiling, System Architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-base font-bold font-['Syne',sans-serif] text-[#133827] flex items-center gap-2 border-b border-[#E2DFC9] pb-2">
              <GraduationCap className="w-4 h-4 text-emerald-800" />
              <span>Education</span>
            </h3>
            <div className="text-xs text-[#4A5446] space-y-0.5">
              <div className="font-bold text-[#133827]">Bachelor of Technology in Computer Science & Engineering</div>
              <div className="text-[#7C8575] font-['DM_Mono',monospace]">Delhi, India</div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-6 bg-[#EFECE0] border-t border-[#DDD8C0] flex items-center justify-between">
          <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">
            Verified CV • Kanishq Studio 2026
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#133827] text-white text-xs font-bold hover:bg-[#1E4D37] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
