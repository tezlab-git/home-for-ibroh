import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const title = "About — ibroh.im";
const description =
  "About Ibrohimbek: a young builder and learner making digital products and writing about technology from Uzbekistan.";

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
      eyebrow="About"
      title="A little about me"
      description="A longer story about what I build, what I'm learning, and how I think about technology. This page is being written."
    />
  ),
});
