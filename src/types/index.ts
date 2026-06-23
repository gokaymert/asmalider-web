import { PortableTextBlock } from 'next-sanity';

// Genel Sanity Resim Tipi
export interface SanityImage {
  asset: {
    url: string;
  };
}

// Haberler ve Duyurular
export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
  basvuruLinki?: string;
}

// Hakkımızda Sayfası
export interface AboutUsData {
  _id: string;
  title: string;
  content: PortableTextBlock[];
  visionTitle: string;
  visionContent: PortableTextBlock[];
}

// Yönetim Kurulu
export interface BoardMember {
  role?: string;
  name: string;
}

export interface President {
  name: string;
  period: string;
  isCurrent: boolean;
}

export interface CommitteePeriod {
  periodTitle: string;
  yonetimKurulu: {
    asilUyeler: BoardMember[];
    yedekUyeler: BoardMember[];
  };
  denetimKurulu: {
    asilUyeler: BoardMember[];
    yedekUyeler: BoardMember[];
  };
}

export interface BoardData {
  presidents: President[];
  committeePeriods: CommitteePeriod[];
}

// Tüzük
export interface StatuteArticle {
  articleTitle: string;
  articleBody: PortableTextBlock[];
}

export interface StatuteSection {
  sectionTitle: string;
  articles: StatuteArticle[];
}

export interface TuzukData {
  sections: StatuteSection[];
}

// Üyelik İşlemleri
export interface MembershipStep {
  title: string;
  description: PortableTextBlock[];
  formFile?: {
    asset: {
      url: string;
    };
  };
}

export interface MembershipData {
  steps: MembershipStep[];
  feeAmount: string;
  accountName: string;
  iban: string;
  transferDescription: string;
  kvkkTopText: PortableTextBlock[];
  kvkkList: string[];
  kvkkBottomText: PortableTextBlock[];
}

// Çalışmalar
export interface WorkData {
  _id: string;
  title: string;
  date: string;
  displayDate?: string;
  description?: string;
  images?: SanityImage[];
}

// Galeri
export interface GalleryPhoto {
  caption: string;
  image: SanityImage;
}

export interface GalleryData {
  photos: GalleryPhoto[];
}

// Pansiyonlar
export interface PensionData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  owner: string;
  phone: string;
  address: string;
  images: SanityImage[];
}

// Marmara Adası Tarihçe
export interface MarmaraTarihceData {
  content: PortableTextBlock[];
}

// Asmalı Tarihçe
export interface TarihceData {
  content: PortableTextBlock[];
}

// Marmara Adası Günümüz
export interface MarmaraGunumuzRegion {
  name: string;
  description: string;
  images: SanityImage[];
}

export interface MarmaraGunumuzData {
  intro: {
    heading: string;
    content: string;
    mainImage?: SanityImage;
  };
  regions: MarmaraGunumuzRegion[];
}

// Konaklama (Asmalı Standart)
export interface AccommodationData {
  introText?: string;
  facilities?: {
    title: string;
    description: string;
    image?: SanityImage;
    hasLink?: boolean;
    buttonText?: string;
    buttonUrl?: string;
  }[];
  dining?: {
    title: string;
    description: string;
    image?: SanityImage;
    iconType?: string;
    placeCount?: string;
  }[];
}

// Ulaşım (Asmalı Standart)
export interface TransportationData {
  introText?: string;
  ferries?: {
    _key: string;
    companyName: string;
    url?: string;
    routes?: { _key: string; routeName: string; duration: string }[];
  }[];
  localTransport?: {
    _key: string;
    title: string;
    description: string;
    distance?: string;
    linkUrl?: string;
    linkLabel?: string;
  }[];
  boatRoutes?: {
    _key: string;
    location: string;
    mil: number;
  }[];
  cooperativeContact?: {
    title: string;
    name: string;
    phone: string;
  };
}

export interface SupporterItem {
  _key?: string;
  name: string;
  company?: string;
  url?: string;
  avatarType: 'male' | 'female' | 'custom';
  image?: SanityImage;
}

export interface SupportersData {
  _id: string;
  degerliDestekciler?: SupporterItem[];
  isBirlikciler?: SupporterItem[];
  gonulluEmekciler?: SupporterItem[];
}
