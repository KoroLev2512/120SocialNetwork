import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/ui/accordion";

export function AccordionPreview() {
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
    <section className="flex flex-col gap-y-4 w-full">
      <h1 className="text-title">Accordion</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-[10px] bg-white"
      >
        {accordionItems.map((i, index) => {
          return (
            <>
              <AccordionItem key={index} value={i.value}>
                <AccordionTrigger>{i.title}</AccordionTrigger>
                <AccordionContent>{i.content}</AccordionContent>
              </AccordionItem>
              {index < accordionItems.length - 1 && (
                <div className="mx-[18px] h-[0.5px] bg-[#C8C7CB]" />
              )}
            </>
          );
        })}
      </Accordion>
    </section>
  );
}
