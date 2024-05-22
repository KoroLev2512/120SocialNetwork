import { cn } from "@/app/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfilePageTempProps {
  username: string;
  avatar: string;
  connectedWallet?: boolean;
  currency: number;
  posts?: Object;
}

const props: ProfilePageTempProps = {
  username: "waskoaswella",
  avatar:
    "https://i.pinimg.com/736x/c9/a8/26/c9a8260a3774452561196a617a833217.jpg",
  currency: 139,
  connectedWallet: true,
  posts: [
    {
      image:
        "https://i.pinimg.com/736x/0e/1d/af/0e1daf3a5b6d735f8990cff4c9091ca3.jpg",
      reward: 100,
    },
    {
      image:
        "https://i.pinimg.com/564x/9f/c4/f8/9fc4f8e04016c5022f94e3f387b0086a.jpg",
    },
    {
      image:
        "https://i.pinimg.com/564x/fe/87/c7/fe87c7e92448487771c46a0727036fb0.jpg",
      reward: 250,
    },
    {
      image:
        "https://i.pinimg.com/564x/58/1e/0e/581e0e73228169539c0063c8cff8b57a.jpg",
    },
    {
      image:
        "https://i.pinimg.com/564x/dd/d6/85/ddd68572bb7ecd995ee53826291905e4.jpg",
      reward: 2500,
    },
  ],
};

export default function ProfilePage() {
  return (
      <main className="mx-auto flex h-screen w-full max-w-[420px] flex-col items-center bg-[#F7F9FB]">
        <div className="absolute left-0 top-0 flex flex-col text-black/20">
          <Link href={"/feed"}>
            feed
          </Link>
        </div>
        <section
            className="inline-flex w-full items-center justify-between border-b border-[#B6B6BA]/40 bg-white px-8 py-[14px]">
          <div className="inline-flex items-center gap-x-4">
            <Avatar className="size-[74px]">
              <AvatarImage alt={`@${props.username}`} src={props.avatar}/>
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-secondarybody font-semibold">
                @{props.username}
              </p>
              <p className="text-secondarybody font-medium text-black/60">
                8 posts
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-x-1.5">
            <p className="inline-flex items-center gap-x-1.5 text-title font-semibold">
              {props.currency} <IconBlock/>
            </p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-black/40"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8"/>
            </svg>
          </div>
        </section>
        <Posts/>
      </main>
  );
}

const Posts = () => {
  return (
      <>
        {props.posts ? (
            <section className="grid w-full grid-cols-3">
              {Object.values(props.posts).map((i, index) => (
                  <PostCard key={index} image={i.image} reward={i.reward} />
          ))}
        </section>
      ) : (
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-y-4 pt-32 text-center text-black/40">
          <div className="size-20 rounded-[12px] border-[4px] border-black/40" />
          <div className="flex flex-col items-center">
            <p className="text-body">No posts yet!</p>
            <p className="text-secondarybody">Setup your profile first</p>
          </div>
        </div>
      )}
    </>
  );
};

type PostCardTempProps = {
  image: string;
  reward?: number;
};

const PostCard = ({ image, reward }: PostCardTempProps) => {
  return (
    <div className="relative aspect-square">
      {reward ? (
        <div className="absolute right-1.5 top-1.5 inline-flex items-center gap-x-1 rounded-full bg-white px-1.5 py-0.5 text-secondarybody font-medium">
          {reward} <IconBlock className="size-4" />
        </div>
      ) : (
        <div className="absolute right-1.5 top-1.5 inline-flex items-center gap-x-1 rounded-full bg-white px-1.5 py-0.5 text-secondarybody font-medium">
          Pending...
        </div>
      )}
      <Image
        width={100}
        height={100}
        quality={100}
        className="aspect-square size-full"
        src={image}
        alt="Image"
      />
    </div>
  );
};

const IconBlock = ({ className }: { className?: string }) => {
  return (
    <svg
      width="26"
      height="26"
      className={cn(className)}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_638_3040"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26"
      >
        <circle cx="13" cy="13" r="12.5" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_638_3040)">
        <path
          d="M13 27.2855C15.5219 27.2855 17.9988 26.6224 20.1791 25.3636C22.3594 24.1047 24.1653 22.295 25.4134 20.1183C26.6616 17.9417 27.3073 15.4756 27.2852 12.9707C27.263 10.4659 26.5736 8.01147 25.2872 5.85693L13 13.0955L13 27.2855Z"
          fill="#2B83EC"
        />
        <path
          d="M24.3209 6.46397C23.1669 4.46508 21.5042 2.80738 19.5018 1.65939C17.4994 0.511397 15.2287 -0.0859596 12.9207 -0.0719582C10.6126 -0.057957 8.34937 0.566904 6.36106 1.73911C4.37275 2.91131 2.73025 4.58905 1.60053 6.6018L13 13.0001L24.3209 6.46397Z"
          fill="#22A6F5"
        />
        <path
          d="M1.679 6.46362C0.529458 8.45469 -0.0746414 10.7137 -0.0723507 13.0128C-0.0700601 15.3119 0.53854 17.5697 1.69205 19.5585C2.84556 21.5473 4.50318 23.1967 6.49768 24.3403C8.49218 25.4838 10.753 26.0812 13.0521 26.072L13 12.9998L1.679 6.46362Z"
          fill="#1AC9FF"
        />
      </g>
    </svg>
  );
};
