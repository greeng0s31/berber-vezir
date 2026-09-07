import { Phone, MapPin, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, WORKING_HOURS, getShopStatus } from '../data/barberData';

export default function ContactSection() {
  const status = getShopStatus();

  return (
    <section id="iletisim" className="py-20 sm:py-28 bg-[#121212] relative">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
            İletişim & Ulaşım
          </div>
          <h2 className="font-['Cinzel',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">
            Bize Ulaşın
          </h2>
          <div className="w-20 h-0.5 bg-[#d4af37] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#aaaaaa]">
            Hamitler Mahallesi’ndeki salonumuzda sizleri ağırlamaktan memnuniyet duyarız.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Direct Call, WhatsApp & Map Buttons */}
          <div className="bg-[#1a1a1a] rounded-2xl p-7 sm:p-9 border border-[#2a2a2a] shadow-xl flex flex-col justify-between h-full">
            <div>
              <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#f5f5f5] mb-2 flex items-center gap-3">
                <span className="w-2 h-7 bg-[#d4af37] rounded-sm inline-block" />
                Hemen İletişime Geçin
              </h3>
              <p className="text-sm text-[#999999] mb-8">
                Sorularınız, randevu talepleriniz veya adres tarifi için bize doğrudan telefon veya WhatsApp üzerinden ulaşabilirsiniz.
              </p>

              {/* Action Buttons as requested */}
              <div className="space-y-4 mb-8">
                {/* 1. "Bizi Arayın" Butonu (Direk Arama) */}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  id="btn-bizi-arayin"
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89327] hover:from-[#e5bd3d] hover:to-[#cda52e] text-[#121212] font-bold text-base tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#121212]/15 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#121212]" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs uppercase text-[#3a3010] font-semibold">Tıkla ve Hemen Ara</span>
                      <span className="text-lg font-mono font-black">{BUSINESS_INFO.phone}</span>
                    </div>
                  </div>
                  <span className="text-xs uppercase bg-[#121212] text-[#d4af37] px-3 py-1.5 rounded-md font-bold tracking-wider group-hover:bg-[#1f1f1f] transition-colors">
                    Bizi Arayın
                  </span>
                </a>

                {/* 2. "Konumu Aç" Butonu (Google Maps) */}
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-konumu-ac"
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-[#222222] hover:bg-[#282828] text-[#f5f5f5] border border-[#333333] hover:border-[#d4af37]/60 font-semibold text-base transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#333333] flex items-center justify-center text-[#d4af37]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-[#888888] font-normal">Adres & Navigasyon</span>
                      <span className="text-base text-[#f0f0f0] font-medium">{BUSINESS_INFO.address}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-[#d4af37] bg-[#181818] px-3 py-1.5 rounded-md border border-[#383838] group-hover:border-[#d4af37]/50 transition-colors font-medium">
                    <span>Konumu Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>

                {/* 3. WhatsApp Mesaj Butonu */}
                <a
                  href={`https://wa.me/905337667216?text=${encodeURIComponent('Merhaba Berber Vezir, randevu almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-whatsapp"
                  className="w-full flex items-center justify-between px-6 py-3.5 rounded-xl bg-[#1e1e1e] hover:bg-[#252525] text-[#f5f5f5] border border-[#2e2e2e] hover:border-emerald-500/50 text-sm font-medium transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-[#d0d0d0] group-hover:text-emerald-300 transition-colors">
                      WhatsApp ile Mesaj Gönder
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">0533 766 7216</span>
                </a>
              </div>
            </div>

            {/* Quality Guarantee Box */}
            <div className="pt-5 border-t border-[#262626] flex items-center gap-3 text-xs text-[#888888]">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
              <span>Tek kullanımlık havlu & steril ekipmanlar ile hijyenik berberlik standartları.</span>
            </div>
          </div>

          {/* Right Column: Çalışma Saatleri & Salon Durumu */}
          <div className="bg-[#1a1a1a] rounded-2xl p-7 sm:p-9 border border-[#2a2a2a] shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#f5f5f5] flex items-center gap-3">
                <span className="w-2 h-7 bg-[#d4af37] rounded-sm inline-block" />
                Çalışma Saatleri
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#222222] border border-[#333333] text-xs">
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-[#e0e0e0] font-medium">{status.text}</span>
              </div>
            </div>

            {/* Hours Table */}
            <div className="divide-y divide-[#262626] border border-[#282828] rounded-xl overflow-hidden mb-6 bg-[#161616]">
              {WORKING_HOURS.map((item) => {
                const isSunday = item.day === 'Pazar';
                const isSaturday = item.day === 'Cumartesi';
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm transition-colors ${
                      isSunday
                        ? 'bg-[#181818] text-[#888888]'
                        : 'hover:bg-[#1d1d1d] text-[#e0e0e0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#d4af37]/70" />
                      <span className={`font-medium ${isSunday ? 'text-[#888888]' : 'text-[#f0f0f0]'}`}>
                        {item.day}
                        {isSaturday && <span className="text-[11px] text-[#999999] ml-2">(Hafta Sonu)</span>}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold px-2.5 py-1 rounded ${
                        isSunday
                          ? 'text-red-400 bg-red-950/30 border border-red-900/30'
                          : 'text-[#d4af37] bg-[#222222]'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick summary note */}
            <div className="p-4 rounded-xl bg-[#202020] border border-[#2e2e2e] text-xs text-[#a0a0a0] leading-relaxed">
              <p className="font-semibold text-[#f0f0f0] mb-1">Randevu ve Sıra Durumu:</p>
              <p>
                Yoğun saatlerde bekleme yaşamamak için öncesinde arayarak veya WhatsApp üzerinden randevu saatinizi teyit etmeniz önerilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
