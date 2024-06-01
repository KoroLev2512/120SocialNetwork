import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

//TODO :: active:bg should be disablable

const Action = ({title, leftElement, rightArrow, rightLabel, rightElement, leftSecondaryElement}: {title: string, leftElement?: ReactNode, rightArrow?: boolean, leftSecondaryElement?: ReactNode, rightLabel?: string, rightElement?: ReactNode}) => {
    return(
        <div className="max-h-[44px] overflow-hidden px-[18px] py-[9px] w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
            <div className="inline-flex gap-x-3 items-center">
                {leftElement}
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">{title}</p>
                {leftSecondaryElement}
            </div>
            <div className="inline-flex gap-x-3 items-center">
                {rightLabel ? <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px] text-[#C8C7CB]">{rightLabel}</p> : ""}
                {rightArrow ? <ChevronRightIcon className="text-[#C8C7CB] size-[26px]" /> : ""}
                {rightElement}
            </div>
        </div>
    )
}

export default Action;