import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SettingsFAQ() {
  const router = useRouter();
  const accordionItems = [
    {
      title: "Ways to earn tokens",
      content:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s,",
      value: "1",
    },
    {
      title: "How to upload content?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s,",
      value: "2",
    },
    {
      title: "What’s 120’ Block?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s,",
      value: "3",
    },
  ];
  
  return (
    <main className="bg-[#F2F2F7] max-w-[420px] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-largetitle text-center">Frequently Asked Questions</h1>
        <Accordion
            type="single"
            collapsible
            className="w-full rounded-[10px] bg-white"
        >
            {accordionItems.map((i, index) => {
            return (
                <div key={index}>
                <AccordionItem value={i.value}>
                    <AccordionTrigger>{i.title}</AccordionTrigger>
                    <AccordionContent>{i.content}</AccordionContent>
                </AccordionItem>
                {index < accordionItems.length - 1 && (
                    <div className="mx-[18px] h-[0.5px] bg-[#C8C7CB]" />
                )}
                </div>
            );
            })}
        </Accordion>
        <div className="items-center flex flex-col gap-y-0.5">
            <p className="text-body">Still have questions?</p>
            <Link href={"/"}>
                <Button variant={"link"} size={"none"}>
                    Contact support <ExternalLinkIcon className="size-4" />
                </Button>
            </Link>
        </div>
    </main>
  );
}