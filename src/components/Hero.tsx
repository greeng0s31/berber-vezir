import { Phone, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, ASSETS, getShopStatus } from '../data/barberData';

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
          src={ASSETS.interior}
          alt="Berber Vezir Koltuğu ve Salonu"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.2] saturate-[0.9]"
        />
        {/* Radial vignette and gold ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/75 to-[#121212]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-[#121212]/95" />
      </div>

      {/* Decorative Gold Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616]/90 border border-[#d4af37]/35 text-xs sm:text-sm text-[#e0e0e0] mb-6 backdrop-blur-md shadow-lg">
          <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-semibold text-[#f5f5f5]">{status.text}</span>
          <span className="text-[#666666]">•</span>
          <span className="text-[#c0c0c0] hidden sm:inline">{status.details}</span>
          <span className="text-[#c0c0c0] sm:hidden">Hamitler</span>
        </div>

        {/* Brand Crest / Large Bold V Logo */}
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-gradient-to-br from-[#d4af37] via-[#f7e49a] to-[#8a6a16] shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#111111] rounded-[22px] overflow-hidden flex items-center justify-center p-2">
              <img
                src={ASSETS.logo}
                alt="Berber Vezir Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)]"
              />
            </div>
          </div>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Main Title */}
        <h1 className="font-['Cinzel',serif] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-[#f5f5f5] mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          <span className="bg-gradient-to-b from-[#ffffff] via-[#f5f5f5] to-[#dcdcdc] bg-clip-text text-transparent">
            {BUSINESS_INFO.name}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-xl font-bold tracking-widest text-[#d4af37] mb-6 uppercase">
          {BUSINESS_INFO.title} <span className="text-[#666666] font-normal mx-2">•</span> {BUSINESS_INFO.locationText}
        </p>

        <p className="max-w-xl text-sm sm:text-base text-[#cfcfcf] leading-relaxed mb-8 font-normal">
          Kafa yapınıza uygun özel saç kesimi, sakal tıraşı, canlandırıcı saç yıkama ve cilt bakımı ile kendinizi yenileyin.
        </p>

        {/* Big CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onOpenAppointment}
            id="hero-appointment-btn"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5bd3d] to-[#cda52e] text-[#121212] font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#121212]" />
            <span>Hemen Randevu Al</span>
          </button>

          {/* Müsait Saatler Butonu */}
          <a
            href="#randevu-menusu"
            id="hero-schedule-btn"
            className="w-full sm:w-auto px-6 sm:px-7 py-4 rounded-xl bg-[#1c1c1c]/90 hover:bg-[#252525] text-[#d4af37] hover:text-[#f5f5f5] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-base tracking-wide flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
          >
            <Clock className="w-5 h-5 text-[#d4af37]" />
            <span>Müsait Saatleri Gör</span>
          </a>

          {/* Tıkla Ara Butonu */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="hero-call-btn"
            className="w-full sm:w-auto px-5 py-4 rounded-xl bg-[#181818]/85 hover:bg-[#222222] text-[#f5f5f5] border border-[#333333] hover:border-[#d4af37]/60 font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span className="font-mono">{BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-[#262626] w-full max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[#d4af37] shrink-0">
              <Clock className="w-5 h-5" />
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
            <div className="w-10 h-10 rounded-xl bg-[#1c1c1c] border border-[#333333] group-hover:border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shrink-0 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#888888]">Salon Konumu</p>
              <p className="text-xs sm:text-sm font-semibold text-[#f0f0f0] group-hover:text-[#d4af37] transition-colors">Hamitler, Bursa</p>
            </div>
          </a>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[#d4af37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#888888]">Hizmet Standartı</p>
              <p className="text-xs sm:text-sm font-semibold text-[#f0f0f0]">Usta Berberlik</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

