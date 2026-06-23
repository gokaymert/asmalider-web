import { defineField, defineType } from 'sanity'

export const workType = defineType({
  name: 'work',
  title: 'Çalışmalar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Çalışmanın Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Örn: Hayalet Ağ Temizliği',
    }),
    defineField({
      name: 'date',
      title: 'Sıralama Tarihi',
      type: 'date',
      validation: (Rule) => Rule.required(),
      description: 'Sadece arka planda doğru sıralama yapmak için kullanılacak tarih.',
    }),
    defineField({
      name: 'displayDate',
      title: 'Gözükecek Tarih (Esnek)',
      type: 'string',
      description: "Ekranda görünecek esnek tarih metni (Örn: '22-24 Mayıs 2026').",
    }),
    defineField({
      name: 'description',
      title: 'Çalışma Açıklaması',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Çalışma Fotoğrafları (Maksimum 5)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5).error('En fazla 5 fotoğraf ekleyebilirsiniz.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'displayDate',
      media: 'images.0',
    },
  },
})
