import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AdminPostCard from "@/widgets/PostCard/ui/adminPostCard";
import {PostsProps, Post} from './types';

const Posts: React.FC<PostsProps> = (props) => {
    const [posts, setPosts] = useState<Post[] | null>(props.posts);
    const [error, setError] = useState<string | null>(props.error);

    const refreshPosts = async () => {
        const updatedData = await fetchPosts();
        if (updatedData.error) {
            setError(updatedData.error);
        } else {
            setPosts(updatedData.posts);
        }
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!posts) {
        return <div>Loading...</div>;
    }

    const filteredPosts = posts.filter(post => !post.check);

    return (
        <>
            {filteredPosts.map(post => (
                <AdminPostCard
                    key={post.id}
                    post_id={post.id}
                    user={`${post.username}`}
                    usersAvatar={post.profile_photo}
                    postsDescription={post.description}
                    postsImage={post.image}
                    control={post.control}
                    check={post.check}
                    refreshPosts={refreshPosts}
                />
            ))}
        </>
    );
};

export async function fetchPosts() {
    try {
        const response = await axios.get(`https://120block.ru/api/post/get_all`);
        return {
            posts: response.data,
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            posts: null,
            error: 'Error fetching posts data'
        };
    }
}

export default Posts;