import { defineField, defineType } from 'sanity'

export const tarihceType = defineType({
  name: 'tarihce',
  title: 'Asmalı > Tarihçe',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'İçerik (Metin ve Görseller)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Görsel Alternatif Metni',
            }
          ]
        }
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Asmalı'nın Tarihçesi",
      }
    }
  }
})
