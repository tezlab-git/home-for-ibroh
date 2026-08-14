// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment to generate sitemap');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function fetchPublished() {
  const { data: projects } = await supabase.from('projects').select('slug, updated_at').eq('published', true).order('updated_at', { ascending: false });
  const { data: articles } = await supabase.from('articles').select('slug, updated_at, date').eq('published', true).order('date', { ascending: false });
  return { projects: projects || [], articles: articles || [] };
}

function buildSitemapXml({ projects, articles }) {
  const base = 'https://ibroh.im';
  const staticPages = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/projects', priority: 0.8 },
    { loc: '/writing', priority: 0.8 },
    { loc: '/now', priority: 0.6 },
    { loc: '/contact', priority: 0.2 },
  ];

  const entries = [];

  for (const p of staticPages) {
    entries.push(`  <url>\n    <loc>${base}${p.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`);
  }

  for (const proj of projects) {
    const lastmod = proj.updated_at ? new Date(proj.updated_at).toISOString() : new Date().toISOString();
    entries.push(`  <url>\n    <loc>${base}/projects/${proj.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }

  for (const art of articles) {
    const lastmod = art.updated_at ? new Date(art.updated_at).toISOString() : (art.date ? new Date(art.date).toISOString() : new Date().toISOString());
    entries.push(`  <url>\n    <loc>${base}/writing/${art.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;
}

async function main() {
  console.log('Generating sitemap...');
  const data = await fetchPublished();
  const xml = buildSitemapXml(data);
  const outDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');

  const robots = `User-agent: *\nAllow: /\nSitemap: https://ibroh.im/sitemap.xml\n`;
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');

  console.log('Sitemap and robots.txt written to public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
