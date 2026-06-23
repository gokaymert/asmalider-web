import SanityImage from "@/components/ui/SanityImage";
import Link from "next/link";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Haber Bulunamadı"
    };
  }

  const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).url() : "/images/logo.png";
  const description = `${post.title} haberi hakkında detaylar. Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği.`;

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `/haberler/${slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Sanity'den veriyi çekiyoruz
  const post = await client.fetch(postBySlugQuery, { slug });

  // Eğer post bulunamazsa 404 sayfasına yönlendir
  if (!post) {
    notFound();
  }

  // Tarih formatlama
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-(--color-light) pt-6 pb-12 md:pt-8 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Geri Dön Butonu */}
        <div className="mb-6">
          <Link
            href="/haberler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-(--color-primary) transition-colors"
          >
            <ArrowLeft size={16} />
            Haberlere Dön
          </Link>
        </div>

        {/* Semantik Article Etiketi */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Hero Görseli */}
          {post.mainImage?.asset && (
            <div className="relative w-full h-[300px] md:h-[400px]">
              <SanityImage
                image={post.mainImage}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-10 lg:p-14">

            {/* Ana Başlık */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Meta Bilgileri */}
            <div className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </div>
            </div>

            {/* İçerik Alanı (Prose) - PortableText kullanımı */}
            <div className="prose prose-lg prose-blue max-w-4xl mx-auto text-gray-700 prose-headings:text-gray-900 prose-a:text-(--color-primary)">
              {post.body ? <PortableText value={post.body} /> : null}
            </div>

            {/* Etkinlik Başvuru Butonu (Eğer Link Varsa) */}
            {post.basvuruLinki && (
              <div className="mt-12 flex justify-center border-t border-gray-100 pt-10">
                <a
                  href={post.basvuruLinki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 min-[365px]:px-8 py-3.5 min-[365px]:py-4 bg-(--color-primary) text-white font-semibold text-sm min-[365px]:text-lg rounded-xl shadow-md hover:bg-(--color-primary)/90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group whitespace-nowrap"
                >
                  Etkinliğe Başvuru Yap
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>

        </article>

      </div>
    </main>
  );
}
