-- ==============================================================================
-- Ibroh's Digital Home (ibroh.im) - Supabase Database Schema & RLS Setup
-- ==============================================================================

-- 1. Helper trigger function to update "updated_at" timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================================================
-- 2. Tables Creation
-- ==============================================================================

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  status TEXT DEFAULT 'Ishlanmoqda',
  year TEXT DEFAULT '',
  href TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Articles / Writing Table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  reading_time TEXT DEFAULT '',
  category TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner TEXT DEFAULT 'Ibrohimbek Gulomov' NOT NULL,
  tagline TEXT DEFAULT 'Quraman, oʻrganaman va ulashaman.' NOT NULL,
  location TEXT DEFAULT 'Toshkent, Oʻzbekiston',
  email TEXT DEFAULT 'hello@ibroh.im' NOT NULL,
  bio TEXT DEFAULT '',
  now_updated_at TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 3. Triggers for updated_at
-- ==============================================================================

DROP TRIGGER IF EXISTS tr_projects_updated_at ON public.projects;
CREATE TRIGGER tr_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_articles_updated_at ON public.articles;
CREATE TRIGGER tr_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS tr_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER tr_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. Enable Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 5. RLS Policies
-- ==============================================================================

-- --- Projects Policies ---
-- Public can view only published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (published = true);

-- Authenticated admins can view all projects (both published and drafts)
DROP POLICY IF EXISTS "Authenticated users can select all projects" ON public.projects;
CREATE POLICY "Authenticated users can select all projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can manage projects (Insert, Update, Delete)
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
CREATE POLICY "Authenticated users can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;
CREATE POLICY "Authenticated users can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;
CREATE POLICY "Authenticated users can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);


-- --- Articles Policies ---
-- Public can view only published articles
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles"
  ON public.articles
  FOR SELECT
  TO public
  USING (published = true);

-- Authenticated admins can view all articles
DROP POLICY IF EXISTS "Authenticated users can select all articles" ON public.articles;
CREATE POLICY "Authenticated users can select all articles"
  ON public.articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can manage articles
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON public.articles;
CREATE POLICY "Authenticated users can insert articles"
  ON public.articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
CREATE POLICY "Authenticated users can update articles"
  ON public.articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.articles;
CREATE POLICY "Authenticated users can delete articles"
  ON public.articles
  FOR DELETE
  TO authenticated
  USING (true);


-- --- Social Links Policies ---
-- Anyone can view social links
DROP POLICY IF EXISTS "Anyone can view social links" ON public.social_links;
CREATE POLICY "Anyone can view social links"
  ON public.social_links
  FOR SELECT
  TO public
  USING (true);

-- Authenticated admins can manage social links
DROP POLICY IF EXISTS "Authenticated users can insert social links" ON public.social_links;
CREATE POLICY "Authenticated users can insert social links"
  ON public.social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update social links" ON public.social_links;
CREATE POLICY "Authenticated users can update social links"
  ON public.social_links
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete social links" ON public.social_links;
CREATE POLICY "Authenticated users can delete social links"
  ON public.social_links
  FOR DELETE
  TO authenticated
  USING (true);


-- --- Site Settings Policies ---
-- Anyone can view site settings
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings
  FOR SELECT
  TO public
  USING (true);

-- Authenticated admins can manage site settings
DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can insert site settings"
  ON public.site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can delete site settings"
  ON public.site_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- ==============================================================================
-- 6. Initial Seed Data
-- ==============================================================================

-- Site Settings initial row (only if empty)
INSERT INTO public.site_settings (owner, tagline, location, email, bio, now_updated_at)
SELECT 
  'Ibrohimbek Gulomov',
  'Quraman, oʻrganaman va ulashaman.',
  'Toshkent, Oʻzbekiston',
  'hello@ibroh.im',
  'Oʻzbekistonlik dasturchi va mahsulot yaratuvchi. Loyihalar, yozmalar, tajribalar va internetda narsalar qurish jarayonida oʻrganayotgan narsalarim.',
  '2026-yil avgust'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);

