import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import BackButton from "@/shared/ui/backbutton";
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
    <main className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 max-w-[420px] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
      <BackButton onClick={() => router.back()} />
      <h1 className="text-largetitle text-center">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-[10px] overflow-hidden bg-white dark:bg-app_gray_dark-200"
      >
        {accordionItems.map((i, index) => {
          return (
            <div key={index}>
              <AccordionItem value={i.value}>
                <AccordionTrigger className="text-black dark:text-white">{i.title}</AccordionTrigger>
                <AccordionContent className="text-app_gray_light-300">{i.content}</AccordionContent>
              </AccordionItem>
              {index < accordionItems.length - 1 && (
                <div className="ml-[18px] h-[0.5px] bg-app_gray_light-300/25 dark:bg-app_gray_light-300/25" />
              )}
            </div>
          );
        })}
      </Accordion>
      <div className="items-center flex flex-col gap-y-0.5">
        <p className="text-body">Still have questions?</p>
        <Link href={"/"}>
          <Button variant={"link"} size={"none"}>
            Contact support
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </main>
  );
}
