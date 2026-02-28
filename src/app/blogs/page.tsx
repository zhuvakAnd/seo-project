import { prisma } from '../../lib/prisma';
import Link from 'next/link';

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((b) => (
          <li key={b.slug}>
            <Link href={`/blogs/${b.slug}`}>{b.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