-- Initial Social Links (only if empty)
INSERT INTO public.social_links (label, href, sort_order)
SELECT 'Telegram', 'https://t.me/ibroh_im', 1
WHERE NOT EXISTS (SELECT 1 FROM public.social_links WHERE label = 'Telegram');

INSERT INTO public.social_links (label, href, sort_order)
SELECT 'Twitter / X', 'https://x.com/ibroh_im', 2
WHERE NOT EXISTS (SELECT 1 FROM public.social_links WHERE label = 'Twitter / X');

INSERT INTO public.social_links (label, href, sort_order)
SELECT 'GitHub', 'https://github.com/ibroh-im', 3
WHERE NOT EXISTS (SELECT 1 FROM public.social_links WHERE label = 'GitHub');

INSERT INTO public.social_links (label, href, sort_order)
SELECT 'LinkedIn', 'https://linkedin.com/in/ibrohim-gulomov', 4
WHERE NOT EXISTS (SELECT 1 FROM public.social_links WHERE label = 'LinkedIn');

-- Initial Projects (only if empty)
INSERT INTO public.projects (slug, name, description, category, status, year, href, published)
SELECT 
  'tezlab',
  'Tezlab',
  'Dasturchilar va startaplar uchun tezkor vositalar va platforma.',
  'Platforma',
  'Faol',
  '2026',
  'https://tezlab.uz',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'tezlab');

INSERT INTO public.projects (slug, name, description, category, status, year, href, published)
SELECT 
  'mano',
  'Mano',
  'Fikrlar, qaydlar va shaxsiy bilimlarni tartibga solish tizimi.',
  'Mahsulot',
  'Ishlanmoqda',
  '2026',
  'https://mano.uz',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'mano');

INSERT INTO public.projects (slug, name, description, category, status, year, href, published)
SELECT 
  'salomat',
  'SalomAT',
  'Sogʻliqni saqlash va profilaktika boʻyicha raqamli yechimlar.',
  'AI / Health',
  'Ishlanmoqda',
  '2025',
  'https://salomat.uz',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'salomat');

INSERT INTO public.projects (slug, name, description, category, status, year, href, published)
SELECT 
  'mayoq-labs',
  'Mayoq Labs',
  'Eksperimental texnologiyalar, AI prototiplari va tadqiqot laboratoriyasi.',
  'Laboratoriya',
  'Faol',
  '2025',
  'https://mayoqlabs.com',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'mayoq-labs');

-- Initial Article (only if empty)
INSERT INTO public.articles (slug, title, excerpt, content, date, reading_time, category, published)
SELECT 
  'kichik-loyihalar-qurish-sanati',
  'Kichik loyihalar qurish sanʼati',
  'Nima uchun katta gʻoyalarni kichik, mustaqil tajribalarga boʻlib amalga oshirish samaraliroq?',
  '# Kichik loyihalar qurish sanʼati\n\nHar bir katta loyiha qachonlardir kichik bir gʻoya yoki sinovdan boshlanadi. Dasturlashda eng muhim qobiliyatlardan biri — katta gʻoyalarni kechiktirmasdan, ularni eng kichik ishchi prototipga keltirib, darhol auditoriyaga havola qilishdir.\n\n## Tezkor boshlashning afzalliklari\n\n1. **Qisqa feedback halqasi:** Fikr real foydalanuvchilar bilan qanchalik erta toʻqnashsa, shunchalik erta tuzatishlar kiritiladi.\n2. **Ruhlanish va motivatsiya:** Oylab tugamaydigan loyihada motivatsiya soʻnishi tabiiy. Kichik qadamlar esa tezkor natija beradi.\n3. **Amaliy oʻrganish:** Yangi texnologiyani nazariyada emas, aniq muammo yechimida sinab koʻrish eng yaxshi oʻrganish usulidir.\n\n> Qurish, oʻrganish va ulashish — rivojlanishning eng toʻgʻri yoʻli.',
  CURRENT_DATE,
  '3',
  'Fikrlar',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.articles WHERE slug = 'kichik-loyihalar-qurish-sanati');
