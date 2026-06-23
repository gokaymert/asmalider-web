import { defineField, defineType } from 'sanity'

export const boardType = defineType({
  name: 'board',
  title: 'Derneğimiz > Başkan ve Kurullar',
  type: 'document',
  fields: [
    defineField({
      name: 'presidents',
      title: 'Geçmişten Günümüze Başkanlarımız',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Başkanın Adı', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'period', title: 'Dönemi', type: 'string', description: 'Örn: 2025 - Günümüz', validation: Rule => Rule.required() }),
            defineField({ name: 'isCurrent', title: 'Mevcut Başkan mı?', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'period' },
          }
        }
      ]
    }),
    defineField({
      name: 'committeePeriods',
      title: 'Dönem Kurulları (Yönetim ve Denetim)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'periodTitle', title: 'Dönem Başlığı', type: 'string', description: 'Örn: 2025 - 2027 Yönetim ve Denetim Kurulları', validation: Rule => Rule.required() }),
            defineField({
              name: 'yonetimKurulu',
              title: 'Yönetim Kurulu',
              type: 'object',
              fields: [
                defineField({
                  name: 'asilUyeler',
                  title: 'Asil Üyeler',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({ name: 'role', title: 'Rol / Unvan', type: 'string', description: 'Örn: Başkan Yardımcısı' }),
                        defineField({ name: 'name', title: 'Üye Adı', type: 'string' })
                      ],
                      preview: { select: { title: 'name', subtitle: 'role' } }
                    }
                  ]
                }),
                defineField({
                  name: 'yedekUyeler',
                  title: 'Yedek Üyeler',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({ name: 'role', title: 'Rol / Unvan', type: 'string', description: 'Örn: Yedek Üye' }),
                        defineField({ name: 'name', title: 'Üye Adı', type: 'string' })
                      ],
                      preview: { select: { title: 'name', subtitle: 'role' } }
                    }
                  ]
                })
              ]
            }),
            defineField({
              name: 'denetimKurulu',
              title: 'Denetim Kurulu',
              type: 'object',
              fields: [
                defineField({
                  name: 'asilUyeler',
                  title: 'Asil Üyeler',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({ name: 'role', title: 'Rol / Unvan', type: 'string' }),
                        defineField({ name: 'name', title: 'Üye Adı', type: 'string' })
                      ],
                      preview: { select: { title: 'name', subtitle: 'role' } }
                    }
                  ]
                }),
                defineField({
                  name: 'yedekUyeler',
                  title: 'Yedek Üyeler',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({ name: 'role', title: 'Rol / Unvan', type: 'string' }),
                        defineField({ name: 'name', title: 'Üye Adı', type: 'string' })
                      ],
                      preview: { select: { title: 'name', subtitle: 'role' } }
                    }
                  ]
                })
              ]
            })
          ],
          preview: {
            select: { title: 'periodTitle' },
          }
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Başkan ve Kurullar',
      }
    }
  }
})
