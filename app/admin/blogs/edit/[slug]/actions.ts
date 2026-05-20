'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  bust,
  deleteBlogsBySlugs,
  getBlogBySlug,
  insertBlog,
  TAGS,
  updateBlogBySlug,
} from '../../../../../lib/db/repos';

export async function saveBlog(formData: FormData) {
  const isNew = formData.get('isNew') === 'true';
  const originalSlug = formData.get('originalSlug') as string;

  const slug = (formData.get('slug') as string).trim();
  const title = (formData.get('title') as string).trim();
  const excerpt = (formData.get('excerpt') as string) || '';
  const content = (formData.get('content') as string) || '';
  const date = (formData.get('date') as string) || '';
  const tag = (formData.get('tag') as string) || '';
  const youtube_id = (formData.get('youtube_id') as string) || '';
  const note_text = (formData.get('note_text') as string) || '';
  const featured_image = (formData.get('featured_image') as string) || '';

  const activeProductsJson = formData.get('related_products') as string;
  let related_products: string[] = [];
  try {
    const parsed = JSON.parse(activeProductsJson || '[]');
    related_products = Array.isArray(parsed) ? parsed : [];
  } catch {
    related_products = [];
  }

  const payload = {
    slug,
    title,
    excerpt,
    content,
    date,
    tag,
    youtube_id: youtube_id || null,
    note_text: note_text || null,
    featured_image: featured_image || null,
    related_products,
  };

  if (isNew) {
    insertBlog(payload);
  } else {
    updateBlogBySlug(originalSlug, payload);
  }

  bust(TAGS.blogs, TAGS.blog(slug));
  if (originalSlug && originalSlug !== slug) bust(TAGS.blog(originalSlug));

  revalidatePath('/admin');
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  related_products.forEach((prod: string) => revalidatePath(`/${prod}`));

  redirect('/admin/blogs');
}

export async function deleteBlog(formData: FormData) {
  const slug = formData.get('slug') as string;
  if (!slug) return;

  deleteBlogsBySlugs([slug]);
  bust(TAGS.blogs, TAGS.blog(slug));
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  redirect('/admin/blogs');
}

// Bulk delete used by the admin list page (server action via form).
export async function deleteBlogsBulk(formData: FormData) {
  const raw = formData.get('slugs') as string;
  let slugs: string[] = [];
  try {
    slugs = JSON.parse(raw || '[]');
  } catch {
    slugs = [];
  }
  if (!slugs.length) return { count: 0 };
  deleteBlogsBySlugs(slugs);
  bust(TAGS.blogs, ...slugs.map((s) => TAGS.blog(s)));
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  return { count: slugs.length };
}

export async function getBlogForEditor(slug: string) {
  return await getBlogBySlug(slug);
}
