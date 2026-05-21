import PolicyPage from '../components/PolicyPage';
import { getSiteSetting } from '../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function FairUsagePolicyPage() {
  const html = await getSiteSetting('fair_usage_html', '');
  const intro = await getSiteSetting(
    'fair_usage_intro',
    'Our Fair Usage Policy governs how shared resources are used so every customer gets a fast, reliable experience on QaziHost servers.',
  );
  const lastUpdated = await getSiteSetting('fair_usage_last_updated', 'January 1, 2024');
  return <PolicyPage title="Fair Usage Policy" intro={intro} lastUpdated={lastUpdated} html={html} />;
}
