import { createAPIFileRoute } from '@tanstack/react-start/api';
import { createClient } from '@supabase/supabase-js';

const BASE = 'https://ibroh.im';

const STATIC_URLS = [
  { loc: BASE, priority: '1.0', changefreq: 'weekly' },
  { loc: `${BASE}/about`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${BASE}/projects`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE}/writing`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${BASE}/now`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${BASE}/contact`, priority: '0.5', changefreq: 'yearly' },
];

export const APIRoute = createAPIFileRoute('/sitemap.xml')({
  GET: async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at')
      .eq('published', true);

    const urls = [
      ...STATIC_URLS.map(
        ({ loc, priority, changefreq }) => `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
      ),
      ...(articles ?? []).map(
        (a) => `
  <url>
    <loc>${BASE}/writing/${a.slug}</loc>
    <lastmod>${a.updated_at?.split('T')[0] ?? ''}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
      ),
    ].join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  },
});
