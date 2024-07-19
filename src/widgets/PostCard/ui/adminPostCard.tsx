import React from 'react';
import axios from "axios";

type postCardProps = {
    post_id: number;
    user: string;
    usersAvatar?: string;
    postsDescription: string;
    postsImage: string;
    control: boolean;
    check: boolean;
    refreshPosts: () => void;
};

const AdminPostCard: React.FC<postCardProps> = ({
                                               post_id,
                                               user,
                                               usersAvatar,
                                               postsDescription,
                                               postsImage,
                                               refreshPosts
                                           }) => {

    const handleReject = async () => {
        try {
            await axios.post('https://120-server.vercel.app/api/post/update', {
                post_id: post_id,
                check: true,
                control_id: false
            });
            console.log('Post updated successfully');
            refreshPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleAccept = async () => {
        try {
            await axios.post('https://120-server.vercel.app/api/post/update', {
                post_id: post_id,
                check: true,
                control_id: true
            });
            console.log('Post updated successfully');
            refreshPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="max-w-[389px] w-full rounded-[14px] bg-white flex flex-col gap-y-0.5">
            <div className="inline-flex items-center gap-x-1.5 py-1 pl-1">
                <img
                    src={usersAvatar}
                    className="size-[38px] rounded-full"
                    alt={'avatar'}
                />
                <div className="flex flex-col">
                    <p className="text-secondarybody text-black">{user}</p>
                    <p className="text-[12px] tracking-[-0.02em] text-app_gray_light-300">
                        {postsDescription}
                    </p>
                </div>
                <div className="ml-auto pr-[12px]">
                    <button className="mr-2 text-green-500" onClick={handleAccept}>
                        accept
                    </button>
                    <button className="text-red-500" onClick={handleReject}>
                        reject
                    </button>
                </div>
            </div>
            <img
                src={postsImage}
                className="w-full aspect-square rounded-b-[14px]"
                alt={'post'}
            />
        </div>
    );
};

export default AdminPostCard;
