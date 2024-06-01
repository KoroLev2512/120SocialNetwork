'use client'

import Action from "@/shared/ui/action";
import { Switch } from "@/shared/ui/switch";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ReactNode } from "react";

export default function Settings() {
  const router = useRouter();
  
  return (
    <main className="bg-[#F2F2F7] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-largetitle">Settings</h1>
        <SettingsGroup title="personal">
            <Link href="/settings/profile">
                <Action title="Edit Profile" leftElement={<div className="size-[28px] rounded-full bg-black/20" />} rightArrow />
            </Link>
        </SettingsGroup>
        <SettingsGroup title="customization">
            <Link href="/settings/language">
                <Action title="Change Language" rightArrow />
            </Link>
            <Action title="Dark Mode" rightElement={<Switch />} />
        </SettingsGroup>
        <SettingsGroup title="help & support">
            <Link href="/settings/faq">
                <Action title="FAQ" rightArrow />
            </Link>
            <Action title="Referrals" rightArrow />
            <Action title="Community Chat" rightArrow />
            <Action title="Support" leftSecondaryElement={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-[#037EE5]"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" /><path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" /></svg>} />
        </SettingsGroup>
    </main>
  );
}

type SettingsGroupProps = {
    title?: string,
    children: ReactNode,
}

export const SettingsGroup = ({ children, title }: SettingsGroupProps) => {
    const array = React.Children.toArray(children);
    const arraywithseparators = array.flatMap((child, index) => [child, index < array.length - 1 && <div className="ml-[18px] h-[0.5px] bg-[#C8C7CB]" key={`${index}`} />]).filter(Boolean)

    return (
        <div className="flex flex-col w-full">
            <div className="py-1.5 uppercase pl-[18px] flex text-[13px] font-regular leading-[18px] tracking-[-0.08px] text-[#8E8E93]">
                {title}
            </div>
            <div className="flex flex-col bg-white rounded-[10px] overflow-hidden">
                {arraywithseparators}
            </div>
        </div>
    );
}