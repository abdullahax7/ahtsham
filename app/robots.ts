import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/login',
          '/signup',
          '/_next/',
          '/*?*preview=',
        ],
      },
      // Be explicit with Googlebot so it never gets a "blocked by robots" hint
      // on resources it needs for rendering.
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://qazi.host/sitemap.xml',
    host: 'https://qazi.host',
  };
}
