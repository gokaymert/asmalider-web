import { defineField, defineType } from 'sanity'

export const marmaraTarihceType = defineType({
  name: 'marmaraTarihce',
  title: 'Marmara Adası > Tarihçe',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' }
          ]
        }
      ]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Marmara Adası Tarihçesi',
      }
    }
  }
})
