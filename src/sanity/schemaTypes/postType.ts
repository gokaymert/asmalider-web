import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Haber, Duyuru & Etkinlik',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Haber Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      description: "Sadece 'Generate' butonuna basın. Haberin linkini oluşturacaktır.",
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayınlanma Tarihi',
      description: "Sitede saat gözükmeyecek.",
      type: 'datetime',
      initialValue: () => new Date().toISOString(),

    }),
    defineField({
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin',
          description: 'Arama motorları için resmi anlatan kısa bir metin.',
        }
      ]
    }),
    defineField({
      name: 'body',
      title: 'Haber İçeriği',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'hideFromSlider',
      title: 'Ana Sayfa Slider\'ından Gizle',
      description: 'Bu haber varsayılan olarak ana sayfadaki dönen galeride gösterilir. Eğer slider\'da yer almasını İSTEMİYORSANIZ bu kutucuğu işaretleyin.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'basvuruLinki',
      title: 'Etkinlik Başvuru Linki',
      type: 'url',
      description: 'Eğer bu bir etkinlikse ve dışarıdan başvuru alınacaksa (örn: Google Forms) buraya linki ekleyin. Haber veya duyuru ise boş bırakın.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
