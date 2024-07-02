"use client";

import {Button} from "@/shared/ui/button";
import WelcomeCard from "@/widgets/WelcomeCard/ui/welcomeCard";
import {useTheme} from "next-themes";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {UserStore} from "@/entities/User/types/userState";
import getUserProfilePhotoUrl from "@/shared/api/users/photo";
import {useTranslations} from "next-intl";
import {GetStaticPropsContext} from "next";
import {useRouter} from "next/router";

const WelcomePage: React.FC<UserStore> = () => {
    const theme = useTheme();
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    const telegramId = user.id;
    const t = useTranslations();

    const [doesUserExist, setUserExist] = useState<boolean | null>(null)

    const router = useRouter();

    getUserProfilePhotoUrl(telegramId).then(photoUrl => {
        setPhotoURL(photoUrl);
    });

    useEffect(() => {
        window.Telegram.WebApp.expand();
        if (theme.theme === "light") {
            window.Telegram.WebApp.setHeaderColor("#F7F9FB");
        } else {
            window.Telegram.WebApp.setHeaderColor("#111111");
        }

        const checkIfUserExist = async () => {
            try{
                const response = await fetch(`https://120-server.vercel.app/api/user/get_by_telegram/${telegramId}`);
                const data = await response.json()

                if (response.status === 200 && data.data ) {
                    setUserExist(true);
                    router.push('/feed')
                } else {
                    setUserExist(false)
                }
            } catch (error) {
                setUserExist(false)
            }
        }

        const getUsersLanguage = async () => {
            try {
                const response = await fetch(`https://120-server.vercel.app/api/user/get_by_telegram/${telegramId}`);
                const data = await response.json();
                const userLanguage = data.data.language;

                if (userLanguage === 'en') {
                    router.push('en');
                }
            } catch (error) {
                console.log('mhm', error);
            }
        };

        getUsersLanguage();
        checkIfUserExist()
    }, [user.language_code, telegramId, router]);

    if (doesUserExist === false && user) {
        const wallet = '';
        const ans = `https://120-server.vercel.app/api/user/get_by_telegram/${telegramId}`;
        fetch(ans)
            .then(async response => {
                console.log(response.status);
                const responseData = await response.json();
                if (response.status === 400) {
                    console.log('User have not id:', responseData);
                    const axiosResponse = await axios.post(`https://120-server.vercel.app/api/user/add_not_exists`, {
                        user_telegram_id: user.id,
                        username: user.username,
                        user_first_name: user.first_name || null,
                        user_second_name: user.last_name || null,
                        wallet: wallet,
                        photo: photoURL || null,
                        language: user.language_code || null,
                    });
                    console.log('User added:', axiosResponse.data);
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    } else {
        console.error('User data not available');
    }

    return doesUserExist ? null : (
        <main className="flex h-screen w-full flex-col items-center gap-y-[28px] bg-app_gray_light-100 dark:bg-app_gray_dark-300 px-8 pt-6 cursor-default">
            <div className="flex flex-col items-center">
                <h1 className="text-largetitle font-medium">{t('hello_there')}</h1>
                <h1 className="text-title font-normal">{t('let\'s_get_started!')}</h1>
            </div>
            <p className="max-w-[314px] text-center text-[12px] font-normal leading-4 tracking-[-0.02em] text-app_gray_light-300 cursor-default">
                <span className="font-medium">120Block</span>{t('community')}
            </p>
            <WelcomeCard/>
            <Link className="max-w-[284px] w-full" href={"/feed"}>
                <Button className="w-full mb-2">{t('continue')}</Button>
            </Link>
        </main>
    );
};

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../languages_test/${locale}.json`)).default
        }
    };
}

export default WelcomePage;
