import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Statik rotalar
  const staticRoutes = [
    '',
    '/dernegimiz/hakkinda',
    '/dernegimiz/yonetim',
    '/dernegimiz/tuzuk',
    '/dernegimiz/uyelik',
    '/calismalar',
    '/asmali/tarihce',
    '/asmali/ulasim',
    '/asmali/konaklama',
    '/asmali/galeri',
    '/asmali/pansiyonlar',
    '/marmara-adasi/tarihce',
    '/marmara-adasi/gunumuz',
    '/iletisim',
    '/haberler',
    '/destekcilerimiz'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dinamik rotalar (Haberler)
  const posts = await client.fetch(allPostsQuery);
  const dynamicRoutes = posts.map((post: any) => ({
    url: `${siteUrl}/haberler/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
