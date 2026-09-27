import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CuttingBoard } from './components/CuttingBoard';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { SideQuests } from './components/SideQuests';
import { MatchChecklist } from './components/MatchChecklist';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F5EE] text-[#1E1E1E] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#133827] selection:text-[#FAF9F5]">
      {/* Top Sticky Navigation */}
      <Header onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section with 3D Three.js Origami & Scrapbook Header */}
        <Hero />

        {/* 2. Interactive Studio Cutting Board */}
        <CuttingBoard />

        {/* 3. Notable Work (Travel Boarding Passes & Luggage Tags) */}
        <WorkSection />

        {/* 4. About Jackie & Draggable Face Reveal Mask */}
        <AboutSection />

        {/* 5. Side Quests & Playable Interactive Experiments */}
        <SideQuests />

        {/* 6. "What I Look For" Match Fit Checklist & Confetti */}
        <MatchChecklist />

        {/* 7. Contact & Corkboard Sticky Note Guestbook */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
