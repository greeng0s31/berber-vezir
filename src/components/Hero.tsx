import { Phone, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, getShopStatus } from '../data/barberData';
import heroBg from '../assets/images/barber_hero_bg_1788790038320.jpg';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  const status = getShopStatus();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#121212]">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Berber Vezir Koltuğu ve Salonu"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.4] contrast-[1.15]"
        />
        {/* Radial vignette and gold ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#141414]/70 to-[#121212]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-[#121212]/95" />
      </div>

      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1a1a]/90 border border-[#d4af37]/30 text-xs sm:text-sm text-[#e0e0e0] mb-6 backdrop-blur-md shadow-lg">
          <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-semibold text-[#f5f5f5]">{status.text}</span>
          <span className="text-[#666666]">•</span>
          <span className="text-[#c0c0c0] hidden sm:inline">{status.details}</span>
          <span className="text-[#c0c0c0] sm:hidden">Hamitler</span>
        </div>

        {/* Brand Crest / Icon */}
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <div className="p-2 rounded-full border border-[#d4af37]/40 bg-[#1a1a1a]/80 text-[#d4af37]">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Main Title: Büyük ve dikkat çekici */}
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-[#f5f5f5] mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-b from-[#ffffff] via-[#f0f0f0] to-[#cccccc] bg-clip-text text-transparent">
            {BUSINESS_INFO.name}
          </span>
        </h1>

        {/* Subtitle: "Erkek Kuaförü | Hamitler Mahallesi" */}
        <p className="font-['Montserrat',sans-serif] text-lg sm:text-2xl font-medium tracking-wider text-[#d4af37] mb-6 uppercase">
          {BUSINESS_INFO.title} <span className="text-[#666666] font-normal mx-2">|</span> {BUSINESS_INFO.locationText}
        </p>

        <p className="max-w-xl text-sm sm:text-base text-[#bfbfbf] leading-relaxed mb-8">
          Kafa yapınıza uygun özel saç kesimi, sakal tıraşı, canlandırıcı saç yıkama ve cilt bakımı ile kendinizi yenileyin.
        </p>

        {/* Big CTA Button: "Randevu Al" (Altın / Altın sarısı lüks buton) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onOpenAppointment}
            id="hero-appointment-btn"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5bd3d] to-[#cda52e] text-[#121212] font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#121212]" />
            <span>Randevu Al</span>
          </button>

          {/* Tıkla Ara Butonu */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="hero-call-btn"
            className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-xl bg-[#1c1c1c]/90 hover:bg-[#262626] text-[#f5f5f5] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-base tracking-wide flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <Phone className="w-5 h-5 text-[#d4af37]" />
            <span className="font-mono">{BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-[#262626] w-full max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[#d4af37] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-[#888888]">Çalışma Saatleri</p>
              <p className="text-xs sm:text-sm font-semibold text-[#f0f0f0]">09:00 - 21:00</p>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1c1c1c] border border-[#333333] group-hover:border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shrink-0 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-[#888888]">Konum</p>
              <p className="text-xs sm:text-sm font-semibold text-[#f0f0f0] group-hover:text-[#d4af37] transition-colors">Hamitler, Bursa</p>
            </div>
          </a>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[#d4af37] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-[#888888]">Hizmet Kalitesi</p>
              <p className="text-xs sm:text-sm font-semibold text-[#f0f0f0]">Usta Berberlik</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
