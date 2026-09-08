import { useState } from 'react';
import { Scissors, Sparkles, ZoomIn, X, Calendar, ArrowRight } from 'lucide-react';
import { HAIRCUT_SAMPLES, SERVICES } from '../data/barberData';
import { HaircutSample, ServiceItem } from '../types';

interface GallerySectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function GallerySection({ onSelectService }: GallerySectionProps) {
  const [activeModalSample, setActiveModalSample] = useState<HaircutSample | null>(null);

  const handleBookModel = (sample: HaircutSample) => {
    const matchedService = SERVICES.find((s) => s.id === sample.matchedServiceId) || SERVICES[0];
    onSelectService(matchedService);
  };

  return (
    <section id="galeri" className="py-20 sm:py-28 bg-[#141414] relative overflow-hidden">
      {/* Subtle top divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1a12] border border-[#d4af37]/40 text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Usta İşçilik & Örnekler
          </div>
          <h2 className="font-['Cinzel',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">
            Gerçek Tıraş Modelleri
          </h2>
          <div className="w-20 h-0.5 bg-[#d4af37] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#aaaaaa]">
            Kafa yapısına uygun geçişler, ustura ile milimetrik sakal hatları ve özel gün tasarımları.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HAIRCUT_SAMPLES.map((sample) => (
            <div
              key={sample.id}
              className="group bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37]/60 overflow-hidden shadow-xl hover:shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Zoom & Badge */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-black cursor-pointer"
                onClick={() => setActiveModalSample(sample)}
              >
                <img
                  src={sample.image}
                  alt={sample.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />

                {/* Tag Badge */}
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/70 border border-[#d4af37]/40 backdrop-blur-md text-[11px] font-bold text-[#d4af37] uppercase tracking-wide">
                  {sample.tag}
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 border border-[#444444] group-hover:border-[#d4af37] text-white group-hover:text-[#d4af37] flex items-center justify-center backdrop-blur-md transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold uppercase tracking-wider mb-1.5">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{sample.category}</span>
                  </div>

                  <h3 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors leading-snug mb-2">
                    {sample.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#a5a5a5] leading-relaxed mb-6">
                    {sample.description}
                  </p>
                </div>

                {/* Action: Book this style */}
                <button
                  onClick={() => handleBookModel(sample)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#242424] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#121212] border border-[#383838] hover:border-[#d4af37] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Bu Modeli Randevu Al</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Expanded Modal */}
      {activeModalSample && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModalSample(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#181818] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 text-[#f5f5f5]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalSample(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#222222] border border-[#333333] hover:border-[#d4af37] text-[#999999] hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-[#2a2a2a]">
              <img
                src={activeModalSample.image}
                alt={activeModalSample.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {activeModalSample.category} • {activeModalSample.tag}
              </span>
              <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold text-[#f5f5f5]">
                {activeModalSample.title}
              </h3>
              <p className="text-sm text-[#b0b0b0] leading-relaxed">
                {activeModalSample.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#2a2a2a] flex items-center justify-between gap-3">
              <span className="text-xs text-[#888888]">Berber Vezir Özel Portföy</span>
              <button
                onClick={() => {
                  const sample = activeModalSample;
                  setActiveModalSample(null);
                  handleBookModel(sample);
                }}
                className="py-2.5 px-6 rounded-xl bg-[#d4af37] hover:bg-[#e5bd3d] text-[#121212] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Bu Stille Randevu Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
