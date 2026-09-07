import { Phone, MapPin, ArrowUp, Instagram, Youtube } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e0e] border-t border-[#262626] text-[#999999] py-14 relative pb-28 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#202020]">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                <span className="font-['Cinzel',serif] font-bold text-sm">V</span>
              </div>
              <span className="font-['Cinzel',serif] text-xl font-bold tracking-wider text-[#f5f5f5]">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#777777] max-w-sm">
              {BUSINESS_INFO.title} • {BUSINESS_INFO.locationText}
            </p>
          </div>

          {/* Contact Fast Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span className="font-mono">{BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>Hamitler Mahallesi, Bursa</span>
            </a>
          </div>

          {/* Social Icons as explicitly requested: Instagram & YouTube */}
          <div className="flex items-center gap-3">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-instagram-link"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] hover:border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:text-[#f5f5f5] hover:scale-110 transition-all shadow"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href={BUSINESS_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-youtube-link"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] hover:border-[#d4af37] flex items-center justify-center text-[#d4af37] hover:text-[#f5f5f5] hover:scale-110 transition-all shadow"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Yukarı Çık"
              className="w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border border-[#333333] hover:border-[#d4af37] flex items-center justify-center text-[#888888] hover:text-[#f5f5f5] transition-all cursor-pointer ml-2"
              title="Sayfa Başına Dön"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright notice as requested */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <p>© 2026 Berber Vezir. Tüm hakları saklıdır.</p>
          <p className="text-[11px] text-[#555555]">
            Hamitler Mahallesi, Osmangazi / Bursa Erkek Kuaförlüğü
          </p>
        </div>
      </div>
    </footer>
  );
}
