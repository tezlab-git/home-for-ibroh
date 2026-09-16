# Supabase Backend Qoʻllanmasi (ibroh.im)

Ushbu loyihaning backend qismi **Supabase** (PostgreSQL + Auth + Row Level Security) asosida ishlaydi. Quyidagi qadamlar orqali backendni toʻliq sozlab, ishga tushirishingiz mumkin.

---

## 1. Supabase loyihasi yaratish
1. [supabase.com](https://supabase.com) ga kiring va yangi loyiha (Project) yarating.
2. Loyihangiz tayyor boʻlgach, chap menyudan **SQL Editor** boʻlimiga oʻting.

---

## 2. Maʼlumotlar bazasi sxemasini yuklash
1. Loyihadagi [supabase/schema.sql](file:///c:/Users/Acer/OneDrive/Desktop/home-for-ibroh-main/supabase/schema.sql) faylining toʻliq kodini nusxalang.
2. Supabase **SQL Editor**ga joylab, **Run** tugmasini bosing.
3. Bu quyidagi 4 ta jadvalni, avtomatik yangilanish triggerlarini va xavfsizlik (RLS) qoidalarini yaratadi:
   - `projects` — loyihalar
   - `articles` — maqolalar va esselar
   - `social_links` — ijtimoiy tarmoq havolalari
   - `site_settings` — shaxsiy sayt sozlamalari va maʼlumotlari

---

## 3. Loyiha kalitlarini `.env` fayliga ulash
1. Supabase boshqaruv panelida: **Project Settings** -> **API** boʻlimiga oʻting.
2. Loyiha ildizidagi `.env` faylini oching va kalitlarni kiriting:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## 4. Boshlangʻich maʼlumotlarni yuklash (Seed)
Terminalda quyidagi buyruqni ishga tushiring:

```powershell
npm run migrate:supabase
```

Ushbu skript avtomatik tarzda:
- Sayt bosh sozlamalarini (`site_settings`)
- Ijtimoiy tarmoq havolalarini (`social_links`)
- Boshlangʻich loyihalarni (Tezlab, Mano, SalomAT, Mayoq Labs)
- Namuna maqolani
Supabase bazasiga joylaydi.

---

## 5. Admin hisobini yaratish
Saytning `/admin` boshqaruv paneliga kirish uchun:
1. Supabase panelida: **Authentication** -> **Users** boʻlimiga oʻting.
2. **Add User** -> **Create User** tugmasini bosing:
   - **Email:** `hello@ibroh.im` (yoki oʻzingizning elektron pochtangiz)
   - **Password:** Oʻzingiz uchun mustahkam parol
   - **Auto Confirm User:** Tanlangan (Checked) holatda qoldiring.
3. Brauzerda `http://localhost:3000/admin/login` manziliga oʻting va kiritgan emailingiz hamda parolingiz bilan tizimga kiring!

---

## 6. Xavfsizlik (Row Level Security)
- Barcha oddiy tashrif buyuruvchilar faqat `published = true` boʻlgan loyihalar va maqolalarni oʻqiy oladi.
- Maʼlumotlarni qoʻshish, tahrirlash yoki oʻchirish huquqi faqat tizimga kirgan Admin hisobiga berilgan.
