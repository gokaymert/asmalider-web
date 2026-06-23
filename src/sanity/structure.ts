import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('İçerik Yönetimi')
    .items([
      // En üst şemalar
      S.documentTypeListItem('post').title('Haber, Duyuru & Etkinlik'),
      S.documentTypeListItem('work').title('Çalışmalar'),
      S.documentTypeListItem('pension').title('Pansiyonlar'),
      S.documentTypeListItem('contact').title('İletişim'),
      S.documentTypeListItem('supporters').title('Destekçilerimiz'),

      // Araya görsel bir çizgi
      S.divider(),

      // 1. Klasör: Derneğimiz
      S.listItem()
        .title('Derneğimiz')
        .child(
          S.list()
            .title('Derneğimiz')
            .items([
              S.documentTypeListItem('aboutUs').title('Hakkımızda'),
              S.documentTypeListItem('board').title('Başkan ve Kurullar'),
              S.documentTypeListItem('tuzuk').title('Tüzük'),
              S.documentTypeListItem('membership').title('Üyelik İşlemleri'),
            ])
        ),

      // 2. Klasör: Asmalı
      S.listItem()
        .title('Asmalı')
        .child(
          S.list()
            .title('Asmalı')
            .items([
              S.documentTypeListItem('tarihce').title('Tarihçe (Asmalı)'),
              S.documentTypeListItem('transportation').title('Ulaşım'),
              S.documentTypeListItem('accommodation').title('Konaklama ve Yeme-İçme'),
              S.documentTypeListItem('gallery').title('Galeri'),
            ])
        ),

      // 3. Klasör: Marmara Adası
      S.listItem()
        .title('Marmara Adası')
        .child(
          S.list()
            .title('Marmara Adası')
            .items([
              S.documentTypeListItem('marmaraTarihce').title('Tarihçe (Marmara)'),
              S.documentTypeListItem('marmaraGunumuz').title('Günümüzde Marmara'),
            ])
        ),
    ])
