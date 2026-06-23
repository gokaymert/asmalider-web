import { Metadata } from 'next';
import MembershipClient from '@/components/about/MembershipClient';
import { sanityFetch } from '@/sanity/lib/live';
import { membershipQuery } from '@/sanity/lib/queries';
import { MembershipData } from '@/types';

export const metadata: Metadata = {
  title: 'Üyelik İşlemleri',
  description: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği üyelik şartları ve başvuru süreci.',
};

export default async function MembershipPage() {
  // Veriyi Sanity'den çek
  const { data } = await sanityFetch({ query: membershipQuery });
  const membershipData = data;

  return (
    <div className="w-full pb-10">
      <MembershipClient data={membershipData as MembershipData} />
    </div>
  );
}
