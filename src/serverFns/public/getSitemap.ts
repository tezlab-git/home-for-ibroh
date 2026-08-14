// src/serverFns/public/getSitemap.ts
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function getSitemapResponse() {
  const base = 'https://ibroh.im';

  const projects = supabaseAdmin
    ? (await supabaseAdmin.from('projects').select('slug, updated_at').eq('published', true).order('updated_at', { ascending: false })).data
    : [];

  const articles = supabaseAdmin
    ? (await supabaseAdmin.from('articles').select('slug, updated_at, date').eq('published', true).order('date', { ascending: false })).data
    : [];

  const staticPages = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/projects', priority: 0.8 },
    { loc: '/writing', priority: 0.8 },
    { loc: '/now', priority: 0.6 },
    { loc: '/contact', priority: 0.2 },
  ];

  const entries: string[] = [];

  for (const p of staticPages) {
    entries.push(`  <url>\n    <loc>${base}${p.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }

  for (const proj of projects || []) {
    const lastmod = proj.updated_at ? new Date(proj.updated_at).toISOString() : new Date().toISOString();
    entries.push(`  <url>\n    <loc>${base}/projects/${proj.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }

  for (const art of articles || []) {
    const lastmod = art.updated_at ? new Date(art.updated_at).toISOString() : (art.date ? new Date(art.date).toISOString() : new Date().toISOString());
    entries.push(`  <url>\n    <loc>${base}/writing/${art.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;

  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
