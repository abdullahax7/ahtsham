import PolicyPage from '../components/PolicyPage';
import { getSiteSetting } from '../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function TermsPage() {
  const html = await getSiteSetting('terms_html', '');
  const intro = await getSiteSetting(
    'terms_intro',
    "At QaziHost, we take our terms and conditions very seriously. When you use our services you enter into a legal agreement that outlines the rules and guidelines you must follow.",
  );
  const lastUpdated = await getSiteSetting('terms_last_updated', 'January 1, 2024');
  return <PolicyPage title="Terms & Conditions" intro={intro} lastUpdated={lastUpdated} html={html} />;
}
