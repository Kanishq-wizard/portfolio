import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, FileText, Menu, X, Clock, Sparkles } from 'lucide-react';
import { playClickSound, playPaperRustle, isSoundEnabled, setSoundEnabled } from '../utils/sound';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [activeNav, setActiveNav] = useState('work');

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const updateDelhiTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setCurrentTime(formatter.format(new Date()));
      } catch {
        const d = new Date();
        setCurrentTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
      }
    };

    updateDelhiTime();
    const timer = setInterval(updateDelhiTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playClickSound();
    }
  };

  const navItems = [
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'cutting-board', label: 'Cutting Board', href: '#cutting-board' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'side-quests', label: 'Side Quests', href: '#side-quests' },
    { id: 'checklist', label: 'Match Fit', href: '#checklist' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    playPaperRustle();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F6F5EE]/90 border-b border-[#E2DFC9]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Live Delhi Status */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            id="brand-logo"
            onClick={() => playClickSound()}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#133827] text-[#E8EFE6] flex items-center justify-center font-bold text-lg shadow-sm group-hover:rotate-3 transition-transform">
              KD
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold text-[#133827] tracking-tight text-base font-['Syne',sans-serif]">
                <span>Kanishq</span>
                <span className="text-amber-600 text-xs">✦</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#6B7264] font-['DM_Mono',monospace]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Delhi (IST)</span>
                <span className="text-[#9CA392]">|</span>
                <span className="font-semibold text-[#133827] flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-[#133827]" />
                  {currentTime || '12:00:00'}
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Navigation with Scribble Hover Loops */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => playPaperRustle()}
              className="relative px-3.5 py-2 text-sm font-medium text-[#2E3B2D] hover:text-[#133827] group transition-colors"
            >
              <span className="relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
                {item.label}
              </span>

              {/* Hand-drawn animated scribble SVG underline / loop on hover */}
              <svg
                className="absolute inset-x-1 -bottom-0.5 h-3.5 w-[calc(100%-8px)] text-[#133827] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none stroke-current fill-none"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M2,12 C25,3 45,18 75,6 C88,2 98,14 98,14"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="120"
                  strokeDashoffset="120"
                  className="group-hover:animate-[draw_0.35s_ease-out_forwards]"
                />
              </svg>

              {/* Active Indicator dot */}
              {activeNav === item.id && (
                <span className="absolute -top-1 right-2 w-1.5 h-1.5 bg-[#B43B22] rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Right Tools: Sound Toggle + Resume Tag + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            title={soundOn ? 'Mute tactile sound effects' : 'Enable tactile sound effects'}
            className="p-2 rounded-lg border border-[#DDD8C0] bg-[#FAF9F5] text-[#2E3B2D] hover:bg-[#EAE6D6] hover:border-[#C4BE9F] transition-all flex items-center gap-1.5 text-xs font-['DM_Mono',monospace]"
          >
            {soundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline text-xs font-semibold text-emerald-800">Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden sm:inline text-xs text-stone-500">Muted</span>
              </>
            )}
          </button>

          {/* Resume Tag Button (Luggage Ticket styled) */}
          <button
            id="resume-btn"
            onClick={() => {
              playClickSound();
              onOpenResume();
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#133827] text-[#FAF9F5] font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#1E4D37] active:scale-95 transition-all border border-[#0D261A]"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>CV & Experience</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-[#133827] font-bold">
              PDF
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg border border-[#DDD8C0] bg-[#FAF9F5] text-[#2E3B2D]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#DDD8C0] px-4 py-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-xs uppercase tracking-wider text-[#7C8575] font-['DM_Mono',monospace] mb-2 px-2">
            Navigation
          </div>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#133827] hover:bg-[#EAE6D6] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#E2DFC9] flex justify-between items-center text-xs text-[#5C6656] font-['DM_Mono',monospace]">
            <span>Delhi Studio (IST)</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Available for Select Work
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
