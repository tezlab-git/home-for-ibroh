// scripts/migrateToSupabase.js
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load .env manually if present
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL;

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌ Xato: Supabase URL va Key topilmadi!');
  console.error('Iltimos, .env faylida quyidagilarni toʻldiring:');
  console.error('  VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (yoki VITE_SUPABASE_ANON_KEY)\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const initialProjects = [
  {
    slug: 'tezlab',
    name: 'Tezlab',
    description: 'Dasturchilar va startaplar uchun tezkor vositalar va platforma.',
    category: 'Platforma',
    status: 'Faol',
    year: '2026',
    href: 'https://tezlab.uz',
    published: true,
  },
  {
    slug: 'mano',
    name: 'Mano',
    description: 'Fikrlar, qaydlar va shaxsiy bilimlarni tartibga solish tizimi.',
    category: 'Mahsulot',
    status: 'Ishlanmoqda',
    year: '2026',
    href: 'https://mano.uz',
    published: true,
  },
  {
    slug: 'salomat',
    name: 'SalomAT',
    description: 'Sogʻliqni saqlash va profilaktika boʻyicha raqamli yechimlar.',
    category: 'AI / Health',
    status: 'Ishlanmoqda',
    year: '2025',
    href: 'https://salomat.uz',
    published: true,
  },
  {
    slug: 'mayoq-labs',
    name: 'Mayoq Labs',
    description: 'Eksperimental texnologiyalar, AI prototiplari va tadqiqot laboratoriyasi.',
    category: 'Laboratoriya',
    status: 'Faol',
    year: '2025',
    href: 'https://mayoqlabs.com',
    published: true,
  },
];

const initialArticles = [
  {
    slug: 'kichik-loyihalar-qurish-sanati',
    title: 'Kichik loyihalar qurish sanʼati',
    excerpt: 'Nima uchun katta gʻoyalarni kichik, mustaqil tajribalarga boʻlib amalga oshirish samaraliroq?',
    content: `# Kichik loyihalar qurish sanʼati\n\nHar bir katta loyiha qachonlardir kichik bir gʻoya yoki sinovdan boshlanadi. Dasturlashda eng muhim qobiliyatlardan biri — katta gʻoyalarni kechiktirmasdan, ularni eng kichik ishchi prototipga keltirib, darhol auditoriyaga havola qilishdir.\n\n## Tezkor boshlashning afzalliklari\n\n1. **Qisqa feedback halqasi:** Fikr real foydalanuvchilar bilan qanchalik erta toʻqnashsa, shunchalik erta tuzatishlar kiritiladi.\n2. **Ruhlanish va motivatsiya:** Oylab tugamaydigan loyihada motivatsiya soʻnishi tabiiy. Kichik qadamlar esa tezkor natija beradi.\n3. **Amaliy oʻrganish:** Yangi texnologiyani nazariyada emas, aniq muammo yechimida sinab koʻrish eng yaxshi oʻrganish usulidir.\n\n> Qurish, oʻrganish va ulashish — rivojlanishning eng toʻgʻri yoʻli.`,
    date: new Date().toISOString().slice(0, 10),
    reading_time: '3',
    category: 'Fikrlar',
    published: true,
  },
];

const initialSocials = [
  { label: 'Telegram', href: 'https://t.me/ibroh_im', sort_order: 1 },
  { label: 'Twitter / X', href: 'https://x.com/ibroh_im', sort_order: 2 },
  { label: 'GitHub', href: 'https://github.com/ibroh-im', sort_order: 3 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ibrohim-gulomov', sort_order: 4 },
];

const initialSettings = {
  owner: 'Ibrohimbek Gulomov',
  tagline: 'Quraman, oʻrganaman va ulashaman.',
  location: 'Toshkent, Oʻzbekiston',
  email: 'hello@ibroh.im',
  bio: 'Oʻzbekistonlik dasturchi va mahsulot yaratuvchi. Loyihalar, yozmalar, tajribalar va internetda narsalar qurish jarayonida oʻrganayotgan narsalarim.',
  now_updated_at: '2026-yil avgust',
};

async function seed() {
  console.log('🚀 Supabase backend migratsiyasi va boshlangʻich maʼlumotlar yuklanmoqda...\n');

  // 1. Site Settings
  const { data: existingSettings, error: errSettings } = await supabase
    .from('site_settings')
    .select('id')
    .limit(1);

  if (errSettings) {
    console.error('❌ "site_settings" jadvaliga ulanishda xato. Avval supabase/schema.sql ni ishga tushirdingizmi?');
    console.error(errSettings.message);
    process.exit(1);
  }

  if (!existingSettings || existingSettings.length === 0) {
    const { error } = await supabase.from('site_settings').insert(initialSettings);
    if (error) console.error('  ⚠️ site_settings kiritishda xato:', error.message);
    else console.log('  ✅ site_settings muvaffaqiyatli saqlandi.');
  } else {
    console.log('  ℹ️ site_settings allaqachon mavjud.');
  }

  // 2. Social Links
  for (const item of initialSocials) {
    const { data: exists } = await supabase
      .from('social_links')
      .select('id')
      .eq('label', item.label)
      .single();

    if (!exists) {
      const { error } = await supabase.from('social_links').insert(item);
      if (error) console.error(`  ⚠️ social_links (${item.label}) xato:`, error.message);
      else console.log(`  ✅ social_link: ${item.label} qoʻshildi.`);
    }
  }

  // 3. Projects
  for (const item of initialProjects) {
    const { data: exists } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', item.slug)
      .single();

    if (!exists) {
      const { error } = await supabase.from('projects').insert(item);
      if (error) console.error(`  ⚠️ project (${item.name}) xato:`, error.message);
      else console.log(`  ✅ loyiha: ${item.name} qoʻshildi.`);
    }
  }

  // 4. Articles
  for (const item of initialArticles) {
    const { data: exists } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', item.slug)
      .single();

    if (!exists) {
      const { error } = await supabase.from('articles').insert(item);
      if (error) console.error(`  ⚠️ article (${item.title}) xato:`, error.message);
      else console.log(`  ✅ maqola: "${item.title}" qoʻshildi.`);
    }
  }

  console.log('\n🎉 Barcha boshlangʻich maʼlumotlar muvaffaqiyatli yuklandi!');
}

seed().catch((err) => {
  console.error('\n❌ Migratsiya jarayonida kutilmagan xatolik yuz berdi:', err);
  process.exit(1);
});
