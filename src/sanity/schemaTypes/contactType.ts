import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'İletişim Bilgileri',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      description: 'Dernek veya kurumun açık adresi',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-posta',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Harita Linki (Google Maps)',
      type: 'string',
      description: 'Haritaya tıklandığında açılacak link veya iframe src değeri',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'İletişim Bilgileri',
      }
    }
  }
})
