export type Project = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: string;
  year: string;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "tezlab",
    name: "Tezlab",
    description:
      "Veb-saytlar va raqamli bizneslarni ishga tushirish uchun AI asosidagi platforma.",
    category: "Platforma",
    status: "Ishlanmoqda",
    year: "2026",
    href: "/projects",
  },
  {
    slug: "mano",
    name: "Mano",
    description:
      "Soʻzlarni yanada samarali eslab qolishga yordam beruvchi lugʻat oʻrganish ilovasi.",
    category: "Taʼlim",
    status: "Ishga tushgan",
    year: "2025",
    href: "/projects",
  },
  {
    slug: "salomat",
    name: "SalomAT",
    description:
      "Shaxsiy salomatlik va kunlik tahlillarga qaratilgan eksperimental kiyiladigan texnologiya konsepsiyasi.",
    category: "Qurilma",
    status: "Konsepsiya",
    year: "2026",
    href: "/projects",
  },
  {
    slug: "mayoq-labs",
    name: "Mayoq Labs",
    description:
      "Raqamli mahsulotlar yaratish uchun shaxsiy texnologiya va mahsulot ekotizimi.",
    category: "Studiya",
    status: "Davom etmoqda",
    year: "2024",
    href: "/projects",
  },
];
