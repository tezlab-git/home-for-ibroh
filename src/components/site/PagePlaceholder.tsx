import { Reveal } from "./Reveal";
import { ActionLink } from "./Button";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="shell py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tightest text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink to="/projects" variant="outline" size="sm">
            Loyihalarni koʻrish
          </ActionLink>
          <ActionLink to="/writing" variant="outline" size="sm">
            Yozmalarni oʻqish
          </ActionLink>
        </div>
      </Reveal>
    </div>
  );
}
