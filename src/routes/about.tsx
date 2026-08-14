import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const title = "Men haqimda — ibroh.im";
const description =
  "Ibrohimbek haqida: Oʻzbekistonda raqamli mahsulotlar yaratayotgan va texnologiya haqida yozayotgan yosh quruvchi va oʻrganuvchi.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Men haqimda"
      title="Men haqimda qisqacha"
      description="Nimalar qurayotganim, nimalarni oʻrganayotganim va texnologiya haqida qanday fikrlashim haqida uzunroq hikoya. Bu sahifa hozir yozilmoqda."
    />
  ),
});
