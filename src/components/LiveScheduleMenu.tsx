import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { BUSINESS_INFO, WORKING_HOURS, SCHEDULE_DAYS, DAILY_SLOTS, getShopStatus } from '../data/barberData';
import { TimeSlot } from '../types';

interface LiveScheduleMenuProps {
  onSelectSlot: (day: string, time: string) => void;
  onOpenAppointment: () => void;
  bookedSlots?: string[];
  onToggleBookedSlot?: (day: string, time: string) => void;
}

export default function LiveScheduleMenu({
  onSelectSlot,
  onOpenAppointment,
  bookedSlots = [],
}: LiveScheduleMenuProps) {
  const [selectedDayId, setSelectedDayId] = useState<string>('today');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const status = getShopStatus();

  const currentSlots: TimeSlot[] = DAILY_SLOTS[selectedDayId] || DAILY_SLOTS['today'];
  const activeDayObj = SCHEDULE_DAYS.find((d) => d.id === selectedDayId) || SCHEDULE_DAYS[0];

  // Her slot için dinamik randevulu kontrolü
  const getSlotState = (slot: TimeSlot) => {
    const isBooked = slot.status === 'booked' || bookedSlots.includes(`${activeDayObj.label}_${slot.time}`);
    return {
      isBooked,
      statusText: isBooked ? 'Randevulu' : 'Müsait',
    };
  };

  const filteredSlots = currentSlots.filter((slot) => {
    if (timeFilter === 'all') return true;
    const hour = parseInt(slot.time.split(':')[0], 10);
    if (timeFilter === 'morning') return hour < 12;
    if (timeFilter === 'afternoon') return hour >= 12 && hour < 17;
    if (timeFilter === 'evening') return hour >= 17;
    return true;
  });

  const availableCount = currentSlots.filter((s) => !getSlotState(s).isBooked).length;

  const handleSlotClick = (slot: TimeSlot) => {
    const { isBooked } = getSlotState(slot);
    if (isBooked) return;
    onSelectSlot(activeDayObj.label, slot.time);
  };

  return (
    <section id="randevu-menusu" className="py-20 sm:py-28 bg-[#121212] relative overflow-hidden">
      {/* Decorative Gold Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(212,175,55,0.07)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1a12] border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Tek Berber • Birebir Usta Hizmeti
          </div>
          <h2 className="font-['Cinzel',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">
            Saat Kaçta Müsaitim?
          </h2>
          <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#b5b5b5] max-w-xl mx-auto">
            Salonda sadece <span className="text-[#d4af37] font-semibold">1 usta berber</span> hizmet vermektedir. Bu yüzden her saatte tek randevu kabul edilir; siz tıraş olurken sıra veya bekleme olmaz.
          </p>
        </div>

        {/* Night Closure Notice if between 21:00 and 09:00 */}
        {!status.isOpen && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{status.text}</p>
                <p className="text-xs text-amber-300/90">{status.details}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedDayId('tomorrow');
                onOpenAppointment();
              }}
              className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5bd3d] text-[#121212] font-bold text-xs uppercase tracking-wider transition-all shadow shrink-0 cursor-pointer"
            >
              Yarın İçin Randevu Al
            </button>
          </div>
        )}

        {/* Live Status Header Card */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-2xl p-4 sm:p-6 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#222222] border border-[#383838] flex items-center justify-center text-[#d4af37] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#181818] ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#f5f5f5]">
                  {status.text}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#252525] text-[#d4af37] font-bold uppercase tracking-wider">
                  Canlı Durum
                </span>
              </div>
              <p className="text-xs text-[#a0a0a0] mt-0.5">{status.details}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#2a2a2a] pt-3 md:pt-0">
            <div className="text-center px-3.5 py-2 rounded-xl bg-[#202020] border border-[#2e2e2e]">
              <span className="block text-[11px] text-[#888888]">Müsait Seans</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{availableCount} Saat Boş</span>
            </div>
            <div className="text-center px-3.5 py-2 rounded-xl bg-[#202020] border border-[#2e2e2e]">
              <span className="block text-[11px] text-[#888888]">Kapasite</span>
              <span className="text-sm font-bold text-[#d4af37]">Tek Berber</span>
            </div>
            <button
              onClick={onOpenAppointment}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89327] hover:from-[#e5bd3d] hover:to-[#cda52e] text-[#121212] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0 active:scale-95"
            >
              Hemen Randevu Al
            </button>
          </div>
        </div>

        {/* Day Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          {SCHEDULE_DAYS.map((day) => {
            const isActive = selectedDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`flex-1 max-w-[200px] py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-[#2a2412] to-[#1c180a] border-[#d4af37] text-[#f5f5f5] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-[#cccccc] hover:border-[#444444]'
                }`}
              >
                <span className={`block text-sm font-bold ${isActive ? 'text-[#d4af37]' : 'text-[#e0e0e0]'}`}>
                  {day.label}
                </span>
                <span className="block text-[11px] text-[#777777] font-medium mt-0.5 truncate">
                  {day.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter by Time Period */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              timeFilter === 'all'
                ? 'bg-[#d4af37] text-[#121212]'
                : 'bg-[#1e1e1e] text-[#a0a0a0] hover:text-white border border-[#303030]'
            }`}
          >
            Tüm Saatler
          </button>
          <button
            onClick={() => setTimeFilter('morning')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeFilter === 'morning'
                ? 'bg-[#d4af37] text-[#121212]'
                : 'bg-[#1e1e1e] text-[#a0a0a0] hover:text-white border border-[#303030]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Sabah (09:30 - 12:00)</span>
          </button>
          <button
            onClick={() => setTimeFilter('afternoon')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeFilter === 'afternoon'
                ? 'bg-[#d4af37] text-[#121212]'
                : 'bg-[#1e1e1e] text-[#a0a0a0] hover:text-white border border-[#303030]'
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span>Öğleden Sonra (13:00 - 17:00)</span>
          </button>
          <button
            onClick={() => setTimeFilter('evening')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              timeFilter === 'evening'
                ? 'bg-[#d4af37] text-[#121212]'
                : 'bg-[#1e1e1e] text-[#a0a0a0] hover:text-white border border-[#303030]'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Akşam (17:00 - 20:30)</span>
          </button>
        </div>

        {/* Simplified 2-Status Legend as requested: Sadece Müsait ve Randevulu */}
        <div className="flex items-center justify-center gap-6 mb-6 text-xs text-[#999999]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[#d0d0d0] font-medium">Müsait (Randevu Al)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="text-[#a0a0a0]">Randevulu (Dolu)</span>
          </div>
        </div>

        {/* Notice for Today if night closed */}
        {selectedDayId === 'today' && !status.isOpen && (
          <div className="mb-4 text-center text-xs text-amber-400/90 bg-amber-950/20 py-2 px-4 rounded-xl border border-amber-500/30">
            Bugünkü seanslar tamamlanmıştır. Yarın veya Sonraki Gün sekmesinden boş saatleri seçebilirsiniz.
          </div>
        )}

        {/* Time Slots Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDayId}-${timeFilter}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-14"
          >
            {filteredSlots.map((slot, index) => {
              const { isBooked, statusText } = getSlotState(slot);

              return (
                <button
                  key={`${selectedDayId}-${slot.time}-${index}`}
                  disabled={isBooked}
                  onClick={() => handleSlotClick(slot)}
                  className={`relative p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isBooked
                      ? 'bg-[#151515] border-[#242424] opacity-45 cursor-not-allowed'
                      : 'bg-[#181818] border-[#2f2f2f] hover:border-[#d4af37] hover:bg-[#201d14] hover:shadow-[0_0_18px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#f5f5f5]">
                      {slot.time}
                    </span>
                    {isBooked ? (
                      <XCircle className="w-4 h-4 text-rose-500/70 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isBooked
                            ? 'bg-rose-950/40 text-rose-300'
                            : 'bg-emerald-950/60 text-emerald-300'
                        }`}
                      >
                        {statusText}
                      </span>
                      <span className="text-[10px] text-[#777777]">45 dk</span>
                    </div>
                    {!isBooked && (
                      <span className="block text-[11px] text-[#d4af37] font-semibold mt-1.5">
                        Seç ve Randevu Al →
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* 2-Column Information: Ne Zamanlar Açığım + İletişim & Kontak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 1: Ne Zamanlar Açığım (Çalışma Saatleri) */}
          <div className="bg-[#181818] rounded-2xl p-6 sm:p-8 border border-[#2b2b2b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-2">
                <Clock className="w-4 h-4" />
                <span>Çalışma Saatlerimiz</span>
              </div>
              <h3 className="font-['Cinzel',serif] text-2xl font-bold text-[#f5f5f5] mb-2">
                Ne Zamanlar Açığız?
              </h3>
              <p className="text-xs sm:text-sm text-[#999999] mb-6">
                Haftanın 6 günü sabah 09:00 ile akşam 21:00 arası Hamitler Mahallesi’ndeyiz.
              </p>

              <div className="space-y-2.5">
                {WORKING_HOURS.map((item, idx) => {
                  const isClosed = item.hours === 'Kapalı';
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm transition-colors ${
                        isClosed
                          ? 'bg-[#1e1414] border-rose-900/30 text-rose-300'
                          : 'bg-[#1f1f1f] border-[#2e2e2e] text-[#d0d0d0]'
                      }`}
                    >
                      <span className="font-semibold">{item.day}</span>
                      <span className={`font-mono font-medium ${isClosed ? 'text-rose-400 font-bold' : 'text-[#d4af37]'}`}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262626] flex items-center gap-2 text-xs text-[#888888]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span>Tek berber olduğu için randevulu gelinmesi rica olunur.</span>
            </div>
          </div>

          {/* Box 2: Kontak, Adres, Telefon & WhatsApp İletişim */}
          <div className="bg-[#181818] rounded-2xl p-6 sm:p-8 border border-[#2b2b2b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-2">
                <MapPin className="w-4 h-4" />
                <span>Hızlı İletişim & Lokasyon</span>
              </div>
              <h3 className="font-['Cinzel',serif] text-2xl font-bold text-[#f5f5f5] mb-2">
                Kontak & Adres Bilgileri
              </h3>
              <p className="text-xs sm:text-sm text-[#999999] mb-6">
                Bize dilediğiniz zaman telefonla veya WhatsApp üzerinden ulaşabilirsiniz.
              </p>

              <div className="space-y-3.5">
                {/* Telefon Tıkla Ara */}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="p-4 rounded-xl bg-gradient-to-r from-[#202020] to-[#252525] border border-[#383838] hover:border-[#d4af37] transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-[#2e2612] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-[#888888] font-medium">Bizi Hemen Arayın</span>
                      <span className="font-bold text-base text-[#f5f5f5] font-mono group-hover:text-[#d4af37] transition-colors">
                        {BUSINESS_INFO.phone}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#d4af37] bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#333333] group-hover:border-[#d4af37]">
                    Tıkla Ara
                  </span>
                </a>

                {/* WhatsApp İletişim */}
                <a
                  href={`https://wa.me/905337667216?text=${encodeURIComponent('Merhaba Berber Vezir, randevu ve bilgi almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-gradient-to-r from-[#112a19] to-[#15341f] border border-emerald-700/50 hover:border-emerald-400 transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                      <MessageSquare className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <span className="block text-xs text-emerald-300/80 font-medium">WhatsApp Canlı Destek</span>
                      <span className="font-bold text-base text-[#f5f5f5] group-hover:text-emerald-300 transition-colors">
                        Mesaj Gönder & Randevu Al
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
                    Sohbet Başlat
                  </span>
                </a>

                {/* Google Maps Adres */}
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#202020] border border-[#383838] hover:border-[#d4af37] transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-[#222222] border border-[#444444] flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs text-[#888888] font-medium">Adres & Konum</span>
                      <span className="font-semibold text-sm text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors">
                        Hamitler Mahallesi, Osmangazi, Bursa
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#d4af37] shrink-0">
                    <span>Harita</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Map Action Button */}
            <div className="mt-6 pt-4 border-t border-[#262626]">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#d4af37] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Google Maps'te Rotayı Gör</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
