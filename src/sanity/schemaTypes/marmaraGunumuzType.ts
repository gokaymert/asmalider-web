import { defineField, defineType } from 'sanity'

export const marmaraGunumuzType = defineType({
  name: 'marmaraGunumuz',
  title: 'Marmara Adası > Günümüz',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Giriş (Coğrafya) Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Başlık',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'İçerik Metni',
          type: 'text',
        }),
        defineField({
          name: 'mainImage',
          title: 'Giriş Görseli (Örn: Harita)',
          type: 'image',
          options: { hotspot: true },
        }),
      ]
    }),
    defineField({
      name: 'regions',
      title: 'Bölgeler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Bölge Adı',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Bölge Açıklaması',
              type: 'text',
            }),
            defineField({
              name: 'images',
              title: 'Bölge Fotoğrafları (1, 2 veya 3 adet eklenebilir)',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }]
            })
          ]
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Marmara Adası Günümüz'
      }
    }
  }
})
