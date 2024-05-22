import { Button } from "@/shared/ui/button";
import WelcomeCard from "@/entities/welcome/welcomeCard/ui/welcomeCard"
import Link from "next/link";
import React from "react";

export default function WelcomePage() {
  return (
    <main className="flex h-screen w-full flex-col items-center gap-y-[28px] bg-[#F7F9FB] px-8 pt-12">
      <div className="absolute left-0 top-0 flex flex-col text-black/20">

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
      <Button className="w-full max-w-[284px]">
          <Link href={"/profile"}>
                Continue
          </Link>
      </Button>
    </main>
  );
};
