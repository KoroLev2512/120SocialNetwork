import { Button } from "@/shared/ui/button";
import BackButton from "@/shared/ui/backbutton";
import { useRouter } from "next/router";
import { Post } from "@/shared/api/posts/types";
import ComingSoon from "@/widgets/ComingSoon";
import { GetStaticPropsContext } from "next";

// import Image from "next/image";
// import { GetAllPostsByUser } from "@/shared/api/posts/getAllByUser";
// import { useState, useEffect } from "react";
// import axios from "axios";

type PostsProps = Post[];

export default function ProfileWallet() {
//   const [actualUserId, setActualUserId] = useState<number>();
//   const [wallet, setWallet] = useState<string>();
//   const [posts, setPosts] = useState<PostsProps>([]);
    const router = useRouter();
//   const user = window.Telegram.WebApp.initDataUnsafe?.user;

//   const getUser = async (id: number) => {
//     try {
//         const response = await axios.get(`https://120-server.vercel.app/api/user/get_by_telegram/${id}`);
//         const data = response.data;
//         return data.data;
//     } catch (error) {
//         console.error('Caught an error while trying to get user id');
//         return null;
//     }
// };

//   getUser(user.id).then(data => {
//     setActualUserId(data.id);
//     setWallet(data.wallet)
//   });

//   useEffect(() => {
//       async function getPosts() {
//           if (actualUserId) {
//               const result = await GetAllPostsByUser(2);
//               setPosts(result.posts);
//           }
//       }
//       getPosts();
//   }, [actualUserId]);

  return (
    <div className="relative">
      <ComingSoon />
      <main className="mx-auto saturate-0 flex h-screen w-full max-w-[480px] pt-6 px-10 flex-col items-center bg-app_gray_light-100 dark:bg-app_gray_dark-300">
        <BackButton onClick={() => router.back()} />
        <div className="px-4 mb-[18px] py-1.5 inline-flex gap-x-1 items-center rounded-full bg-app_ton">
          <p className="text-secondarybody font-semibold text-white truncate max-w-[120px]">
            0xd75Evn534f87612kj
          </p>
          <svg
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.35875 1.00382C1.91043 0.556018 1.18357 0.556018 0.735257 1.00382C0.286942 1.45162 0.286942 2.17765 0.735257 2.62545L6.47517 8.35878C6.92348 8.80659 7.65034 8.80659 8.09866 8.35878L13.8386 2.62545C14.2869 2.17765 14.2869 1.45162 13.8386 1.00382C13.3903 0.556018 12.6634 0.556018 12.2151 1.00382L7.28691 5.92634L2.35875 1.00382Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-hugetitle">139 Block</p>
          <p className="text-secondarybody text-app_gray_light-300">≈0,00178 TON</p>
        </div>
        <Button className="text-body text-white py-4 w-full rounded-[16px] mt-[28px]">
          Connect Wallet To Withdraw
        </Button>
        {/* {posts.filter(post => post.control).length > 0 ? (<div className="rounded-[10px] bg-white dark:bg-app_gray_dark-200 w-full flex flex-col gap-y-4 p-4 mt-6">
          {posts.filter(post => post.control).map((i, index) => {
              return(
                <>
                  <div className="inline-flex items-center gap-x-2.5">
                    <img
                      src={i.image}
                      className="size-10 rounded-[6px]"
                      alt="Image"
                    />
                    <div className="flex flex-col">
                      <p className="text-secondarybody font-semibold">
                        +139 Blocks
                      </p>
                      <p className="text-[14px] text-app_gray_light-300 font-regular tracking-[-0.04em]">
                        {i.description}
                      </p>
                    </div>
                  </div>
                  {index < posts.length - 1 && (
                    <div className="w-full h-[1px] bg-app_gray_light-300/25 dark:bg-app_gray_light-300/25" />
                  )}
                </>
              )
            })}
        </div>) : null} */}
      </main>
    </div>
  );
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
      props: {
          messages: (await import(`../../../../languages_test/${locale}.json`)).default
      }
  };
}