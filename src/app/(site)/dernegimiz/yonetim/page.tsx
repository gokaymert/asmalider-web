import { Metadata } from 'next';
import ManagementClient from '@/components/about/ManagementClient';
import { boardMembersQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

export const metadata: Metadata = {
  title: 'Yönetim Kurulu',
  description: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği Yönetim Kurulu Üyeleri.',
};

import { BoardData } from '@/types';

export default async function ManagementPage() {
  // Veriyi Sanity'den çek
  const { data } = await sanityFetch({ query: boardMembersQuery });
  const boardData = data;

  return (
    <div className="w-full pb-10">
      <ManagementClient data={boardData as BoardData} />
    </div>
  );
}
