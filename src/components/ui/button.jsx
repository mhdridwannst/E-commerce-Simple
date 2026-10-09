import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border border-ink font-mono text-xs whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink/80",
        outline: "bg-transparent text-ink hover:bg-ink hover:text-paper",
        ghost: "border-transparent bg-transparent text-ink hover:border-ink",
        link: "border-transparent bg-transparent underline underline-offset-4 hover:no-underline",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-sm",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

function Button({ className, variant, size, ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
