import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { prisma } from "@/lib/prisma";
import type { Post as UiPost } from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";
export const dynamic = 'force-dynamic';

type DbPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
};

export default async function PostsPage() {
  const dbPosts: DbPost[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const allStaticPosts: UiPost[] = getAllPosts();

  // helper to pick a random static post (used for fallback values)
  const randomStatic = (): UiPost | null => {
    if (allStaticPosts.length === 0) return null;
    const idx = Math.floor(Math.random() * allStaticPosts.length);
    return allStaticPosts[idx];
  };

  // map the database rows to the UI `Post` shape, falling back to a random
  // static post for anything the DB doesn’t provide.
  const allPosts: UiPost[] = dbPosts.map((p) => {
    const fallback = randomStatic();
    return {
      slug: p.slug,
      title: p.title,
      date: p.createdAt.toISOString(),
      coverImage:
        p.coverImage ?? fallback?.coverImage ?? "/assets/blog/default-cover.jpg",
      author:
        p.author ??
        fallback?.author ??
        { name: "Unknown", picture: "/assets/blog/authors/default.png" },
      excerpt: p.content.slice(0, 140),
      ogImage: { url: p.coverImage ?? fallback?.coverImage ?? "/assets/blog/default-cover.jpg" },
      content: p.content,
    };
  });

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}