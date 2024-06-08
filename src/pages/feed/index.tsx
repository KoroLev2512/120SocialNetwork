import TestFunction from "@/shared/api/test";
import { Button } from "@/shared/ui/button";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Index() {
  const { setTheme } = useTheme()
  return (
    <main className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 flex flex-col gap-y-[18px] w-full items-center px-6 pt-4">
        <Link href={"/feed/addPost"} className="w-full max-w-[500px]">
            <Button className="w-full" onClick={() => setTheme("dark")}>
                + Add new post
            </Button>
        </Link>
        <TestFunction />
    </main>
  );
}
