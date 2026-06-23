import { defineField, defineType } from 'sanity'

export const membershipType = defineType({
  name: 'membership',
  title: 'Derneğimiz > Üyelik',
  type: 'document',
  fields: [
    defineField({
      name: 'steps',
      title: 'Nasıl Üye Olunur? Adımları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Adım Başlığı',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Açıklama Metni',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'formFile',
              title: 'Başvuru Formu (Opsiyonel PDF/Word dosyası)',
              type: 'file',
              options: {
                storeOriginalFilename: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'feeAmount',
      title: 'Üyelik/Aidat Ücreti (TL)',
      type: 'string',
      description: 'Örn: 300 (Sadece SAYI girin).',
    }),
    defineField({
      name: 'accountName',
      title: 'Banka Hesap Adı',
      type: 'string',
    }),
    defineField({
      name: 'iban',
      title: 'IBAN Numarası',
      type: 'string',
    }),
    defineField({
      name: 'transferDescription',
      title: 'Dekont/Transfer Açıklaması',
      type: 'string',
      description: 'Örn: İsim Soyisim, 100 TL Üyelik + 200 TL Aidat',
    }),
    defineField({
      name: 'kvkkTopText',
      title: 'KVKK Üst Metni',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'kvkkList',
      title: 'KVKK İşlenen Veriler Listesi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Gri kutudaki T.C. Kimlik No gibi maddeler',
    }),
    defineField({
      name: 'kvkkBottomText',
      title: 'KVKK Alt Metni',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Üyelik İşlemleri',
      }
    }
  }
})
