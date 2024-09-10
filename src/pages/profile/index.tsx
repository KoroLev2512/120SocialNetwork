import {cn} from "@/shared/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import Link from "next/link";
import {useEffect, useState} from "react";
import {AvatarIcon} from "@/shared/icons/AvatarIcon";
import getUserProfilePhotoUrl from "@/shared/api/users/photo";
import axios from "axios";
import {GetAllPostsByUser} from "@/shared/api/posts/getAllByUser";
import {Post} from "@/shared/api/posts/types";
import {Button} from "@/shared/ui/button";
import IconTon from "@/shared/assets/icons/IconTon";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {useTranslations} from "next-intl";
import { GetStaticPropsContext } from "next";
import Image from "next/image";

type PostsProps = Post[];

export default function Profile() {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [actualUserId, setActualUserId] = useState<number>();
  const [wallet, setWallet] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostsProps>([]);
  const user = window.Telegram.WebApp.initDataUnsafe?.user;
  const t = useTranslations();

    const getUser = async (id: number) => {
        try {
            const response = await axios.get(
                `https://120-server.vercel.app/api/user/get_by_telegram/${id}`,
            );
            const data = response.data;
            return data.data;
        } catch (error) {
            console.error("Caught an error while trying to get user id");
            return null;
        }
    };

    getUser(user.id).then((data) => {
        setActualUserId(data.id);
        setWallet(data.wallet);
        setPhotoURL(data.profile_photo)
    });

    useEffect(() => {
        async function getPosts() {
            if (actualUserId) {
                const result = await GetAllPostsByUser(actualUserId);
                setPosts(result.posts);
                setLoading(false);
            }
        }
        getPosts();
    }, [actualUserId]);

    return (
        <main className="mx-auto flex h-screen w-full  flex-col items-center bg-app_gray_light-100 dark:bg-app_gray_dark-200">
            <section className="inline-flex w-full items-center justify-between border-b border-[#B6B6BA]/40 bg-white px-8 py-[14px] dark:bg-app_gray_dark-300">
                <div className="inline-flex items-center gap-x-4">
                    {isLoading ? (
                        <Skeleton width={75} height={75} circle />
                    ) : (
                        <Avatar className="size-[74px]">
                            {photoURL ? (
                                <AvatarImage width={128} height={128} alt="Avatar" src={photoURL} />
                            ) : (
                                <AvatarFallback>
                                    <AvatarIcon height={75} width={75} />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    )}
                    <div className="flex flex-col">
                        {isLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <p className="max-w-[110px] truncate text-secondarybody font-semibold">
                                @{user.username}
                            </p>
                        )}
                        <p className="text-secondarybody font-medium text-app_gray_light-300">
                            {isLoading ? (
                                <Skeleton width={60} />
                            ) : posts === null ? (
                                t('no_posts')
                            ) : posts.length === 1 ? (
                                t('1_post')
                            ) : (
                                `${posts.length} ${t('posts')}`
                            )}
                        </p>
                    </div>
                </div>
                {isLoading ? (
                    ""
                ) : (
                    <Link href="/profile/wallet">
                        <div className="inline-flex items-center gap-x-1.5">
                            <p className="inline-flex items-center gap-x-1.5 text-title font-semibold">
                                0
                                <IconBlock />
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-app_gray_light-300"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" strokeWidth="2" d="m9 4 8 8-8 8" />
                            </svg>
                        </div>
                    </Link>
                )}
            </section>

            {isLoading ? (
                <svg
                    aria-hidden="true"
                    className="mt-12 h-8 w-8 animate-spin fill-[#22A6F5] text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            ) : posts && posts.length > 0 ? (
                <section className="grid w-full grid-cols-3">
                    {posts.map((post, index) => (
                        <PostCard key={post.id} image={post.image} check={post.control} />
                    ))}
                </section>
            ) : (
                <section className="mx-auto flex w-full flex-col items-center justify-center gap-y-4 pt-32 text-center text-app_gray_light-300">
                    <div className="size-20 rounded-[12px] border-[4px] border-app_gray_light-300" />
                    <div className="flex flex-col items-center">
                        <p className="text-body">{t('no_posts_yet')}</p>
                        <p className="text-secondarybody">{t('setup_your_profile_first')}</p>
                    </div>
                </section>
            )}
        </main>
    );
}

// поставлю некстовский Image когда решим юрл для картинок + награды позже
type PostCardProps = {
  check: boolean;
  image: string;
};

const PostCard = ({ check, image }: PostCardProps) => {
    const t = useTranslations()
  return (
    <div className="relative aspect-square">
      {check ? (
        <div className="absolute right-1.5 top-1.5 inline-flex items-center gap-x-1 rounded-full bg-white px-1.5 py-0.5 text-secondarybody font-medium dark:bg-app_gray_dark-200">
          +139 <IconBlock className="size-4" />
        </div>
      ) : (
        <div className="absolute right-1.5 top-1.5 inline-flex items-center gap-x-1 rounded-full bg-white px-2 py-0.5 text-secondarybody font-medium dark:bg-app_gray_dark-200">
          {t('pending')}...
        </div>
      )}
      <Image
          className="aspect-square size-full"
          src={image}
          width={512}
          height={512}
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

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../languages_test/${locale}.json`)).default
        }
    };
}