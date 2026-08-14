export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readingTime: string;
  category: string;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "hozir-nima-quryapman",
    title: "Hozir nima quryapman",
    excerpt:
      "Stolim ustida turgan mahsulotlar, tajribalar va yarim tugallangan gʻoyalarga qisqa nazar.",
    date: "2026-08-02",
    displayDate: "2-avgust, 2026",
    readingTime: "4 daqiqa oʻqish",
    category: "Qurish",
    body: `Hozir bir nechta narsa ustida parallel ishlayapman. Har birining o'z tempi, o'z muammolari bor.

**Tezlab** — veb-saytlar va raqamli bizneslarni ishga tushirish uchun AI asosidagi platforma. Asosiy g'oya: kichik bizneslar uchun texnik to'siqlarni yo'q qilish. Hozir MVP bosqichida.

**Mano** — so'zlarni eslab qolish uchun ilova. Spaced repetition algoritmini o'zimcha yozib ko'rdim. Natijalar qiziqarli.

**Bu sayt** — o'zim haqimda yozish, o'rganganlarimni ulashish uchun. Har hafta kamida bitta narsa yozishga harakat qilaman.

Eng qiyin narsa — diqqatni bo'lmaslik. Bir vaqtda ko'p narsa qurmoqchi bo'lsang, hech biri to'liq chiqmaydi. Shuning uchun hozir Tezlab birinchi o'rinda.`,
  },
  {
    slug: "kichik-mahsulotlar",
    title: "Nega kichik mahsulotlar qurishni yaxshi ko'raman",
    excerpt:
      "Kichik mahsulotlar katta rejalardan tezroq o'rgatadi. Kichik narsalarni chiqarish va ularni sekin o'stirish haqida.",
    date: "2026-07-18",
    displayDate: "18-iyul, 2026",
    readingTime: "6 daqiqa o'qish",
    category: "Hunar",
    body: `Katta mahsulot qurish romantik tuyuladi. Lekin haqiqat shuki — katta mahsulotlar ko'p vaqt, ko'p pul va ko'p sabr talab qiladi.

Kichik mahsulotlar esa boshqacha. Bir hafta ichida chiqarish mumkin. Foydalanuvchilardan tezda fikr olish mumkin. Va eng muhimi — o'rganish tezroq bo'ladi.

**Kichik mahsulotning afzalliklari:**

- Tez chiqarish — bozorni tezda sinab ko'rish
- Kam xavf — agar ishlamasa, ko'p yo'qotmaysiz
- Ko'p o'rganish — har bir mahsulot yangi saboq
- Portfel — bir nechta kichik mahsulot katta mahsulotdan ko'ra ko'proq narsani ko'rsatadi

Men o'zim shu yo'lni tanladim. Mano, Tezlab — bularning barchasi kichik boshlanishdan o'sdi.`,
  },
  {
    slug: "songgi-loyihadan-saboqlar",
    title: "So'nggi loyihamdan olgan saboqlar",
    excerpt:
      "Nima ishladi, nima jimgina muvaffaqiyatsiz bo'ldi va keyingi safar qanday qarorlarni boshqacha qabul qilardim.",
    date: "2026-06-29",
    displayDate: "29-iyun, 2026",
    readingTime: "7 daqiqa o'qish",
    category: "Mulohaza",
    body: `Har bir loyiha tugagach, o'zimga savol beraman: nima o'rgandim?

**Nima ishladi:**
Tez prototip qilish. Birinchi versiyani 3 kunda chiqardim. Foydalanuvchilar bilan erta gaplashish — bu eng katta qaror edi.

**Nima ishlamadi:**
Dizaynni juda ko'p vaqt sarfladim. Funksional bo'lmagan narsalarga. Foydalanuvchilar dizaynni emas, muammoning yechimini xohlaydi.

**Keyingi safar boshqacha qilardim:**
- Birinchi hafta faqat muammoni tushunishga sarflardim
- Dizaynni oxirga qoldirardim
- Kamroq feature, ko'proq sifat

Muvaffaqiyatsizlik ham o'rgatadi. Aslida ko'proq o'rgatadi.`,
  },
  {
    slug: "organayotgan-narsalarim",
    title: "O'rganayotgan narsalarim",
    excerpt:
      "Ochiq o'rganish haqida: AI, biznes, yozish va hamma narsa haqida yaxshiroq qaydlar olish odati.",
    date: "2026-06-10",
    displayDate: "10-iyun, 2026",
    readingTime: "5 daqiqa o'qish",
    category: "O'rganish",
    body: `O'rganish — bu jarayon, natija emas. Men buni kech tushundim.

Hozir parallel o'rganayotgan narsalarim:

**AI va ML** — faqat ishlatish emas, qanday ishlashini tushunish. Kichik modellar bilan tajriba o'tkazish.

**Biznes va mahsulot** — Paul Graham, YC maqolalari. Startup qanday o'sadi, nima uchun ko'pchiligi muvaffaqiyatsiz bo'ladi.

**Yozish** — har kuni yozish. Yaxshi yozuvchi bo'lish uchun ko'p o'qish va ko'p yozish kerak. Boshqa yo'l yo'q.

**Qaydlar olish tizimi** — Obsidian ishlataman. Har o'qigan narsam, har o'rgangan narsam — qayd qilaman. Keyinchalik bu qaydlar yangi g'oyalarga aylanadi.

O'rganishni ochiq qilish — ya'ni o'rganayotganingni ulashish — ikki barobar samarali. Chunki tushuntirish orqali o'zing ham yaxshiroq tushunasan.`,
  },
];
