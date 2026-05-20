'use server'

import { revalidatePath } from 'next/cache';
import { bust, TAGS, updateSettings } from '../../lib/db/repos';

export async function updateStatusHtml(formData: FormData) {
  const html = (formData.get('status_html') as string) || '';
  updateSettings({ status_html: html });
  bust(TAGS.settings);
  revalidatePath('/');
  revalidatePath('/status');
  revalidatePath('/admin');
}

