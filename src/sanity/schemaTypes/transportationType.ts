import { defineField, defineType } from 'sanity'

export const transportationType = defineType({
  name: 'transportation',
  title: 'Asmalı > Ulaşım',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Karşılama Metni',
      type: 'text',
      description: "En üstte gözükecek olan kısa metin.",
    }),
    defineField({
      name: 'ferries',
      title: 'Feribot Seferleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'companyName', type: 'string', title: 'Firma Adı (Örn: Gestaş)' },
            { name: 'url', type: 'url', title: 'Sefer Saatleri Linki' },
            {
              name: 'routes',
              title: 'Rotalar',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'routeName', type: 'string', title: 'Rota Adı (Örn: Erdek - Marmara)' },
                    { name: 'duration', type: 'string', title: 'Süre (Örn: Yaklaşık 1s 35dk)' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'localTransport',
      title: 'Ada İçi Ulaşım',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Başlık (Örn: Marmara İskelesi)' },
            { name: 'description', type: 'text', title: 'Açıklama' },
            { name: 'distance', type: 'string', title: 'Uzaklık (Opsiyonel - Örn: 18 km)' },
            { name: 'linkUrl', type: 'url', title: 'Link URL (Opsiyonel)' },
            { name: 'linkLabel', type: 'string', title: 'Buton Metni (Opsiyonel - Örn: Otobüs Saatlerini İncele)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'boatRoutes',
      title: 'Özel Tekne Rotaları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'location', type: 'string', title: 'Lokasyon (Örn: Avşa Adası)' },
            { name: 'mil', type: 'number', title: 'Mil (Sıralama için sadece rakam - Örn: 10.5)' },
          ],
          preview: {
            select: {
              title: 'location',
              subtitle: 'mil',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: `${subtitle} mil`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cooperativeContact',
      title: 'Kooperatif İletişim',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Başlık (Örn: KOOPERATİF BAŞKANI)' },
        { name: 'name', type: 'string', title: 'İsim Soyisim' },
        { name: 'phone', type: 'string', title: 'Telefon Numarası (Örn: +905462310975 veya 0546 231 09 75)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Ulaşım Sayfası',
      }
    },
  },
})
