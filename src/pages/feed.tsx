import TestFunction from "../shared/api/test";
import { Button } from "../shared/ui/button";

export default function Feed() {
    return (
        <main className="bg-[#F2F2F7] flex flex-col gap-y-[18px] w-full items-center px-6 pt-4">
            <Button className="w-full max-w-[500px]">Sign in to post</Button>
            <TestFunction />
        </main>
    )
}