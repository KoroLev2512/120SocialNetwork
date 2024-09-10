import {Dialog, DialogContent, DialogTrigger} from "@/shared/ui/dialog";
import {useRouter} from "next/router";
import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group";
import {SettingsGroup} from "@/pages/settings/index";
import {useTranslations} from "next-intl";
import {GetStaticPropsContext} from "next";
import axios from "axios";
import {useState} from "react";
import Action from "@/shared/ui/action";

export default function LanguagePopup() {
    const router= useRouter();
    const {locale} = router;
    const [actualUserId, setActualUserId] = useState<number>();
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    const t = useTranslations();

    const getUser = async (id: number) => {
        try {
            const response = await axios.get(
                `https://120-server.vercel.app/api/user/get_by_telegram/${id}`,
            );
            const data = response.data;
            return data.data;
        } catch (error) {
            console.error("Caught an error while trying to get user id");
            return null;
        }
    };

    getUser(user.id).then((data) => {
        setActualUserId(data.id);
    });

    const changeLanguage = async (newLocale: string) => {
        try {
            const language = newLocale;

            await axios.post('https://120-server.vercel.app/api/user/update', {
                user_id: actualUserId,
                language: language
            });

            router.push(router.pathname, router.asPath, {locale: newLocale});
            console.log(`Successfully changed users language to ${newLocale}`)
        } catch (error) {
            console.error(`Caught an error while trying to change language to ${newLocale}`, error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Action rightLabel={t('current_language')}
                        className="dark:bg-app_gray_dark-100 dark:active:bg-app_gray_light-100/5 mb-2 px-10 py-[14px] active:"
                        rightArrow title={t('choose_language')}/>
            </DialogTrigger>
            <DialogContent className="px-4">
                <section className="flex flex-col items-center gap-y-2">
                    <p className="text-title">{t('choose_language')}</p>
                    <RadioGroup onValueChange={changeLanguage}>
                        <SettingsGroup>
                            <RadioGroupItem
                                title={t('russian')}
                                secondaryTitle="Russian"
                                value="ru"
                                id="lang_ru"
                                checked={locale === 'ru'}
                            />
                            <RadioGroupItem
                                title={t('english')}
                                secondaryTitle="English"
                                value="en"
                                id="lang_en"
                                checked={locale === 'en'}
                            />
                        </SettingsGroup>
                    </RadioGroup>
                </section>
            </DialogContent>
        </Dialog>
    )
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../languages_test/${locale}.json`)).default
        }
    };
}