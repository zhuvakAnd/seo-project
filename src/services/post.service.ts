import { prisma } from '../lib/prisma';
import { PostCreateInput, PostUpdateInput } from '../types/post.types';

export const createPost = async (data: PostCreateInput) => {
  return prisma.post.create({ data });
};

export const updatePost = async (id: number, data: PostUpdateInput) => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findUnique({
    where: { slug },
  });
};

export const getAllPosts = async () => {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
