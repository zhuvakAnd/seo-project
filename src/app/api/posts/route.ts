import { NextResponse } from 'next/server';
import { createPost, deletePost, getAllPosts, getPostBySlug, updatePost } from '../../../services/post.service';

// GET /api/posts
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  if (slug) {
    const post = await getPostBySlug(slug);
    return NextResponse.json(post);
  }
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(request: Request) {
  const data = await request.json();
  const post = await createPost(data);
  return NextResponse.json(post, { status: 201 });
}

// PATCH /api/posts/:id
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get('id');
  if (!idParam) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const id = parseInt(idParam, 10);
  const data = await request.json();
  const post = await updatePost(id, data);
  return NextResponse.json(post);
}

// DELETE /api/posts/:id
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get('id');
  if (!idParam) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const id = parseInt(idParam, 10);
  await deletePost(id);
  return NextResponse.json({ success: true });
}
