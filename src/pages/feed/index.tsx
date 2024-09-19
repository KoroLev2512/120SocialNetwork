import React from 'react';
import Posts from "@/shared/api/posts/getAll";
import {Button} from "@/shared/ui/button";
import {GetServerSideProps} from "next";
import {fetchPosts} from "@/shared/api/posts/getAll";
import {PostsProps} from "@/shared/api/posts/types";
import Link from "next/link";
import {useTranslations} from 'next-intl';

export default function Index({posts, error}: PostsProps) {
    const t = useTranslations();
    return (
        <main
            className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 flex flex-col gap-y-[18px] w-full items-center pb-24 px-6 pt-4">
            <Link href={"/feed/addPost"} className="w-full max-w-[500px]">
                <Button className="w-full">
                    + {t('add_new_post')}
                </Button>
            </Link>
            <Posts posts={posts} error={error}/>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const data = await fetchPosts();
    const messages = (await import(`../../../languages/${locale}.json`)).default;
    return {
        props: {
            ...data,
            messages
        }
    };
};
