import Link from "next/link";
import { Button } from "@/shared/ui/button";
import "@/app/styles/globals.css";

export default function NotFound() {
    return (
        <div className="global">
            <section className="flex flex-col items-start gap-y-4">
                <Button className="w-full">
                    <Link href="/">
                        Return Home
                    </Link>
                </Button>
            </section>
        </div>
);
}
