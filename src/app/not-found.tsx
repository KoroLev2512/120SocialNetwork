import Link from "next/link";
import { Button } from "@/shared/ui/button";
import "@/app/styles/globals.css";

export default function NotFound() {
    return (
        <div className="global">
            <section className="flex flex-col items-center gap-y-4">
                <Link href="/">
                    <Button className="w-full">
                        Return Home
                    </Button>
                </Link>
            </section>
        </div>
);
}
