import React from 'react';
import Posts from "@/shared/api/posts/getAll";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import {GetServerSideProps} from "next";
import { fetchPosts } from "@/shared/api/posts/getAll";
import { PostsProps } from "@/shared/api/posts/types";

const Index: React.FC<PostsProps> = ({posts, error}) => {
    return (
        <main className="bg-app_gray_light-100 dark:bg-app_gray_dark-300 flex flex-col gap-y-[18px] w-full items-center pb-24 px-6 pt-4">
            <Link href={"/feed/addPost"} className="w-full max-w-[500px]">
                <Button className="w-full">
                    + Add new post
                </Button>
            </Link>
            <Posts posts={posts} error={error}/>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetchPosts();
    return {
        props: data
    };
};

export default Index;
