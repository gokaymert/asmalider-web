import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full flex flex-col bg-(--color-primary) text-(--color-light)">
      <div className="pt-8 pb-8 w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* 1- Logo ve Kısa Tanıtım */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-5 lg:pr-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-3">
                <div className="bg-white px-2 py-1.5 rounded-xl shadow-sm shrink-0">
                  <Image src="/images/logo.png" alt="Asmalı Derneği Logo" width={110} height={44} className="h-11 w-auto object-contain" priority unoptimized={true} style={{ width: 'auto' }} />
                </div>
                <div className="flex flex-col items-center sm:items-start lg:items-start text-center sm:text-left">
                  <span className="font-bold text-base text-white leading-snug tracking-tight">Marmara Adası Asmalı Köyü</span>
                  <span className="font-bold text-base text-white leading-snug tracking-tight">Kültür ve Dayanışma Derneği</span>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği. Köyümüzün kültürel mirasını korumak ve yaşatmak için çalışıyoruz.
              </p>
            </div>

            {/* 2- Hızlı Linkler */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-full lg:w-auto flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-4 text-white text-center">Hızlı Linkler</h3>
                <ul className="space-y-3 inline-flex flex-col items-start text-left">
                  <li><Link href="/" className="inline-block text-sm text-white/80 hover:text-white transition-colors duration-300">Ana Sayfa</Link></li>
                  <li><Link href="/dernegimiz/hakkinda" className="inline-block text-sm text-white/80 hover:text-white transition-colors duration-300">Hakkımızda</Link></li>
                  <li><Link href="/calismalar" className="inline-block text-sm text-white/80 hover:text-white transition-colors duration-300">Çalışmalar</Link></li>
                  <li><Link href="/iletisim" className="inline-block text-sm text-white/80 hover:text-white transition-colors duration-300">İletişim</Link></li>
                </ul>
              </div>
            </div>

            {/* 3- İletişim */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-full lg:w-auto flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-4 text-white text-center">İletişim</h3>
                <ul className="space-y-4 inline-flex flex-col items-start text-left">
                  <li className="flex items-start gap-3 text-sm opacity-80">
                    <MapPin size={18} className="shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Asmalı Mah. 1015 Sok. No:32A<br />
                      Marmara, Balıkesir
                    </span>
                  </li>
                  <li>
                    <a href="tel:+905363216873" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 hover:text-white transition-all duration-300">
                      <Phone size={18} className="shrink-0" />
                      <span>+90 536 321 68 73</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@asmalider.org.tr" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 hover:text-white transition-all duration-300">
                      <Mail size={18} className="shrink-0" />
                      <span>info@asmalider.org.tr</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4- Sosyal Medya */}
            <div className="sm:col-span-2 lg:col-span-3 flex justify-center mt-4 sm:mt-8 lg:mt-0">
              <div className="w-full lg:w-auto flex flex-col items-center">
                <h3 className="font-semibold text-lg mb-4 text-white text-center">Bizi Takip Edin</h3>
                <div className="flex gap-4 justify-center">
                  <a href="https://www.facebook.com/asmali.der" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/asmali.der" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-(--color-primary) transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex justify-center items-center text-xs opacity-60">
            <p className="text-center">© {new Date().getFullYear()} Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
