import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "focus-visible:outline-hidden inline-flex items-center justify-center text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const Button = ({
  ref,
  className,
  variant,
  size,
  children,
  as,
  ...otherProps
}: VariantProps<typeof buttonVariants> &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: "button";
      })
    | (Omit<React.ComponentProps<typeof Link>, "as"> & {
        as: "link";
      })
  ) & {
    ref?: React.RefObject<HTMLButtonElement | React.ComponentRef<typeof Link>>;
  }) => {
  if (as === "link") {
    return (
      <Link
        ref={ref as React.ForwardedRef<React.ComponentRef<typeof Link>>}
        className={buttonVariants({ variant, size, className })}
        {...(otherProps as React.ComponentProps<typeof Link>)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={buttonVariants({ variant, size, className })}
      type="button"
      {...(otherProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";
