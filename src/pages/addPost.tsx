import React from "react";
import AddIcon from "@/shared/assets/icons/AddIcon";

export default function WelcomePage() {
    return (
        <main className="flex h-screen w-full flex-col items-center bg-gray-100">
            <div className="flex flex-col items-center py-[24px]">
                <h1 className="text-title font-bold">Add up to 3 photos</h1>
            </div>
            <div className="flex w-full flex-col bg-gray-300 rounded-[14px] max-w-[350px] min-h-[350px]">
                <div className="inline-flex w-full h-full items-center justify-center px-[40px] py-[14px]">
                    <AddIcon/>
                </div>
            </div>
            <div className="flex flex-col items-center w-full bg-white py-[24px] min-h-[350px] max-w-[430px]">
                bdvdfs
            </div>
        </main>
    );
};
