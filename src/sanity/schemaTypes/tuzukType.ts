import { defineField, defineType } from 'sanity'

export const tuzukType = defineType({
  name: 'tuzuk',
  title: 'Derneğimiz > Tüzük',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Tüzük Bölümleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Bölüm Başlığı',
              type: 'string',
              description: "Örn: 'BİRİNCİ BÖLÜM'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'articles',
              title: 'Maddeler',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'articleTitle',
                      title: 'Madde Başlığı',
                      type: 'string',
                      description: "Örn: 'DERNEĞİN ADI VE MERKEZİ' (Sadece başlığı girin, MADDE numarası otomatik atanacaktır)",
                    }),
                    defineField({
                      name: 'articleBody',
                      title: 'Madde İçeriği',
                      type: 'array',
                      of: [{ type: 'block' }],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'articleTitle',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'sectionTitle',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Dernek Tüzüğü',
      }
    },
  },
})
