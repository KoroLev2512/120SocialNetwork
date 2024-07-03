"use client";

import Action from "@/shared/ui/action";
import ThemeSwitch from "@/widgets/ThemeSwitch/ui/themeSwitch";
import BackButton from "@/shared/ui/backbutton";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {ReactNode} from "react";
import {AvatarIcon} from "@/shared/icons/AvatarIcon";
import {useTranslations} from "next-intl";
import {GetServerSideProps} from "next";
import {fetchPosts} from "@/shared/api/posts/getAll";

export default function Settings() {
    const router = useRouter();
    const t = useTranslations();
    return (
        <main
            className="flex bg-app_gray_light-100 dark:bg-app_gray_dark-300 h-screen flex-col gap-y-6 w-full items-center px-5 pt-6">
            <BackButton onClick={() => router.back()}/>
            <h1 className="text-largetitle">{t('Settings')}</h1>
            <SettingsGroup title={t('personal')}>
                <Link href="/settings/profile">
                    <Action
                        title={t('edit_profile')}
                        leftElement={
                            <div className="size-[28px] rounded-full bg-black/20">
                                <AvatarIcon height={28} width={28} rotation={0}/>
                            </div>
                        }
                        rightArrow
                    />
                </Link>
            </SettingsGroup>
            <SettingsGroup title={t('customization')}>
                <Link href="/settings/language">
                    <Action title={t('change_language')} rightArrow/>
                </Link>
                <Action title={t('dark_mode')} rightElement={<ThemeSwitch/>}/>
            </SettingsGroup>
            <SettingsGroup title={t('help&support')}>
                <Link href="/settings/faq">
                    <Action title="FAQ" rightArrow/>
                </Link>
                <Action title={t('referrals')} rightArrow/>
                <Action title={t('community_chat')} rightArrow/>
                <Action
                    title={t('support')}
                    leftSecondaryElement={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 text-app_blue"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    }
                />
            </SettingsGroup>
        </main>
    );
}

type SettingsGroupProps = {
    title?: string;
    children: ReactNode;
};

export const SettingsGroup = ({children, title}: SettingsGroupProps) => {
    const array = React.Children.toArray(children);
    const arraywithseparators = array
        .flatMap((child, index) => [
            child,
            index < array.length - 1 && (
                <div className="ml-[18px] h-[0.5px] bg-[#C8C7CB] dark:bg-app_gray_light-300/25" key={`${index}`}/>
            ),
        ])
        .filter(Boolean);

    return (
        <div className="flex flex-col w-full">
            <div
                className="py-1.5 uppercase pl-[18px] flex text-[13px] font-regular leading-[18px] tracking-[-0.08px] text-app_gray_light-300">
                {title}
            </div>
            <div className="flex flex-col bg-white dark:bg-app_gray_dark-200 rounded-[10px] overflow-hidden">
                {arraywithseparators}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const data = await fetchPosts();
    const messages = (await import(`../../../languages_test/${locale}.json`)).default;
    return {
        props: {
            ...data,
            messages
        }
    };
};
