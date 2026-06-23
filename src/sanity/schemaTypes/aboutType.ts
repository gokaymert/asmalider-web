import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'aboutUs',
  title: 'Derneğimiz > Hakkımızda',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Ana Başlığı',
      type: 'string',
      description: 'Örn: Tarihsel YOLCULUĞUMUZ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Ana Metin',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vizyon Kutusu Başlığı',
      type: 'string',
      description: 'Örn: Günümüz ve Gelecek Vizyonumuz',
    }),
    defineField({
      name: 'visionContent',
      title: 'Vizyon Kutusu Metni',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Derneğimiz > Hakkımızda',
      }
    },
  },
})
