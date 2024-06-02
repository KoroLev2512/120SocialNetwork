"use client";

import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/app/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("w-full", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    title: string;
    secondaryTitle?: string;
  }
>(({ className, title, secondaryTitle, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "overflow-hidden px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-start -space-y-0.5">
        <p className="text-[18px] tracking-[-0.04em] font-normal">{title}</p>
        {secondaryTitle && (
          <p className="text-[14px] tracking-[-0.04em] font-normal text-black/40">
            {secondaryTitle}
          </p>
        )}
        {secondaryTitle && <p className="text-[14px] tracking-[-0.04em] font-normal text-black/40">{secondaryTitle}</p>}
      </div>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckCircleIcon className="size-[28px] text-[#34C759]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
