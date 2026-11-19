import type { Metadata } from 'next';

import { RestorationCompanyView } from '@/components/restoration-company-view';
import { restorationCompanyEs } from '@/lib/es/restoration-company-page';
import { restorationCompanyEn } from '@/lib/restoration-company-page';
import { languageAlternates, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: restorationCompanyEn.metaTitle,
  description: restorationCompanyEn.description,
  path: restorationCompanyEn.path,
  image: '/images/projects/restoration/air-movers-drying.jpg',
  languages: languageAlternates(restorationCompanyEn.path, restorationCompanyEs.path),
});

export default function RestorationCompanyHoustonPage() {
  return <RestorationCompanyView copy={restorationCompanyEn} />;
}
