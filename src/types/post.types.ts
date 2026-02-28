export interface PostCreateInput {
  title: string;
  slug: string;
  content: string;
}

export interface PostUpdateInput {
  title?: string;
  slug?: string;
  content?: string;
}
