export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  displayDate: string;
  readingTime: string;
  category: string;
};

/**
 * Yozmalar uchun kontent manbasi. CMS/ma'lumotlar bazasi yozuvi shaklida
 * tuzilgan — kelajakda UI komponentlariga tegmasdan loader/fetch bilan
 * almashtirish mumkin.
 */
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
  },
  {
    slug: "kichik-mahsulotlar",
    title: "Nega kichik mahsulotlar qurishni yaxshi koʻraman",
    excerpt:
      "Kichik mahsulotlar katta rejalardan tezroq oʻrgatadi. Kichik narsalarni chiqarish va ularni sekin oʻstirish haqida.",
    date: "2026-07-18",
    displayDate: "18-iyul, 2026",
    readingTime: "6 daqiqa oʻqish",
    category: "Hunar",
  },
  {
    slug: "songgi-loyihadan-saboqlar",
    title: "Soʻnggi loyihamdan olgan saboqlar",
    excerpt:
      "Nima ishladi, nima jimgina muvaffaqiyatsiz boʻldi va keyingi safar qanday qarorlarni boshqacha qabul qilardim.",
    date: "2026-06-29",
    displayDate: "29-iyun, 2026",
    readingTime: "7 daqiqa oʻqish",
    category: "Mulohaza",
  },
  {
    slug: "organayotgan-narsalarim",
    title: "Oʻrganayotgan narsalarim",
    excerpt:
      "Ochiq oʻrganish haqida: AI, biznes, yozish va hamma narsa haqida yaxshiroq qaydlar olish odati.",
    date: "2026-06-10",
    displayDate: "10-iyun, 2026",
    readingTime: "5 daqiqa oʻqish",
    category: "Oʻrganish",
  },
];
