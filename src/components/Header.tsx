import { Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { BUSINESS_INFO, getShopStatus } from '../data/barberData';

interface HeaderProps {
  onOpenAppointment: () => void;
}

export default function Header({ onOpenAppointment }: HeaderProps) {
  const status = getShopStatus();

  return (
    <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-lg bg-[#1a1a1a] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#d4af37] group-hover:scale-105 transition-all">
            <span className="font-['Cinzel',serif] font-bold text-xl tracking-wider">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Cinzel',serif] text-lg sm:text-xl font-bold tracking-wider text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors">
              BERBER VEZİR
            </span>
            <span className="text-xs text-[#a0a0a0] flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-[#d4af37]" />
              Hamitler, Bursa
            </span>
          </div>
        </a>

        {/* Center Live Status Badge (Desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-xs">
          <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="text-[#dcdcdc] font-medium">{status.text}</span>
          <span className="text-[#888888]">•</span>
          <span className="text-[#999999] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#d4af37]" />
            Hafta içi 09:00-21:00
          </span>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
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
