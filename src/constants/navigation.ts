export interface NavItem {
  title: string;
  href: string;
  dropdown?: NavItem[];
}

export const navigation: NavItem[] = [
  { title: "Ana Sayfa", href: "/" },
  {
    title: "Derneğimiz",
    href: "#",
    dropdown: [
      { title: "Hakkımızda", href: "/dernegimiz/hakkinda" },
      { title: "Başkan ve Kurullar", href: "/dernegimiz/yonetim" },
      { title: "Tüzük", href: "/dernegimiz/tuzuk" },
      { title: "Üyelik", href: "/dernegimiz/uyelik" },
    ],
  },
  { title: "Çalışmalar", href: "/calismalar" },
  {
    title: "Asmalı",
    href: "#",
    dropdown: [
      { title: "Tarihçe", href: "/asmali/tarihce" },
      { title: "Ulaşım", href: "/asmali/ulasim" },
      { title: "Konaklama", href: "/asmali/konaklama" },
      { title: "Galeri", href: "/asmali/galeri" },
    ],
  },
  {
    title: "Marmara Adası",
    href: "#",
    dropdown: [
      { title: "Tarihçe", href: "/marmara-adasi/tarihce" },
      { title: "Günümüz", href: "/marmara-adasi/gunumuz" },
    ],
  },
  { title: "İletişim", href: "/iletisim" },
  { title: "Destekçilerimiz", href: "/destekcilerimiz" },
];
