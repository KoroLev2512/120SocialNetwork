"use client";

import { Button } from "@/shared/ui/button";
import WelcomeCard from "@/widgets/WelcomeCard/ui/welcomeCard";
import { useThemeParams } from "@zakarliuka/react-telegram-web-tools";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";

const WelcomePage = () => {
  const theme = useTheme()
  useEffect(() => {
    window.Telegram.WebApp.expand();
    if (theme.theme === "light") {
      window.Telegram.WebApp.setHeaderColor("#F7F9FB")
    } else {
      window.Telegram.WebApp.setHeaderColor("#111111")
    }
  }, []);
  return (
    <main className="flex h-screen w-full flex-col items-center gap-y-[28px] bg-app_gray_light-100 dark:bg-app_gray_dark-300 px-8 pt-12">
      <div className="flex flex-col items-center">
        <h1 className="text-largetitle font-medium">Hello there {theme.theme}</h1>
        <h1 className="text-title font-normal">Let's get started!</h1>
      </div>
      <p className="max-w-[314px] text-center text-[12px] font-normal leading-4 tracking-[-0.02em] text-app_gray_light-300">
        <span className="font-medium">120Block</span> is a community that unites
        talented people, find new paths for self-realization and earning!
      </p>
      <WelcomeCard />
      <Link className="max-w-[284px] w-full" href={"/feed"}>
        <Button className="w-full">Continue</Button>
      </Link>
    </main>
  );
};

export default WelcomePage;
