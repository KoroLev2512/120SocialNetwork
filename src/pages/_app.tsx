import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {AppProps} from "next/app";
import {NavigationBar} from "@/widgets/NavigationBar";
import {WebAppProvider} from "@/app/providers/WebAppProvider";
import {ThemeProvider} from "@/app/providers/ThemesProvider";
import {NextIntlClientProvider} from 'next-intl'

import "@/app/styles/globals.css";
import { useRouter } from "next/router";
import OrientationWarning from "@/widgets/OrientationWarning";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

function HomePage({Component, pageProps}: AppProps) {
    const router = useRouter();

    return (
        <WebAppProvider>
            <ThemeProvider attribute="class">
                <NextIntlClientProvider locale={router.locale} messages={pageProps.messages}>
                    <div className={`${inter.className} antialiased `}>
                        <OrientationWarning />
                        <Component {...pageProps} />
                        <NavigationBar/>
                    </div>
                </NextIntlClientProvider>
            </ThemeProvider>
        </WebAppProvider>
    );
}

export default HomePage;
