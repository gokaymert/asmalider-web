import { defineField, defineType } from 'sanity';

const supporterItemSchema = {
  type: 'object',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'İsim / Kurum Adı' }),
    defineField({ name: 'company', type: 'string', title: 'Şirket/Alt Başlık (Opsiyonel)' }),
    defineField({ name: 'url', type: 'url', title: 'Yönlendirme Linki (Opsiyonel)' }),
    defineField({
      name: 'avatarType',
      type: 'string',
      title: 'Görsel Tipi',
      options: {
        list: [
          { title: 'Erkek Avatar', value: 'male' },
          { title: 'Kadın Avatar', value: 'female' },
          { title: 'Özel Görsel/Logo', value: 'custom' }
        ]
      }
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Özel Görsel',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.avatarType !== 'custom'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'image'
    }
  }
};

export const supportersType = defineType({
  name: 'supporters',
  title: 'Destekçilerimiz',
  type: 'document',
  fields: [
    defineField({
      name: 'degerliDestekciler',
      title: 'Değerli Destekçilerimiz',
      type: 'array',
      of: [supporterItemSchema]
    }),
    defineField({
      name: 'isBirlikciler',
      title: 'İş Birlikçilerimiz',
      type: 'array',
      of: [supporterItemSchema]
    }),
    defineField({
      name: 'gonulluEmekciler',
      title: 'Gönüllü Emekçilerimiz',
      type: 'array',
      of: [supporterItemSchema]
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Destekçilerimiz Sayfası' };
    }
  }
});
