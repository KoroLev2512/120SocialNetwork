import Image from "next/image"

type postCardProps = {
    user: string,
    usersAvatar?: string,
    postsDescription: string,
    postsImage: string,
    postsAwardInBP: number,
}

const PostCard = ({ user, usersAvatar, postsAwardInBP, postsDescription, postsImage }: postCardProps) => {
    return (
        <div className="max-w-[389px] w-full rounded-[14px] bg-white flex flex-col gap-y-0.5">
            <div className="inline-flex items-center gap-x-1.5 py-1 pl-1">
                <img src={usersAvatar} className="size-[38px] rounded-full" />
                <div className="flex flex-col">
                    <p className="text-secondarybody">{user}</p>
                    <p className="text-[12px] tracking-[-0.02em] text-black/60">{postsDescription}</p>
                </div>
            </div>
            <img src={usersAvatar} className="w-full h-[380px] rounded-b-[14px]" />
        </div>
    )
}

export default PostCard;