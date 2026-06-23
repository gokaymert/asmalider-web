import HomeSlider from "@/components/sections/HomeSlider";
import NewsGrid from "@/components/sections/NewsGrid";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, sliderPostsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  // Sanity'den haberleri çekiyoruz
  const posts = await client.fetch(allPostsQuery);
  const sliderPosts = await client.fetch(sliderPostsQuery);

  return (
    <main className="flex min-h-screen flex-col w-full">
      <HomeSlider posts={sliderPosts} />
      <NewsGrid posts={posts} />
    </main>
  );
}
