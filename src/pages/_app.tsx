import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/styles/globals.css";
import { TelegramWebApp } from "@/src/app/providers/TelegramWebApp";
import { Component } from "react";
import {AppProps} from "next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

function HomePage({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.className} antialiased`}>
            <TelegramWebApp>
                <Component {...pageProps} />
            </TelegramWebApp>
        </div>
    );
}

export default HomePage;