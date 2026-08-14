import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_10px_24px_-14px_color-mix(in_oklab,var(--foreground)_60%,transparent)]",
        outline:
          "border border-hairline bg-card text-foreground hover:border-foreground/20 hover:bg-surface",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type Props = VariantProps<typeof actionVariants> & {
  className?: string;
  children: React.ReactNode;
};

export function ActionLink({
  to,
  variant,
  size,
  className,
  children,
}: Props & { to: string }) {
  return (
    <Link to={to} className={cn(actionVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(actionVariants({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}
