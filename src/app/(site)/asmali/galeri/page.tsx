
import { sanityFetch } from '@/sanity/lib/live';
import { galleryQuery } from '@/sanity/lib/queries';
import GalleryClient from '@/components/gallery/GalleryClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Marmara Adası Asmalı Köyü\'nün eşsiz doğası ve tarihi sokaklarından oluşan fotoğraf galerisi.',
};

import { GalleryData } from '@/types';

export default async function GaleriPage() {
  // Sanity'den verileri getir
  const { data } = await sanityFetch({ query: galleryQuery });
  const photos = (data as GalleryData)?.photos || [];

  return <GalleryClient photos={photos} />;
}
