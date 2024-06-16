import React from "react";
import AddIcon from "@/shared/assets/icons/AddIcon";
import {DefaultInput} from "@/shared/ui/input";

export default function WelcomePage() {
    return (
        <main className="flex h-screen w-full flex-col items-center bg-app_gray_light-100 dark:bg-app_gray_dark-300">
            <div className="flex flex-col items-center py-[24px]">
                <h1 className="text-title font-bold">Add up to 3 photos</h1>
            </div>
            <div className="flex w-full flex-col bg-gray-300 rounded-[14px] max-w-[350px] min-h-[350px]">
                <div className="inline-flex w-full h-full items-center justify-center px-[40px] py-[14px]">
                    <AddIcon/>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-4 mt-6">
                <DefaultInput placeholder="Blah blah blah" label="Description"/>
                <DefaultInput placeholder="https://" className="placeholder:text-app_blue" label="URL to the post"/>
            </div>
        </main>
    );
};
