import { Button } from "@/shared/ui/button";
import Image from "next/image";
import {SwitchPreview} from "@/widgets/SwitchPreview";
import {AccordionPreview} from "@/widgets/AccordionPreview";
import {ButtonsPreview} from "@/widgets/ButtonsPreview";

export default function Feed() {
    return (
        <main className="flex flex-col gap-y-[18px] w-full items-center px-6 pt-4">
            <section className="flex gap-x-[18px]">
                <a href="/feed">feed page</a>
                <a href="/components">components</a>
            </section>
            <Image
                src={"hello.svg"}
                alt={'hello'}
                width={332}
                height={221}
            />
            <Button className="w-full max-w-[500px]">Continue</Button>
        </main>
    )
}
