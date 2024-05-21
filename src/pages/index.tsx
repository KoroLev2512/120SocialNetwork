import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="flex h-screen w-full flex-col items-center gap-y-[28px] bg-[#F7F9FB] px-8 pt-12">
      <div className="absolute left-0 top-0 flex flex-col text-black/20">
        <Link href={"/profile"}>profile</Link>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-largetitle font-medium">Hello there</h1>
        <h1 className="text-title font-normal">Let's get started!</h1>
      </div>
      <p className="max-w-[314px] text-center text-[12px] font-normal leading-4 tracking-[-0.02em] text-black/40">
        <span className="font-medium">120Block</span> is a community that unites
        talented people, find new paths for self-realization and earning!
      </p>
      <WelcomeCard />
      <Button className="w-full max-w-[284px]">Continue</Button>
    </main>
  );
}

const WelcomeCard = () => {
  const slides = [
    {
      image: "/welcome_120.svg",
      title: "Share Creativity",
      description: "related to 120 community and earn Block jettons",
    },
    {
      image: "/welcome_exchange.svg",
      title: "Exchange BP",
      description: "for an amazing rewards",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Language />
      <Carousel className="rounded-b-[14px] bg-white">
        <CarouselContent>
          {slides.map((i, index) => {
            return (
              <CarouselItem className="flex flex-col items-center gap-y-[12px] pb-4">
                <Image
                  src={i.image}
                  className="max-w-[331px] px-4"
                  width={331}
                  height={221}
                  alt="Illustration"
                  quality={100}
                />
                <div className="flex flex-col text-center">
                  <p className="text-secondarybody font-medium text-black/40">
                    {i.title}
                  </p>
                  <p className="max-w-[145px] text-center text-[12px] font-normal leading-4 tracking-[-0.02em] text-black/40">
                    {i.description}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

// в будущем преобразуем в реальную кнопку
const Language = () => {
  return (
    <div className="inline-flex w-full items-center justify-between rounded-t-[14px] bg-white px-[40px] py-[14px]">
      <p className="text-secondarybody text-black">Choose language</p>
      <div className="inline-flex items-center gap-x-2 text-black/40">
        <p className="text-secondarybody">English</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8" />
        </svg>
      </div>
    </div>
  );
};
