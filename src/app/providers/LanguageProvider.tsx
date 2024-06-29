import React from "react";
import { Layout } from "./types";
import {useTranslation} from "react-i18next";


const AppWrapper = (props: Layout) => {
    const {children} = props;
    const {t, i18n} = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
            {children}
        </>
    );
};

export default AppWrapper;