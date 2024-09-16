import React from 'react';
import Posts from "@/shared/api/posts/adminGetAll";
import {GetServerSideProps} from "next";
import {fetchPosts} from "@/shared/api/posts/adminGetAll";
import {PostsProps} from "@/shared/api/posts/types";

export default function Index({posts, error}: PostsProps) {
    return (
        <main
            className="flex flex-col gap-y-[18px] w-full items-center pb-24 px-6 pt-4">
            <Posts posts={posts} error={error}/>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetchPosts();
    return {
        props: {
            ...data,
        }
    };
};
