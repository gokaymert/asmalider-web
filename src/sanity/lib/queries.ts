import { defineQuery } from 'next-sanity';

// Tüm haberleri en yeniden eskiye doğru sıralayıp getirir
export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    basvuruLinki
  }
`);

// Ana sayfa slider'ında gösterilmesi istenen en güncel 5 haberi getirir
export const sliderPostsQuery = defineQuery(`
  *[_type == "post" && hideFromSlider != true] | order(publishedAt desc)[0...5] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    basvuruLinki
  }
`);

// Tıklanan haberin slug (URL) adresine göre detaylarını getirir
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    body,
    basvuruLinki
  }
`);

// Hakkımızda sayfası verilerini getirir
export const aboutUsQuery = defineQuery(`
  *[_type == "aboutUs"][0] {
    _id,
    title,
    content,
    visionTitle,
    visionContent
  }
`);

// Başkan ve Kurullar sayfası verilerini getirir
export const boardMembersQuery = defineQuery(`
  *[_type == "board"][0] {
    presidents[] {
      name,
      period,
      isCurrent
    },
    committeePeriods[] {
      periodTitle,
      yonetimKurulu {
        asilUyeler[] { role, name },
        yedekUyeler[] { role, name }
      },
      denetimKurulu {
        asilUyeler[] { role, name },
        yedekUyeler[] { role, name }
      }
    }
  }
`);

// Tüzük sayfası verilerini getirir
export const tuzukQuery = defineQuery(`
  *[_type == "tuzuk"][0] {
    sections[] {
      sectionTitle,
      articles[] {
        articleTitle,
        articleBody
      }
    }
  }
`);

// Üyelik İşlemleri sayfası verilerini getirir
export const membershipQuery = defineQuery(`
  *[_type == "membership"][0] {
    steps[] {
      title,
      description,
      formFile {
        asset->{
          url
        }
      }
    },
    feeAmount,
    accountName,
    iban,
    transferDescription,
    kvkkTopText,
    kvkkList,
    kvkkBottomText
  }
`);

// Çalışmalar sayfası verilerini getirir (En yeniden eskiye sıralı)
export const worksQuery = defineQuery(`
  *[_type == "work"] | order(date desc) {
    _id,
    title,
    date,
    displayDate,
    description,
    images[] {
      asset->{
        url
      }
    }
  }
`);

// Ulaşım sayfası verilerini getirir (Singleton)
export const transportationQuery = defineQuery(`
  *[_type == "transportation"][0]
`);

// Konaklama ve Yeme-İçme sayfası verilerini getirir (Singleton)
export const accommodationQuery = defineQuery(`
  *[_type == "accommodation"][0]
`);

// Galeri sayfası verilerini getirir (Singleton)
export const galleryQuery = defineQuery(`
  *[_type == "gallery"][0] {
    photos[]{
      caption,
      image{
        asset->{url}
      }
    }
  }
`);

// Pansiyonlar sayfası verilerini getirir
export const pensionsQuery = defineQuery(`
  *[_type == "pension"] | order(_createdAt desc) {
    ...,
    images[]{
      asset->{url}
    }
  }
`);

// İletişim sayfası verilerini getirir (Singleton)
export const contactQuery = defineQuery(`
  *[_type == "contact"][0]
`);

// Tarihçe sayfası verilerini getirir (Singleton)
export const tarihceQuery = defineQuery(`
  *[_type == "tarihce"][0] {
    content[]{
      ...,
      _type == "image" => {
        "url": asset->url
      }
    }
  }
`);

// Marmara Adası Tarihçe sayfası verilerini getirir (Singleton)
export const marmaraTarihceQuery = defineQuery(`
  *[_type == "marmaraTarihce"][0] {
    content
  }
`);

// Marmara Adası Günümüz sayfası verilerini getirir (Singleton)
export const marmaraGunumuzQuery = defineQuery(`
  *[_type == "marmaraGunumuz"][0] { 
    intro { heading, content, mainImage{asset->{url}} }, 
    regions[]{ name, description, images[]{asset->{url}} } 
  }
`);

// Destekçiler sayfası verilerini getirir (Singleton)
export const supportersQuery = defineQuery(`
  *[_type == "supporters"][0] { 
    _id, 
    degerliDestekciler, 
    isBirlikciler, 
    gonulluEmekciler 
  }
`);
