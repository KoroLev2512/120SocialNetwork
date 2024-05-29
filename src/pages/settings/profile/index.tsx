import { Button } from "@/shared/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";
import Link from "next/link";
import { useRouter } from "next/router";
import { SettingsGroup } from "..";

export default function SettingsProfile() {
  const router = useRouter();
  
  return (
    <main className="bg-[#F2F2F7] max-w-[420px] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-largetitle text-center">Profile Settings</h1>
        <div className="flex flex-col gap-y-3 items-center">
          <div className="size-24 rounded-full bg-black/20" />
          <div className="px-4 py-1.5 inline-flex gap-x-1 items-center rounded-full bg-TONColor">
            <p className="text-secondarybody font-semibold text-white">
            0xd75Evn534f...
            </p>
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.35875 1.00382C1.91043 0.556018 1.18357 0.556018 0.735257 1.00382C0.286942 1.45162 0.286942 2.17765 0.735257 2.62545L6.47517 8.35878C6.92348 8.80659 7.65034 8.80659 8.09866 8.35878L13.8386 2.62545C14.2869 2.17765 14.2869 1.45162 13.8386 1.00382C13.3903 0.556018 12.6634 0.556018 12.2151 1.00382L7.28691 5.92634L2.35875 1.00382Z" fill="white"/>
</svg>
          </div>
        </div>
        <SettingsGroup>
            <Link href={"/settings/profile"} className="px-[18px] py-[9px] w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <div className="inline-flex items-center gap-x-2">
                    <div className="size-[28px] rounded-full bg-black/40" />
                    <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Change Profile Picture</p>
                </div>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_776_644)">
                <path d="M1.68555 2.03857L7.16404 7.51706L1.68555 12.9956" stroke="#C8C7CB" stroke-width="2.1914" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_776_644">
                <rect width="7.66988" height="13.1484" fill="white" transform="translate(0.589844 0.942871)"/>
                </clipPath>
                </defs>
                </svg>
            </Link>
        </SettingsGroup>
    </main>
  );
}