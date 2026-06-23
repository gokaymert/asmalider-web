import { defineField, defineType } from 'sanity'

export const accommodationType = defineType({
  name: 'accommodation',
  title: 'Asmalı > Konaklama ve Yeme-İçme',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Karşılama Metni',
      type: 'text',
      description: 'En üstte gözükecek olan kısa metin.',
    }),
    defineField({
      name: 'facilities',
      title: 'Konaklama İmkanları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Başlık',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'text',
            }),
            defineField({
              name: 'hasLink',
              title: 'Buton Eklensin mi?',
              type: 'boolean',
              initialValue: false,
              description: 'Bu seçeneğe yönlendirme butonu (Örn: Pansiyonları İncele) eklensin mi?',
            }),
            defineField({
              name: 'buttonText',
              title: 'Buton Metni',
              type: 'string',
              hidden: ({ parent }) => !parent?.hasLink,
            }),
            defineField({
              name: 'buttonUrl',
              title: 'Buton Yönlendirme Linki',
              type: 'string',
              hidden: ({ parent }) => !parent?.hasLink,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'dining',
      title: 'Yeme-İçme Mekanları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Başlık',
              type: 'string',
            }),
            defineField({
              name: 'placeCount',
              title: 'Mekan Sayısı (Örn: 2 Mekan)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Açıklama',
              type: 'text',
            }),
            defineField({
              name: 'iconType',
              title: 'İkon Tipi',
              type: 'string',
              options: {
                list: [
                  { title: 'Cafe (Kahve Fincanı)', value: 'cafe' },
                  { title: 'Users (Kişiler/Dernek vs)', value: 'users' },
                  { title: 'Restaurant (Çatal Bıçak)', value: 'restaurant' },
                  { title: 'Default (Standart Nokta)', value: 'default' },
                ],
              },
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Konaklama ve Yeme-İçme',
      }
    }
  }
})
