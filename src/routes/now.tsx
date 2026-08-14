import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { nowItems, nowUpdatedAt } from "@/content/site";

const title = "Now — ibroh.im";
const description =
  "What Ibrohimbek is building, learning, reading, and exploring right now.";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NowPage,
});

function NowPage() {
  return (
    <div className="shell py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Right now</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          Now
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A snapshot of my current focus, updated every so often.
        </p>
      </Reveal>
      <div className="mt-14 divide-y divide-hairline border-y border-hairline">
        {nowItems.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 60}
            className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-10"
          >
            <h2 className="text-sm font-medium text-foreground">{item.title}</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Last updated · {nowUpdatedAt}</p>
    </div>
  );
}
