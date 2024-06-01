import { useRouter } from "next/router";
import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { SettingsGroup } from "..";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";

export default function SettingsLanguage() {
  const router = useRouter();
  
  return (
    <main className="bg-[#F2F2F7] max-w-[420px] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
      <BackButton onClick={() => router.back()} />
        <h1 className="text-largetitle text-center">Change Language</h1>
        <RadioGroup>
          <SettingsGroup>
            <RadioGroupItem title="Русский" secondaryTitle="Russian" value="ru" id="lang_ru" />
            <RadioGroupItem title="English" secondaryTitle="English" value="en" id="lang_en" />
          </SettingsGroup>
        </RadioGroup>
    </main>
  );
}