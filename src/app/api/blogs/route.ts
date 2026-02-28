import { NextRequest, NextResponse } from 'next/server';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from '../../../../services/blog.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (slug) {
    const blog = await getBlogBySlug(slug);
    return NextResponse.json(blog);
  }
  const blogs = await getAllBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const blog = await createBlog(body);
  return NextResponse.json(blog);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const slug = body.slug;
  if (!slug) return NextResponse.error();
  const updated = await updateBlog(slug, body);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.error();
  const deleted = await deleteBlog(slug);
  return NextResponse.json(deleted);
}
