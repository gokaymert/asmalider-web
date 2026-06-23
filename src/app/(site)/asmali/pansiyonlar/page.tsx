
import { sanityFetch } from '@/sanity/lib/live';
import { pensionsQuery } from '@/sanity/lib/queries';
import PensionsClient from '@/components/pensions/PensionsClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pansiyonlar',
  description: 'Marmara Adası Asmalı Köyü pansiyonları ve konaklama imkanları. İlanları inceleyerek doğrudan iletişime geçebilirsiniz.',
};

import { PensionData } from '@/types';

export default async function PansiyonlarPage() {
  // Sanity'den verileri getir
  const { data } = await sanityFetch({ query: pensionsQuery });
  const pensions = data || [];

  return <PensionsClient pensions={pensions as PensionData[]} />;
}
