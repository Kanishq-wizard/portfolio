import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Layers, RotateCcw, Stamp, Move, Sparkles, Check, Info } from 'lucide-react';
import { INITIAL_CUTTING_BOARD_ITEMS } from '../data/portfolioData';
import { CuttingBoardItem, StampMark } from '../types';
import { playPaperRustle, playStampSound, playClickSound } from '../utils/sound';
import kanishqDeskPhoto from '../assets/images/kanishq_desk_photo_1790498804128.jpg';

export const CuttingBoard: React.FC = () => {
  const [items, setItems] = useState<CuttingBoardItem[]>(INITIAL_CUTTING_BOARD_ITEMS);
  const [stamps, setStamps] = useState<StampMark[]>([]);
  const [selectedStampType, setSelectedStampType] = useState<'APPROVED' | 'WIP' | '10/10' | 'SHIP IT' | 'CRAFT'>('APPROVED');
  const [stampToolActive, setStampToolActive] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    playClickSound();
    setItems(INITIAL_CUTTING_BOARD_ITEMS);
    setStamps([]);
  };

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stampToolActive || !boardRef.current) return;

    // Do not stamp if clicked directly on an interactive button or control
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors: Record<string, string> = {
      APPROVED: '#166534',
      WIP: '#B45309',
      '10/10': '#B91C1C',
      'SHIP IT': '#1E40AF',
      CRAFT: '#6B21A8',
    };

    const newStamp: StampMark = {
      id: `stamp-${Date.now()}`,
      x,
      y,
      text: selectedStampType,
      color: colors[selectedStampType] || '#B43B22',
      rotation: (Math.random() - 0.5) * 24,
    };

    setStamps((prev) => [...prev, newStamp]);
    playStampSound();
  };

  return (
    <section id="cutting-board" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#133827] text-[#FAF9F5] overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F4E38] border border-[#2D6A4F] text-xs font-['DM_Mono',monospace] text-[#A7F3D0] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Studio Workshop • Interactive Canvas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#FAF9F5]">
              The Cutting Board
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#C2D6CA] max-w-2xl font-['Plus_Jakarta_Sans',sans-serif]">
              A recreation of my physical desk cutting mat in Delhi. Drag sketches, color swatches, wireframes, and use the stamp tool to leave your mark.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 bg-[#0D261A] p-2 rounded-xl border border-[#23533D] shadow-lg">
            {/* Stamp Tool Toggle */}
            <button
              id="toggle-stamp-tool"
              onClick={() => {
                playClickSound();
                setStampToolActive(!stampToolActive);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-['DM_Mono',monospace] font-bold flex items-center gap-1.5 transition-all ${
                stampToolActive
                  ? 'bg-amber-400 text-[#133827] shadow-sm'
                  : 'bg-[#1F4E38] text-[#E8EFE6] hover:bg-[#2A654A]'
              }`}
            >
              <Stamp className="w-4 h-4" />
              <span>{stampToolActive ? 'Stamp Mode: ON' : 'Stamp Tool'}</span>
            </button>

            {/* Stamp Type Selector */}
            {stampToolActive && (
              <div className="flex items-center gap-1">
                {(['APPROVED', 'WIP', '10/10', 'SHIP IT', 'CRAFT'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      playClickSound();
                      setSelectedStampType(type);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-bold font-['DM_Mono',monospace] transition-all ${
                      selectedStampType === type
                        ? 'bg-white text-[#133827]'
                        : 'bg-[#1A4330] text-[#9CB5A7] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            {/* Reset Button */}
            <button
              id="reset-cutting-board-btn"
              onClick={handleReset}
              className="px-3 py-2 rounded-lg text-xs font-['DM_Mono',monospace] text-[#C2D6CA] hover:text-white hover:bg-[#1F4E38] transition-colors flex items-center gap-1"
              title="Reset items position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Interactive Self-Healing Cutting Mat */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={boardRef}
          onClick={handleBoardClick}
          className={`relative w-full h-[540px] sm:h-[600px] lg:h-[640px] rounded-2xl border-4 border-[#091811] shadow-2xl overflow-hidden select-none transition-all ${
            stampToolActive ? 'cursor-crosshair' : 'cursor-default'
          }`}
          style={{
            backgroundColor: '#0F3021',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
          }}
        >
          {/* Angle Guides on the Cutting Mat */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="800" y2="800" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="300" x2="600" y2="0" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50%" cy="50%" r="180" stroke="#FFF" strokeWidth="1" fill="none" strokeDasharray="2 6" />
            <circle cx="50%" cy="50%" r="90" stroke="#FFF" strokeWidth="1" fill="none" strokeDasharray="2 6" />
          </svg>

          {/* Mat Branding & Rulers */}
          <div className="absolute top-3 left-4 text-[11px] font-['DM_Mono',monospace] text-emerald-400/60 pointer-events-none tracking-widest uppercase">
            KANISHQ STUDIO • SELF-HEALING MAT NO. 2026 • 900 x 600mm
          </div>

          <div className="absolute bottom-3 right-4 text-[10px] font-['DM_Mono',monospace] text-emerald-400/50 pointer-events-none">
            ANGLE GUIDES: 30° / 45° / 60° • DELHI HQ
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-1.5 text-xs font-['DM_Mono',monospace] text-emerald-300/70 bg-[#091C13]/60 px-2.5 py-1 rounded backdrop-blur-xs">
            <Move className="w-3.5 h-3.5" />
            <span>Drag items freely around the board</span>
          </div>

          {/* User Stamped Marks */}
          {stamps.map((stamp) => (
            <div
              key={stamp.id}
              style={{
                left: stamp.x,
                top: stamp.y,
                transform: `translate(-50%, -50%) rotate(${stamp.rotation}deg)`,
                color: stamp.color,
                borderColor: stamp.color,
              }}
              className="absolute pointer-events-none border-2 border-dashed px-3 py-1 font-['DM_Mono',monospace] font-black text-sm tracking-wider uppercase bg-white/90 backdrop-blur-xs shadow-md animate-in zoom-in-75 duration-100"
            >
              {stamp.text}
            </div>
          ))}

          {/* Draggable Artifacts on the Mat */}

          {/* Artifact 1: Studio Polaroid with Doodle */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.04, zIndex: 30 }}
            whileTap={{ scale: 0.98 }}
            className="absolute cursor-grab active:cursor-grabbing w-52 bg-white p-2.5 pb-4 rounded-xs shadow-2xl border border-stone-300 top-8 left-8 transform -rotate-3"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/90 border-x border-amber-300/60 shadow-xs pointer-events-none"></div>
            <img
              src={kanishqDeskPhoto}
              alt="Desk Setup Photo"
              className="w-full h-36 object-cover rounded-xs"
              referrerPolicy="no-referrer"
            />
            <div className="mt-2 text-center font-['Caveat',cursive] text-base font-bold text-stone-800">
              Studio Setup DEL • Masala Chai & Mechanical Keyboard
            </div>
          </motion.div>

          {/* Artifact 2: Color Swatch Palette */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.04, zIndex: 30 }}
            className="absolute cursor-grab active:cursor-grabbing w-64 bg-[#FAF9F5] p-3 rounded-lg shadow-xl border border-stone-300 top-16 right-12 transform rotate-4 text-stone-900"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="text-xs font-bold font-['DM_Mono',monospace]">HERITAGE PALETTE</span>
              <span className="text-[10px] text-stone-500 font-['DM_Mono',monospace]">v2.4</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="space-y-1">
                <div className="w-full h-12 bg-[#133827] rounded border border-black/20"></div>
                <div className="text-[9px] font-['DM_Mono',monospace] font-bold text-stone-700">#133827</div>
                <div className="text-[8px] text-stone-500">Forest Emerald</div>
              </div>
              <div className="space-y-1">
                <div className="w-full h-12 bg-[#D97706] rounded border border-black/20"></div>
                <div className="text-[9px] font-['DM_Mono',monospace] font-bold text-stone-700">#D97706</div>
                <div className="text-[8px] text-stone-500">Delhi Gold</div>
              </div>
              <div className="space-y-1">
                <div className="w-full h-12 bg-[#B43B22] rounded border border-black/20"></div>
                <div className="text-[9px] font-['DM_Mono',monospace] font-bold text-stone-700">#B43B22</div>
                <div className="text-[8px] text-stone-500">Spice Crimson</div>
              </div>
            </div>
          </motion.div>

          {/* Artifact 3: Tactile Wireframe Note with interactive switch */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.03, zIndex: 30 }}
            className="absolute cursor-grab active:cursor-grabbing w-72 bg-[#F3F4F6] p-4 rounded-xl shadow-2xl border-2 border-[#1E293B] top-44 left-1/3 transform -rotate-2 text-stone-900"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-[10px] font-bold font-['DM_Mono',monospace] text-stone-600">UI_PROTOTYPE.fig</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-stone-300 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span>Express 1-Tap Checkout</span>
                <span className="text-[10px] text-emerald-700 font-['DM_Mono',monospace] bg-emerald-100 px-1.5 py-0.5 rounded">READY</span>
              </div>
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#133827]"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-600 font-['DM_Mono',monospace]">
                <span>Friction Reduction</span>
                <span className="font-bold text-[#133827]">-65% time</span>
              </div>
            </div>
            <div className="mt-2 font-['Caveat',cursive] text-base text-[#B43B22] font-bold">
              “Zero cognitive clutter on final payment screen.”
            </div>
          </motion.div>

          {/* Artifact 4: Washi Tape Strip */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            className="absolute cursor-grab active:cursor-grabbing w-64 bg-amber-300/90 backdrop-blur-xs py-2 px-4 shadow-md border-y border-amber-400 bottom-16 left-12 transform -rotate-6 text-[#451A03] font-['DM_Mono',monospace] font-black text-xs text-center tracking-wider"
          >
            ✦ CRAFT OVER TEMPLATES ✦
          </motion.div>

          {/* Artifact 5: Hand-Drawn Sketch Post-it */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.04, zIndex: 30 }}
            className="absolute cursor-grab active:cursor-grabbing w-60 bg-[#FEF08A] p-3.5 rounded-xs shadow-lg border border-[#FDE047] bottom-12 right-20 transform rotate-6 text-stone-900"
          >
            <div className="font-['Caveat',cursive] text-lg font-bold text-[#713F12] leading-snug">
              “Design is not what it looks like in a pitch deck; it is how effortlessly someone solves their problem when nobody is watching.”
            </div>
            <div className="mt-1 text-[10px] text-right font-['DM_Mono',monospace] text-[#854D0E]">
              — Notebook #14
            </div>
          </motion.div>

          {/* Artifact 6: Luggage Badge */}
          <motion.div
            drag
            dragConstraints={boardRef}
            onDragStart={() => playPaperRustle()}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            className="absolute cursor-grab active:cursor-grabbing w-40 bg-[#E11D48] text-white p-2.5 rounded-lg shadow-xl top-64 right-1/4 transform -rotate-12"
          >
            <div className="text-[10px] font-bold font-['DM_Mono',monospace] tracking-widest">
              PASSENGER PASS
            </div>
            <div className="text-xl font-extrabold font-['Syne',sans-serif]">DEL ➔ SFO</div>
            <div className="text-[9px] opacity-80 font-['DM_Mono',monospace]">DESIGN SYSTEMS</div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
