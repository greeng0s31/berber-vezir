import { Phone, Calendar, Clock, Play } from 'lucide-react';
import { BUSINESS_INFO, ASSETS, getShopStatus } from '../data/barberData';

interface HeaderProps {
  onOpenAppointment: () => void;
  onReplayIntro?: () => void;
  onOpenAdmin?: () => void;
}

export default function Header({ onOpenAppointment, onReplayIntro, onOpenAdmin }: HeaderProps) {
  const status = getShopStatus();

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo & Brand (Sol üstteki logoya basınca Admin Paneli açılır) */}
        <button
          onClick={onOpenAdmin}
          id="header-logo-admin-trigger"
          title="Berber Vezir (Yönetici Paneli için Tıklayın)"
          className="flex items-center gap-3.5 group text-left cursor-pointer border-none bg-transparent p-0"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-gradient-to-br from-[#d4af37] via-[#f7e49a] to-[#8a6a16] shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(212,175,55,0.55)] transition-all shrink-0">
            <div className="w-full h-full bg-[#111111] rounded-[14px] overflow-hidden flex items-center justify-center p-1 relative">
              <img
                src={ASSETS.logo}
                alt="Berber Vezir Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.45)]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold tracking-wider text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors leading-none mb-1">
              BERBER VEZİR
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#8e8e8e] font-medium tracking-normal group-hover:text-[#b0b0b0] transition-colors">
              Erkek Kuaförü • Hamitler, Bursa
            </span>
          </div>
        </button>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#b8b8b8]">
          <a
            href="#randevu-menusu"
            className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Müsaitlik & Menü</span>
          </a>
          <a
            href="#hizmetler"
            className="hover:text-[#d4af37] transition-colors"
          >
            Hizmet & Fiyat
          </a>
          <a
            href="#galeri"
            className="hover:text-[#d4af37] transition-colors"
          >
            Modeller
          </a>
          <a
            href="#iletisim"
            className="hover:text-[#d4af37] transition-colors"
          >
            İletişim & Harita
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Intro Button */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              id="replay-intro-btn"
              title="Giriş Animasyonunu İzle"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] hover:border-[#d4af37]/40 text-xs font-semibold text-[#c0c0c0] hover:text-[#d4af37] transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#d4af37]" />
              <span>Giriş</span>
            </button>
          )}

          {/* Call Button */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            id="header-call-btn"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#1e1e1e] hover:bg-[#252525] text-[#f5f5f5] border border-[#333333] hover:border-[#d4af37]/50 text-sm font-semibold transition-all active:scale-95"
            title="Telefonla Ara"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden sm:inline font-mono text-xs tracking-wide">{BUSINESS_INFO.phone}</span>
            <span className="sm:hidden text-xs">Ara</span>
          </a>

          {/* Randevu Al Button */}
          <button
            onClick={onOpenAppointment}
            id="header-appointment-btn"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89327] hover:from-[#e5bd3d] hover:to-[#cda52e] text-[#121212] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#121212]" />
            <span>Randevu Al</span>
          </button>
        </div>
      </div>
    </header>
  );
}
