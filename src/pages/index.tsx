"use client";

import {Button} from "@/shared/ui/button";
import WelcomeCard from "@/widgets/WelcomeCard/ui/welcomeCard";
import {useTheme} from "next-themes";
import React, {useEffect} from "react";
import Link from "next/link";
import axios from "axios";
import {GetServerSideProps} from "next";
import {UserStore} from "@/entities/User/types/userState";


const WelcomePage: React.FC<UserStore> = ()  => {
    const theme = useTheme();
    useEffect(() => {
            window.Telegram.WebApp.expand();
            if (theme.theme === "light") {
                window.Telegram.WebApp.setHeaderColor("#F7F9FB")
            } else {
                window.Telegram.WebApp.setHeaderColor("#111111")
            }
        },
    )

    const user = window.Telegram.WebApp.initDataUnsafe?.user;

    if (user) {
        const telegramId = user.id;
        const wallet = '';
        const ans = `${process.env.API_PATH}/user/get_by_telegram/${telegramId}`;
        fetch(ans)
            .then(async response => {
                console.log(response.status);
                const responseData = await response.json();
                switch (response.status) {
                    case 200:
                        console.log('User data:', responseData);
                        break;
                    case 400:
                        console.log('User have not id:', responseData);
                        await axios.post(`http://localhost:3001/api/user/add_not_exists`, {
                            telegram_id: user.id,
                            username: user.username,
                            user_first_name: user.first_name || null,
                            user_second_name: user.last_name || null,
                            wallet: wallet,
                            photo: user.photo_url || null,
                            language: user.language_code || null,
                        })
                            .then(response => {
                                console.log('User added:', response.data);
                            })
                            .catch(error => {
                                console.error('There was a problem with your POST operation:', error);
                            });
                        break;
                    default:
                        console.log('Unexpected status:', response.status);
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    } else {
        console.error('User data not available');
    }

    // const express = require('express');
    // const axios = require('axios');
    // const cors = require('cors')
    // const app = express();
    // const port = 3001;
    //
    // app.use(cors())
    // app.get('/api/fetchItems/:username', async (req: Request, res: Response) => {
    //     const { username } = req.params;
    //     try {
    //         const response = await axios.get(`https://api.test.test/v2/player?name=${username}`, {
    //             headers: {
    //                 Authorization: 'test'
    //             }
    //         });
    //         res.json({ data: response.data, error: null });
    //     } catch (error) {
    //         res.json({ data: null, error: "Failed to fetch data." });
    //     }
    // });

    // const wallet = '';
    // try {
    //     const response = axios.post(`${process.env.API_PATH}/user/add_not_exists`, {
    //         telegram_id: user.id,
    //         username: user.username,
    //         user_first_name: user.first_name || null,
    //         user_second_name: user.last_name || null,
    //         wallet: wallet,
    //         photo: user.photo_url || null,
    //         language: user.language_code || null,
    //     });
    //     console.log('User added', response);
    // } catch (error) {
    //     console.error('There was a problem with your POST operation:', error);
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }
    //
    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <main
            className="flex h-screen w-full flex-col items-center gap-y-[28px] bg-app_gray_light-100 dark:bg-app_gray_dark-300 px-8 pt-12">
            <div className="flex flex-col items-center">
                <h1 className="text-largetitle font-medium">Hello there</h1>
                <h1 className="text-title font-normal">Let's get started!</h1>
            </div>
            <p className="max-w-[314px] text-center text-[12px] font-normal leading-4 tracking-[-0.02em] text-app_gray_light-300">
                <span className="font-medium">120Block</span> is a community that unites
                talented people, find new paths for self-realization and earning!
            </p>
            <WelcomeCard/>
            <Link className="max-w-[284px] w-full" href={"/feed"}>
                <Button className="w-full">Continue</Button>
            </Link>
            <div>
                <h1>User Profile</h1>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Second Name:</strong> {user?.last_name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                {/*<p><strong>Telegram ID:</strong> {telegram_id}</p>*/}
                <p><strong>Language:</strong> {user?.language_code}</p>
                {/*<p><strong>Wallet:</strong> {wallet}</p>*/}
                <p><strong>Profile Photo:</strong>
                    <img
                        src={user.photo_url}
                        alt="User photo"
                        className="w-[50px] h-[50px] rounded-full"
                    />
                </p>
            </div>
        </main>
    );
};


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const telegram_id = context.query.telegram_id;
//     try {
//         const response = await axios.get(`${process.env.API_PATH}/user/get_by_telegram/123`);
//         return {
//             props: {
//                 user: response.data,
//                 error: null
//             }
//         };
//     } catch (error) {
//         console.error(error);
//         return {
//             props: {
//                 user: null,
//                 error: 'Error fetching user data'
//             }
//         };
//     }
// };

export default WelcomePage;
