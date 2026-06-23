import { defineField, defineType } from 'sanity'

export const pensionType = defineType({
  name: 'pension',
  title: 'Pansiyonlar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pansiyon Adı',
      type: 'string',
    }),
    defineField({
      name: 'ownerName',
      title: 'Pansiyon Sahibinin Adı',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Pansiyon Açıklaması',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'İletişim Numarası',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Pansiyon Fotoğrafları',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
