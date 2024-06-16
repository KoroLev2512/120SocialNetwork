import React from 'react';
import axios from 'axios';
import {GetServerSideProps} from 'next';

interface Post {
    id: number;
    user_id: number;
    control_id: string;
    balance_sheet_id: string;
    tag_id: string;
    link: string;
    time_creation: string;
    image: string;
}

interface PostProps {
    post: Post | null;
    error: string | null;
}

const Post: React.FC<PostProps> = ({post, error}) => {
    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative w-full h-full mx-[28px] my-[20px]">
            <h1>Post</h1>
            <p><strong>ID:</strong> {post.id}</p>
            <p><strong>User_ID:</strong> {post.user_id}</p>
            <p><strong>Control_ID:</strong> {post.control_id}</p>
            <p><strong>Balance:</strong> {post.balance_sheet_id}</p>
            <p><strong>Tag_ID:</strong> {post.tag_id}</p>
            <p><strong>Link:</strong> {post.link}</p>
            <p><strong>Image:</strong> {post.image}</p>
            <p><strong>Time creation:</strong> {new Date(post.time_creation).toLocaleString()}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params as { id: string };
    try {
        const response = await axios.get(`${process.env.API_PATH}/post/get/${id}`);
        return {
            props: {
                post: response.data,
                error: null
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                post: null,
                error: 'Error fetching post data'
            }
        };
    }
};

export default Post;