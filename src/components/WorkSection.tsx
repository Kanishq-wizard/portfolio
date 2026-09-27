import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, ExternalLink, ArrowRight, Sparkles, Tag, CheckCircle } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { playClickSound, playPaperRustle } from '../utils/sound';

export const WorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
  };

  return (
    <section id="work" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F5EE] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE6D6] border border-[#D5D0B5] text-xs font-['DM_Mono',monospace] text-[#334131]">
              <Compass className="w-3.5 h-3.5 text-emerald-800" />
              <span>Selected Work • Travel Journey & Boarding Passes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#133827]">
              Notable Projects
            </h2>
            <p className="text-base sm:text-lg text-[#5C6656] max-w-2xl font-['Plus_Jakarta_Sans',sans-serif]">
              A decade of crafting high-scale products, zero-to-one design systems, and delightful software tools. Each project is formatted as a travel ticket from my journey.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-['DM_Mono',monospace] text-[#7C8575] bg-[#FAF9F5] px-4 py-2 rounded-xl border border-[#E2DFC9]">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>4 Shipped Highlights Available</span>
          </div>
        </div>

        {/* Project Cards (Styled as Physical Travel Tickets, Luggage Tags & Boarding Passes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
              transition={{ duration: 0.2 }}
              className="group relative bg-[#FAF9F5] rounded-2xl border-2 border-[#DDD8C0] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Decorative top tape / tag hole */}
              <div className="absolute top-0 right-8 w-6 h-6 rounded-b-full bg-[#F6F5EE] border-b-2 border-x-2 border-[#DDD8C0] flex items-center justify-center pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#133827]"></div>
              </div>

              <div>
                {/* Header Ticket Bar */}
                <div
                  className="p-6 text-white relative overflow-hidden"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <div className="flex items-center justify-between text-xs font-['DM_Mono',monospace] uppercase tracking-wider mb-2 opacity-90">
                    <span className="font-bold">{project.ticketType.replace('-', ' ')}</span>
                    <span>PASS № 0{index + 1}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-['Plus_Jakarta_Sans',sans-serif] mt-1 line-clamp-1">
                    {project.tagline}
                  </p>

                  {/* Stamp Badge */}
                  <div className="absolute right-4 bottom-3 border-2 border-white/40 px-2 py-0.5 rounded text-[10px] font-['DM_Mono',monospace] font-black uppercase transform rotate-6 bg-white/10 backdrop-blur-xs">
                    SHIPPED
                  </div>
                </div>

                {/* Perforated Tear Line (Dotted cut line across card) */}
                <div className="relative py-2 bg-[#FAF9F5] flex items-center justify-between px-2">
                  <div className="w-4 h-4 rounded-full bg-[#F6F5EE] -ml-4 border border-[#DDD8C0]"></div>
                  <div className="flex-1 border-b-2 border-dashed border-[#D5D0B5] mx-2"></div>
                  <div className="w-4 h-4 rounded-full bg-[#F6F5EE] -mr-4 border border-[#DDD8C0]"></div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  {/* Image Preview */}
                  <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden border border-[#E2DFC9] bg-stone-200 group-hover:shadow-inner transition-shadow">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-xs font-['DM_Mono',monospace]">
                      {project.role}
                    </div>
                  </div>

                  {/* Overview text */}
                  <p className="text-sm text-[#4A5446] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-[#EFECE0] border border-[#E2DFC9] text-center"
                      >
                        <div className="text-lg font-extrabold font-['Syne',sans-serif] text-[#133827]">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-['DM_Mono',monospace] text-[#6B7264]">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-['DM_Mono',monospace] bg-[#EAE6D6] text-[#334131]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#EFECE0] mt-4">
                <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">
                  {project.timeline}
                </span>

                <button
                  id={`open-project-${project.id}`}
                  onClick={() => handleOpenProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#133827] text-white text-xs sm:text-sm font-semibold hover:bg-[#1E4D37] active:scale-95 transition-all shadow-sm"
                >
                  <span>Inspect Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
