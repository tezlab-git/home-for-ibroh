import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-2xl font-medium tracking-tightest text-foreground sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="link-underline shrink-0 self-start text-sm font-medium text-foreground sm:self-auto"
        >
          {action.label}
        </Link>
      ) : null}
    </Reveal>
  );
}
