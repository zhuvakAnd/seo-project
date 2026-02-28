import { prisma } from '../lib/prisma';
import { Blog } from '../types/blog.types';

export const createBlog = async (data: {
  title: string;
  content: string;
  slug: string;
  published?: boolean;
}): Promise<Blog> => {
  return await prisma.blog.create({ data });
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  return await prisma.blog.findUnique({ where: { slug } });
};

export const updateBlog = async (
  slug: string,
  data: Partial<{
    title: string;
    content: string;
    published: boolean;
  }>
): Promise<Blog> => {
  return await prisma.blog.update({
    where: { slug },
    data,
  });
};

export const deleteBlog = async (slug: string): Promise<Blog> => {
  return await prisma.blog.delete({ where: { slug } });
};
