import { Scissors, Flame, Droplets, Sparkles, Crown, Package, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/barberData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-[#d4af37]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#d4af37]" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-[#d4af37]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#d4af37]" />;
      case 'Package':
        return <Package className="w-6 h-6 text-[#d4af37]" />;
      default:
        return <Scissors className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section id="hizmetler" className="py-20 sm:py-28 bg-[#161616] relative">
      {/* Subtle top divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#d4af37]/30 text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
            Hizmet & Fiyat Listesi
          </div>
          <h2 className="font-['Cinzel',serif] text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">
            Hizmetlerimiz
          </h2>
          <div className="w-20 h-0.5 bg-[#d4af37] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#aaaaaa]">
            Kişiye ve kafa yapısına özel saç ve sakal tasarımı, kaliteli bakım ritüelleri ve avantajlı paketler.
          </p>
        </div>

        {/* 6 Services Grid (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className={`group relative bg-[#1c1c1c] rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                service.id === 'her-sey-dahil-kampanya'
                  ? 'border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-gradient-to-b from-[#201d14] to-[#1c1c1c]'
                  : 'border-[#2a2a2a] hover:border-[#d4af37]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)]'
              }`}
            >
              {/* Badge if present - Centered and compact */}
              {service.badge && (
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-[#d4af37] text-[#121212] border-[#d4af37] shadow-sm z-10 whitespace-nowrap">
                  {service.badge}
                </div>
              )}

              <div>
                {/* Icon Container & Price Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#242424] border border-[#383838] group-hover:border-[#d4af37] flex items-center justify-center transition-colors shadow-inner">
                    {getIcon(service.iconName)}
                  </div>
                  {/* Price Tag */}
                  <div className="text-right">
                    <span className="font-['Montserrat',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#d4af37] font-mono tracking-tight">
                      {service.price} <span className="text-lg text-[#b89327] font-sans">₺</span>
                    </span>
                    <span className="block text-[11px] text-[#777777] font-medium font-mono">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Service Name */}
                <div className="mb-2">
                  <h3 className="font-['Montserrat',sans-serif] text-lg sm:text-xl font-bold text-[#f5f5f5] group-hover:text-[#d4af37] transition-colors leading-snug">
                    {service.name}
                  </h3>
                </div>

                {/* Short Description */}
                <p className="text-sm text-[#b0b0b0] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  id={`btn-select-${service.id}`}
                  className={`w-full flex items-center justify-between text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    service.id === 'her-sey-dahil-kampanya'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b89327] hover:from-[#e5bd3d] hover:to-[#cda52e] text-[#121212] border-[#d4af37]'
                      : 'bg-[#222222] hover:bg-[#d4af37] text-[#e5bd3d] hover:text-[#121212] border-[#333333] hover:border-[#d4af37]'
                  }`}
                >
                  <span>Randevu Seç ({service.price} ₺)</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
