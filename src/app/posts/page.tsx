import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic'; 

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <a href={`/posts/${p.slug}`}>{p.title}</a> ({new Date(p.createdAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
