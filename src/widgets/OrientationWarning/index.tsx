import TiltMeIcon from "@/shared/icons/TiltMeIcon";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const OrientationWarning = () => {
  const t = useTranslations("orientationWarning");
  const [isLandscape, setLandscape] = useState(false);

  useEffect(() => {
    const OrientationChange = () => {
      if (window.innerWidth > window.innerHeight) {
        setLandscape(true);
      } else {
        setLandscape(false);
      }
    };

    window.addEventListener("resize", OrientationChange);
    OrientationChange();

    return () => {
      window.removeEventListener("resize", OrientationChange);
    };
  }, []);

  return (
    <>
      {isLandscape && (
        <div className="fixed z-[999] flex h-screen w-full flex-col items-center justify-center gap-y-[16px] bg-app_gray_light-100 dark:bg-app_gray_dark-300">
          <TiltMeIcon className="size-[140px] text-[#007AFF]" />
          <div className="flex flex-col items-center gap-y-[5px]">
            <h1 className="text-[32px] font-bold">{t("title")}</h1>
            <p className="max-w-[318px] text-center text-[20px] font-medium leading-[24px] text-black/40 dark:text-white/40">
              {t("text")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../languages/${locale}.json`))
        .default,
    },
  };
}

export default OrientationWarning;
