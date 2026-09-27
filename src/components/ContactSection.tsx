import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, Send, MessageSquare, Twitter, Github, Linkedin, Sparkles, Pin, MapPin, Coffee } from 'lucide-react';
import { INITIAL_STICKY_NOTES } from '../data/portfolioData';
import { StickyNote } from '../types';
import { playClickSound, playPaperRustle, playStampSound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(INITIAL_STICKY_NOTES);
  const [authorInput, setAuthorInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'mint' | 'pink' | 'peach'>('yellow');
  const [noteSent, setNoteSent] = useState(false);

  const email = 'kanishqdubey160@gmail.com';

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddStickyNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !messageInput.trim()) return;

    playStampSound();
    const newNote: StickyNote = {
      id: `user-note-${Date.now()}`,
      author: authorInput.trim(),
      message: messageInput.trim(),
      color: selectedColor,
      rotation: (Math.random() - 0.5) * 8,
      date: 'Just Now',
      stamp: 'VISITOR',
    };

    setStickyNotes((prev) => [newNote, ...prev]);
    setAuthorInput('');
    setMessageInput('');
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 3000);
  };

  const colorStyles: Record<string, { bg: string; border: string; text: string; pin: string }> = {
    yellow: { bg: 'bg-[#FEF08A]', border: 'border-[#FDE047]', text: 'text-[#713F12]', pin: 'bg-rose-500' },
    mint: { bg: 'bg-[#D1FAE5]', border: 'border-[#A7F3D0]', text: 'text-[#064E3B]', pin: 'bg-emerald-700' },
    pink: { bg: 'bg-[#FCE7F3]', border: 'border-[#FBCFE8]', text: 'text-[#831843]', pin: 'bg-indigo-600' },
    peach: { bg: 'bg-[#FFEDD5]', border: 'border-[#FED7AA]', text: 'text-[#7C2D12]', pin: 'bg-amber-600' },
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#133827] text-[#FAF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E38] border border-[#2D6A4F] text-xs font-['DM_Mono',monospace] text-[#A7F3D0]">
            <Mail className="w-3.5 h-3.5" />
            <span>Open Channel • Let’s Build Great Software</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#FAF9F5]">
            Let’s build something memorable.
          </h2>
          <p className="text-base sm:text-lg text-[#C2D6CA] font-['Plus_Jakarta_Sans',sans-serif]">
            Whether you’re scaling an engineering org, architecting a 0→1 full-stack product, or want to chat about Delhi food spots, chai stalls & custom mechanical keyboards.
          </p>

          {/* Big Copyable Email Tag */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="copy-email-hero-btn"
              onClick={handleCopyEmail}
              className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#091C13] border-2 border-[#2A654A] hover:border-amber-400 text-[#FAF9F5] shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="font-['DM_Mono',monospace] font-bold text-base sm:text-lg tracking-tight">
                {email}
              </span>
              <div className="p-1.5 rounded-lg bg-[#1F4E38] group-hover:bg-amber-400 group-hover:text-[#133827] transition-colors">
                {copied ? <Check className="w-4 h-4 text-emerald-400 group-hover:text-[#133827]" /> : <Copy className="w-4 h-4" />}
              </div>
            </button>

            {copied && (
              <span className="text-xs font-['DM_Mono',monospace] text-amber-300 font-bold bg-[#0D261A] px-3 py-1.5 rounded-lg border border-amber-400/40 animate-in fade-in">
                ✓ Copied to clipboard!
              </span>
            )}
          </div>
        </div>

        {/* Two Columns: Interactive Sticky Note Composer & Corkboard Guestbook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left Column: Post a Sticky Note Form */}
          <div className="lg:col-span-5 bg-[#FAF9F5] text-[#1E1E1E] p-6 sm:p-8 rounded-3xl border-2 border-[#E2DFC9] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2DFC9] pb-3">
              <div className="flex items-center gap-2 font-['Syne',sans-serif] font-bold text-lg text-[#133827]">
                <MessageSquare className="w-5 h-5 text-emerald-800" />
                <span>Leave a Sticky Note</span>
              </div>
              <span className="text-[10px] font-['DM_Mono',monospace] text-[#7C8575] bg-[#EAE6D6] px-2 py-0.5 rounded">
                STUDIO WALL
              </span>
            </div>

            <form onSubmit={handleAddStickyNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-['DM_Mono',monospace] text-[#5C6656] uppercase mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  required
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="e.g. Alex (Staff Product Designer)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD8C0] text-sm text-[#1E1E1E] focus:outline-none focus:border-[#133827]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-['DM_Mono',monospace] text-[#5C6656] uppercase mb-1">
                  Message / Thought
                </label>
                <textarea
                  required
                  rows={3}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Loved the tactile cutting board! Would love to collaborate on..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DDD8C0] text-sm text-[#1E1E1E] focus:outline-none focus:border-[#133827] resize-none"
                ></textarea>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-xs font-bold font-['DM_Mono',monospace] text-[#5C6656] uppercase mb-1.5">
                  Paper Color:
                </label>
                <div className="flex gap-2">
                  {(['yellow', 'mint', 'pink', 'peach'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedColor(color);
                      }}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        color === 'yellow'
                          ? 'bg-[#FEF08A] border-amber-300'
                          : color === 'mint'
                          ? 'bg-[#D1FAE5] border-emerald-300'
                          : color === 'pink'
                          ? 'bg-[#FCE7F3] border-pink-300'
                          : 'bg-[#FFEDD5] border-orange-300'
                      } ${selectedColor === color ? 'scale-110 shadow-md ring-2 ring-[#133827]' : 'opacity-70 hover:opacity-100'}`}
                      aria-label={`Select ${color} note`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                id="submit-sticky-note-btn"
                className="w-full py-3 rounded-xl bg-[#133827] text-white font-semibold text-sm hover:bg-[#1E4D37] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Pin className="w-4 h-4 text-amber-300" />
                <span>Stick to Corkboard Wall</span>
              </button>

              {noteSent && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-['DM_Mono',monospace] font-bold text-center animate-in fade-in">
                  ✓ Note pinned to studio corkboard!
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Corkboard with Pinned Sticky Notes */}
          <div className="lg:col-span-7 bg-[#452718] p-6 sm:p-8 rounded-3xl border-4 border-[#2A160C] shadow-2xl relative min-h-[420px]">
            {/* Corkboard texture pattern */}
            <div
              className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#2A160C 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between mb-6 pb-2 border-b border-[#683D27]">
              <span className="text-xs font-['DM_Mono',monospace] text-amber-200 uppercase font-bold tracking-widest">
                STUDIO CORKBOARD • LIVE COMMUNITY NOTES
              </span>
              <span className="text-[10px] font-['DM_Mono',monospace] text-amber-300/80">
                {stickyNotes.length} pinned notes
              </span>
            </div>

            {/* Note Pins Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
              {stickyNotes.map((note) => {
                const style = colorStyles[note.color] || colorStyles.yellow;
                return (
                  <motion.div
                    key={note.id}
                    drag
                    dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                    onDragStart={() => playPaperRustle()}
                    style={{ transform: `rotate(${note.rotation}deg)` }}
                    className={`relative p-4 rounded-xs shadow-xl border ${style.bg} ${style.border} ${style.text} cursor-grab active:cursor-grabbing select-none`}
                  >
                    {/* Push Pin */}
                    <div
                      className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${style.pin} shadow-md border-2 border-white`}
                    ></div>

                    <div className="mt-1 font-['Caveat',cursive] text-lg font-bold leading-snug">
                      “{note.message}”
                    </div>

                    <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-['DM_Mono',monospace] font-bold opacity-80">
                      <span>— {note.author}</span>
                      {note.stamp && (
                        <span className="px-1.5 py-0.5 bg-black/10 rounded uppercase">
                          {note.stamp}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Social Links & Studio Info */}
        <div className="mt-16 pt-8 border-t border-[#1F4E38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['DM_Mono',monospace] text-[#9CB5A7]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Kanishq Studio • Hauz Khas, New Delhi, 110016</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter / X</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
