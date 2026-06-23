"use client";

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function MapInteractive({ mapUrl }: { mapUrl?: string }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    // Cihazın dokunmatik ekran olup olmadığını kontrol et
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - msMaxTouchPoints is IE specific
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Eğer dokunmatik cihazsa ve henüz aktif edilmemişse (ilk dokunuş)
    if (isTouchDevice && !mobileActive) {
      e.preventDefault(); // Linke gitmesini engelle
      setMobileActive(true); // Hover efektini göster
    }
    // İkinci tıklamada (mobileActive true iken) preventDefault çalışmaz, varsayılan olarak linke gider.
  };

  const handleMouseLeave = () => {
    if (mobileActive) {
      setMobileActive(false);
    }
  };

  // Harita linki mantığı: Sanity'den gelen link bir embed (iframe) linki ise, tıklanabilir a href'ini ayarla
  let iframeSrc = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3028.6188759272823!2d27.706777!3d40.616222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDM2JzU4LjQiTiAyN8KwNDInMjQuNCJF!5e0!3m2!1sen!2str!4v1779306756466!5m2!1sen!2str";
  let googleMapsUrl = "https://maps.google.com/?q=40.616222,27.706777";

  if (mapUrl) {
    if (mapUrl.includes('/embed')) {
      iframeSrc = mapUrl; // Ekranda görünen haritayı güncelle
      // Embed linkinden koordinatları çıkart
      const match = mapUrl.match(/!2d([^!&]+)!3d([^!&]+)/);
      if (match) {
        googleMapsUrl = `https://maps.google.com/?q=${match[2]},${match[1]}`;
      } else {
        googleMapsUrl = "https://maps.google.com/"; // Koordinat bulunamazsa varsayılan harita anasayfası
      }
    } else {
      googleMapsUrl = mapUrl; // Eğer embed linki değil normal bir paylaşım linkiyse, tıklanınca o linke git
    }
  }

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      // Ekranda scroll yaparken yanlışlıkla aktifleştiğinde kapatmak için
      onScrollCapture={() => setMobileActive(false)}
      className="group mt-10 h-[280px] w-full rounded-xl border border-slate-300 shadow-sm overflow-hidden relative block cursor-pointer"
    >
      {/* 
        Kilitli İframe: pointer-events-none ile haritayla etkileşim (sürükleme, zoom) tamamen kapatılır. 
        Kullanıcı tıklamaları doğrudan sarmalayıcı <a> etiketine gider.
      */}
      <iframe
        src={iframeSrc}
        className="absolute -top-[60px] -left-[60px] w-[calc(100%+120px)] h-[calc(100%+120px)] border-0 pointer-events-none"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
      ></iframe>

      {/* Hover ve Tıklama Efekti */}
      <div className={`absolute inset-0 transition-all duration-300 flex items-center justify-center z-10
        ${mobileActive ? 'bg-slate-900/60' : 'bg-slate-900/0 group-hover:bg-slate-900/60'}
      `}>
        <div className={`flex flex-col items-center justify-center transform transition-all duration-300
          ${mobileActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}
        `}>
          <div className="bg-white/20 p-3.5 rounded-full backdrop-blur-md mb-3 shadow-lg">
            <MapPin size={32} className="text-white drop-shadow-md" />
          </div>
          <span className="text-white font-bold text-lg md:text-xl drop-shadow-lg px-6 text-center tracking-wide">
            Yol Tarifi Almak İçin Tıklayın
          </span>
        </div>
      </div>
    </a>
  );
}
