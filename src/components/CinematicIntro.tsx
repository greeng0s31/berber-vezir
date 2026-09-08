import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/barberData';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Stages:
  // 0: Master barber preparing the cut (establishing shot)
  // 1: Clipper approaches hairline (camera tracking focus)
  // 2: The Strike! Fast camera punch-zoom & optical motion blur (real documentary camera feel)
  // 3: Natural lens fade into the main site
  const [stage, setStage] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Natural ambient clipper vibration sound via Web Audio API
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;

    if (soundEnabled && stage >= 1 && stage <= 2) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();
        osc = audioCtx.createOscillator();
        gain = audioCtx.createGain();

        // Realistic clipper motor tone (~115Hz warm buzz)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(115, audioCtx.currentTime);
        if (stage === 2) {
          // Subtle motor load change when blade cuts hair
          osc.frequency.exponentialRampToValueAtTime(130, audioCtx.currentTime + 0.35);
          gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        } else {
          gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        }

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
      } catch (e) {
        console.warn('AudioContext requires user gesture', e);
      }
    }

    return () => {
      try {
        if (osc) osc.stop();
        if (audioCtx && audioCtx.state !== 'closed') audioCtx.close();
      } catch {
        // ignore cleanup error
      }
    };
  }, [stage, soundEnabled]);

  useEffect(() => {
    // Realistic camera sequence timing:
    // 0 -> 1.1s: Atmosphere & Logo
    // 1.1s -> 2.4s: Clipper aligns with hairline
    // 2.4s -> 3.3s: Fast camera punch zoom + optical blur
    // 3.3s -> 3.9s: Smooth dissolve to app
    const timer1 = setTimeout(() => setStage(1), 1100);
    const timer2 = setTimeout(() => setStage(2), 2400);
    const timer3 = setTimeout(() => setStage(3), 3300);
    const timer4 = setTimeout(() => onComplete(), 3900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 bg-[#0c0c0c] text-[#f5f5f5] flex items-center justify-center overflow-hidden select-none"
      >
        {/* Cinematic Widescreen Letterbox Bars */}
        <motion.div
          className="absolute top-0 inset-x-0 bg-[#080808] z-30 pointer-events-none"
          initial={{ height: '7vh' }}
          animate={stage >= 2 ? { height: '0vh' } : { height: '7vh' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute bottom-0 inset-x-0 bg-[#080808] z-30 pointer-events-none"
          initial={{ height: '7vh' }}
          animate={stage >= 2 ? { height: '0vh' } : { height: '7vh' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Top Controls: Skip & Audio */}
        <div className="absolute top-8 right-8 z-40 flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-black/70 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#1a1a1a] transition-all cursor-pointer backdrop-blur-md"
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            aria-label="Ses Ayarı"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onComplete}
            id="skip-intro-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/70 border border-[#d4af37]/40 hover:border-[#d4af37] text-xs uppercase tracking-widest font-bold text-[#d4af37] hover:text-white hover:bg-[#d4af37]/20 transition-all cursor-pointer backdrop-blur-md shadow-lg"
          >
            <span>Doğrudan Menüye Geç</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Realistic Camera Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Photorealistic Clipper Image with authentic optical camera push & blur */}
          <motion.div
            className="absolute inset-0 w-full h-full origin-[48%_45%]"
            initial={{ scale: 1, filter: 'brightness(0.55) blur(0px)' }}
            animate={
              stage === 0
                ? {
                    scale: 1.04,
                    filter: 'brightness(0.45) blur(1px)',
                    transition: { duration: 1.1, ease: 'easeOut' },
                  }
                : stage === 1
                ? {
                    scale: 1.18,
                    filter: 'brightness(0.7) blur(0px)',
                    transition: { duration: 1.3, ease: 'easeInOut' },
                  }
                : stage === 2
                ? {
                    // Fast camera punch zoom directly into the fade cut point!
                    scale: 2.75,
                    filter: 'brightness(0.95) blur(4px) contrast(1.15)',
                    transition: {
                      scale: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                      filter: { duration: 0.85, ease: 'easeOut' },
                    },
                  }
                : {
                    scale: 3.4,
                    filter: 'brightness(1.4) blur(10px)',
                    opacity: 0,
                    transition: { duration: 0.55, ease: 'easeIn' },
                  }
            }
          >
            <img
              src={ASSETS.clipper}
              alt="Berber Makina Saç Kesimi"
              className="w-full h-full object-cover object-center"
            />

            {/* Subtle photographic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]/80" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0c0c0c]/40 to-[#0c0c0c]/90" />
          </motion.div>

          {/* Natural Optical Lens Flash on Blade Contact (Stage 2 to 3) */}
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.65, 0] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 bg-gradient-to-t from-transparent via-[#f7e49a]/25 to-transparent pointer-events-none z-10"
            />
          )}
        </div>

        {/* Foreground Content: Prominent Gold V Logo & Studio Title */}
        <div className="relative z-20 text-center px-4 max-w-xl mx-auto flex flex-col items-center">
          {stage < 2 ? (
            <motion.div
              key="intro-brand"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.25,
                filter: 'blur(8px)',
                transition: { duration: 0.35, ease: 'easeIn' },
              }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Distinct, Large Luxury "V" Emblem */}
              <div className="relative mb-5">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-br from-[#d4af37] via-[#f7e49a] to-[#8a6a16] shadow-[0_0_45px_rgba(212,175,55,0.45)] flex items-center justify-center">
                  <div className="w-full h-full bg-[#111111] rounded-[22px] overflow-hidden flex items-center justify-center p-2.5">
                    <img
                      src={ASSETS.logo}
                      alt="Berber Vezir Amblemi"
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1a1a]/90 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] tracking-widest uppercase mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Usta Berber Sanatı
              </div>

              <h1 className="font-['Cinzel',serif] text-4xl sm:text-6xl font-bold tracking-wider text-[#f5f5f5] mb-2 drop-shadow-xl">
                BERBER VEZİR
              </h1>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base font-semibold text-[#d4af37] tracking-widest uppercase mb-6">
                Hamitler Mahallesi • Bursa
              </p>

              {/* Status indicator */}
              <div className="flex items-center gap-2.5 text-xs text-[#a5a5a5] bg-[#141414]/85 px-5 py-2.5 rounded-full border border-[#2a2a2a] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                <span className="font-medium">
                  {stage === 0 ? 'Salona Hazırlanılıyor...' : 'Usta Makina Teması & Randevu Menüsü...'}
                </span>
              </div>
            </motion.div>
          ) : (
            /* Punch Zoom Moment */
            <motion.div
              key="zoom-impact"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [0.85, 1.15, 1] }}
              exit={{ opacity: 0, scale: 1.4, filter: 'blur(6px)' }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <span className="font-['Cinzel',serif] text-3xl sm:text-5xl font-black tracking-widest uppercase bg-gradient-to-r from-white via-[#f7e49a] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]">
                KUSURSUZ KESİM
              </span>
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase mt-2">
                CANLI MÜSAİTLİK & MENÜ AÇILIYOR...
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom Progress Line */}
        <div className="absolute bottom-8 inset-x-8 max-w-sm mx-auto z-40">
          <div className="h-1 bg-[#222222] rounded-full overflow-hidden border border-[#333333]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#99791b] via-[#d4af37] to-[#f7e49a]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-[#888888] font-medium mt-2">
            <span>Berber Vezir</span>
            <span>Hamitler / Bursa</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
