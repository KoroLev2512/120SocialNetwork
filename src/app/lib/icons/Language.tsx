import React from "react";
import { getSvgOptions } from "@/app/lib/utils";
import { IconProps } from "./types";


const Language = (
    {
        height = 24,
        width = 24,
        rotation = 0,
    }: IconProps) => {
    const svgOptions = getSvgOptions({
        rotationDegree: rotation,
    });

    return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8" />
                </svg>
    );
};

export default Language;