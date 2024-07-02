import Link from "next/link";
import {useTranslations} from "next-intl";
import {GetStaticPropsContext} from "next";

export default function ComingSoon() {
    const t = useTranslations();
    return (
        <section
            className="flex z-[1] absolute h-screen w-full backdrop-blur-[6px] flex-col items-center justify-center gap-y-2.5 bg-app_gray_light-100/75 pb-[72px] dark:bg-app_gray_dark-300/75">
            <BlockIcon/>
            <h1 className="text-largetitle">{t('Coming soon')}</h1>
            <p className="text-center text-body text-black/65 dark:text-white/65">
                {t('This page will be released in the')}
                <br/>
                {t('next few updates')}
                <br/>
                <br/>
                {t('Stay turned!')}
                <br/>
                <span>
          <Link
              href={"/feed"}
              className="text-black/20 underline transition-all active:text-black/40 dark:text-white/20 dark:active:text-white/40"
          >
            {t('home_btn')}
          </Link>
        </span>
            </p>
        </section>
    );
}

const BlockIcon = ({className}: { className?: string }) => {
    return (
        <svg
            width="69"
            height="69"
            className={className}
            viewBox="0 0 69 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M34.3753 59.106C38.7853 59.106 43.1166 57.9386 46.9292 55.7224C50.7419 53.5063 53.8999 50.3204 56.0825 46.4884C58.265 42.6564 59.3943 38.3149 59.3555 33.9052C59.3167 29.4954 58.1113 25.1745 55.8617 21.3815L34.3753 34.1249L34.3753 59.106Z"
                fill="#2B83EC"
            />
            <path
                d="M56.0091 21.6343C53.8037 17.8144 50.6263 14.6466 46.7997 12.4528C42.9732 10.259 38.634 9.11744 34.2233 9.1442C29.8126 9.17096 25.4876 10.3651 21.688 12.6051C17.8883 14.8452 14.7495 18.0514 12.5906 21.8977L34.3749 34.1249L56.0091 21.6343Z"
                fill="#22A6F5"
            />
            <path
                d="M12.7405 21.6343C10.5438 25.4393 9.38934 29.7563 9.39372 34.1498C9.39809 38.5433 10.5611 42.858 12.7655 46.6586C14.9698 50.4591 18.1375 53.611 21.949 55.7964C25.7605 57.9818 30.0809 59.1233 34.4744 59.1058L34.3748 34.1249L12.7405 21.6343Z"
                fill="#1AC9FF"
            />
        </svg>
    );
};

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../languages_test/${locale}.json`)).default
        }
    };
}
