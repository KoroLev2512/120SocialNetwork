import TestFunction from "@/shared/api/test";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <main className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 flex flex-col gap-y-[18px] w-full items-center px-6 pt-4">
        <Link href={"/feed/addPost"} className="w-full max-w-[500px]">
            <Button className="w-full">
                + Add new post
            </Button>
        </Link>
        <TestFunction />
    </main>
  );
}
