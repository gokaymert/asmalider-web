import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Asmalı > Galeri',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Fotoğraflar',
      description: "Sırasının bir önemi yok.",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Fotoğraf',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              media: 'image',
            },
            prepare(selection) {
              const { media } = selection
              return {
                title: 'Fotoğraf',
                media: media,
              }
            }
          }
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Galeri',
      }
    }
  }
})
