"use client";

import * as React from "react";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";
import { type InputProps } from "./input";
import { XMarkIcon } from "@heroicons/react/20/solid";

type InputTagsProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");

    React.useEffect(() => {
      if (pendingDataPoint.includes(",")) {
        const newDataPoints = new Set([
          ...value,
          ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <div
        className={cn(
          "has-[:focus-visible]:outline-none py-3 relative px-6 gap-x-2 inline-flex w-full bg-white dark:bg-app_gray_dark-200 placeholder:text-app_gray_light-300/60 duration-300 transition-all focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50",
          className, props.label && ("pt-[30px]")
        )}
      >
        {value.map((item) => (
          <Badge key={item}>
            {item}
            <button
              onClick={() => {
                onChange(value.filter((i) => i !== item));
              }}
            >
              <XMarkIcon className="size-4" />
            </button>
          </Badge>
        ))}
        {props.label && (
            <label className="absolute left-6 top-3 text-[14px] tracking-[-0.04em] select-none leading-[18px] text-app_gray_light-300/60">
              {props.label}
            </label>
        )}
        <input
          className="flex-1 outline-none placeholder:text-app_gray_light-300/60 bg-white dark:bg-app_gray_dark-200 space-x-2 max-w-[82px]"
          value={pendingDataPoint}
          onChange={(e) => setPendingDataPoint(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addPendingDataPoint();
            } else if (
              e.key === "Backspace" &&
              pendingDataPoint.length === 0 &&
              value.length > 0
            ) {
              e.preventDefault();
              onChange(value.slice(0, -1));
            }
          }}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };