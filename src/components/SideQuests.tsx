import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, Pause, RotateCcw, Volume2, Globe, Gamepad2, Activity, Heart, ArrowRight } from 'lucide-react';
import { SIDE_QUESTS_DATA } from '../data/portfolioData';
import { SideQuest } from '../types';
import { playClickSound, playPaperRustle } from '../utils/sound';

export const SideQuests: React.FC = () => {
  const [activeQuest, setActiveQuest] = useState<string>('drift');

  // --- Drift Ambient Generator State ---
  const [driftPlaying, setDriftPlaying] = useState(false);
  const [driftVolume, setDriftVolume] = useState(60);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const driftAudioRef = useRef<{ osc: OscillatorNode; gain: GainNode; ctx: AudioContext } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleDriftSound = () => {
    playClickSound();
    if (driftPlaying) {
      if (driftAudioRef.current) {
        try {
          driftAudioRef.current.osc.stop();
          driftAudioRef.current.ctx.close();
        } catch {
          // Ignore
        }
        driftAudioRef.current = null;
      }
      setDriftPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(216, ctx.currentTime); // 216Hz relaxing binaural foundation
        gain.gain.setValueAtTime((driftVolume / 100) * 0.05, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        driftAudioRef.current = { osc, gain, ctx };
        setDriftPlaying(true);
      } catch {
        setDriftPlaying(true);
      }
    }
  };

  // --- Triple Time Scrubber State ---
  const [hourOffset, setHourOffset] = useState(14); // 14:00 Cape Town time

  const cities = [
    { name: 'Cape Town (Home)', tz: 2, icon: '🇿🇦' },
    { name: 'London', tz: 1, icon: '🇬🇧' },
    { name: 'New York', tz: -4, icon: '🇺🇸' },
    { name: 'San Francisco', tz: -7, icon: '🇺🇸' },
    { name: 'Tokyo', tz: 9, icon: '🇯🇵' },
  ];

  const formatHour = (baseHour: number, targetTz: number) => {
    // Cape Town is GMT+2
    const diff = targetTz - 2;
    let computed = (baseHour + diff) % 24;
    if (computed < 0) computed += 24;
    const period = computed >= 12 ? 'PM' : 'AM';
    const displayHour = computed % 12 === 0 ? 12 : computed % 12;
    const isWorkHours = computed >= 9 && computed <= 18;
    return {
      time: `${displayHour}:00 ${period}`,
      rawHour: computed,
      isWorkHours,
    };
  };

  // --- Mini 2048 Game State ---
  const [grid, setGrid] = useState<number[]>([2, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(64);

  const handle2048Move = (direction: 'up' | 'down' | 'left' | 'right') => {
    playClickSound();
    setGrid((prev) => {
      const next = [...prev];
      // Simple random slide & merge simulation for delight
      for (let i = 0; i < next.length; i++) {
        if (next[i] > 0 && Math.random() > 0.4) {
          next[i] = next[i] * 2;
          setScore((s) => s + next[i]);
          break;
        }
      }
      const emptyIndices = next.map((val, idx) => (val === 0 ? idx : -1)).filter((idx) => idx !== -1);
      if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        next[randomIdx] = Math.random() > 0.7 ? 4 : 2;
      }
      return next;
    });
  };

  const reset2048 = () => {
    playClickSound();
    setGrid([2, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setScore(64);
  };

  // --- ResQued Foster Card State ---
  const [petIndex, setPetIndex] = useState(0);
  const pets = [
    { name: 'Kona', type: 'Golden Labrador mix', age: '2 yrs', location: 'Camps Bay, CPT', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80', badge: 'Friendly & Good with Kids' },
    { name: 'Milo', type: 'Tabby Kitten', age: '5 mos', location: 'Gardens, CPT', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', badge: 'Playful & Cuddle Bug' },
    { name: 'Ziggy', type: 'Border Collie Rescue', age: '1.5 yrs', location: 'Hout Bay, CPT', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80', badge: 'Trail Hiker & High Energy' },
  ];

  return (
    <section id="side-quests" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F5EE] text-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE6D6] border border-[#D5D0B5] text-xs font-['DM_Mono',monospace] text-[#334131] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Experimental Playground • Code Toys</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-[#133827]">
              Side Quests & Experiments
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#5C6656] max-w-2xl font-['Plus_Jakarta_Sans',sans-serif]">
              Where I explore speculative UI physics, sound synthesis, time zone geometry, and indie side products. Everything below is interactive!
            </p>
          </div>

          {/* Quest Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#EFECE0] p-1.5 rounded-xl border border-[#DDD8C0]">
            {SIDE_QUESTS_DATA.map((quest) => (
              <button
                key={quest.id}
                onClick={() => {
                  playPaperRustle();
                  setActiveQuest(quest.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-['DM_Mono',monospace] font-bold transition-all ${
                  activeQuest === quest.id
                    ? 'bg-[#133827] text-white shadow-sm'
                    : 'text-[#5C6656] hover:text-[#133827] hover:bg-[#EAE6D6]'
                }`}
              >
                {quest.title}
              </button>
            ))}
          </div>
        </div>

        {/* Quest Interactive Stage */}
        <div className="bg-[#FAF9F5] rounded-3xl border-2 border-[#DDD8C0] p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-12 w-28 h-6 bg-amber-200/90 border-x border-amber-300 pointer-events-none"></div>

          {/* 1. DRIFT Ambient Synth & Focus Timer */}
          {activeQuest === 'drift' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-['DM_Mono',monospace] font-bold">
                  Ambient Audio Synthesizer
                </span>
                <h3 className="text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827]">
                  Drift — Sound & Focus
                </h3>
                <p className="text-sm text-[#4A5446] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                  A minimal browser noise generator blending gentle binaural tones (216Hz) and a tactile countdown timer. Built for deep creative focus sessions without YouTube ads or Spotify distractions.
                </p>

                {/* Focus Timer */}
                <div className="p-4 rounded-2xl bg-[#EFECE0] border border-[#DDD8C0] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#7C8575] font-['DM_Mono',monospace] uppercase">Pomodoro Clock</div>
                    <div className="text-2xl font-bold font-['DM_Mono',monospace] text-[#133827]">
                      {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        setTimerActive(!timerActive);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#133827] text-white text-xs font-semibold hover:bg-[#1E4D37] transition-colors"
                    >
                      {timerActive ? 'Pause' : 'Start Focus'}
                    </button>
                    <button
                      onClick={() => {
                        playClickSound();
                        setTimerSeconds(25 * 60);
                        setTimerActive(false);
                      }}
                      className="p-2 rounded-xl bg-[#FAF9F5] border border-[#DDD8C0] text-[#133827] hover:bg-[#EAE6D6]"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sound Controls Board */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#133827] text-white space-y-6 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-amber-300" />
                    <span className="font-['DM_Mono',monospace] font-bold text-sm">SYNTH WAVE: 216Hz SINE</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-['DM_Mono',monospace] ${driftPlaying ? 'bg-emerald-500 text-black font-bold animate-pulse' : 'bg-stone-700 text-stone-300'}`}>
                    {driftPlaying ? 'PLAYING LIVE' : 'STOPPED'}
                  </span>
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="h-20 bg-[#091811] rounded-xl p-3 flex items-center justify-between gap-1 overflow-hidden">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-600 to-amber-300 rounded-full transition-all duration-150"
                      style={{
                        height: driftPlaying
                          ? `${20 + Math.sin(i * 0.5 + Date.now() * 0.003) * 60 + Math.random() * 20}%`
                          : '15%',
                      }}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    id="toggle-drift-audio-btn"
                    onClick={toggleDriftSound}
                    className={`flex-1 py-3 rounded-xl font-['DM_Mono',monospace] font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      driftPlaying
                        ? 'bg-rose-500 hover:bg-rose-600 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-[#133827]'
                    }`}
                  >
                    {driftPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{driftPlaying ? 'Stop Ambient Tone' : 'Play Binaural Tone (Web Audio)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. TRIPLE TIME Interactive Timezone Scrubber */}
          {activeQuest === 'triple-time' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-['DM_Mono',monospace] font-bold">
                    Global Coordination
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827] mt-1">
                    Triple Time — Interactive Zone Scrubber
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif]">
                    Drag the slider to find overlapping awake and working hours between Cape Town and distributed teams.
                  </p>
                </div>

                {/* Cape Town reference */}
                <div className="p-3 bg-[#EFECE0] rounded-xl border border-[#DDD8C0] text-center">
                  <div className="text-[10px] font-['DM_Mono',monospace] text-[#7C8575]">Selected Base Hour:</div>
                  <div className="text-lg font-bold font-['DM_Mono',monospace] text-[#133827]">
                    {hourOffset}:00 (Cape Town)
                  </div>
                </div>
              </div>

              {/* Time Slider */}
              <div className="space-y-2 bg-[#EAE6D6] p-4 rounded-2xl border border-[#DDD8C0]">
                <div className="flex justify-between text-xs font-['DM_Mono',monospace] text-[#5C6656]">
                  <span>00:00 (Midnight)</span>
                  <span>12:00 (Noon)</span>
                  <span>23:00 (Night)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={hourOffset}
                  onChange={(e) => {
                    setHourOffset(parseInt(e.target.value, 10));
                    playClickSound();
                  }}
                  className="w-full h-3 bg-[#133827] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* City Clocks Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {cities.map((c) => {
                  const info = formatHour(hourOffset, c.tz);
                  return (
                    <div
                      key={c.name}
                      className={`p-4 rounded-xl border transition-all ${
                        info.isWorkHours
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-xl">{c.icon}</span>
                        <span
                          className={`text-[10px] font-['DM_Mono',monospace] font-bold px-1.5 py-0.5 rounded ${
                            info.isWorkHours ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {info.isWorkHours ? 'WORKING HRS' : 'OFF HOURS'}
                        </span>
                      </div>
                      <div className="text-sm font-bold font-['Syne',sans-serif]">{c.name}</div>
                      <div className="text-xl font-extrabold font-['DM_Mono',monospace] mt-1 text-[#133827]">
                        {info.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. TF2048 Mini Game */}
          {activeQuest === 'puzzle-2048' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-['DM_Mono',monospace] font-bold">
                  Arcade Micro-Game
                </span>
                <h3 className="text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827]">
                  TF2048 — Sliding Tile Arcade
                </h3>
                <p className="text-sm text-[#4A5446] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                  A compact, responsive tribute to the classic number-merging puzzle, styled with retro typography, custom color tokens, and instant mechanical key controls.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="p-3 bg-[#EFECE0] rounded-xl border border-[#DDD8C0] text-center">
                    <span className="text-[10px] font-['DM_Mono',monospace] text-[#7C8575] block">SCORE</span>
                    <span className="text-2xl font-bold font-['DM_Mono',monospace] text-[#133827]">{score}</span>
                  </div>
                  <button
                    onClick={reset2048}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#DDD8C0] text-xs font-semibold text-[#133827] hover:bg-[#EAE6D6] flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Board</span>
                  </button>
                </div>
              </div>

              {/* 2048 Board Stage */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-64 h-64 bg-[#133827] p-2.5 rounded-2xl grid grid-cols-4 gap-2 shadow-2xl border-2 border-[#091811]">
                  {grid.map((num, i) => (
                    <div
                      key={i}
                      className={`rounded-lg flex items-center justify-center font-['DM_Mono',monospace] font-black text-base sm:text-lg transition-all duration-150 ${
                        num === 0
                          ? 'bg-[#1C4D36]/40 text-transparent'
                          : num === 2
                          ? 'bg-[#FAF9F5] text-[#133827] shadow-xs'
                          : num === 4
                          ? 'bg-[#FEF08A] text-[#713F12] shadow-xs'
                          : num === 8
                          ? 'bg-[#FDBA74] text-[#7C2D12] shadow-xs'
                          : num === 16
                          ? 'bg-[#F87171] text-white shadow-xs'
                          : num === 32
                          ? 'bg-[#E11D48] text-white shadow-sm'
                          : 'bg-amber-400 text-black font-extrabold shadow-md scale-105'
                      }`}
                    >
                      {num > 0 ? num : ''}
                    </div>
                  ))}
                </div>

                {/* Direction Controls */}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <button
                    onClick={() => handle2048Move('up')}
                    className="px-4 py-1.5 bg-[#FAF9F5] border border-[#DDD8C0] rounded-lg text-xs font-bold font-['DM_Mono',monospace] shadow-xs hover:bg-[#EAE6D6]"
                  >
                    ▲ UP
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handle2048Move('left')}
                      className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8C0] rounded-lg text-xs font-bold font-['DM_Mono',monospace] shadow-xs hover:bg-[#EAE6D6]"
                    >
                      ◀ LEFT
                    </button>
                    <button
                      onClick={() => handle2048Move('down')}
                      className="px-4 py-1.5 bg-[#FAF9F5] border border-[#DDD8C0] rounded-lg text-xs font-bold font-['DM_Mono',monospace] shadow-xs hover:bg-[#EAE6D6]"
                    >
                      ▼ DOWN
                    </button>
                    <button
                      onClick={() => handle2048Move('right')}
                      className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8C0] rounded-lg text-xs font-bold font-['DM_Mono',monospace] shadow-xs hover:bg-[#EAE6D6]"
                    >
                      RIGHT ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. WHO'S SPEAKING Audio Visualizer */}
          {activeQuest === 'audio-vis' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-['DM_Mono',monospace] font-bold">
                  DSP Audio Analyzer
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827] mt-1">
                  Who’s Speaking? — Tactile CRT Equalizer
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6656] font-['Plus_Jakarta_Sans',sans-serif]">
                  Experiment in rendering live multi-speaker audio channels with retro phosphor-green CRT visual meters.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#091811] border-4 border-[#133827] text-[#A7F3D0] space-y-4 shadow-2xl font-['DM_Mono',monospace]">
                <div className="flex justify-between items-center text-xs text-emerald-400/80 border-b border-emerald-900 pb-2">
                  <span>CHANNEL 01 • ACTIVE AUDIO STREAM</span>
                  <span>SAMPLE RATE: 48,000 Hz</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Jackie (Lead)', 'Alex (Eng)', 'Maya (Product)'].map((speaker, sIdx) => (
                    <div key={speaker} className="p-3 bg-[#0D261A] rounded-xl border border-emerald-800/60 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{speaker}</span>
                        <span className="text-amber-400">{sIdx === 0 ? 'MIC LIVE' : 'LISTENING'}</span>
                      </div>
                      <div className="h-16 flex items-end justify-between gap-1">
                        {Array.from({ length: 12 }).map((_, bar) => (
                          <div
                            key={bar}
                            className="flex-1 bg-emerald-400 rounded-xs"
                            style={{
                              height: `${Math.max(10, Math.sin(bar * 0.8 + sIdx * 2 + Date.now() * 0.002) * (sIdx === 0 ? 90 : 25))}%`,
                              opacity: sIdx === 0 ? 0.9 : 0.4,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. RESQUED Pet Foster Concept */}
          {activeQuest === 'resqued' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-['DM_Mono',monospace] font-bold">
                  Community Impact Prototype
                </span>
                <h3 className="text-3xl font-extrabold font-['Syne',sans-serif] text-[#133827]">
                  ResQued — Pet Foster Matcher
                </h3>
                <p className="text-sm text-[#4A5446] font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
                  A mobile-first card flow for emergency foster animal homes in Cape Town. Swipe or click next to preview prospective shelter pets needing temporary love.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      playPaperRustle();
                      setPetIndex((prev) => (prev + 1) % pets.length);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#133827] text-white font-semibold text-sm hover:bg-[#1E4D37] flex items-center gap-2"
                  >
                    <span>Next Pet Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">
                    {petIndex + 1} of {pets.length} Cape Town rescues
                  </span>
                </div>
              </div>

              {/* Pet Card Preview */}
              <div className="lg:col-span-6 flex justify-center">
                <motion.div
                  key={petIndex}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-72 bg-white p-3.5 pb-5 rounded-2xl shadow-xl border border-stone-300"
                >
                  <img
                    src={pets[petIndex].image}
                    alt={pets[petIndex].name}
                    className="w-full h-56 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-bold font-['Syne',sans-serif] text-[#133827]">
                        {pets[petIndex].name}
                      </h4>
                      <span className="text-xs font-['DM_Mono',monospace] text-[#7C8575]">
                        {pets[petIndex].age}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C6656]">{pets[petIndex].type} • {pets[petIndex].location}</p>
                    <div className="pt-2">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-[#713F12] text-[10px] font-['DM_Mono',monospace] font-bold">
                        ♥ {pets[petIndex].badge}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
