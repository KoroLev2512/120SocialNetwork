import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex gap-x-2 items-center font-medium justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-body text-white rounded-[12px] bg-app_ton active:bg-app_ton/80 duration-100",
        link: "text-secondarybody font-normal text-[#037EE5] active:text-[#037EE5]/80 gap-x-1.5 duration-100",
        underline:
          "text-secondarybody font-normal text-black/40 underline active:text-black/60 duration-100",
      },
      size: {
        default: "px-[28px] py-4",
        sm: "px-[28px] py-3 rounded-[32px]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
