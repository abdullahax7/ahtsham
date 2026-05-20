'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  bust, TAGS,
  upsertProduct, deleteProduct,
  upsertTestimonial, deleteTestimonial,
  upsertFaq, deleteFaq,
  upsertPaymentMethod, deletePaymentMethod,
  upsertSiteSetting,
  updateHomepageStats,
  type ProductPayload,
  type ProductPlan,
} from '../../lib/db/repos';

function parseBool(v: FormDataEntryValue | null): boolean {
  if (typeof v !== 'string') return false;
  return v === 'on' || v === 'true' || v === '1';
}

function parseInt0(v: FormDataEntryValue | null): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

// ---------- Products ----------
export async function saveProduct(formData: FormData) {
  const slug = ((formData.get('slug') as string) || '').trim();
  const originalSlug = ((formData.get('originalSlug') as string) || '').trim();
  if (!slug) throw new Error('Slug is required');

  let plans: ProductPlan[] = [];
  try {
    plans = JSON.parse((formData.get('plans') as string) || '[]');
  } catch { plans = []; }

  let features: string[] = [];
  try {
    const raw = (formData.get('features') as string) || '';
    features = raw.split('\n').map((x) => x.trim()).filter(Boolean);
  } catch { features = []; }

  let page_content: Record<string, any> = {};
  try { page_content = JSON.parse((formData.get('page_content') as string) || '{}'); } catch { page_content = {}; }

  const payload: ProductPayload = {
    slug,
    name: (formData.get('name') as string) || '',
    category: (formData.get('category') as string) || 'hosting',
    short_description: (formData.get('short_description') as string) || '',
    long_description: (formData.get('long_description') as string) || '',
    icon: (formData.get('icon') as string) || null,
    starting_price_usd: (formData.get('starting_price_usd') as string) || null,
    starting_price_pkr: (formData.get('starting_price_pkr') as string) || null,
    order_url: (formData.get('order_url') as string) || null,
    is_featured: parseBool(formData.get('is_featured')),
    is_visible: !parseBool(formData.get('hide')),
    sort_order: parseInt0(formData.get('sort_order')),
    features,
    plans,
    page_content,
  };
  upsertProduct(payload, originalSlug || undefined);
  bust(TAGS.products, TAGS.product(slug));
  if (originalSlug && originalSlug !== slug) bust(TAGS.product(originalSlug));
  revalidatePath('/admin/products');
  revalidatePath(`/${slug}`);
  redirect('/admin/products');
}

export async function deleteProductAction(formData: FormData) {
  const slug = (formData.get('slug') as string) || '';
  if (!slug) return;
  deleteProduct(slug);
  bust(TAGS.products, TAGS.product(slug));
  revalidatePath('/admin/products');
  revalidatePath(`/${slug}`);
  redirect('/admin/products');
}

// ---------- Testimonials ----------
export async function saveTestimonial(formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;
  upsertTestimonial({
    id,
    author: (formData.get('author') as string) || '',
    role: (formData.get('role') as string) || '',
    text: (formData.get('text') as string) || '',
    stars: parseInt0(formData.get('stars')) || 5,
    avatar: (formData.get('avatar') as string) || null,
    sort_order: parseInt0(formData.get('sort_order')),
    is_visible: !parseBool(formData.get('hide')),
  });
  bust(TAGS.testimonials);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;
  deleteTestimonial(id);
  bust(TAGS.testimonials);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

// ---------- FAQs ----------
export async function saveFaq(formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;
  upsertFaq({
    id,
    question: (formData.get('question') as string) || '',
    answer: (formData.get('answer') as string) || '',
    sort_order: parseInt0(formData.get('sort_order')),
    is_visible: !parseBool(formData.get('hide')),
  });
  bust(TAGS.faqs);
  revalidatePath('/admin/faqs');
  revalidatePath('/');
  redirect('/admin/faqs');
}

export async function deleteFaqAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;
  deleteFaq(id);
  bust(TAGS.faqs);
  revalidatePath('/admin/faqs');
  revalidatePath('/');
  redirect('/admin/faqs');
}

// ---------- Payment Methods ----------
export async function savePaymentMethod(formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;
  upsertPaymentMethod({
    id,
    name: (formData.get('name') as string) || '',
    image_url: (formData.get('image_url') as string) || null,
    sort_order: parseInt0(formData.get('sort_order')),
    is_visible: !parseBool(formData.get('hide')),
  });
  bust(TAGS.payments);
  revalidatePath('/admin/payments');
  revalidatePath('/');
  redirect('/admin/payments');
}

export async function deletePaymentMethodAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;
  deletePaymentMethod(id);
  bust(TAGS.payments);
  revalidatePath('/admin/payments');
  revalidatePath('/');
  redirect('/admin/payments');
}

// ---------- Homepage Stats ----------
export async function saveHomepageStats(formData: FormData) {
  updateHomepageStats({
    clients: parseInt0(formData.get('clients')),
    uptime: Number(formData.get('uptime')) || 99.9,
    support: parseInt0(formData.get('support')),
    locations: parseInt0(formData.get('locations')),
  });
  bust(TAGS.stats);
  revalidatePath('/admin/stats');
  revalidatePath('/');
}

// ---------- Site Settings ----------
export async function saveSiteSettings(formData: FormData) {
  const entries = Array.from(formData.entries());
  for (const [key, value] of entries) {
    if (key.startsWith('s_')) {
      const realKey = key.slice(2);
      upsertSiteSetting(realKey, String(value));
    }
  }
  bust(TAGS.siteSettings);
  revalidatePath('/admin/site-settings');
  revalidatePath('/');
}
