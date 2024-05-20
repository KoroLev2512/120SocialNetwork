import { Button } from "@/shared/ui/button";
import Image from "next/image";
import WelcomeCard from "@/entities/welcome/welcomeCard/ui/welcomeCard";

export default function Feed() {
    return (
        <main className="flex flex-col gap-y-[18px] w-full items-center px-6 pt-4">
            <section className="flex gap-x-[18px]">
                <a href="/feed">feed page</a>
                <a href="/components">components</a>
            </section>
            <WelcomeCard/>
            <Button className="w-full max-w-[500px]">
                Continue
            </Button>
        </main>
    )
}
