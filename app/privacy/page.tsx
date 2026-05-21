import PolicyPage from '../components/PolicyPage';
import { getSiteSetting } from '../../lib/db/repos';

export const runtime = 'nodejs';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function PrivacyPolicyPage() {
  const html = await getSiteSetting('privacy_html', '');
  const intro = await getSiteSetting(
    'privacy_intro',
    "At QaziHost, we take our privacy policy very seriously and want our clients to do the same. When you agree to our privacy policy, you enter into a legal agreement with our company.",
  );
  const lastUpdated = await getSiteSetting('privacy_last_updated', '1st January 2024');
  return <PolicyPage title="Privacy Policy" intro={intro} lastUpdated={lastUpdated} html={html} />;
}
