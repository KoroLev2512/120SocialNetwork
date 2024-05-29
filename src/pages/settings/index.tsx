import { Switch } from "@/shared/ui/switch";
import { BackButton } from "@zakarliuka/react-telegram-web-tools";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ReactNode } from "react";

// как этот компонент реализовать красиво

export default function Settings() {
  const router = useRouter();
  return (
    <main className="bg-[#F2F2F7] flex h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-largetitle">Settings</h1>
        <SettingsGroup title="personal">
            <Link href={"/settings/profile"} className="px-[18px] py-[9px] w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <div className="inline-flex items-center gap-x-2">
                    <div className="size-[28px] rounded-full bg-black/40" />
                    <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Edit Profile</p>
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
        <SettingsGroup title="customization">
            <Link href={"/settings"} className="px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Change Language</p>
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
            <Link href={"/settings"} className="px-[18px] max-h-[67px] py-1.5 w-full justify-between items-center inline-flex *:select-none bg-white">
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Dark Mode</p>
                <Switch />
            </Link>
        </SettingsGroup>
        <SettingsGroup title="help & support">
            <Link href={"/settings/faq"} className="px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">FAQ</p>
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
            <Link href={"/settings"} className="px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Referrals</p>
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
            <Link href={"/settings"} className="px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Community Chat</p>
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
            <Link href={"/settings"} className="px-[18px] py-3 w-full justify-between items-center inline-flex active:bg-[#E5E5EA] transition-colors duration-100 *:select-none bg-white">
                <div className="inline-flex items-center gap-x-2">
                    <p className="text-[17px] font-regular leading-[22px] tracking-[-0.43px]">Support</p>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.57397 3.03613H4.64897C4.22897 3.03613 4.01897 3.03613 3.85847 3.11788C3.71736 3.18979 3.60263 3.30452 3.53072 3.44563C3.44897 3.60613 3.44897 3.81613 3.44897 4.23613V14.2111C3.44897 14.6311 3.44897 14.8411 3.53072 15.0016C3.60263 15.1427 3.71736 15.2575 3.85847 15.3294C4.01897 15.4111 4.22897 15.4111 4.64897 15.4111H14.624C15.044 15.4111 15.254 15.4111 15.4145 15.3294C15.5556 15.2575 15.6703 15.1427 15.7422 15.0016C15.824 14.8411 15.824 14.6311 15.824 14.2111V11.2861M10.949 3.03613H15.824M15.824 3.03613V7.91113M15.824 3.03613L8.88647 9.97363" stroke="#037EE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.57397 3.03613H4.64897C4.22897 3.03613 4.01897 3.03613 3.85847 3.11788C3.71736 3.18979 3.60263 3.30452 3.53072 3.44563C3.44897 3.60613 3.44897 3.81613 3.44897 4.23613V14.2111C3.44897 14.6311 3.44897 14.8411 3.53072 15.0016C3.60263 15.1427 3.71736 15.2575 3.85847 15.3294C4.01897 15.4111 4.22897 15.4111 4.64897 15.4111H14.624C15.044 15.4111 15.254 15.4111 15.4145 15.3294C15.5556 15.2575 15.6703 15.1427 15.7422 15.0016C15.824 14.8411 15.824 14.6311 15.824 14.2111V11.2861M10.949 3.03613H15.824M15.824 3.03613V7.91113M15.824 3.03613L8.88647 9.97363" stroke="#037EE5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </Link>
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