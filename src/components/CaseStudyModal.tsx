import React, { useState } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, TrendingUp, Layers, Code, Sparkles, BookOpen } from 'lucide-react';
import { Project } from '../types';
import { playClickSound, playPaperRustle } from '../utils/sound';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'solution' | 'impact'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-2xl shadow-2xl border-2 border-[#133827] overflow-hidden text-[#1E1E1E] my-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Perforated Ticket Header */}
        <div
          className="p-6 sm:p-8 text-white relative flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ backgroundColor: project.accentColor }}
        >
          {/* Decorative punch hole on top right */}
          <div className="absolute top-4 right-14 w-5 h-5 rounded-full bg-black/40 border border-white/20"></div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-['DM_Mono',monospace] uppercase tracking-wider text-white/80">
              <span>{project.role}</span>
              <span>•</span>
              <span>{project.timeline}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-white/90 font-['Plus_Jakarta_Sans',sans-serif] max-w-xl">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {project.prototypeUrl && (
              <a
                href={project.prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-['DM_Mono',monospace] font-bold transition-colors"
              >
                <span>Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              id="close-case-study-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E2DFC9] bg-[#EFECE0] px-6 text-sm font-['DM_Mono',monospace] overflow-x-auto">
          {[
            { id: 'overview', label: '1. Overview', icon: BookOpen },
            { id: 'challenge', label: '2. The Challenge', icon: Layers },
            { id: 'solution', label: '3. Solution & Craft', icon: Code },
            { id: 'impact', label: '4. Impact & Metrics', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playPaperRustle();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`py-3.5 px-4 font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#133827] text-[#133827] bg-[#FAF9F5]'
                    : 'border-transparent text-[#6B7264] hover:text-[#133827]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-xs uppercase font-bold font-['DM_Mono',monospace] text-[#7C8575] mb-2">
                  Project Context
                </h4>
                <p className="text-base sm:text-lg text-[#2E3B2D] leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                  {project.overview}
                </p>
              </div>

              {/* Cover Image with caption */}
              <div className="rounded-xl overflow-hidden border border-[#DDD8C0] bg-stone-100 shadow-inner">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#EAE6D6] text-xs font-['DM_Mono',monospace] text-[#334131] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenge' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#FFF5F5] border-l-4 border-[#B43B22] p-5 rounded-r-xl">
                <h4 className="text-sm font-bold font-['DM_Mono',monospace] text-[#B43B22] uppercase tracking-wider mb-1">
                  The Core Friction & Ambiguity
                </h4>
                <p className="text-base text-[#451A03] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-['DM_Mono',monospace] text-[#133827]">
                  Key Constraints Solved:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#4A5446]">
                  <li className="p-3 bg-[#FAF9F5] border border-[#E2DFC9] rounded-lg">
                    • Fast performance across spotty mobile 3G/4G networks in emerging markets.
                  </li>
                  <li className="p-3 bg-[#FAF9F5] border border-[#E2DFC9] rounded-lg">
                    • Multi-brand design token synchronization without ballooning bundle size.
                  </li>
                  <li className="p-3 bg-[#FAF9F5] border border-[#E2DFC9] rounded-lg">
                    • Reducing cognitive load during high-stakes checkout and critical review states.
                  </li>
                  <li className="p-3 bg-[#FAF9F5] border border-[#E2DFC9] rounded-lg">
                    • Full accessibility compliance (WCAG 2.1 AA) across light and dark modes.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-xs uppercase font-bold font-['DM_Mono',monospace] text-[#7C8575] mb-2">
                  Systemic Architecture & Craft
                </h4>
                <p className="text-base text-[#2E3B2D] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-['DM_Mono',monospace] text-[#133827]">
                  Implemented Capabilities:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E2DFC9] shadow-xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#1E1E1E]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="rounded-lg overflow-hidden border border-[#DDD8C0]">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-xs font-['DM_Mono',monospace] text-[#6B7264]">{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <h4 className="text-xs uppercase font-bold font-['DM_Mono',monospace] text-[#7C8575]">
                Measurable Business & User Outcomes
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF9F5] border-2 border-[#133827]/30 text-center space-y-1 shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827]">
                      {metric.value}
                    </div>
                    <div className="text-xs font-['DM_Mono',monospace] text-[#5C6656] font-semibold">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#EAE6D6] border border-[#D5D0B5] flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-sm text-[#2E3B2D]">
                  <strong className="font-bold text-[#133827] block mb-1">Key Takeaway:</strong>
                  Great product design is not just cosmetic sheen — it is removing friction from the user’s critical path and giving them joyful feedback at every step of their journey.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#EFECE0] border-t border-[#E2DFC9] flex items-center justify-between">
          <span className="text-xs font-['DM_Mono',monospace] text-[#6B7264]">
            Ticket ID: JZ-CASE-{project.id.toUpperCase()}
          </span>
          <button
            id="modal-done-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#133827] text-white text-sm font-semibold hover:bg-[#1E4D37] transition-all"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
