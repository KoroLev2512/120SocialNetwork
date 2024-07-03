import Image from "next/image";

type postCardProps = {
  user: string;
  usersAvatar?: string;
  postsDescription: string;
  postsImage: string;
  postsAwardInBP: number;
};

const PostCard = ({
  user,
  usersAvatar,
  postsAwardInBP,
  postsDescription,
  postsImage,
}: postCardProps) => {
  return (
    <div className="max-w-[389px] w-full rounded-[14px] bg-white dark:bg-app_gray_dark-100 flex flex-col gap-y-0.5">
      <div className="inline-flex items-center gap-x-1.5 py-1 pl-1">
        <img
            src={usersAvatar}
            className="size-[38px] rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-secondarybody text-black dark:text-white">{user}</p>
          <p className="text-[12px] tracking-[-0.02em] text-app_gray_light-300">
            {postsDescription}
          </p>
        </div>
      </div>
      <Image
          alt=""
          width={512}
          height={512}
          src={postsImage}
          className="w-full aspect-square rounded-b-[14px] select-none pointer-events-none"
      />
    </div>
  );
};

export default PostCard;
