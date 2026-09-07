import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

interface FloatingActionBarProps {
  onOpenAppointment: () => void;
}

export default function FloatingActionBar({ onOpenAppointment }: FloatingActionBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#141414]/95 backdrop-blur-lg border-t border-[#d4af37]/30 p-3 flex items-center gap-2 shadow-[0_-8px_25px_rgba(0,0,0,0.7)]">
      {/* Tıkla Ara */}
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        id="floating-call-btn"
        className="flex-1 py-3 px-3 rounded-xl bg-[#202020] border border-[#383838] text-[#f5f5f5] font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <Phone className="w-4 h-4 text-[#d4af37]" />
        <span>Hemen Ara</span>
      </a>

      {/* Randevu Al */}
      <button
        onClick={onOpenAppointment}
        id="floating-appointment-btn"
        className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89327] text-[#121212] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95 transition-all cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-[#121212]" />
        <span>Randevu Al</span>
      </button>
    </div>
  );
}
