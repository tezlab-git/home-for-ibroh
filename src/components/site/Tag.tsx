import { cn } from "@/lib/utils";

export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "quiet";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        variant === "default" && "border-hairline bg-surface text-muted-foreground",
        variant === "accent" && "border-accent/25 bg-accent/8 text-accent",
        variant === "quiet" && "border-transparent text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
