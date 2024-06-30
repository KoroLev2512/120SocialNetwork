import * as React from "react";

import {cn} from "@/shared/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const DefaultInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        "py-3 relative px-6 inline-flex w-full bg-white dark:bg-app_gray_dark-200 placeholder:text-app_gray_light-300/60 text-secondarybody text-black dark:text-white duration-300 transition-all focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50",
                        className, props.label && ("pt-[30px]")
                    )}
                    ref={ref}
                    {...props}
                >
                </input>
                {props.label && (
                    <label
                        className="absolute left-6 top-3 text-[14px] tracking-[-0.04em] select-none leading-[18px] text-app_gray_light-300/60">
                        {props.label}
                    </label>
                )}
            </div>
        )
    }
)

DefaultInput.displayName = "Input"

const SecondaryInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        return (
            <div className="relative w-full">
                <input
                    autoCapitalize="false"
                    autoCorrect="hidden"
                    autoComplete="hidden"
                    type={type}
                    className={cn(
                        "py-3 relative rounded-[10px] px-[18px] inline-flex w-full placeholder:text-app_gray_light-300/60 text-secondarybody text-black dark:text-white bg-white dark:bg-app_gray_dark-200",
                        className, props.label && ("pl-32")
                    )}
                    ref={ref}
                    {...props}
                >
                </input>
                {props.label && (
                    <label
                        className="absolute left-[18px] top-1/4 text-secondary-body select-none text-black dark:text-white">
                        {props.label}
                    </label>
                )}
            </div>
        )
    }
)

SecondaryInput.displayName = "Input"

export {DefaultInput, SecondaryInput}
