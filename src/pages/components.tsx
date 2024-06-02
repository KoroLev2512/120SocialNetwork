"use client";

import { AccordionPreview } from "@/widgets/AccordionPreview";
import { ButtonsPreview } from "@/widgets/ButtonsPreview";
import { SwitchPreview } from "@/widgets/SwitchPreview";
import { MainButton, useShowPopup } from "@zakarliuka/react-telegram-web-tools";

const Separator = () => {
  return <div className="w-full h-[1px] bg-[#D9D9D9]" />;
};

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <h1 className="text-body">{title}</h1>
      <Separator />
    </div>
  );
};

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-y-16 p-6 items-center mx-auto bg-[#F2F2F7]">
      <a href="/feed">feed page</a>
      <section className="flex flex-col gap-y-6 w-full">
        <Header title="Typography" />
        <div className="flex flex-col gap-y-9">
          <div className="flex flex-col">
            <p className="text-secondarybody text-black/60">
              size 64px / line height 77px / 700w
            </p>
            <h1 className="text-hugetitle">HugeTitle</h1>
          </div>
          <div className="flex flex-col">
            <p className="text-secondarybody text-black/60">
              size 32px / line height 39px / 700w
            </p>
            <h2 className="text-largetitle">LargeTitle</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-secondarybody text-black/60">
              size 24px / line height 29px / 600w
            </p>
            <h2 className="text-title">Title</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-secondarybody text-black/60">
              size 20px / line height 24px / 500w
            </p>
            <h2 className="text-body">Body</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-secondarybody text-black/60">
              size 16px / line height 19px / 400w
            </p>
            <h2 className="text-secondarybody">SecondaryBody</h2>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-y-6 w-full">
        <Header title="Components" />
        <SwitchPreview />
        <AccordionPreview />
        <ButtonsPreview />
      </section>
    </main>
  );
}
